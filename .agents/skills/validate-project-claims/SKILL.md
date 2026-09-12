---
name: validate-project-claims
description: "Check that public project claims and status labels are supported by inspectable repository evidence. Use when the user invokes validate-project-claims, or before publishing a project description."
license: MIT
metadata:
  owner: jonathan-arteaga
  kind: original
  source: local
---

# Validate project claims

1. List each reader-facing claim as a separate sentence.
2. Point every claim to code, a test, a demo, a result, or a public source.
3. Mark unsupported claims for removal or rewrite.
4. Check that `Concept`, `Prototype`, or `Complete` matches the current artifact.
5. Separate measured results from intended behavior.
6. Confirm limitations are visible beside the strongest claims.
7. Run the narrowest command that reproduces the stated evidence.

Return a table with: claim, evidence, status, needed change, and verification
command. Do not upgrade a status because the copy sounds finished.

## Example

| Claim | Evidence | Status | Needed change | Verification |
| --- | --- | --- | --- | --- |
| "Validates every skill folder in CI" | `.github/workflows/ci.yml` runs `pnpm check` | Supported | None | `pnpm check` |
| "Syncs to Codex, Claude, Cursor, Copilot" | `tools/sync-skills.mjs` maps four targets; only the dry run is tested | Partly supported | Say "previews a sync"; `--apply` is untested | `pnpm sync:dry-run` |
| "Complete" status label | No release tag; README says archive merged last month | Unsupported | Relabel `Prototype` or cut a tagged release | `git tag --list` |
