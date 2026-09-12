---
name: write-readme
description: "Create or substantially update a repository README using an evidence-backed funnel from introduction to quick start and license. Preserve the requested scope for small edits."
license: MIT
metadata:
  owner: jonathan-arteaga
  kind: original
  source: local
---

# Write a README

Write or update `README.md` so a stranger can tell what the project is, try it, and leave with a license. Follow the cognitive funnel: broad first, license last.

For a small correction or a requested section edit, change that scope in place. Do not restructure the whole README, add a logo task, or audit unrelated project claims. The funnel below applies to creation and substantial updates.

## Choose the mode

- **Create** when there is no `README.md`. Fill [references/template.md](references/template.md) from repository evidence.
- **Update** when `README.md` exists. Run [references/audit-checklist.md](references/audit-checklist.md), keep accurate prose and voice, then restructure into the funnel.

Read the relevant part of [references/section-guide.md](references/section-guide.md) when authoring or restructuring sections.

## Workflow

1. Inspect the repository: manifests (`package.json`, `Cargo.toml`, `pyproject.toml`, `go.mod`), `LICENSE`, CI workflows, scripts, docs, assets, existing README, `CONTRIBUTING.md`, and the git remote.
2. Choose create or update.
3. Collect only facts the files support. Do not invent commands, handles, badges, or features.
4. Assemble sections in funnel order. Skip optional sections that lack evidence.
5. Verify: install and start commands match real scripts, heading anchors resolve, badge targets exist, and no bracket placeholders remain.
6. Report what changed, what evidence was used, and what the user still needs to supply.

## Rules

- Required: title, tagline, quick start, license.
- Optional only with evidence: logo, badges, nav, demo, features, contributing, related, footer.
- No "Coming soon" or empty stub sections.
- Logo: use an existing repo asset. If none exists, use a centered text title and list a logo as a follow-up. Never generate a raster placeholder logo.
- Badges: at most five per row, same height per row, health then community or license. Omit any badge whose target is missing.
- Nav: add a centered anchor row when there are four or more `##` sections. Slug anchors the way GitHub does.
- Quick start: name prerequisites, then three to five copy-paste commands taken from real scripts. Never invent commands.
- Footer identity links: take handles from the existing README, `package.json` author, or repo metadata. Never invent them.
- Every reader-facing claim needs repository evidence. If a material claim is shaky, verify it with `validate-project-claims` when available, or qualify/omit it while completing independent edits.
- Update mode rewrites structure, not personality. Keep accurate content. Move long detail to `docs/` instead of deleting it.
- A runnable proof path is `write-reproducible-demo`, not this skill.

## Report

Lead with the path written and the mode used. Then list:

- sections added, reordered, or removed
- evidence used for title, commands, badges, and license
- gaps the user still needs to supply
