# arteagas-ai-skills

Jonathan's personal skill library. Owned names, attributed sources, little overlap.

This repository has two jobs:

1. Keep a versioned, white-labeled stack worth carrying between machines and tools.
2. Share the workflows other people can inspect and adapt.

Installable folders live under `.agents/skills/`. That path is the canonical copy for this repo's validator and sync tools. Provenance for every forked or copied skill lives in [`origins/`](origins/). Local installs should be generated from here, not edited as a second source.

## House style

Folder name, frontmatter `name`, and slash command are the same string. Stack skills use a short prefix so the command is the job. Process skills use a verb phrase.

| Prefix | Job |
| --- | --- |
| `web-` | React / Next.js writing |
| `apple-` | Swift, SwiftUI, and Apple-platform review |
| `ux-` | interface review |
| `ui-` | craft and polish |
| `design-` | design documentation, page design, and reference research |

Process skills keep a verb name when it is already a clear job (`draft-in-authentic-voice`, `edit-in-authentic-voice`, `frame-concept-build`, `frame-product-build`).

Every skill uses the same frame:

```yaml
---
name: <folder-name>
description: <Capability>. Use when the user invokes <name>, or <trigger>. Do not use for <job> (<sibling>).
license: MIT | Apache-2.0
metadata:
  owner: jonathan-arteaga
  kind: original | fork
  source: <upstream URL> | local
---
```

- H1 is a sentence-case imperative job phrase.
- The first body line is one purpose sentence in the library's voice. Credit lives in `LICENSE` and `origins/`, not in a "forked from" opener.
- Detail sits in `references/`, one level deep. Never put an `AGENTS.md` inside a skill folder — Cursor treats that filename as a repo rule.
- Skills that do not already end with a named contract get a `## Report` section.

Accepted layout exceptions: `design-pages` keeps nested `references/` subfolders; `hatch-pet` keeps `scripts/` and `tests/` for deterministic work.

## The stack

### Owned forks

| Skill | Job | Upstream |
| --- | --- | --- |
| [`web-react`](.agents/skills/web-react/SKILL.md) | Write and review React **and** Next.js. There is no second Next writing skill. | vercel-labs/agent-skills `react-best-practices` |
| [`apple-swiftui`](.agents/skills/apple-swiftui/SKILL.md) | SwiftUI view and component patterns | Dimillian/Skills `swiftui-ui-patterns` |
| [`apple-swift`](.agents/skills/apple-swift/SKILL.md) | Modern Swift language and concurrency | emilkowalski/skills `write-swift` |
| [`ux-review`](.agents/skills/ux-review/SKILL.md) | Web interface, a11y, and UX review | vercel-labs/agent-skills `web-design-guidelines` |
| [`design-md`](.agents/skills/design-md/SKILL.md) | Extract or update a `DESIGN.md` | ibelick/ui-skills `create-design-md` |
| [`ui-craft`](.agents/skills/ui-craft/SKILL.md) | Interface polish: radii, optical alignment, motion details | jakubkrehel/skills `better-ui` |
| [`design-pages`](.agents/skills/design-pages/SKILL.md) | Anti-slop page design, audit, redesign, and study | Nutlope/hallmark |
| [`edit-in-authentic-voice`](.agents/skills/edit-in-authentic-voice/SKILL.md) | Edit or detect AI writing patterns | petergyang/no-ai-slop |
| [`mobile-screens`](.agents/skills/mobile-screens/SKILL.md) | Native-feeling Expo / React Native screens | Appllama app-design method |
| [`hatch-pet`](.agents/skills/hatch-pet/SKILL.md) | Codex v2 animated pet packaging | Apache-2.0 local copy |

### Originals kept

| Skill | Why it stayed |
| --- | --- |
| [`design-with-taste`](.agents/skills/design-with-taste/SKILL.md) | Identity lens: craft constants vs product-specific variables. Not a second design-pages. |
| [`draft-in-authentic-voice`](.agents/skills/draft-in-authentic-voice/SKILL.md) | First drafts from voice samples. Editing stays in `edit-in-authentic-voice`. |
| [`frame-concept-build`](.agents/skills/frame-concept-build/SKILL.md) | Prove one question with a small artifact before committing. |
| [`frame-product-build`](.agents/skills/frame-product-build/SKILL.md) | Agree the product — audience, flows, one-way doors — before design or code. Platform checklists live in `references/`. |
| [`apple-review`](.agents/skills/apple-review/SKILL.md) | Full iOS/macOS audit. Not a second SwiftUI or Swift writing skill. |
| [`validate-project-claims`](.agents/skills/validate-project-claims/SKILL.md) | Public claims vs inspectable evidence. |
| [`write-reproducible-demo`](.agents/skills/write-reproducible-demo/SKILL.md) | One runnable demo path another person can verify. |
| [`design-reference-scout`](.agents/skills/design-reference-scout/SKILL.md) | Ground a visual direction in a few current references. Rewritten as an original. |
| [`ux-heuristics`](.agents/skills/ux-heuristics/SKILL.md) | Flow review against named UX psychology laws. Reads lawsofux.com at runtime (CC BY-NC-ND) and copies nothing. Not a second ux-review. |

## What stays vendor

Do not put these in this repository:

- MCP-tied skills: X, Gmail, Calendar, Drive, Todoist, Craft, Appllama **usage**
- Cursor-managed skills under `~/.cursor/skills-cursor/`
- `next-dev-loop` and other MCP-bound loops
- Taste clones of design-pages, a second React/Next encyclopedia, RN skills already covered by `mobile-screens`, Dimillian extras, Impeccable, Anthropic frontend-design, ui-ux-pro-max, baseline-ui

If a vendor MCP is connected, use that vendor's skill from its own install. This library holds the method, not the connector.

## Cursor

Preferred: symlink from `~/.cursor/skills/<name>` to the canonical folder here.

```bash
ln -sfn "$PWD/.agents/skills/web-react" ~/.cursor/skills/web-react
```

Repeat for every skill you want loaded. Point `~/.cursor/skills/<name>` here so there is one copy.

Do not put library skills in `~/.cursor/skills-cursor/`. That directory is Cursor-managed.

The repo sync tool can copy the same folders to Cursor, Codex, Claude, or Copilot destinations. Preview first:

```bash
node tools/sync-skills.mjs --dry-run --target cursor
```

`--apply` skips an existing destination unless `--force` is set. `--force` replaces a folder and will clobber a symlink. Prefer the explicit `ln -sfn` path for Cursor.

## Codex and other tools

Requires Node 24+ for the repository tools. `pnpm` is needed only for the test and verification commands.

```bash
pnpm install
pnpm check
node tools/sync-skills.mjs --dry-run --target codex
```

Install after reviewing the dry run:

```bash
node tools/sync-skills.mjs --apply --target codex
```

Install one skill:

```bash
node tools/sync-skills.mjs \
  --apply \
  --target codex \
  --skill apple-swift
```

See [`docs/tool-compatibility.md`](docs/tool-compatibility.md) for the other targets.

## Add or improve a skill

1. Start with `templates/skill/`.
2. Create `.agents/skills/<skill-name>/SKILL.md`.
3. Make the frontmatter `name` match the folder and put clear trigger language — including the owned name — in `description`.
4. Keep `SKILL.md` concise. Put detailed checklists in `references/`.
5. If the skill is a fork or a copy, add `origins/<skill-name>.md` with source URL, commit SHA, license, and what changed.
6. Add `agents/openai.yaml` when the skill benefits from Codex UI metadata.
7. Run `pnpm check`, review the dry-run sync, then commit only when asked.

Do not add employer or customer material, credentials, private operational data, or MCP-tied vendor skills.

## Repository shape

```text
.agents/skills/          canonical installable skills
origins/                 source, SHA, license, and delta for forks and copies
templates/skill/         starter shape for a new skill
tools/                   validation and dry-run-first synchronization
tests/                   repository tool and skill-structure checks
docs/                    compatibility and verification notes
```

## Safety and provenance

Original skills in this repo are MIT. Forked skills are MIT with a stacked copyright notice (Jonathan Arteaga plus the upstream author) in each skill's `LICENSE`; see `origins/`. `hatch-pet` is Apache 2.0.

The repository absorbed generic material from a former private archive on July 27, 2026. Its unrelated Git history was not merged here.

## License

Original work is [MIT](LICENSE). Forks and copies keep the license recorded in `origins/` and, when present, in the skill folder.
