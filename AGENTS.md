# Agent guidance

This is the canonical repository-wide guidance for agents working in this
project. It applies to the entire repository unless a more specific
`AGENTS.md` is added below a subdirectory.

## Repository reality

- This is an active, public library of Jonathan's owned skill stack: original
  workflows and MIT forks with stacked copyright notices, plus their
  validation/synchronization tools.
- `.agents/skills/` is the source of truth for installable skills. Copies under
  user-level tool directories are generated destinations, not editing sources.
- `origins/` records source URL, commit SHA, license, and what changed for
  every fork or local copy.
- `README.md` is the public usage and contribution guide. `project.json`
  records the project's purpose, provenance, evidence, and exclusions.
- `package.json` and `.github/workflows/ci.yml` define the executable contract:
  Node 24+, pnpm 11.17.0, and `pnpm check` in CI.

## Repository map

- `.agents/skills/<skill-name>/SKILL.md`: canonical portable instructions.
- `.agents/skills/<skill-name>/agents/openai.yaml`: optional Codex-facing UI
  metadata.
- `.agents/skills/<skill-name>/references/`: detailed, selectively loaded
  guidance linked directly from the skill.
- `origins/<skill-name>.md`: source, SHA, license, and delta for forks/copies.
- `templates/skill/`: starter material; it is not an installable skill.
- `tools/`: skill discovery, validation, and dry-run-first synchronization.
- `tests/`: structural and tooling tests built from synthetic fixtures.
- `docs/`: compatibility and demonstration notes.

## Working rules

- Edit canonical repository copies, validate them here, and only then consider
  synchronizing them outward. Never edit `node_modules/` or an installed skill
  as a substitute for changing this repository.
- Keep each skill focused on a repeatable workflow. Use lowercase kebab-case
  names and make the directory name match the `name` frontmatter exactly.
  Never place an `AGENTS.md` inside a skill folder. Cursor treats that
  filename as a repository rule and will inject it into every chat.
- Put both capability and trigger conditions in the frontmatter `description`.
  Keep `SKILL.md` concise and route substantial detail to directly linked,
  one-level-deep `references/` files.
- Prefer instructions over scripts unless deterministic behavior is needed.
  Add focused tests for scripts and repository tooling.
- When `agents/openai.yaml` exists, keep it aligned with the skill and include
  the exact `$skill-name` in its default prompt.
- Keep public claims tied to inspectable repository evidence. If purpose,
  status, provenance, exclusions, or the included skill set changes, update the
  relevant source-of-truth documents in the same change.
- Do not add employer or customer material, credentials, private operational
  data, MCP-tied vendor skills, or system-managed Cursor skills.
- Third-party skills belong here only as owned, attributed forks or copies
  with an `origins/` note and no redundant job already covered by the stack.
- Preserve unrelated working-tree changes and avoid broad mechanical rewrites.
- Treat a skill as guidance for its phase, not a mandatory pause for the whole
  task. Continue already-authorized stages; keep review-only requests read-only.
- Descriptions should be short and discriminating. Detailed examples and
  conditional procedures belong in selectively loaded references. Line counts
  are review signals, not a reason to remove useful domain constraints.
- Validator issues distinguish format, packaging, host compatibility, and
  editorial advice. Fix errors; assess warnings. `--strict` promotes warnings
  to failures. Codex-only exceptions name the exact token and reason in tooling.
- Tests use disposable fixtures with no production access. Run relevant checks
  without asking again; add tests for real behavior rather than instruction text.
- Model trials are opt-in and use subscriptions. Keep their fixtures isolated,
  record exact host/model/settings, and never substitute an unavailable model
  or treat routing/source checks as proof of rendered or deployed behavior.

## Commands

Run commands from the repository root.

```bash
pnpm install --frozen-lockfile
pnpm validate
pnpm test
pnpm check
pnpm sync:dry-run
```

- `pnpm check` is the full local and CI gate: tests, validation, and a Codex
  sync preview.
- For a targeted preview, run
  `node tools/sync-skills.mjs --dry-run --target codex --skill <name>`.
- Synchronization writes to user-level directories only with `--apply`. Do not
  apply a sync unless the user explicitly asks for it and has reviewed the dry
  run. Treat `--force` as destructive because it replaces an existing
  destination folder.

## Definition of done

- Run the narrowest relevant check while iterating, then run `pnpm check` for
  changes to skills, templates, tools, or tests.
- Review any sync preview, `git diff`, and `git status --short` before handoff.
- Keep `README.md`, `project.json`, compatibility docs, and executable behavior
  aligned whenever a change affects their claims.
