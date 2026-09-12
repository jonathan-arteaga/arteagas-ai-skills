---
name: design-system-consolidator
description: "Audit or consolidate duplicated UI tokens, component variants, and design-system drift in an existing codebase. Use when asked to unify inconsistent styles or reusable patterns, plan a consolidation, or migrate consumers incrementally. Not visual redesign, DESIGN.md-only documentation, or generic code cleanup."
license: MIT
metadata:
  owner: jonathan-arteaga
  kind: fork
  source: https://github.com/hueyexe/frontend-agent-skills
---

# Consolidate an existing design system

Reduce accidental inconsistency while retaining meaningful product, state, density, and platform differences.

## Establish intent and scope

Identify the selected product, active token/component sources, consumers, existing design guidance, and current working-tree changes. Treat deprecated, experimental, generated, and disconnected code according to its actual lifecycle rather than counting every matching file as current.

**Audit or plan requests:** Inspect and propose; do not edit product files. **Improvement or migration requests:** Audit first, then implement supported changes within the authorized scope. Do not ask again for routine edits already requested. An ambiguous request for a design-system document belongs to `design-md`, not a migration.

## Inventory and classify

1. Trace recurring roles from tokens through components to representative consumers. Record source, role, state/theme/platform, usage, and governing evidence. Raw-value searches identify candidates, not proven defects.
2. Compare behavior and contracts, not visual similarity alone. Two equal colors may serve different roles; two different control densities may be intentional variants of the same component.
3. Classify each candidate using [drift classification](references/drift-classification.md). Keep unknown intent explicit rather than deciding that the most frequent implementation must be canonical.
4. Choose the smallest useful system slice by user impact, reuse, and migration risk. Preserve established naming/notation and supported APIs. Introduce a token or abstraction only when a recurring role, missing capability, or compatibility need justifies it.

## Propose or implement the correction

For each supported change, name the canonical source, allowed variants, affected consumers, compatibility impact, and verification. Keep legitimate exceptions documented. Do not impose a new palette, typography identity, universal component hierarchy, token format, or dependency.

For a review, return that proposal and stop. For authorized implementation, use [incremental migration](references/incremental-migration.md), working through one coherent component/token slice at a time. Apply the project's platform implementation conventions; use `web-react`, `apple-swiftui`, or `mobile-screens` when available and relevant. Keep the consolidation workflow responsible for inventory and migration scope.

Update shared source and consuming code together where necessary. Preserve focus, accessible names, state behavior, and layout. A design-system migration must not silently change persistence, permissions, navigation, analytics, or business logic.

When the resulting system needs a `DESIGN.md` update, hand off to `design-md` with the governing evidence. That skill owns the document schema and writes only the document; it does not own source migration. Do not describe a proposed system as already implemented in the document.

## Verify and report

Return findings or changes grouped by root cause: classification, evidence, affected consumers, chosen correction, and verification. Distinguish intentional exceptions and unresolved system gaps from remaining accidental drift.

Report the denominator for any coverage/count claim: which files, components, states, and platforms were inspected. A drop in raw hex values or duplicate filenames alone does not prove success. Include build/type/resource checks and relevant visual/interaction checks actually run, plus remaining limitations. Do not claim zero drift outside the inspected scope.

Visual readability belongs to `visual-fundamentals-review`; identity to `design-with-taste`; words to `product-language`; web or Apple accessibility to the relevant reviewer. Bring in those checks only when the migration affects their concern and deduplicate the final findings.
