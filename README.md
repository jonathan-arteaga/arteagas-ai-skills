<h1 align="center">
  arteagas-ai-skills
</h1>

<h4 align="center">Jonathan's personal skill library: owned names, attributed sources, little overlap.</h4>

<p align="center">
  <a href="https://github.com/jonathan-arteaga/arteagas-ai-skills/actions/workflows/ci.yml"><img src="https://github.com/jonathan-arteaga/arteagas-ai-skills/actions/workflows/ci.yml/badge.svg" alt="Check"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License"></a>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#resources">Resources</a> •
  <a href="#license">License</a>
</p>

## Features

A skill is a named folder of instructions. Ask for that job and the agent loads the folder. The copies in this repository are the source. Generate local installs from here; do not edit an installed copy as a second source.

The same names travel between machines and tools. Other people can inspect the workflows and adapt them.

Some workflows are Jonathan's. Attributed forks keep credit in [`origins/`](origins/) and in `SKILL.md` frontmatter. A few skills also ship a `LICENSE` file.

**What is not here.** This library does not include Gmail, Calendar, Drive, X, Todoist, or Craft connectors. It does not include Cursor's built-in skills, employer or customer material, or a second React, page-design, or React Native skill. If a vendor app is connected, use that vendor's own skill. This library holds the method, not the connector.

<details>
<summary>Design a page or a look</summary>

| Skill | What it does |
| --- | --- |
| [`design-pages`](.agents/skills/design-pages/SKILL.md) | Design, audit, or redesign a web page without the usual AI-layout look. |
| [`design-with-taste`](.agents/skills/design-with-taste/SKILL.md) | Keep two products from sharing one interchangeable look. |
| [`design-style-synthesis`](.agents/skills/design-style-synthesis/SKILL.md) | Compare selected local projects and turn shared craft patterns into an original app direction; stops before external research or implementation. |
| [`design-reference-scout`](.agents/skills/design-reference-scout/SKILL.md) | Find a few current visual references before anyone picks a direction. |
| [`design-md`](.agents/skills/design-md/SKILL.md) | Write down an interface's design language in a `DESIGN.md`. |
| [`ui-craft`](.agents/skills/ui-craft/SKILL.md) | Tighten radii, alignment, surfaces, icons, and motion on a screen that already exists. |

</details>

<details>
<summary>Check an interface</summary>

| Skill | What it does |
| --- | --- |
| [`ux-review`](.agents/skills/ux-review/SKILL.md) | Check a web interface for accessibility, focus, forms, and interaction quality. |
| [`ux-heuristics`](.agents/skills/ux-heuristics/SKILL.md) | Check why a flow feels confusing, slow, or heavy, using named UX psychology laws. It reads [lawsofux.com](https://lawsofux.com) at runtime and copies nothing. |

</details>

<details>
<summary>Write like a person</summary>

| Skill | What it does |
| --- | --- |
| [`draft-in-authentic-voice`](.agents/skills/draft-in-authentic-voice/SKILL.md) | Write a first draft that sounds like you, from examples of your writing. |
| [`edit-in-authentic-voice`](.agents/skills/edit-in-authentic-voice/SKILL.md) | Edit an existing draft, or flag AI writing patterns, without flattening the voice. |

</details>

<details>
<summary>Decide what to build</summary>

| Skill | What it does |
| --- | --- |
| [`frame-concept-build`](.agents/skills/frame-concept-build/SKILL.md) | Test one question with a small artifact before committing to a build. |
| [`frame-product-build`](.agents/skills/frame-product-build/SKILL.md) | Agree the audience, problem, flows, and one-way doors before design or code. |

</details>

<details>
<summary>Build for Apple, web, or phone</summary>

| Skill | What it does |
| --- | --- |
| [`apple-swiftui`](.agents/skills/apple-swiftui/SKILL.md) | Build and refactor SwiftUI screens. |
| [`apple-swift`](.agents/skills/apple-swift/SKILL.md) | Write modern Swift: types, concurrency, APIs, tests. |
| [`apple-review`](.agents/skills/apple-review/SKILL.md) | Audit an existing iOS or macOS app. |
| [`web-react`](.agents/skills/web-react/SKILL.md) | Write and review React and Next.js. This is the only React/Next writing skill. |
| [`mobile-screens`](.agents/skills/mobile-screens/SKILL.md) | Build Expo and React Native screens that feel native. |

</details>

<details>
<summary>Document a repo, prove it, or hatch a pet</summary>

| Skill | What it does |
| --- | --- |
| [`write-readme`](.agents/skills/write-readme/SKILL.md) | Write or update a repository README in the centered-hero funnel format. |
| [`connector-doctor`](.agents/skills/connector-doctor/SKILL.md) | Prove whether an existing connector works in one host and account without changing it. |
| [`validate-project-claims`](.agents/skills/validate-project-claims/SKILL.md) | Check that public project claims match evidence in the repo. |
| [`work-pattern-audit`](.agents/skills/work-pattern-audit/SKILL.md) | Find recurring work worth scripting, skill-building, instructing, or scheduling without implementing it. |
| [`write-reproducible-demo`](.agents/skills/write-reproducible-demo/SKILL.md) | Write a short demo path another person can run without private data. |
| [`hatch-pet`](.agents/skills/hatch-pet/SKILL.md) | Create, repair, and package a Codex v2 animated pet. |

</details>

## How To Use

You will need Node 24+ and pnpm 11.17.0. Open this repository in Cursor and ask for the job by name: `ux-review`, `design-pages`, `frame-product-build`. The agent loads the matching folder under `.agents/skills/`.

The same names work in Codex and other tools after a developer installs the folders. From your command line:

```bash
# Clone this repository
git clone https://github.com/jonathan-arteaga/arteagas-ai-skills.git

# Go into the repository
cd arteagas-ai-skills

# Install dependencies
pnpm install

# Validate skill folders
pnpm validate

# Preview a Codex sync without writing
pnpm sync:dry-run

# Run tests plus a dry-run demo
pnpm check
```

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

Install one skill after reviewing the dry run:

```bash
node tools/sync-skills.mjs --apply --target codex --skill apple-swift
```

> **Note**
> Do not put library skills in `~/.cursor/skills-cursor/`. That directory is Cursor-managed.

To add a skill, start from `templates/skill/`, match the folder to the frontmatter `name`, add `origins/<name>.md` for a fork or copy, then run `pnpm check`. Full rules are in [`AGENTS.md`](AGENTS.md).

Do not add employer or customer material, credentials, private operational data, or vendor connectors.

The repository absorbed generic material from a former private archive on July 27, 2026. Its unrelated Git history was not merged here.

## Resources

- **[Tool compatibility](docs/tool-compatibility.md)** for Codex, Claude, Cursor, and Copilot targets.
- **[Demo path](docs/demo.md)** for the validate-and-dry-run sequence.
- **[Origins](origins/)** for fork provenance.

## License

MIT — see [LICENSE](LICENSE) for details. Forks keep a stacked copyright notice (Jonathan Arteaga plus the upstream author) in the skill `LICENSE` when that file exists; see [`origins/`](origins/). `hatch-pet` is Apache 2.0.

---

> GitHub [@jonathan-arteaga](https://github.com/jonathan-arteaga)
