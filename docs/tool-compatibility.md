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

The 27-skill portable inventory includes visual-fundamentals-review, product-language, and design-system-consolidator. Their frontmatter remains normally discoverable; no explicit-only policy or new runtime dependency is introduced. Platform-specific visual guidance is loaded selectively.

See [design workflow ownership](design-workflow-ownership.md) for one lead per phase. Product Design and design-taste-frontend are optional external capabilities, not repository dependencies. Leave plugin caches and installed extras unchanged. Documentation authoring remains design-md-only.

Structural validation is not behavioral or device verification. See [evaluation notes](design-skill-evaluation.md) for the tested inputs and limits. Before syncing, inspect the target preview and compare existing destinations; a default dry run may report an existing copy as skipped even when its contents differ. Cursor symlinks already pointing into this repo reflect canonical edits without a copy operation.

## Model and host guidance — checked 2026-09-12

Keep the portable instructions model-neutral. Use host configuration for effort,
tools, context limits, progress display, and permissions. Do not duplicate API
prompt templates or force a reasoning method into every skill.

- Astra benefits from concise descriptions, task-specific reference loading,
  proportionate verification, and clear completion/authorization boundaries.
  See [OpenAI's skill guidance](https://developers.openai.com/blog/rethinking-skills-and-prompts-for-gpt-6-astra).
- Fable 5.1 benefits from explicit completion criteria and scoped edits. Request
  useful progress updates in the host when needed; do not add a broad workflow
  to a simple task. See [Anthropic's prompting guidance](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-1).
- Preserve user-specified models. The local Cursor account listed Fable 5.1 and
  Grok 4.6, but rejected Astra and did not list Grok 4.7. User-approved trials
  therefore cover Astra in Codex, Fable in Claude Code/Cursor, and Grok 4.6 in
  Cursor. Availability is an observed account state, not a universal limitation.
- `hatch-pet` remains Codex-only. Another host may inspect its format or plan a
  handoff; portable folder syntax does not supply the required runtime tools.

`compatibility` is a supported optional field in the
[Agent Skills specification](https://agentskills.io/specification#compatibility-field).
The repository validates its parsed string value and 1–500-character bound.
Host-specific fields remain outside this library's portable frontmatter.
Claude's reserved-name and description restrictions are labeled host constraints.
Size and contents-list warnings are editorial guidance, not format errors.

Claude Code substitutes positional dollar tokens in skill bodies; literal
prices such as `\$4.99` use one escaping backslash. See the
[Claude Code skills reference](https://code.claude.com/docs/en/skills).

## Controlled evaluation

Use isolated project skill folders and fresh sessions. Check actual tool reads
to distinguish a loaded skill from a fallback answer. In the restricted native
Claude CLI trial setup, some initial runs skipped the local skill; those pairs
were rerun with explicit file paths. File-based trials measure the instructions,
not automatic host discovery. Keep user-level installation previews separate.

The CLI trial runner is opt-in and never runs in `pnpm check` or CI. See the
[current audit](flagship-skill-audit.md) for model settings, evidence, and limits.


## Guided discovery

`think-with-me` uses portable instructions and permits automatic selection;
its Codex metadata explicitly enables implicit invocation. Actual selection
depends on the host and task. It helps clarify unsettled goals and consequential
choices, then leaves discovery when there is enough direction to proceed.
It does not require a particular connector, create a persistent session mode,
or replace global communication preferences. `frame-product-build` and
`frame-concept-build` are optional follow-on workflows, not dependencies.
