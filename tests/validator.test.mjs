import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";
import {
  parseFrontmatter,
  validateSkillContent,
  validateSkillLinks,
  validateOpenAiMetadata,
  lintSkillContent,
  lintReferenceFiles,
  validateSkills,
  validationErrors,
} from "../tools/lib/skills.mjs";

const skill = (fields = "", body = "Do the requested work.") =>
  `---\nname: sample\ndescription: A focused example workflow.\n${fields}---\n\n${body}\n`;

function directory(context) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "skill-validation-"));
  context.after(() => fs.rmSync(root, { recursive: true, force: true }));
  return root;
}

test("YAML parsing supports folded scalars and rejects malformed/duplicate fields", () => {
  const folded =
    "---\nname: sample\ndescription: >-\n  First line\n  second line.\nmetadata:\n  owner: me\n---\n\nWork.\n";
  assert.equal(
    parseFrontmatter(folded).data.description,
    "First line second line.",
  );
  assert.deepEqual(validateSkillContent(folded, "sample"), []);
  assert.match(
    parseFrontmatter(skill("name: duplicate\n")).error,
    /invalid YAML/,
  );
  assert.match(
    parseFrontmatter('---\nname: "unfinished\n---\nWork.').error,
    /invalid YAML/,
  );
  assert.match(
    parseFrontmatter("---\n- name\n- description\n---\nWork.").error,
    /mapping/,
  );
});

test("frontmatter checks parsed types and actual multiline lengths", () => {
  for (const value of ["123", "false", "null", "[one, two]"]) {
    assert.ok(
      validateSkillContent(
        skill().replace("A focused example workflow.", value),
        "sample",
      ).includes("description must be a string"),
    );
  }
  const long = skill().replace(
    "description: A focused example workflow.",
    `description: >-\n  ${"x".repeat(1025)}`,
  );
  assert.ok(
    validateSkillContent(long, "sample").includes(
      "description must be 1024 characters or fewer",
    ),
  );
  assert.ok(
    validateSkillContent(skill('compatibility: ""\n'), "sample").includes(
      "compatibility must be non-empty when present",
    ),
  );
  assert.ok(
    validateSkillContent(
      skill(`compatibility: >-\n  ${"x".repeat(501)}\n`),
      "sample",
    ).includes("compatibility must be 500 characters or fewer"),
  );
  assert.ok(
    validateSkillContent(
      skill("metadata:\n  revision: 12\n"),
      "sample",
    ).includes("metadata must map string keys to string values"),
  );
  assert.ok(
    validateSkillContent(skill("context: fork\n"), "sample").includes(
      "non-portable frontmatter field: context",
    ),
  );
});

test("Claude restrictions are labeled separately from portable format", () => {
  assert.match(
    validateSkillContent(
      skill().replace("name: sample", "name: claude-helper"),
      "claude-helper",
    )[0],
    /^Claude compatibility:/,
  );
  assert.match(
    validateSkillContent(
      skill().replace("A focused example workflow.", "Use <b>bold</b>."),
      "sample",
    )[0],
    /^Claude compatibility:/,
  );
});

test("link parsing distinguishes prose, reference links, images, and code examples", (context) => {
  const root = directory(context);
  fs.writeFileSync(path.join(root, "present (one).md"), "# Present\n");
  const content = [
    "[good](<present (one).md>) [encoded](present%20%28one%29.md#section)",
    "[missing][ref] ![image](absent.png)",
    "",
    "[ref]: absent.md",
    "",
    "[web](https://example.com/x) [protocol](//example.com/x) [email](mailto:a@example.com)",
    "`[example](generated.md)`",
    "```markdown",
    "[example](generated.md)",
    "```",
    "~~~markdown",
    "[example](generated-2.md)",
    "~~~",
    "[placeholder](references/<name>.md)",
  ].join("\n");
  assert.deepEqual(validateSkillLinks(content, root).sort(), [
    "broken relative link: absent.md",
    "broken relative link: absent.png",
  ]);
});

test("package boundaries reject sibling prefixes, traversal, and escaping symlinks", (context) => {
  const root = directory(context);
  const inside = path.join(root, "sample");
  const sibling = path.join(root, "sample-extra");
  fs.mkdirSync(inside);
  fs.mkdirSync(sibling);
  fs.writeFileSync(path.join(sibling, "outside.md"), "Outside\n");
  fs.symlinkSync(
    path.join(sibling, "outside.md"),
    path.join(inside, "linked.md"),
  );
  assert.match(
    validateSkillLinks("[escape](../sample-extra/outside.md)", inside)[0],
    /escapes the skill folder/,
  );
  assert.match(
    validateSkillLinks("[escape](%2e%2e/sample-extra/outside.md)", inside)[0],
    /escapes the skill folder/,
  );
  assert.match(
    validateSkillLinks("[escape](linked.md)", inside)[0],
    /through a symlink/,
  );
  fs.mkdirSync(path.join(inside, "references"));
  fs.writeFileSync(path.join(inside, "SKILL.md"), "# Sample\n");
  assert.deepEqual(
    validateSkillLinks(
      "[root](../SKILL.md)",
      path.join(inside, "references"),
      inside,
    ),
    [],
  );
});

test("validation traverses nested references using each referring directory", (context) => {
  const root = directory(context);
  const folder = path.join(root, "sample");
  fs.mkdirSync(path.join(folder, "references", "nested"), { recursive: true });
  fs.writeFileSync(
    path.join(folder, "SKILL.md"),
    skill("", "Read [guide](references/guide.md)."),
  );
  fs.writeFileSync(
    path.join(folder, "references", "guide.md"),
    "Read [detail](nested/detail.md).\n",
  );
  fs.writeFileSync(
    path.join(folder, "references", "nested", "detail.md"),
    "Read [missing](missing.md).\n",
  );
  const issues = validationErrors(root);
  assert.equal(issues.length, 1);
  assert.equal(issues[0].category, "packaging");
  assert.match(issues[0].file, /nested\/detail.md$/);
});

test("host exceptions do not hide new warnings or excessive body size", () => {
  const pet = skill(
    "compatibility: Codex-only runtime\n",
    "$imagegen CODEX_HOME\n",
  ).replace("name: sample", "name: hatch-pet");
  assert.deepEqual(lintSkillContent(pet), []);
  assert.ok(
    lintSkillContent(pet + "$ARGUMENTS\n").some((issue) =>
      issue.includes("$ARGUMENTS"),
    ),
  );
  assert.ok(
    lintSkillContent(pet + "line\n".repeat(501)).some((issue) =>
      issue.includes("body is"),
    ),
  );
  assert.ok(
    lintSkillContent(pet.replace("Codex-only", "Portable")).some((issue) =>
      issue.includes("CODEX_HOME"),
    ),
  );
  assert.deepEqual(lintSkillContent(skill("", "Price: \\$4.99")), []);
  assert.ok(
    lintSkillContent(skill("", "Price: $4.99")).some((issue) =>
      issue.includes("$<digit>"),
    ),
  );
  assert.ok(
    lintSkillContent(skill("", "Price: \\\\$4.99")).some((issue) =>
      issue.includes("$<digit>"),
    ),
  );
});

test("reference navigation advice ignores headings inside output templates", (context) => {
  const root = directory(context);
  fs.mkdirSync(path.join(root, "references"));
  const file = path.join(root, "references", "example.md");
  fs.writeFileSync(
    file,
    "````markdown\n## One\n## Two\n## Three\n" +
      "line\n".repeat(110) +
      "````\n",
  );
  assert.deepEqual(lintReferenceFiles(root), []);
  fs.writeFileSync(file, "## One\n## Two\n## Three\n" + "line\n".repeat(110));
  assert.equal(lintReferenceFiles(root).length, 1);
});

test("OpenAI metadata uses real YAML and an exact invocation token", () => {
  const metadata =
    "interface:\n  display_name: Sample\n  short_description: Run a focused sample workflow\n  default_prompt: >-\n    Use $sample for this task.\n";
  assert.deepEqual(validateOpenAiMetadata(metadata, "sample"), []);
  assert.ok(
    validateOpenAiMetadata(
      metadata.replace("$sample", "$sample-extra"),
      "sample",
    ).includes("interface.default_prompt must include $sample"),
  );
});

test("CLI strict mode changes warning exit status; missing roots cannot pass", (context) => {
  const root = directory(context);
  const folder = path.join(root, "sample");
  fs.mkdirSync(folder);
  fs.writeFileSync(path.join(folder, "SKILL.md"), skill("", "$ARGUMENTS"));
  const run = (...args) =>
    spawnSync(
      process.execPath,
      ["tools/validate-skills.mjs", "--root", root, ...args],
      { encoding: "utf8" },
    );
  assert.equal(run().status, 0);
  assert.equal(run("--strict").status, 1);
  assert.equal(validateSkills(path.join(root, "missing"))[0].severity, "error");
});
