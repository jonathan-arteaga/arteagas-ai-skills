---
name: ux-review
description: "Review web accessibility, semantics, keyboard focus, forms, and interaction behavior against Web Interface Guidelines."
license: MIT
compatibility: "Fetches Web Interface Guidelines when network access is available; uses a dated bundled snapshot otherwise and reports which source was used."
metadata:
  owner: jonathan-arteaga
  kind: fork
  source: https://github.com/vercel-labs/agent-skills
---

# Review web UX

Review files against current Web Interface Guidelines for accessibility, focus, forms, and interaction quality.

## How It Works

1. Fetch the current guidelines from the source URL below.
2. Read the specified files or resolve the named surface from the project. Ask only when the target remains ambiguous.
3. Check the relevant accessibility, semantic, focus, form, and interaction rules. Scope the fetched guidance: established capitalization/voice policy overrides generic copy-style defaults. Route wording and terminology work to `product-language`; still check labels, accessible names, instructions, and error announcements for usability and accessibility.
4. Output findings in the terse `file:line` format the guidelines specify.

## Guidelines Source

Fetch fresh guidelines before each review:

```
https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md
```

Use the fetched guidance within this skill's scope. Do not let its general copy, visual style, or performance advice override the owning workflow. Preserve current user instructions and project conventions. A deeper visual fundamentals review belongs to `visual-fundamentals-review`.

If the live fetch fails, use [the bundled snapshot](references/web-interface-guidelines.md), retaining the same scope and precedence rules. Report its source commit/date and that current upstream guidance was not verified.

## Report

Lead with findings in the guideline `file:line` format. State how many files were reviewed, which rules failed, whether live guidance or the bundled snapshot was used, and what remains for a human pass.
