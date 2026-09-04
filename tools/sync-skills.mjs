#!/usr/bin/env node
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { discoverSkills, validateSkills } from "./lib/skills.mjs";

const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const skillsRoot = path.join(repoRoot, ".agents", "skills");
const targetRoots = {
  codex: [path.join(os.homedir(), ".agents", "skills")],
  portable: [path.join(os.homedir(), ".agents", "skills")],
  claude: [path.join(os.homedir(), ".claude", "skills")],
  cursor: [path.join(os.homedir(), ".cursor", "skills")],
  copilot: [path.join(os.homedir(), ".copilot", "skills")],
  all: [
    path.join(os.homedir(), ".agents", "skills"),
    path.join(os.homedir(), ".claude", "skills"),
    path.join(os.homedir(), ".cursor", "skills"),
    path.join(os.homedir(), ".copilot", "skills"),
  ],
};

function usage() {
  console.log(`Usage: node tools/sync-skills.mjs [options]

Options:
  --target <name>  codex, portable, claude, cursor, copilot, or all
  --skill <name>   Sync one skill; repeat to select more than one
  --apply          Write changes; without it, the command is a dry run
  --force          Replace existing destination folders
  --help           Show this help
`);
}

function parseArgs(argv) {
  const options = {
    target: "codex",
    apply: false,
    force: false,
    selected: [],
  };

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--help" || argument === "-h") {
      options.help = true;
    } else if (argument === "--target") {
      options.target = argv[++index];
    } else if (argument === "--skill") {
      options.selected.push(argv[++index]);
    } else if (argument === "--apply") {
      options.apply = true;
    } else if (argument === "--dry-run") {
      options.apply = false;
    } else if (argument === "--force") {
      options.force = true;
    } else {
      throw new Error(`Unknown option: ${argument}`);
    }
  }

  if (options.help) return options;
  if (!options.target || !(options.target in targetRoots)) {
    throw new Error(`Unsupported target: ${options.target}`);
  }
  if (options.selected.some((name) => !name)) {
    throw new Error("--skill requires a name.");
  }

  return options;
}

let options;
try {
  options = parseArgs(process.argv.slice(2));
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}

if (options.help) {
  usage();
  process.exit(0);
}

const issues = validateSkills(skillsRoot);
if (issues.length > 0) {
  console.error("Fix validation errors before synchronizing.");
  process.exit(1);
}

const available = discoverSkills(skillsRoot);
const selected =
  options.selected.length === 0
    ? available
    : available.filter((skill) => options.selected.includes(skill.name));
const missing = options.selected.filter(
  (name) => !available.some((skill) => skill.name === name),
);
if (missing.length > 0) {
  console.error(`Unknown skill(s): ${missing.join(", ")}`);
  process.exit(1);
}

const destinationRoots = [...new Set(targetRoots[options.target])];
console.log(`Mode: ${options.apply ? "apply" : "dry-run"}`);
console.log(`Target: ${options.target}`);

for (const destinationRoot of destinationRoots) {
  if (options.apply) fs.mkdirSync(destinationRoot, { recursive: true });

  for (const skill of selected) {
    const destination = path.join(destinationRoot, skill.name);
    const exists = fs.existsSync(destination);

    if (!options.apply) {
      const action = exists
        ? options.force
          ? "would replace"
          : "would skip"
        : "would copy";
      console.log(`${action}: ${skill.name} -> ${destination}`);
      continue;
    }

    if (exists && !options.force) {
      console.log(`skipped: ${skill.name} -> ${destination}`);
      continue;
    }
    if (exists) fs.rmSync(destination, { recursive: true, force: true });
    fs.cpSync(skill.directory, destination, {
      recursive: true,
      force: false,
      errorOnExist: true,
    });
    console.log(`copied: ${skill.name} -> ${destination}`);
  }
}
