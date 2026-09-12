# Migrate a coherent slice

1. Record the current source/consumer state and preserve unrelated changes. Define the intended behavioral and visual invariants, old-to-new mapping, supported variants, and affected public props/resource references.
2. Add or correct the shared token/component first, using the existing architecture. Preserve adapters or deprecated aliases only when actual consumers need compatibility; avoid speculative compatibility layers.
3. Migrate a representative consumer, then other consumers in the requested slice. Keep platform differences, density, themes, focus, loading/error/disabled states, and text expansion intact.
4. Run the narrowest available type/build/resource checks and inspect representative rendered states when the environment supports them. Add a regression test when the migration could change behavior, not a test that merely mirrors token names.
5. Search for remaining old references and classify each. Remove an obsolete implementation only after confirming it is unused within the relevant consumer boundary and its removal is within scope. Do not delete unrelated or external consumers.
6. Review the diff. If a slice fails validation, correct it or revert only that slice's changes; preserve unrelated work. Report the failing check and scope rather than claiming migration completion.
7. Document verified decisions and remaining exceptions. Route DESIGN.md changes to its owner after source truth is established. Publishing packages, cross-repository migrations, and production rollout need their own explicit task scope.

For source-only access, provide the migration and named render/interaction checks still needed. Do not manufacture screenshot, device, or accessibility results.
