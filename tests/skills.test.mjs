import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import {
  discoverSkills,
  parseFrontmatter,
  validateOpenAiMetadata,
  validateSkillContent,
  validateSkills,
} from "../tools/lib/skills.mjs";

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
      "design-md",
      "design-pages",
      "design-reference-scout",
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
      "write-reproducible-demo",
    ],
  );
  assert.deepEqual(validateSkills(root), []);
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
});
