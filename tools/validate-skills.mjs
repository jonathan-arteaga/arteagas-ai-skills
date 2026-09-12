#!/usr/bin/env node
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { discoverSkills, validateSkills } from "./lib/skills.mjs";

const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);

function readOptions(argv) {
  const rootIndex = argv.indexOf("--root");
  let root = path.join(repoRoot, ".agents", "skills");
  if (rootIndex >= 0) {
    const supplied = argv[rootIndex + 1];
    if (!supplied) throw new Error("--root requires a directory.");
    root = path.resolve(supplied);
  }
  return { root, strict: argv.includes("--strict") };
}

let options;
try {
  options = readOptions(process.argv.slice(2));
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}

const skills = discoverSkills(options.root);
const issues = validateSkills(options.root);
const errors = issues.filter((issue) => issue.severity === "error");
const warnings = issues.filter((issue) => issue.severity === "warning");

if (warnings.length > 0) {
  console.error(`${warnings.length} warning(s):`);
  for (const issue of warnings) {
    console.error(
      `- [${issue.category}] ${path.relative(repoRoot, issue.file)}: ${issue.message}`,
    );
  }
}

if (errors.length > 0) {
  console.error(`Validation failed with ${errors.length} error(s):`);
  for (const issue of errors) {
    console.error(
      `- [${issue.category}] ${path.relative(repoRoot, issue.file)}: ${issue.message}`,
    );
  }
  process.exit(1);
}

if (options.strict && warnings.length > 0) {
  console.error("Validation failed: --strict treats warnings as errors.");
  process.exit(1);
}

console.log(
  `Validated ${skills.length} skill(s)${
    warnings.length > 0 ? ` with ${warnings.length} warning(s)` : ""
  }.`,
);
