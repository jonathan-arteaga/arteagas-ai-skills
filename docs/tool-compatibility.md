# Tool compatibility

The canonical skills use the portable `SKILL.md` shape:

```text
skill-name/
├── SKILL.md
├── agents/
├── references/
├── scripts/
└── assets/
```

Required frontmatter:

```yaml
---
name: skill-name
description: What the skill does and when to use it.
---
```

`SKILL.md` remains the source of truth. Optional metadata such as
`agents/openai.yaml` may improve a specific tool's interface without replacing
the portable instructions.

The synchronization command maps the same canonical folder to these user-level
roots:

| target | destination |
| --- | --- |
| codex | `~/.agents/skills` |
| portable | `~/.agents/skills` |
| claude | `~/.claude/skills` |
| cursor | `~/.cursor/skills` |
| copilot | `~/.copilot/skills` |
| all | All four distinct roots above |

Tool-specific metadata can sit beside a portable skill when it adds value, but
tool-specific instructions should not be added to the portable frontmatter.

Always preview with `--dry-run`. Applying a sync skips existing destination
folders unless `--force` is supplied. For Cursor, prefer a symlink from
`~/.cursor/skills/<name>` to `.agents/skills/<name>` so the repo stays the
only copy. `--force` replaces a destination folder and will clobber a symlink.


## Design skill ownership

The 26-skill portable inventory includes visual-fundamentals-review, product-language, and design-system-consolidator. Their frontmatter remains normally discoverable; no explicit-only policy or new runtime dependency is introduced. Platform-specific visual guidance is loaded selectively.

See [design workflow ownership](design-workflow-ownership.md) for one lead per phase. Product Design and design-taste-frontend are optional external capabilities, not repository dependencies. Leave plugin caches and installed extras unchanged. Documentation authoring remains design-md-only.

Structural validation is not behavioral or device verification. See [evaluation notes](design-skill-evaluation.md) for the tested inputs and limits. Before syncing, inspect the target preview and compare existing destinations; a default dry run may report an existing copy as skipped even when its contents differ. Cursor symlinks already pointing into this repo reflect canonical edits without a copy operation.
