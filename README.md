# arteagas-ai-skills

Jonathan's personal skill library. Owned names, attributed sources, little overlap. Other people can inspect the workflows and adapt them. The same names travel between machines and tools.

A skill is a named folder of instructions. Ask for that job and the agent loads the folder. The copies in this repository are the source. Generate local installs from here; do not edit an installed copy as a second source.

Some workflows are Jonathan's. Attributed forks keep credit in [`origins/`](origins/) and in each skill's `LICENSE`.

## What you can ask for

Ask the agent by the skill name in the first column.

### Design a page or a look

| Skill | What it does |
| --- | --- |
| [`design-pages`](.agents/skills/design-pages/SKILL.md) | Design, audit, or redesign a web page without the usual AI-layout look. |
| [`design-with-taste`](.agents/skills/design-with-taste/SKILL.md) | Keep two products from sharing one interchangeable look. |
| [`design-reference-scout`](.agents/skills/design-reference-scout/SKILL.md) | Find a few current visual references before anyone picks a direction. |
| [`design-md`](.agents/skills/design-md/SKILL.md) | Write down an interface's design language in a `DESIGN.md`. |
| [`ui-craft`](.agents/skills/ui-craft/SKILL.md) | Tighten radii, alignment, surfaces, icons, and motion on a screen that already exists. |

### Check an interface

| Skill | What it does |
| --- | --- |
| [`ux-review`](.agents/skills/ux-review/SKILL.md) | Check a web interface for accessibility, focus, forms, and interaction quality. |
| [`ux-heuristics`](.agents/skills/ux-heuristics/SKILL.md) | Check why a flow feels confusing, slow, or heavy, using named UX psychology laws. It reads [lawsofux.com](https://lawsofux.com) at runtime and copies nothing. |

### Write like a person

| Skill | What it does |
| --- | --- |
| [`draft-in-authentic-voice`](.agents/skills/draft-in-authentic-voice/SKILL.md) | Write a first draft that sounds like you, from examples of your writing. |
| [`edit-in-authentic-voice`](.agents/skills/edit-in-authentic-voice/SKILL.md) | Edit an existing draft, or flag AI writing patterns, without flattening the voice. |

### Decide what to build

| Skill | What it does |
| --- | --- |
| [`frame-concept-build`](.agents/skills/frame-concept-build/SKILL.md) | Test one question with a small artifact before committing to a build. |
| [`frame-product-build`](.agents/skills/frame-product-build/SKILL.md) | Agree the audience, problem, flows, and one-way doors before design or code. |

### Build for Apple, web, or phone

| Skill | What it does |
| --- | --- |
| [`apple-swiftui`](.agents/skills/apple-swiftui/SKILL.md) | Build and refactor SwiftUI screens. |
| [`apple-swift`](.agents/skills/apple-swift/SKILL.md) | Write modern Swift: types, concurrency, APIs, tests. |
| [`apple-review`](.agents/skills/apple-review/SKILL.md) | Audit an existing iOS or macOS app. |
| [`web-react`](.agents/skills/web-react/SKILL.md) | Write and review React and Next.js. This is the only React/Next writing skill. |
| [`mobile-screens`](.agents/skills/mobile-screens/SKILL.md) | Build Expo and React Native screens that feel native. |

### Prove it

| Skill | What it does |
| --- | --- |
| [`validate-project-claims`](.agents/skills/validate-project-claims/SKILL.md) | Check that public project claims match evidence in the repo. |
| [`write-reproducible-demo`](.agents/skills/write-reproducible-demo/SKILL.md) | Write a short demo path another person can run without private data. |

### Animated Codex pets

| Skill | What it does |
| --- | --- |
| [`hatch-pet`](.agents/skills/hatch-pet/SKILL.md) | Create, repair, and package a Codex v2 animated pet. |

## What is not here

This library does not include Gmail, Calendar, Drive, X, Todoist, or Craft connectors. It does not include Cursor's built-in skills, employer or customer material, or a second React, page-design, or React Native skill.

If a vendor app is connected, use that vendor's own skill. This library holds the method, not the connector.

## How to use a skill

Open this repository in Cursor and ask for the job by name: `ux-review`, `design-pages`, `frame-product-build`. The agent loads the matching folder under `.agents/skills/`.

The same names work in Codex and other tools after a developer installs the folders.

## For developers

Canonical copy: `.agents/skills/`. Preview a sync before writing anywhere else:

```bash
node tools/sync-skills.mjs --dry-run --target cursor
node tools/sync-skills.mjs --dry-run --target codex
```

`--apply` skips an existing destination unless `--force` is set. `--force` replaces a folder and will clobber a symlink.

Preferred Cursor install is an explicit symlink, so there is one copy:

```bash
ln -sfn "$PWD/.agents/skills/web-react" ~/.cursor/skills/web-react
```

Do not put library skills in `~/.cursor/skills-cursor/`. That directory is Cursor-managed.

Repository tools need Node 24+. `pnpm` is only for tests and verification:

```bash
pnpm install
pnpm check
```

Install one skill after reviewing the dry run:

```bash
node tools/sync-skills.mjs --apply --target codex --skill apple-swift
```

Other targets are in [`docs/tool-compatibility.md`](docs/tool-compatibility.md).

To add a skill, start from `templates/skill/`, match the folder to the frontmatter `name`, add `origins/<name>.md` for a fork or copy, then run `pnpm check`. Full rules are in [`AGENTS.md`](AGENTS.md).

Do not add employer or customer material, credentials, private operational data, or vendor connectors.

Original work is [MIT](LICENSE). Forks keep a stacked copyright notice (Jonathan Arteaga plus the upstream author) in the skill `LICENSE`; see [`origins/`](origins/). `hatch-pet` is Apache 2.0.

The repository absorbed generic material from a former private archive on July 27, 2026. Its unrelated Git history was not merged here.
