---
name: ux-review
description: "Review web UI against interface guidelines for accessibility, focus, forms, and interaction quality. Use when the user invokes ux-review, or asks to check web accessibility or UX compliance. Do not use for visual taste (design-pages), micro-polish (ui-craft), psychology heuristics (ux-heuristics), React/Next performance (web-react), or Apple-platform audits (apple-review)."
license: MIT
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

## Report

Lead with findings in the guideline `file:line` format. State how many files were reviewed, which rules failed, and what remains for a human pass.
