import { spawnSync } from "node:child_process";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const REQUIRED_EXCEPTION_FIELDS = [
  "advisoryId",
  "advisoryUrl",
  "package",
  "severity",
  "vulnerableRange",
  "allowedGraph",
  "owner",
  "reason",
  "exposure",
  "createdAt",
  "expiresAt",
  "removalTrigger",
  "upstreamTracking",
];
const SEVERITIES = ["info", "low", "moderate", "high", "critical"];

function fail(message) {
  throw new Error(message);
}

function sameArray(actual, expected) {
  return (
    Array.isArray(actual) &&
    actual.length === expected.length &&
    actual.every((value, index) => value === expected[index])
  );
}

function validateException(exception) {
  if (
    !exception ||
    REQUIRED_EXCEPTION_FIELDS.some((field) => !exception[field]) ||
    !exception.allowedGraph.direct ||
    !exception.allowedGraph.transitive ||
    Number.isNaN(Date.parse(exception.createdAt)) ||
    Number.isNaN(Date.parse(exception.expiresAt))
  ) {
    fail("Audit exception metadata is incomplete or invalid.");
  }
}

function validateMetadata(report) {
  const metadata = report?.metadata?.vulnerabilities;
  if (!metadata) fail("Audit vulnerability metadata is missing.");

  const entries = Object.values(report.vulnerabilities);
  for (const severity of SEVERITIES) {
    const actual = entries.filter(
      (entry) => entry?.severity === severity,
    ).length;
    if (metadata[severity] !== actual) {
      fail(`Audit vulnerability metadata is contradictory for ${severity}.`);
    }
  }
  if (metadata.total !== entries.length) {
    fail("Audit vulnerability metadata total is contradictory.");
  }
}

function validateReferences(vulnerabilities) {
  const visiting = new Set();
  const visited = new Set();

  function visit(name) {
    if (visiting.has(name)) fail("Audit vulnerability graph contains a cycle.");
    if (visited.has(name)) return;
    const entry = vulnerabilities[name];
    if (!entry) fail(`Missing vulnerability reference: ${name}.`);
    visiting.add(name);
    for (const reference of entry.via ?? []) {
      if (typeof reference === "string") visit(reference);
    }
    visiting.delete(name);
    visited.add(name);
  }

  for (const name of Object.keys(vulnerabilities)) visit(name);
}

export function parseAuditJson(output) {
  if (typeof output !== "string" || output.trim() === "") {
    fail("Audit JSON output is empty.");
  }
  try {
    const parsed = JSON.parse(output);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      fail("Audit JSON must be one object.");
    }
    return parsed;
  } catch (error) {
    if (error instanceof Error && error.message.startsWith("Audit JSON")) {
      throw error;
    }
    fail("Audit JSON is malformed or contains multiple documents.");
  }
}

export function evaluateAuditReport(report, exception, now = new Date()) {
  if (report?.auditReportVersion !== 2) {
    fail("Unsupported npm audit report version; expected version 2.");
  }
  if (report.error) fail("npm audit did not complete successfully.");
  if (!report.vulnerabilities || typeof report.vulnerabilities !== "object") {
    fail("npm audit did not return a vulnerability map.");
  }

  validateMetadata(report);
  validateReferences(report.vulnerabilities);

  const blocking = Object.entries(report.vulnerabilities).filter(([, entry]) =>
    ["high", "critical"].includes(entry?.severity),
  );
  if (blocking.length === 0) return { status: "clean", ignored: [] };

  validateException(exception);
  if (now.getTime() >= Date.parse(exception.expiresAt)) {
    fail(`Audit exception ${exception.advisoryId} has expired.`);
  }

  const direct = exception.allowedGraph.direct;
  const transitive = exception.allowedGraph.transitive;
  const blockingNames = blocking.map(([name]) => name).sort();
  const expectedNames = [direct, transitive].sort();
  if (!sameArray(blockingNames, expectedNames)) {
    fail("Unapproved high or critical vulnerability detected.");
  }

  const next = report.vulnerabilities[direct];
  const sharp = report.vulnerabilities[transitive];
  if (
    next?.name !== direct ||
    next.severity !== "high" ||
    next.isDirect !== true ||
    !sameArray(next.via, [transitive]) ||
    !sameArray(next.effects, []) ||
    !sameArray(next.nodes, [`node_modules/${direct}`])
  ) {
    fail("Unexpected Next propagation graph for the approved advisory.");
  }

  const advisory = sharp?.via?.[0];
  if (
    sharp?.name !== transitive ||
    sharp.severity !== exception.severity ||
    sharp.isDirect !== false ||
    sharp.range !== exception.vulnerableRange ||
    !sameArray(sharp.effects, [direct]) ||
    !sameArray(sharp.nodes, [`node_modules/${transitive}`]) ||
    sharp.via?.length !== 1 ||
    !advisory ||
    typeof advisory !== "object" ||
    advisory.name !== exception.package ||
    advisory.dependency !== exception.package ||
    advisory.url !== exception.advisoryUrl ||
    advisory.severity !== exception.severity ||
    advisory.range !== exception.vulnerableRange ||
    !exception.advisoryUrl.endsWith(exception.advisoryId)
  ) {
    fail("Unexpected Sharp advisory graph for the approved exception.");
  }

  return { status: "exception", ignored: [exception.advisoryId] };
}

export function evaluateAuditProcessResult(
  result,
  exception,
  now = new Date(),
) {
  if (result.signal) fail(`npm audit terminated by signal ${result.signal}.`);
  if (![0, 1].includes(result.status)) {
    fail(`npm audit returned unexpected exit code ${result.status}.`);
  }

  const report = parseAuditJson(result.stdout);
  if (report.error) fail("npm audit did not complete successfully.");
  const evaluation = evaluateAuditReport(report, exception, now);

  if (result.status === 0 && evaluation.status !== "clean") {
    fail("npm audit exit code contradicted its vulnerability report.");
  }
  if (result.status === 1 && evaluation.status === "clean") {
    fail("npm audit failed without a blocking vulnerability report.");
  }
  return evaluation;
}

export function checkExposureContract({ nextConfig, sourceFiles }) {
  const configRisks = /\b(remotePatterns|domains|loaderFile)\s*:|\bloader\s*:/i;
  if (configRisks.test(nextConfig)) {
    fail("Untrusted image exposure detected in Next image configuration.");
  }

  let imageComponents = 0;
  for (const [path, source] of Object.entries(sourceFiles)) {
    if (/<input\b[^>]*\btype\s*=\s*["']file["']/i.test(source)) {
      fail(
        `Untrusted image exposure detected through a file input in ${path}.`,
      );
    }
    if (/\bsrc\s*:\s*["']https?:\/\//i.test(source)) {
      fail(
        `Untrusted image exposure detected through remote content in ${path}.`,
      );
    }

    for (const block of source.match(/<Image\b[\s\S]*?\/>/g) ?? []) {
      imageComponents += 1;
      const literal = block.match(/\bsrc\s*=\s*["']([^"']+)["']/)?.[1];
      const expression = block.match(/\bsrc\s*=\s*\{([^}]+)\}/)?.[1]?.trim();
      const allowed =
        (literal?.startsWith("/images/") ?? false) ||
        (literal?.startsWith("/brand/") ?? false) ||
        expression === "story.image.src";
      if (!allowed) {
        fail(`Untrusted image exposure detected in ${path}.`);
      }
    }
  }

  if (imageComponents === 0) {
    fail(
      "Untrusted image exposure guard found no Next Image components to verify.",
    );
  }
}

function collectProductionSources(directory, root = directory, files = {}) {
  for (const name of readdirSync(directory)) {
    const path = join(directory, name);
    const relative = path.slice(root.length + 1);
    const stats = statSync(path);
    if (stats.isDirectory()) {
      collectProductionSources(path, root, files);
    } else if (
      /\.(?:ts|tsx|js|jsx|mjs)$/.test(name) &&
      !/\.(?:test|spec)\./.test(name) &&
      !name.endsWith(".d.ts")
    ) {
      files[relative] = readFileSync(path, "utf8");
    }
  }
  return files;
}

function run() {
  const root = process.cwd();
  const exception = JSON.parse(
    readFileSync(join(root, "security/npm-audit-exception.json"), "utf8"),
  );
  const nextConfig = readFileSync(join(root, "next.config.ts"), "utf8");
  const sourceFiles = collectProductionSources(join(root, "src"));
  checkExposureContract({ nextConfig, sourceFiles });

  const result = spawnSync("npm", ["audit", "--json"], {
    cwd: root,
    encoding: "utf8",
    maxBuffer: 10 * 1024 * 1024,
    timeout: 120_000,
  });
  if (result.error)
    fail(`Unable to execute npm audit: ${result.error.message}`);

  const evaluation = evaluateAuditProcessResult(result, exception);
  if (evaluation.status === "exception") {
    console.warn(
      `SECURITY EXCEPTION ACTIVE: ${evaluation.ignored.join(", ")} until ${exception.expiresAt}. Owner: ${exception.owner}.`,
    );
  } else {
    console.log("npm audit passed with no high or critical vulnerabilities.");
  }
}

const isMain =
  process.argv[1] &&
  resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url));
if (isMain) {
  try {
    run();
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  }
}
