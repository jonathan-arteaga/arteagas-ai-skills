import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import {
  discoverSkills,
  lintReferenceFiles,
  lintSkillContent,
  parseFrontmatter,
  validateOpenAiMetadata,
  validateSkillContent,
  validateSkillLinks,
  validateSkills,
  validationErrors,
} from "../tools/lib/skills.mjs";

function fixture(name, description = "Use when a synthetic fixture is needed.", extra = "") {
  return `---
name: ${name}
description: ${description}
${extra}---

# ${name}

Follow the steps.
`;
}

test("frontmatter parser keeps the portable fields", () => {
  const parsed = parseFrontmatter(`---
name: sample-skill
description: Use when a generic sample is needed.
---

# Sample

Follow the steps.
`);

  assert.equal(parsed.error, null);
  assert.equal(parsed.data?.name, "sample-skill");
  assert.match(parsed.body, /Follow the steps/);
});

test("validator catches name drift and draft markers", () => {
  const issues = validateSkillContent(
    `---
name: wrong-name
description: Example.
---

TODO: write this.
`,
    "expected-name",
  );

  assert.deepEqual(issues, [
    'name "wrong-name" must match folder "expected-name"',
    "contains draft marker: TODO",
  ]);
});

test("OpenAI metadata requires an exact skill invocation", () => {
  assert.deepEqual(
    validateOpenAiMetadata(
      `interface:
  display_name: "Sample Skill"
  short_description: "Run the sample workflow reliably"
  default_prompt: "Use this skill for the task."
`,
      "sample-skill",
    ),
    ["interface.default_prompt must include $sample-skill"],
  );
});

test("repository skills are discoverable and valid", () => {
  const root = path.resolve(".agents", "skills");
  const skills = discoverSkills(root);

  assert.deepEqual(
    skills.map((skill) => skill.name),
    [
      "apple-review",
      "apple-swift",
      "apple-swiftui",
      "connector-doctor",
      "design-md",
      "design-pages",
      "design-reference-scout",
      "design-style-synthesis",
      "design-with-taste",
      "draft-in-authentic-voice",
      "edit-in-authentic-voice",
      "frame-concept-build",
      "frame-product-build",
      "hatch-pet",
      "mobile-screens",
      "ui-craft",
      "ux-heuristics",
      "ux-review",
      "validate-project-claims",
      "web-react",
      "work-pattern-audit",
      "write-readme",
      "write-reproducible-demo",
    ],
  );
  assert.deepEqual(validationErrors(root), []);

  const warnedSkills = new Set(
    validateSkills(root)
      .filter((issue) => issue.severity === "warning")
      .map((issue) => issue.skill),
  );
  assert.ok(
    [...warnedSkills].every((name) => name === "hatch-pet"),
    `portability warnings outside hatch-pet: ${[...warnedSkills].join(", ")}`,
  );
});

test("validator enforces the spec limits on frontmatter", () => {
  assert.deepEqual(validateSkillContent(fixture("claude-helper"), "claude-helper"), [
    'name must not contain the reserved word "claude"',
  ]);
  assert.deepEqual(
    validateSkillContent(fixture("tagged", "Use <b>this</b> skill."), "tagged"),
    ["description must not contain XML tags"],
  );
  assert.deepEqual(
    validateSkillContent(
      fixture("needy", undefined, `compatibility: "${"x".repeat(501)}"\n`),
      "needy",
    ),
    ["compatibility must be 500 characters or fewer"],
  );
  assert.deepEqual(
    validateSkillContent(fixture("fine", undefined, 'compatibility: "Needs network access."\n'), "fine"),
    [],
  );
});

test("validator resolves relative links inside the skill folder", (context) => {
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "skill-links-"));
  context.after(() => fs.rmSync(tempRoot, { recursive: true, force: true }));
  fs.mkdirSync(path.join(tempRoot, "references"));
  fs.writeFileSync(path.join(tempRoot, "references", "present.md"), "# Present\n");

  const content = [
    "See [present](references/present.md), [missing](references/missing.md),",
    "[anchor](references/present.md#top), [web](https://example.com/x.md),",
    "and the placeholder `references/<name>.md` pattern [p](references/<name>.md).",
  ].join("\n");

  assert.deepEqual(validateSkillLinks(content, tempRoot), [
    "broken relative link: references/missing.md",
  ]);
});

test("linter warns on long bodies, host-specific tokens, and positional dollars", () => {
  const longBody = fixture("long") + "line\n".repeat(600);
  assert.match(lintSkillContent(longBody)[0], /^SKILL.md body is 60\d lines/);

  const hostBound = fixture("bound") + [
    'SKILL_DIR="${CODEX_HOME:-$HOME/.codex}/skills/bound"',
    "Use $imagegen for art. Review $ARGUMENTS.",
    "Price it at $4.99, or escaped \\$4.99.",
    "!`git status`",
  ].join("\n");
  const warnings = lintSkillContent(hostBound);
  assert.ok(warnings.some((w) => w.includes("CODEX_HOME at line")), warnings.join("; "));
  assert.ok(warnings.some((w) => w.includes("$imagegen at line")));
  assert.ok(warnings.some((w) => w.includes("$ARGUMENTS at line")));
  assert.ok(warnings.some((w) => w.includes("inline shell injection")));
  assert.ok(warnings.some((w) => w.includes('"$<digit>" at line')));
  assert.deepEqual(lintSkillContent(fixture("clean") + "Escaped \\$4.99 only.\n"), []);
});

test("linter asks long reference files for a contents list", (context) => {
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "skill-refs-"));
  context.after(() => fs.rmSync(tempRoot, { recursive: true, force: true }));
  const refs = path.join(tempRoot, "references", "nested");
  fs.mkdirSync(refs, { recursive: true });
  const sections = "## One\n\n## Two\n\n### Three\n\n";
  fs.writeFileSync(path.join(refs, "no-toc.md"), "# Title\n\n" + sections + "text\n".repeat(120));
  fs.writeFileSync(
    path.join(refs, "with-toc.md"),
    "# Title\n\n## Contents\n\n- One\n\n" + sections + "text\n".repeat(120),
  );
  fs.writeFileSync(
    path.join(refs, "single-section.md"),
    "# Title\n\n## Only\n\n" + "text\n".repeat(120),
  );
  fs.writeFileSync(path.join(tempRoot, "references", "short.md"), "# Short\n");

  assert.deepEqual(lintReferenceFiles(tempRoot), [
    'references/nested/no-toc.md is 128 lines without a "## Contents" list',
  ]);
});

test("repository skills follow the house frame", () => {
  const root = path.resolve(".agents", "skills");
  const skills = discoverSkills(root);

  for (const skill of skills) {
    const content = fs.readFileSync(skill.file, "utf8");
    const parsed = parseFrontmatter(content);
    assert.equal(parsed.error, null, skill.name);
    assert.ok(parsed.data?.license, `${skill.name} missing license`);
    assert.match(
      content,
      /owner:\s*jonathan-arteaga/,
      `${skill.name} missing metadata.owner`,
    );
    assert.match(content, /kind:\s*(original|fork)/, `${skill.name} missing kind`);

    const names = fs.readdirSync(skill.directory);
    assert.ok(
      !names.includes("AGENTS.md"),
      `${skill.name} must not contain AGENTS.md`,
    );
    const rootMarkdown = names.filter((name) => name.endsWith(".md"));
    assert.deepEqual(
      rootMarkdown,
      ["SKILL.md"],
      `${skill.name} has stray root markdown: ${rootMarkdown.join(", ")}`,
    );
  }
});

test("validator reports an invalid synthetic fixture", (context) => {
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "skill-test-"));
  context.after(() => fs.rmSync(tempRoot, { recursive: true, force: true }));
  const skillRoot = path.join(tempRoot, "broken-skill");
  fs.mkdirSync(skillRoot, { recursive: true });
  fs.writeFileSync(
    path.join(skillRoot, "SKILL.md"),
    "# Missing frontmatter\n",
    "utf8",
  );

  const issues = validateSkills(tempRoot);
  assert.equal(issues.length, 1);
  assert.equal(issues[0]?.message, "missing YAML frontmatter");
  assert.equal(issues[0]?.severity, "error");
});
