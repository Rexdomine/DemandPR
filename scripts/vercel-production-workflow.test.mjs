import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

const workflow = readFileSync(
  join(process.cwd(), ".github/workflows/vercel-production.yml"),
  "utf8",
);
const deploymentDocs = readFileSync(
  join(process.cwd(), "docs/deployment.md"),
  "utf8",
);
const contributing = readFileSync(
  join(process.cwd(), "CONTRIBUTING.md"),
  "utf8",
);

describe("automatic Vercel production deployment", () => {
  it("deploys only exact pushes to main and serializes superseded production runs", () => {
    expect(workflow).toMatch(/push:\s*\n\s*branches:\s*\[main\]/);
    expect(workflow).not.toMatch(/pull_request:/);
    expect(workflow).toMatch(/group:\s*demandpr-production/);
    expect(workflow).toMatch(/cancel-in-progress:\s*true/);
    expect(workflow).toMatch(/github\.ref\s*==\s*'refs\/heads\/main'/);
    expect(workflow).toMatch(/ref:\s*\$\{\{ github\.sha \}\}/);
    expect(workflow).toMatch(
      /test "\$\(git rev-parse HEAD\)" = "\$GITHUB_SHA"/,
    );
  });

  it("fails closed around the dedicated project and a moving main branch", () => {
    expect(workflow).toContain("team_M5iRNyEcNZHaREmgnyWgJgI1");
    expect(workflow).toContain("prj_HggbtLdbdaJcuvDu89kGscjs5AlT");
    expect(workflow).toMatch(
      /project\.projectId !== process\.env\.VERCEL_PROJECT_ID/,
    );
    expect(workflow).toMatch(/project\.orgId !== process\.env\.VERCEL_ORG_ID/);
    expect(workflow).toMatch(/git fetch --no-tags origin main/);
    expect(workflow).toMatch(
      /test "\$\(git rev-parse origin\/main\)" = "\$GITHUB_SHA"/,
    );
  });

  it("builds and promotes the production artifact without Git-author metadata", () => {
    const buildIndex = workflow.indexOf("vercel@55.0.0 build --prod");
    const removeGitIndex = workflow.indexOf("rm -rf .git");
    const deployIndex = workflow.indexOf("vercel@55.0.0 deploy");

    expect(workflow).toContain("npm run audit:security");
    expect(workflow).toContain("npm run verify:checkpoint");
    expect(workflow).toContain("--environment=production");
    expect(buildIndex).toBeGreaterThan(-1);
    expect(removeGitIndex).toBeGreaterThan(buildIndex);
    expect(deployIndex).toBeGreaterThan(removeGitIndex);
    expect(workflow).toMatch(
      /vercel@55\.0\.0 deploy[\s\S]*--prebuilt[\s\S]*--prod/,
    );
    expect(workflow).toContain("https://demandpr.vercel.app");
    expect(workflow).toMatch(/x-robots-tag[\s\S]*noindex/i);
  });

  it("exposes the production token only to Vercel CLI steps", () => {
    const jobPrefix = workflow.slice(0, workflow.indexOf("steps:"));
    const secretBinding =
      "DEMANDPR_VERCEL_TOKEN: ${{ secrets.DEMANDPR_VERCEL_TOKEN }}";

    expect(jobPrefix).not.toContain(secretBinding);
    expect(
      workflow.match(new RegExp(secretBinding.replace(/[${}]/g, "\\$&"), "g")),
    ).toHaveLength(3);
  });

  it("documents merge-triggered production and protected retry semantics", () => {
    expect(deploymentDocs).toMatch(/every push to `main`/i);
    expect(deploymentDocs).toMatch(/exact merged commit/i);
    expect(deploymentDocs).toMatch(/superseded/i);
    expect(contributing).toMatch(
      /merging an approved pull request into `main` authorises/i,
    );
    expect(contributing).toMatch(/automatic production deployment/i);
  });
});
