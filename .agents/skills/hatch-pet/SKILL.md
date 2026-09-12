---
name: hatch-pet
description: "Create, repair, validate, or package a Codex v2 animated pet: an 8x11 atlas with nine animation rows and 16 look directions. Codex runtime required."
license: Apache-2.0
compatibility: "Codex-only. Requires Codex image generation, workspace dependency discovery, and the bundled Python/Pillow runtime. Other hosts may inspect or plan but cannot complete the runtime workflow."
metadata:
  owner: jonathan-arteaga
  kind: fork
  source: local
---

# Hatch a Codex v2 pet

This workflow requires the Codex runtime, its image-generation capability, and bundled Python with Pillow. In another host, explain the runtime requirement and provide the requested diagnosis or handoff; do not invent a replacement generation/installation pipeline.

## Inputs and invariant format

Accept a concept, supplied art, an existing atlas, or a repair request. Infer a missing name and description from the request. Preserve the supplied character’s defining traits.

- New pets use `spriteVersionNumber: 2` and an **8x11 atlas**: nine standard animation rows plus **16 clockwise look directions**.
- An 8x9 atlas is an intermediate or upgrade input, never a finished new v2 pet.
- Preserve accepted rows during repairs. Repair the complete containing eight-frame row when a look cell fails; do not mix newly generated individual cells into a row.
- Use the neutral/front frame through `--neutral-cell` when available. Direction `000` is not the neutral frame.
- Inspect visual evidence and run deterministic checks before claiming the atlas is valid. Do not change row semantics or dimensions to make validation pass.

## Runtime and workflow selection

Locate this installed skill’s directory and use it as `SKILL_DIR`; command paths in references are relative to that root. Call `load_workspace_dependencies` and use its exact Python executable for the bundled scripts. If the runtime is unavailable, report the blocked stage and continue only independent inspection or planning.

Use `$imagegen` for visual generation and follow its actual tool availability and permissions. Read the installed image-generation skill before generating. Do not substitute a direct API or CLI path without the authorization that path requires.

| Stage | Read |
| --- | --- |
| New character, brand grounding, visual provenance, style/transparency | [Generation](references/generation.md) |
| New full pet or upgrade from an 8x9 atlas | [Production workflow](references/production.md) |
| Producing or repairing the 16-direction look sequence | [Look directions and acceptance](references/look-directions.md) |
| Using generation/review workers in a supported host | [Worker contracts](references/workers.md) |
| Repairing an existing atlas, validating or packaging | [Repair and acceptance](references/repair-and-acceptance.md) |

For a full generation, complete these stages in order: grounded character → standard rows → look rows → deterministic assembly → visual review → package. Load each reference as its stage becomes relevant. Read the acceptance criteria before the first generation so the target format is clear.

For diagnosis-only requests, inspect and report without generating images, rewriting rows, or installing a pet. For an authorized repair, preserve the approved parts and finish the repair plus checks without asking again for routine steps. Reuse valid artifacts rather than restarting the whole pet.

## Completion

Use the bundled scripts for geometry, alpha, direction, assembly, and package checks; keep their CLI contracts unchanged. A full visual run still requires the contact sheet and motion review described in the references. Source inspection alone does not establish visual correctness.

Stage `pet.json` and `spritesheet.webp` together. Installation into `${CODEX_HOME:-$HOME/.codex}/pets/<pet-name>/` is a separate action unless already requested. Report the artifact paths, validation results, accepted warnings, and any missing generation/runtime step. Never label an incomplete atlas as packaged or installed.
