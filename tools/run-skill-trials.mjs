#!/usr/bin/env node
// Paid/subscription model trials are explicit; this runner is never part of pnpm check.
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import crypto from "node:crypto";
import { spawn, spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { parseFrontmatter } from "./lib/skills.mjs";

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const option = (name, fallback) => {
  const i = args.indexOf(name);
  return i < 0 ? fallback : args[i + 1];
};
if (args.includes("--help") || !option("--baseline")) {
  console.log(
    "Usage: node tools/run-skill-trials.mjs --baseline <repo-or-snapshot> --output <outside-repo-dir> [--host codex|claude|cursor-fable|cursor-grok|all] [--case <id>|all] [--arm baseline|revised|both] [--repeat label] [--revised <snapshot>] [--file-tools-only]",
  );
  process.exit(args.includes("--help") ? 0 : 1);
}
const baseline = path.resolve(option("--baseline"));
const revised = path.resolve(option("--revised", repo));
const output = path.resolve(
  option("--output", path.join(repo, "tmp", "model-trials")),
);
const selectedHost = option("--host", "all");
const selectedCase = option("--case", "all");
const selectedArm = option("--arm", "both");
const repeat = option("--repeat", "1");
if (!/^[a-zA-Z0-9][a-zA-Z0-9._-]{0,63}$/.test(repeat)) throw new Error("--repeat must be a short identifier without path separators");
const dataRoot = path.join(repo, "docs", "evaluations", "flagship-skills");
const cases = JSON.parse(
  fs.readFileSync(path.join(dataRoot, "cases.json"), "utf8"),
);
const routing = JSON.parse(
  fs.readFileSync(path.join(dataRoot, "routing.json"), "utf8"),
);
const configs = {
  codex: {
    executable:
      process.env.SKILL_EVAL_CODEX ||
      "/Applications/ChatGPT.app/Contents/Resources/codex",
    model: "gpt-6-astra",
    effort: "high",
  },
  claude: {
    executable:
      process.env.SKILL_EVAL_CLAUDE ||
      path.join(os.homedir(), ".local/bin/claude"),
    model: "claude-fable-5-1",
    effort: "high",
  },
  "cursor-fable": {
    executable:
      process.env.SKILL_EVAL_CURSOR ||
      path.join(os.homedir(), ".local/bin/agent"),
    model: "claude-fable-5-1-high",
    effort: "high",
  },
  "cursor-grok": {
    executable:
      process.env.SKILL_EVAL_CURSOR ||
      path.join(os.homedir(), ".local/bin/agent"),
    model: "cursor-grok-4.6-high",
    effort: "high",
  },
};
if (selectedHost !== "all" && !configs[selectedHost])
  throw new Error("Unknown host");
if (!["baseline", "revised", "both"].includes(selectedArm))
  throw new Error("Unknown arm");
if (
  selectedCase !== "all" &&
  selectedCase !== "routing" &&
  !cases.some((item) => item.id === selectedCase)
)
  throw new Error("Unknown case");
fs.mkdirSync(output, { recursive: true });
const sharedInstructions = `This is an isolated synthetic task. Use only this project's .agents/skills library and the supplied fixtures. Do not inspect the user's other projects, global files, accounts, or real services. Do not install packages or use network tools. You may read skill references and edit the requested fixture artifacts. Read the applicable SKILL.md before doing a behavioral task. Do not change the skill library or these instructions. Report the work and verification actually completed.\n`;

function filesIn(root) {
  if (!fs.existsSync(root)) return [];
  return fs.readdirSync(root, { withFileTypes: true }).flatMap((entry) => {
    if ([".git", "node_modules"].includes(entry.name)) return [];
    const p = path.join(root, entry.name);
    return entry.isDirectory() ? filesIn(p) : entry.isFile() ? [p] : [];
  });
}
function hashes(root) {
  return Object.fromEntries(
    filesIn(root).map((file) => [
      path.relative(root, file),
      crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex"),
    ]),
  );
}
function normalize(value, cwd) {
  return value
    .replaceAll(cwd, "<trial>")
    .replaceAll(repo, "<revised-repo>")
    .replaceAll(baseline, "<baseline-repo>")
    .replaceAll(os.homedir(), "<home>");
}
function command(host, config, prompt, writable) {
  if (host === "codex")
    return [
      "exec",
      "--ignore-user-config",
      "--ephemeral",
      "--skip-git-repo-check",
      "--model",
      config.model,
      ...(writable ? ["--approve-for-me"] : ["--sandbox", "read-only"]),
      "-c",
      'model_reasoning_effort="high"',
      "--json",
      prompt,
    ];
  if (host === "claude")
    return [
      "-p",
      prompt,
      "--model",
      config.model,
      "--effort",
      config.effort,
      "--restricted",
      "--tools",
      writable ? "Read,Edit,Write,Glob,Grep,Skill" : "Read,Glob,Grep,Skill",
      "--allowedTools",
      writable ? "Read,Edit,Write,Glob,Grep,Skill" : "Read,Glob,Grep,Skill",
      "--permission-mode",
      writable ? "acceptEdits" : "dontAsk",
      "--strict-mcp-config",
      "--setting-sources",
      "project",
      "--no-session-persistence",
      "--output-format",
      "stream-json",
      "--verbose",
    ];
  return [
    "-p",
    prompt,
    "--model",
    config.model,
    "--sandbox",
    "enabled",
    "--auto-review",
    "--trust",
    "--output-format",
    "stream-json",
    ...(writable ? [] : ["--mode", "ask"]),
  ];
}

async function run(host, arm, item) {
  const id = `${host}-${arm}-${item.id}-${repeat}`;
  const runDir = path.join(output, id);
  if (fs.existsSync(path.join(runDir, "result.json"))) {
    console.log(`skip ${id}`);
    return;
  }
  if (fs.existsSync(runDir))
    throw new Error(
      `Incomplete trial exists: ${runDir}; use a new --repeat label`,
    );
  const cwd = path.join(runDir, "workspace");
  fs.mkdirSync(cwd, { recursive: true });
  const library = path.join(cwd, ".agents", "skills");
  fs.cpSync(
    path.join(arm === "baseline" ? baseline : revised, ".agents", "skills"),
    library,
    { recursive: true },
  );
  const hostRoot =
    host === "claude"
      ? ".claude"
      : host.startsWith("cursor")
        ? ".cursor"
        : null;
  if (hostRoot) {
    fs.mkdirSync(path.join(cwd, hostRoot));
    fs.symlinkSync("../.agents/skills", path.join(cwd, hostRoot, "skills"));
  }
  fs.writeFileSync(path.join(cwd, "AGENTS.md"), sharedInstructions);
  fs.writeFileSync(path.join(cwd, "CLAUDE.md"), sharedInstructions);
  for (const [file, content] of Object.entries(item.files ?? {}))
    fs.writeFileSync(path.join(cwd, file), content);
  const skillByCase = {
    component: "design-pages",
    "combined-build": "frame-product-build",
    "audit-only": "design-pages",
    "swift-settings": "apple-swift",
    "bilingual-copy": "product-language",
    "offline-design": "design-md",
    "voice-edit": "edit-in-authentic-voice",
    connector: "connector-doctor",
    "pet-format": "hatch-pet",
    "think-explore": "think-with-me",
    "think-execute": "think-with-me",
  };
  let prompt = item.prompt;
  if (item.id !== "routing")
    prompt =
      sharedInstructions +
      `\nRead .agents/skills/${skillByCase[item.id]}/SKILL.md and its relevant references before doing the task below. The local file is the assigned skill even when a host's named Skill command cannot discover it. Keep scratch files inside this trial workspace.\n\n` +
      prompt;
  if (item.id === "routing") {
    const catalog = fs
      .readdirSync(library)
      .sort()
      .map((name) => {
        const p = path.join(library, name, "SKILL.md");
        return fs.existsSync(p)
          ? {
              name,
              description: parseFrontmatter(fs.readFileSync(p, "utf8")).data
                .description,
            }
          : null;
      })
      .filter(Boolean);
    fs.writeFileSync(path.join(cwd, "catalog.json"), JSON.stringify(catalog));
    fs.writeFileSync(
      path.join(cwd, "requests.json"),
      JSON.stringify(
        routing.map(({ id, prompt: request }, i) => ({
          id: `q${i + 1}`,
          request,
        })),
      ),
    );
    prompt =
      'Read catalog.json and requests.json. For each independent request, select the single best lead skill from this catalog, or null if none applies. Do not perform the requests or read the skill bodies. Return only a JSON array of {"id":"q1","skill":"name-or-null"}; use a real JSON null when no skill applies.';
  }
  if (args.includes("--file-tools-only")) prompt += "\nFor this controlled pass, use file tools only; shell and browser verification are unavailable. The evaluator will check the resulting artifact independently. Report your verification limits.\n";
  fs.writeFileSync(path.join(runDir, "prompt.txt"), prompt);
  const before = hashes(cwd);
  const config = configs[host];
  const argv = command(host, config, prompt, (item.allowed ?? []).length > 0);
  const version = spawnSync(config.executable, ["--version"], {
    encoding: "utf8",
  }).stdout.trim();
  const stdoutFile = path.join(runDir, "stdout.jsonl");
  const stderrFile = path.join(runDir, "stderr.log");
  const out = fs.openSync(stdoutFile, "w"),
    err = fs.openSync(stderrFile, "w");
  const start = Date.now();
  const child = spawn(config.executable, argv, {
    cwd,
    detached: process.platform !== "win32",
    stdio: ["ignore", out, err],
    env: { ...process.env, NO_COLOR: "1" },
  });
  let timedOut = false;
  const terminate = (signal) => {
    try {
      if (process.platform === "win32") child.kill(signal);
      else process.kill(-child.pid, signal);
    } catch (error) {
      if (error.code !== "ESRCH") throw error;
    }
  };
  let hardStop;
  const timer = setTimeout(() => {
    timedOut = true;
    terminate("SIGTERM");
    hardStop = setTimeout(() => terminate("SIGKILL"), 5000);
  }, 240000);
  const exitCode = await new Promise((resolve, reject) => {
    child.on("error", reject);
    child.on("exit", (code) => resolve(code));
  });
  clearTimeout(timer);
  clearTimeout(hardStop);
  terminate("SIGTERM");
  fs.closeSync(out);
  fs.closeSync(err);
  const raw = fs.readFileSync(stdoutFile, "utf8");
  const events = raw.split("\n").flatMap((line) => {
    try {
      return [JSON.parse(line)];
    } catch {
      return [];
    }
  });
  const result = events.findLast((event) => event.type === "result");
  const messages = events.flatMap((event) => {
    if (event.type === "item.completed" && event.item?.type === "agent_message")
      return [event.item.text];
    if (event.type === "assistant")
      return (event.message?.content ?? [])
        .filter((block) => block.type === "text")
        .map((block) => block.text);
    return [];
  });
  const final = result?.result ?? messages.at(-1) ?? "";
  const after = hashes(cwd);
  const changed = [
    ...new Set([...Object.keys(before), ...Object.keys(after)]),
  ].filter((file) => before[file] !== after[file]);
  const fixtureChanges = changed.filter(
    (file) => !file.startsWith(".cursor/") && !file.startsWith(".claude/"),
  );
  const loaded = [
    ...new Set(
      raw.match(
        /(?:\.agents|\.claude|\.cursor)\/skills\/[a-z0-9-]+\/(?:SKILL\.md|references\/[^\s"\\]+\.md)/g,
      ) ?? [],
    ),
  ].sort();
  const usage =
    result?.usage ??
    events.findLast((event) => event.type === "turn.completed")?.usage ??
    null;
  const models = [
    ...new Set([
      ...Object.keys(result?.modelUsage ?? {}),
      ...events
        .filter(
          (event) =>
            event.type === "system" && event.subtype === "init" && event.model,
        )
        .map((event) => event.model),
      ...events
        .filter((event) => event.type === "assistant" && event.message?.model)
        .map((event) => event.message.model),
    ]),
  ];
  const record = {
    id,
    host,
    arm,
    case: item.id,
    version,
    requestedModel: config.model,
    effort: config.effort,
    reportedModels: models,
    seconds: (Date.now() - start) / 1000,
    exitCode,
    timedOut,
    usage,
    costEstimateUSD: result?.total_cost_usd ?? null,
    final: normalize(final, cwd),
    referencedSkillPaths: loaded,
    changedFiles: fixtureChanges,
    unexpectedChanges: fixtureChanges.filter(
      (file) => !(item.allowed ?? []).includes(file),
    ),
    libraryHashes: Object.fromEntries(
      Object.entries(before).filter(([file]) =>
        file.startsWith(".agents/skills/"),
      ),
    ),
    stderr: normalize(fs.readFileSync(stderrFile, "utf8"), cwd).slice(-3000),
  };
  fs.writeFileSync(
    path.join(runDir, "result.json"),
    JSON.stringify(record, null, 2) + "\n",
  );
  console.log(
    `done ${id}: exit=${exitCode} ${record.seconds}s changes=${fixtureChanges.join(",") || "none"}`,
  );
}

const selected = [{ id: "routing", allowed: [] }, ...cases].filter(
  (item) => selectedCase === "all" || item.id === selectedCase,
);
const hosts = Object.keys(configs).filter(
  (host) => selectedHost === "all" || host === selectedHost,
);
// One active trial per host; independent fixtures prevent cross-run edits.
await Promise.all(
  hosts.map(async (host) => {
    for (const item of selected) {
      for (const arm of selectedArm === "both"
        ? ["baseline", "revised"]
        : [selectedArm])
        await run(host, arm, item);
    }
  }),
);
