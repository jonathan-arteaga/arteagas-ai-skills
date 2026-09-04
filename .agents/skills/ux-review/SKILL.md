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
2. Read the specified files. If none were specified, ask the user which files to review.
3. Check them against every rule in the fetched guidelines.
4. Output findings in the terse `file:line` format the guidelines specify.

## Guidelines Source

Fetch fresh guidelines before each review:

```
https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md
```

The fetched content contains all the rules and output format instructions.

## Report

Lead with findings in the guideline `file:line` format. State how many files were reviewed, which rules failed, and what remains for a human pass.
