---
name: frame-product-build
description: "Define audience, problem, core flows, success, and platform decisions when a product brief is unresolved. Use before design or implementation, not for already-scoped fixes."
license: MIT
metadata:
  owner: jonathan-arteaga
  kind: original
  source: local
---

# Frame a product build

Produce a concise brief a designer and an engineer can start from. For a framing-only request, stop at the brief. If the user also requested design or implementation, complete the framing stage and continue through the appropriate workflow without requiring another approval for that already-authorized work.

If the goal is to test whether an idea works rather than ship a product, use `frame-concept-build` instead.

## Workflow

1. Name the audience and the job they are trying to finish. One sentence each.
2. State the problem in one sentence. List non-goals explicitly.
3. Define success: what "done" looks like for the first release, and what will not be measured yet.
4. List the core objects — the 3–6 nouns the product is about. Skip schema detail.
5. Pick the 3–7 screens or flows that are the product. Everything else is later.
6. Read the platform reference that matches the build and record its one-way doors:
   - Web: [references/web.md](references/web.md)
   - Expo, React Native, or native iOS: [references/mobile.md](references/mobile.md)
   - macOS or multi-window desktop: [references/apple-desktop.md](references/apple-desktop.md)
   Multi-platform builds get one section per platform.
7. Split open questions into "must answer before code" and "can wait." Ask only about the first group when a wrong guess would change the build; group related questions when that reduces back-and-forth.
8. Name the next skill: `design-reference-scout` or `design-pages` for direction; `web-react`, `apple-swiftui`, or `mobile-screens` for implementation.

## Rules

- Prefer a recommendation with a stated assumption over a question.
- Non-goals and one-way doors are the parts people skip. Do not leave them empty.
- Keep the brief to one page. Detail belongs in the build, not here.

Return: audience and job, problem, non-goals, success, core objects, key flows, one-way doors per platform, open questions (before code / can wait), and the next skill.

## Example

For a small bookshop intake tool: staff record a book’s ISBN, condition, and price at the counter. The first release excludes online sales and multi-store sync. Success is an observed intake task completed within the agreed time. Confirm printer compatibility before committing to label printing. Record storage, device, and offline requirements from the actual shop’s constraints; platform examples are not automatic architecture decisions.
