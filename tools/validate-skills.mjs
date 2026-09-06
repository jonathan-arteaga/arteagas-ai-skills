#!/usr/bin/env node
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { discoverSkills, validateSkills } from "./lib/skills.mjs";

const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);

function readRoot(argv) {
  const rootIndex = argv.indexOf("--root");
  if (rootIndex < 0) return path.join(repoRoot, ".agents", "skills");
  const supplied = argv[rootIndex + 1];
  if (!supplied) throw new Error("--root requires a directory.");
  return path.resolve(supplied);
}

let skillsRoot;
try {
  skillsRoot = readRoot(process.argv.slice(2));
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}

const skills = discoverSkills(skillsRoot);
const issues = validateSkills(skillsRoot);

if (issues.length > 0) {
  console.error(`Validation failed with ${issues.length} issue(s):`);
  for (const issue of issues) {
    console.error(`- ${issue.skill}: ${issue.message}`);
  }
  process.exit(1);
}

console.log(`Validated ${skills.length} skill(s).`);
