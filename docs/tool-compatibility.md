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

Optional frontmatter stays inside the Agent Skills specification: `license`,
`compatibility` (environment or network needs, max 500 characters), `metadata`
(string map, used here for `owner`, `kind`, and `source`), and `allowed-tools`.
Host-only fields such as Claude Code's `context`, `paths`, or
`disable-model-invocation`, and host-only body syntax such as `$ARGUMENTS` or
inline shell injection, are not used, so the same folder loads unchanged in
every host. `pnpm validate` enforces the spec limits and warns on
host-specific tokens, bodies over 500 lines, broken relative links, and long
reference files without a `## Contents` list.

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
