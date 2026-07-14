import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

function git(args, options = {}) {
  try {
    return execFileSync("git", args, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
      ...options,
    });
  } catch (error) {
    const stderr = error?.stderr?.toString().trim();
    if (stderr) {
      process.stderr.write(`${stderr}\n`);
    }
    throw error;
  }
}

function runCheck(label, args) {
  try {
    git(args, { stdio: "inherit" });
  } catch {
    process.stderr.write(`Release diff check failed: ${label}\n`);
    process.exitCode = 1;
  }
}

const baseRef = process.env.BASE_REF || "origin/main";
let mergeBase;
try {
  git(["rev-parse", "--verify", baseRef]);
  mergeBase = git(["merge-base", "HEAD", baseRef]).trim();
} catch {
  process.stderr.write(
    `Cannot verify release diff because base ref ${baseRef} is unavailable. Fetch the remote or set BASE_REF.\n`,
  );
  process.exit(2);
}

runCheck(`committed candidate against ${baseRef}`, [
  "diff",
  "--check",
  `${mergeBase}...HEAD`,
]);
runCheck("staged changes", ["diff", "--cached", "--check"]);
runCheck("unstaged tracked changes", ["diff", "--check"]);

const untracked = git(["ls-files", "--others", "--exclude-standard", "-z"])
  .split("\0")
  .filter(Boolean);

for (const path of untracked) {
  const bytes = readFileSync(path);
  if (bytes.includes(0)) {
    continue;
  }
  const lines = bytes.toString("utf8").split(/\r?\n/);
  lines.forEach((line, index) => {
    if (/[\t ]+$/.test(line)) {
      process.stderr.write(
        `${path}:${index + 1}: trailing whitespace in untracked file\n`,
      );
      process.exitCode = 1;
    }
  });
}

if (!process.exitCode) {
  process.stdout.write(
    `Release diff clean against ${baseRef}; staged, unstaged and ${untracked.length} untracked file(s) checked.\n`,
  );
}
