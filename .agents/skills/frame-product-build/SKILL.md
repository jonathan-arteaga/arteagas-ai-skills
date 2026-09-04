---
name: frame-product-build
description: "Agree what a product is before anyone designs or implements it — audience, problem, non-goals, success, core objects, key flows, and the one-way doors for its platform. Use when the user invokes frame-product-build, or is about to start a web, mobile, or desktop build and the product is not yet pinned down. Do not use to bound an experiment that tests one question (frame-concept-build), for visual direction (design-reference-scout, design-pages, design-with-taste), or for implementation (web-react, apple-swiftui, mobile-screens)."
license: MIT
metadata:
  owner: jonathan-arteaga
  kind: original
  source: local
---

# Frame a product build

Produce a one-page brief a designer and an engineer could both start from. Then stop. Do not design or write code.

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
7. Split open questions into "must answer before code" and "can wait." Ask only the first group, one at a time, and only when a wrong guess would change the build.
8. Name the next skill: `design-reference-scout` or `design-pages` for direction; `web-react`, `apple-swiftui`, or `mobile-screens` for implementation.

## Rules

- Prefer a recommendation with a stated assumption over a question.
- Non-goals and one-way doors are the parts people skip. Do not leave them empty.
- Keep the brief to one page. Detail belongs in the build, not here.

Return: audience and job, problem, non-goals, success, core objects, key flows, one-way doors per platform, open questions (before code / can wait), and the next skill.
