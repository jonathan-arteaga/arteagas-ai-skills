---
name: visual-fundamentals-review
description: "Review existing screens for visual hierarchy, spacing, alignment, typography, color, composition, and adaptive layout. Use when asked for a visual fundamentals review or to diagnose readability and visual grouping. Review-only; not new page design, brand direction, motion polish, flow strategy, or accessibility compliance."
license: MIT
metadata:
  owner: jonathan-arteaga
  kind: fork
  source: https://github.com/jakubkrehel/skills
---

# Review visual fundamentals

Find the smallest evidence-backed corrections that make an existing interface easier to read and use while preserving its intended identity.

## Establish the evidence

1. Identify the surface, primary user task, supported platforms, sizes, and themes from the request and project. Read current design guidance, tokens, relevant source, and supplied or available rendered evidence.
2. Distinguish intended character from defects. An italic heading, single font family, compact table, asymmetry, separator, or wrapped link is not a failure by itself. Flag it only when evidence shows a readability, grouping, consistency, or task problem.
3. State what the evidence can establish. Source shows declarations and structure; runtime inspection shows actual layout and interaction. A screenshot does not identify exact fonts, token ownership, contrast behind transparency, or screen-reader behavior by itself.

## Review the relevant fundamentals

- **Hierarchy and proportion:** Compare the intended first, second, and third points of attention with their visual weight, position, scale, and emphasis. Do not impose one primary action on a surface whose tasks require several distinct action groups.
- **Spacing and alignment:** Check shared edges, padding, rhythm, and density against the established system. Related labels and controls should read as groups. A spacing ratio is a diagnostic clue, not a universal threshold.
- **Typography:** Check type roles, size, weight, line height, measure, real font faces, wrapping, and text growth. Preserve deliberate pairing or a single-family system. Separate heading semantics from appearance.
- **Color and contrast:** Check role consistency, distinguishable states, and the foreground/background pairs actually used. Report measured values with the method, pair, state, and theme; label declared-pair calculations separately from rendered measurements. Never invent ratios or claim compliance from visual estimates.
- **Composition and repetition:** Check balance, focal points, repeated patterns, and the relationship between content and controls. Preserve useful variation; distinguish accidental inconsistency from an intentional local or platform variant.
- **Gestalt grouping:** Use proximity, similarity, common region, continuity, and closure only when they explain a concrete relationship or misreading. Do not add decoration merely to demonstrate a principle.
- **Adaptability:** Stress supported sizes, zoom or text scaling, long content, and applicable themes/locales. Preserve visible, reachable actions and readable content. Flag clipping and overlap rather than wrapping itself.

Read only the platform reference that applies: [web](references/web.md), [SwiftUI](references/swiftui.md), or [React Native](references/react-native.md). For a supplied screenshot without a known stack, use the common review above and describe checks requiring source or runtime access.

## Report and hand off

Return an overall finding, then a concise table: severity, location, evidence, user impact, and suggested correction. Group repeated instances under one root cause. HIGH blocks reading or a task; MEDIUM adds material confusion or inconsistency; LOW is isolated polish. A missing test is a verification gap, not automatically a defect.

List inspected surfaces/states and unverified checks. If no material defect is supported, say so. Do not edit product files, generate replacement screens, or issue a whole-product approval.

Implementation belongs to the relevant platform workflow (`web-react`, `apple-swiftui`, or `mobile-screens` when available). Route identity changes to `design-with-taste`, fine icon/surface/motion work to `ui-craft`, and system-wide token/component drift to `design-system-consolidator`. Accessibility compliance belongs to `ux-review` on web or `apple-review` on Apple platforms; report observed risks without claiming that deeper review ran. Flow friction belongs to the active flow audit or `ux-heuristics`. Keep one finding when several lenses describe the same cause.
