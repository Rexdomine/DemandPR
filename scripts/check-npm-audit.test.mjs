import { describe, expect, it } from "vitest";

import {
  checkExposureContract,
  evaluateAuditProcessResult,
  evaluateAuditReport,
  parseAuditJson,
} from "./check-npm-audit.mjs";

const exception = {
  advisoryId: "GHSA-f88m-g3jw-g9cj",
  advisoryUrl: "https://github.com/advisories/GHSA-f88m-g3jw-g9cj",
  package: "sharp",
  severity: "high",
  vulnerableRange: "<0.35.0",
  allowedGraph: { direct: "next", transitive: "sharp" },
  owner: "Demand PR technical lead",
  reason: "No stable Next release supports patched Sharp 0.35 yet.",
  exposure:
    "Only repository-controlled local images; no remote loader or uploads.",
  createdAt: "2026-07-22T00:00:00Z",
  expiresAt: "2026-08-05T00:00:00Z",
  removalTrigger:
    "Remove when stable Next supports Sharp >=0.35.0 and Vercel tracing is verified.",
  upstreamTracking: "https://github.com/vercel/next.js/pull/94845",
};

function cleanReport() {
  return {
    auditReportVersion: 2,
    vulnerabilities: {},
    metadata: {
      vulnerabilities: {
        info: 0,
        low: 0,
        moderate: 0,
        high: 0,
        critical: 0,
        total: 0,
      },
    },
  };
}

function allowedReport() {
  return {
    auditReportVersion: 2,
    vulnerabilities: {
      next: {
        name: "next",
        severity: "high",
        isDirect: true,
        via: ["sharp"],
        effects: [],
        range: "9.5.6-canary.0 - 10.0.7 || 14.3.0-canary.0 - 16.3.0-preview.7",
        nodes: ["node_modules/next"],
        fixAvailable: {
          name: "next",
          version: "14.2.35",
          isSemVerMajor: true,
        },
      },
      sharp: {
        name: "sharp",
        severity: "high",
        isDirect: false,
        via: [
          {
            source: 1124066,
            name: "sharp",
            dependency: "sharp",
            title:
              "sharp inherited vulnerabilities in libvips: CVE-2026-33327, CVE-2026-33328, CVE-2026-35590, CVE-2026-35591",
            url: exception.advisoryUrl,
            severity: "high",
            cwe: ["CWE-1395"],
            cvss: { score: 0, vectorString: null },
            range: "<0.35.0",
          },
        ],
        effects: ["next"],
        range: "<0.35.0",
        nodes: ["node_modules/sharp"],
        fixAvailable: {
          name: "next",
          version: "14.2.35",
          isSemVerMajor: true,
        },
      },
    },
    metadata: {
      vulnerabilities: {
        info: 0,
        low: 0,
        moderate: 0,
        high: 2,
        critical: 0,
        total: 2,
      },
    },
  };
}

function unrelated(name = "other", severity = "high") {
  return {
    name,
    severity,
    isDirect: false,
    via: [
      {
        name,
        dependency: name,
        url: "https://github.com/advisories/GHSA-xxxx-yyyy-zzzz",
        severity,
        range: "<2.0.0",
      },
    ],
    effects: [],
    range: "<2.0.0",
    nodes: [`node_modules/${name}`],
    fixAvailable: true,
  };
}

function reconcile(report) {
  const entries = Object.values(report.vulnerabilities);
  for (const severity of ["info", "low", "moderate", "high", "critical"]) {
    report.metadata.vulnerabilities[severity] = entries.filter(
      (entry) => entry.severity === severity,
    ).length;
  }
  report.metadata.vulnerabilities.total = entries.length;
  return report;
}

const beforeExpiry = new Date("2026-07-22T12:00:00Z");

describe("npm audit exception evaluator", () => {
  it("passes a clean version-two audit report", () => {
    expect(evaluateAuditReport(cleanReport(), exception, beforeExpiry)).toEqual(
      { status: "clean", ignored: [] },
    );
  });

  it("permits only the exact Sharp advisory and its Next propagation before expiry", () => {
    expect(
      evaluateAuditReport(allowedReport(), exception, beforeExpiry),
    ).toEqual({ status: "exception", ignored: [exception.advisoryId] });
  });

  it.each([
    ["unrelated high", "high"],
    ["unrelated critical", "critical"],
  ])("fails for an %s advisory", (_label, severity) => {
    const report = cleanReport();
    report.vulnerabilities.other = unrelated("other", severity);
    reconcile(report);
    expect(() => evaluateAuditReport(report, exception, beforeExpiry)).toThrow(
      /unapproved high or critical vulnerability/i,
    );
  });

  it("fails when the allowed graph is mixed with another high advisory", () => {
    const report = allowedReport();
    report.vulnerabilities.other = unrelated();
    reconcile(report);
    expect(() => evaluateAuditReport(report, exception, beforeExpiry)).toThrow(
      /unapproved high or critical vulnerability/i,
    );
  });

  it("fails when Sharp contains an additional advisory", () => {
    const report = allowedReport();
    report.vulnerabilities.sharp.via.push(unrelated("sharp").via[0]);
    expect(() => evaluateAuditReport(report, exception, beforeExpiry)).toThrow(
      /sharp advisory graph/i,
    );
  });

  it("fails when Next contains another advisory reference", () => {
    const report = allowedReport();
    report.vulnerabilities.other = unrelated("other", "low");
    report.vulnerabilities.next.via.push("other");
    reconcile(report);
    expect(() => evaluateAuditReport(report, exception, beforeExpiry)).toThrow(
      /next propagation graph/i,
    );
  });

  it("fails when the advisory propagates to an unexpected package", () => {
    const report = allowedReport();
    report.vulnerabilities.sharp.effects.push("other");
    expect(() => evaluateAuditReport(report, exception, beforeExpiry)).toThrow(
      /sharp advisory graph/i,
    );
  });

  it.each([
    ["after expiry", new Date("2026-08-05T00:00:01Z")],
    ["at the expiry boundary", new Date("2026-08-05T00:00:00Z")],
  ])("fails %s", (_label, now) => {
    expect(() => evaluateAuditReport(allowedReport(), exception, now)).toThrow(
      /expired/i,
    );
  });

  it("fails on an unsupported audit schema", () => {
    const report = allowedReport();
    report.auditReportVersion = 3;
    expect(() => evaluateAuditReport(report, exception, beforeExpiry)).toThrow(
      /audit report version/i,
    );
  });

  it("fails when exception governance metadata is incomplete", () => {
    const incomplete = { ...exception };
    delete incomplete.owner;
    expect(() =>
      evaluateAuditReport(allowedReport(), incomplete, beforeExpiry),
    ).toThrow(/exception metadata/i);
  });

  it("fails when vulnerability metadata contradicts the report", () => {
    const report = allowedReport();
    report.metadata.vulnerabilities.high = 1;
    expect(() => evaluateAuditReport(report, exception, beforeExpiry)).toThrow(
      /metadata/i,
    );
  });

  it("fails when an indirect vulnerability reference is missing", () => {
    const report = allowedReport();
    delete report.vulnerabilities.sharp;
    reconcile(report);
    expect(() => evaluateAuditReport(report, exception, beforeExpiry)).toThrow(
      /missing vulnerability reference/i,
    );
  });

  it("fails when the audit command returns an error document", () => {
    expect(() =>
      evaluateAuditProcessResult(
        {
          status: 1,
          signal: null,
          stdout: JSON.stringify({
            auditReportVersion: 2,
            error: { code: "EAUDITNOPJSON", summary: "registry unavailable" },
          }),
          stderr: "",
        },
        exception,
        beforeExpiry,
      ),
    ).toThrow(/audit did not complete/i);
  });

  it.each([
    ["empty output", ""],
    ["malformed JSON", "{not-json"],
    ["multiple JSON documents", "{}\n{}"],
  ])("fails on %s", (_label, output) => {
    expect(() => parseAuditJson(output)).toThrow(/audit json/i);
  });

  it("fails on an unexpected process exit code", () => {
    expect(() =>
      evaluateAuditProcessResult(
        {
          status: 2,
          signal: null,
          stdout: JSON.stringify(cleanReport()),
          stderr: "",
        },
        exception,
        beforeExpiry,
      ),
    ).toThrow(/exit code/i);
  });

  it("fails when the audit process is terminated by a signal", () => {
    expect(() =>
      evaluateAuditProcessResult(
        {
          status: null,
          signal: "SIGTERM",
          stdout: "",
          stderr: "",
        },
        exception,
        beforeExpiry,
      ),
    ).toThrow(/signal/i);
  });
});

describe("temporary exception exposure contract", () => {
  const safeSources = {
    "src/app/page.tsx":
      'import Image from "next/image"; <Image src="/images/home/a.webp" alt="A" />',
    "src/content/site.ts":
      'export const stories = [{ image: { src: "/images/home/b.webp" } }];',
  };

  it("accepts repository-controlled local image sources", () => {
    expect(() =>
      checkExposureContract({
        nextConfig: "const nextConfig = {}; export default nextConfig;",
        sourceFiles: safeSources,
      }),
    ).not.toThrow();
  });

  it.each([
    [
      "remote image configuration",
      "const nextConfig = { images: { remotePatterns: [{ hostname: 'cdn.test' }] } };",
      safeSources,
    ],
    [
      "a remote Image source",
      "const nextConfig = {};",
      {
        "src/app/page.tsx":
          'import Image from "next/image"; <Image src="https://cdn.test/a.webp" alt="A" />',
      },
    ],
    [
      "an image upload control",
      "const nextConfig = {};",
      {
        "src/app/page.tsx": '<input type="file" accept="image/*" />',
      },
    ],
  ])(
    "fails when exposure drifts through %s",
    (_label, nextConfig, sourceFiles) => {
      expect(() => checkExposureContract({ nextConfig, sourceFiles })).toThrow(
        /untrusted image exposure/i,
      );
    },
  );
});
