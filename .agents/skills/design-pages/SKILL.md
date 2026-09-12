---
name: design-pages
description: "Design, redesign, or study web-page composition and visual direction. Use for new pages, redesigns, or explicit page-design audits; use visual-fundamentals-review for neutral screen reviews."
license: MIT
metadata:
  owner: jonathan-arteaga
  kind: fork
  source: https://github.com/Nutlope/hallmark
---

# Design pages around the product

Use the brief, content, established identity, and user task to choose composition. A reference or catalog is design material, not a mandatory recipe. Current user instructions and platform/accessibility requirements govern every supporting reference.

## Select the requested work

| Request | Approach |
| --- | --- |
| New page or visual direction | Establish the story and hierarchy, then build within the chosen stack. |
| Redesign | Inspect the current page and preserve functional contracts; read [redesign](references/verbs/redesign.md). |
| Explicit composition audit | Read [audit](references/verbs/audit.md); report evidence-backed findings without edits. |
| Study a supplied URL or image | Read [study](references/verbs/study.md) and inspect the reference. |
| A single control or component | Read [component scope](references/verbs/component.md); keep the work at that scale. |

Infer the mode from the request. Ask only when alternatives would materially change the work. An explicit combined study/redesign/build request already authorizes those stages: complete the analysis, make the handoff explicit, and continue. An audit-only or study-only request ends with the report.

## Establish the constraints

Inspect the relevant page, adjacent components, tokens, fonts, routes, and supplied product decisions. For a small edit, read the affected surface and its governing conventions; do not scan the whole repository or research a new visual direction automatically.

Preserve established identity, content intent, component ownership, and routes unless the request changes them. A redesign permits necessary reversible edits within its scope; ask before destructive deletion or a materially broader rebuild. Edit global styles deliberately, preserving required framework imports and unrelated rules; append-only CSS is not a requirement.

Use one owner per concern when available: visual-fundamentals-review for neutral screen clarity, product-language for substantive UI wording, design-system-consolidator for token/component migration, and design-md for DESIGN.md authoring. Route engineering to the project’s implementation conventions or web-react. These handoffs do not expand the assignment or require a new user message for authorized work.

## Compose and implement

1. Make the business story and primary task clear using supplied facts. Draft useful copy within scope; label unknown claims and never fabricate customers, metrics, endorsements, or production functionality.
2. Choose hierarchy, density, imagery, and motion for the product. Reuse existing tokens. Do not rotate themes, change fonts, generate alternate designs, or add a design log merely to differ from a previous run.
3. When direction is open, choose a suitable approach and explain the consequential choice briefly. Offer alternatives only when they resolve a real uncertainty. Do not expose catalog mechanics as mandatory user decisions.
4. Build the requested surface and its relevant interaction states. Reuse the existing token source and component contracts. Create a new token file or export only when the project needs it.
5. Inspect the result at supported sizes and exercise the affected interactions. Repair observed failures; do not broaden a small change into a site-wide audit.

## Read supporting material selectively

| Need | Reference |
| --- | --- |
| Page-shape alternatives | [Macrostructures](references/macrostructures.md) |
| Composition vocabulary | [Structure](references/structure.md) |
| A chosen catalog theme | [Theme files](references/themes/) |
| A custom palette or type direction | [Custom theme](references/custom-theme.md) |
| Typography, spacing, or layout | [Typography](references/typography.md), [layout](references/layout-and-space.md) |
| Responsive behavior | [Responsive guidance](references/responsive.md) |
| Controls and states | [Interaction and states](references/interaction-and-states.md) |
| Motion or interaction feedback | [Motion](references/motion.md), [microinteractions](references/microinteractions.md) |
| Imagery needed by the brief | [Assets](references/assets.md), [hero enrichment](references/hero-enrichment.md) |
| A specific component pattern | [Component cookbook](references/component-cookbook.md) |
| A targeted quality check | [Review signals](references/slop-test.md), [anti-patterns](references/anti-patterns.md) |
| Requested code-token exports | [Export formats](references/export-formats.md) |
| Requested design-system document | [DESIGN.md handoff](references/design-md.md) |

Read only the relevant references and sections. Catalog prescriptions are optional starting points. Do not apply their aesthetic gates to an established design as universal defects: compact density, italic headings, single-family type, wrapped labels, and multi-color systems can all be intentional.

## Verify and deliver

Keep focus visible, controls operable, content readable, motion appropriate, and responsive layout usable. Respect reduced motion and the product’s supported platforms. Diagnose clipping or inaccessible controls at their cause rather than hiding overflow or shrinking content to pass a stylistic rule.

Use [the output contract](references/contract.md) for implementation handoff. Return what changed or was learned, the checks actually completed, and remaining limitations. Show a useful preview when available. Do not claim browser, device, accessibility, or delivery verification from source alone.
