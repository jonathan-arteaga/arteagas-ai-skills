#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const argv = process.argv.slice(2);
const roots = argv.flatMap((arg, i) =>
  arg === "--input" ? [path.resolve(argv[i + 1])] : [],
);
const outIndex = argv.indexOf("--output");
if (!roots.length || outIndex < 0)
  throw new Error(
    "Usage: node tools/summarize-skill-trials.mjs --input <runs> [--input <more-runs>] --output <json>",
  );
const cases = JSON.parse(
  fs.readFileSync(
    path.join(repo, "docs/evaluations/flagship-skills/cases.json"),
    "utf8",
  ),
);
const routing = JSON.parse(
  fs.readFileSync(
    path.join(repo, "docs/evaluations/flagship-skills/routing.json"),
    "utf8",
  ),
);
const expectedSkill = {
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
const results = [];

for (const root of roots) {
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    const dir = path.join(root, entry.name);
    if (!entry.isDirectory() || !fs.existsSync(path.join(dir, "result.json")))
      continue;
    const record = JSON.parse(
      fs.readFileSync(path.join(dir, "result.json"), "utf8"),
    );
    const cwd = path.join(dir, "workspace");
    const events = fs
      .readFileSync(path.join(dir, "stdout.jsonl"), "utf8")
      .split("\n")
      .flatMap((line) => {
        try {
          return [JSON.parse(line)];
        } catch {
          return [];
        }
      });
    const observed = new Set();
    const commands = [];
    const models = new Set(record.reportedModels ?? []);
    let toolCalls = 0;
    function inspectInput(input) {
      const values = [input?.file_path, input?.path, input?.command].filter(
        (value) => typeof value === "string",
      );
      for (const value of values) {
        for (const match of value.matchAll(
          /(?:\.agents|\.claude|\.cursor)\/skills\/[a-z0-9-]+\/(?:SKILL\.md|references\/[^\s"'`;)]+\.md)/g,
        ))
          observed.add(match[0].replace(/^\.(claude|cursor)\//, ".agents/"));
      }
    }
    for (const event of events) {
      if (event.type === "system" && event.subtype === "init" && event.model)
        models.add(event.model);
      if (event.type === "assistant" && event.message?.model)
        models.add(event.message.model);
      if (
        event.type === "item.completed" &&
        event.item?.type === "command_execution"
      ) {
        toolCalls += 1;
        inspectInput(event.item);
        commands.push(event.item.command);
      }
      if (event.type === "assistant") {
        for (const block of event.message?.content ?? []) {
          if (block.type !== "tool_use") continue;
          toolCalls += 1;
          if (["Read", "Bash", "Grep"].includes(block.name))
            inspectInput(block.input);
        }
      }
      if (event.type === "tool_call" && event.subtype === "started") {
        toolCalls += 1;
        for (const [key, call] of Object.entries(event.tool_call ?? {})) {
          if (["readToolCall", "shellToolCall"].includes(key))
            inspectInput(call.args);
        }
      }
    }
    const item = cases.find((value) => value.id === record.case);
    const artifacts = {};
    for (const file of item?.allowed ?? []) {
      const p = path.join(cwd, file);
      if (fs.existsSync(p)) artifacts[file] = fs.readFileSync(p, "utf8");
    }
    const assignedSkillRead =
      record.case === "routing"
        ? null
        : observed.has(`.agents/skills/${expectedSkill[record.case]}/SKILL.md`);
    const checks = {};
    if (record.case === "routing") {
      const requested = JSON.parse(
        fs.readFileSync(path.join(cwd, "requests.json"), "utf8"),
      );
      let answers;
      try {
        answers = JSON.parse(
          record.final.slice(
            record.final.indexOf("["),
            record.final.lastIndexOf("]") + 1,
          ),
        );
      } catch {
        answers = [];
      }
      const map = new Map(answers.map((answer) => [answer.id, answer.skill]));
      const failures = [];
      for (let i = 0; i < requested.length; i += 1) {
        const expected = routing[i],
          actual = map.get(`q${i + 1}`);
        if (
          actual === undefined ||
          (expected.polarity === "positive"
            ? actual !== expected.skill
            : actual === expected.skill)
        )
          failures.push({ request: expected.id, actual: actual ?? null });
      }
      checks.routing = {
        passed: requested.length - failures.length,
        total: requested.length,
        failures,
      };
    }
    if (record.case === "component")
      checks.onlyRadiusChanged =
        artifacts["card.css"] === item.files["card.css"].replace("6px", "8px");
    if (record.case === "bilingual-copy") {
      try {
        const strings = JSON.parse(artifacts["strings.json"]);
        checks.optionalBothLanguages =
          /optional/i.test(strings.en.title) &&
          /opcional/i.test(strings.es.title);
        checks.approvedTermPreserved = strings.es.action === "Avisarme";
      } catch {
        checks.validJSON = false;
      }
    }
    if (record.case === "think-execute")
      checks.exactRequestedEdit =
        artifacts["offer.md"] ===
        item.files["offer.md"].replace(
          "Business technology consultation",
          "Make your business tools work together",
        );
    if (record.case === "combined-build")
      checks.htmlCreated = Boolean(artifacts["index.html"]);
    if (record.case === "offline-design")
      checks.documentCreated = Boolean(artifacts["DESIGN.md"]);
    const validForComparison =
      record.exitCode === 0 &&
      !record.timedOut &&
      (record.case === "routing" || assignedSkillRead);
    const observedReadFileBytes = [...observed].reduce((sum, file) => {
      const p = path.join(cwd, file);
      return sum + (fs.existsSync(p) ? fs.statSync(p).size : 0);
    }, 0);
    results.push({
      id: record.id,
      suite: path.basename(root),
      key: `${path.basename(root)}/${record.id}`,
      host: record.host,
      arm: record.arm,
      case: record.case,
      requestedModel: record.requestedModel,
      reportedModels: [...models],
      version: record.version,
      effort: record.effort,
      exitCode: record.exitCode,
      timedOut: record.timedOut,
      seconds: record.seconds,
      usage: record.usage,
      costEstimateUSD: record.costEstimateUSD,
      validForComparison,
      assignedSkillRead,
      observedSkillReadPaths: [...observed].sort(),
      observedReadFileBytes,
      toolCalls,
      libraryDigest: crypto
        .createHash("sha256")
        .update(JSON.stringify(record.libraryHashes))
        .digest("hex"),
      promptDigest: crypto
        .createHash("sha256")
        .update(fs.readFileSync(path.join(dir, "prompt.txt")))
        .digest("hex"),
      changedFiles: record.changedFiles,
      unexpectedChanges: record.changedFiles.filter(
        (file) => !(item?.allowed ?? []).includes(file),
      ),
      checks,
      final: record.final,
      artifacts,
    });
  }
}
results.sort((a, b) => a.id.localeCompare(b.id));
const output = path.resolve(argv[outIndex + 1]);
fs.writeFileSync(
  output,
  JSON.stringify(
    {
      methodology:
        "Observed read paths come from tool-call inputs, not mentions in replies. File-byte totals count the full files named in those calls, not actual model-input tokens or partial-read payloads. Semantic rubric review is separate from mechanical checks.",
      results,
    },
    null,
    2,
  ) + "\n",
);
console.log(
  `Summarized ${results.length} runs; ${results.filter((result) => result.validForComparison).length} completed with required skill-read evidence.`,
);
