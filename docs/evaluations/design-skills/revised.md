# Revised library: single behavioral evaluation pass

Evaluated all seven cases in `cases.json` using the descriptions and relevant bodies under `<revised-library>/.agents/skills`. The supplied `fixtures/product.md` governs identity and supported surfaces. Installed-session design skills, real applications, private projects, and other evaluation arms were not consulted. No dependency was installed. Responses below are the actual outputs of this pass, not suggested future evaluations.

All source locations below are relative to `fixtures`. Reviews are source-only. No browser, simulator, screenshot, screen-reader, empirical user study, or live service evidence was produced. Severity labels describe supported defects or risks, not compliance results. No aggregate numeric score is supplied.

## Case: web

**Request:** Review settings.html for visual clarity and layout quality. Return findings only.

**Chosen skills:** `visual-fundamentals-review`, with its `references/web.md`. Its description directly owns existing-screen readability, grouping, and adaptive layout; no page redesign or compliance audit was requested.

**Actual response:**

| Severity | Location | Evidence and user impact | Smallest correction |
| --- | --- | --- | --- |
| HIGH | `settings.html:13`, `settings.html:17` | The shared-project visibility hint uses `#eeeeee` on `#ffffff`. A declared solid-color sRGB relative-luminance calculation gives **1.1602:1**; the near-white text is a serious reading risk for information explaining where the name appears. This is a source-pair calculation, not a rendered measurement or compliance audit. | Use the existing readable ink role for this hint, or an established secondary-text role if one exists; keep the white surface. |
| MEDIUM | `settings.html:6` | `main` is fixed at 760 CSS pixels while the supported narrow viewport is 360 CSS pixels; the body also declares 24px margins. The declared box cannot fit the supported narrow width. Zoom resilience is also at risk. | Retain 760px as a maximum, allow the content to shrink to its container, and verify 360/1280px and 200% zoom without hiding overflow. |
| MEDIUM | `settings.html:7`, `settings.html:8`, `settings.html:15` | The optional newsletter heading is 30px while the account-settings title is 16px. This gives secondary content more typographic prominence than the screen's purpose and naming task. | Raise the account-title role relative to the optional-section heading while preserving Georgia and the italic title treatment. |
| MEDIUM | `settings.html:9`, `settings.html:10`, `settings.html:16` | A label has 32px below it, while adjacent groups have only 4px separation. That spacing weakens the name label's association with its input and the boundary from the newsletter section. | Bring the label and input together using the existing spacing unit, then provide a clearer gap between unrelated groups. |

Source inspected: the complete settings fixture. Rendered wrapping, actual font loading, focus, and layout at supported widths/zoom remain unverified.

**Invoked tools/checks:** `exec_command` read the skill/reference and numbered fixture; Python calculated contrast from the exact declared pair using sRGB linearization, weighted relative luminance, and `(Llighter + .05)/(Ldarker + .05)`. Layout and hierarchy findings were declaration/structure inspections, not render tests.

**Edited files:** None.

## Case: swiftui

**Request:** Review Settings.swift for visual clarity and layout quality. Return findings only.

**Chosen skills:** `visual-fundamentals-review`, with its `references/swiftui.md`. This is a visual review of one view, not Swift implementation or a whole-app Apple audit.

**Actual response:**

| Severity | Location | Evidence and user impact | Smallest correction |
| --- | --- | --- | --- |
| MEDIUM | `Settings.swift:13` | The outer view requests a fixed width of 760 points, so it cannot adapt naturally to a narrower iPhone container. Content and actions may extend beyond the available space. | Let the view accept its parent width; use a maximum width only where a larger container can support it. Check narrow iPhone layouts in a preview or simulator. |
| MEDIUM | `Settings.swift:10` | The visibility hint is restricted to one line in a 110-by-12-point frame. The sentence has little room even at its default caption size; Dynamic Type increases text demand while these constraints stay fixed, creating a truncation/clipping risk. | Allow the hint to wrap and grow vertically, keeping its semantic text style and full meaning. Verify supported Dynamic Type sizes. |
| MEDIUM | `Settings.swift:6`, `Settings.swift:7` | The screen title uses `.caption`, while the optional newsletter uses `.largeTitle`. Their semantic style roles invert the intended hierarchy of account settings and secondary content. | Give the screen title the stronger heading role and reduce the optional section's role within the approved typography system. |
| MEDIUM | `Settings.swift:5`, `Settings.swift:8` | The stack's 4-point spacing groups otherwise unrelated content closely, while the name label adds 32 points before its own field. This weakens label/control grouping. | Keep the label near its field and use distinct section spacing for the newsletter and account-editing content. |

Source inspected: the complete `SettingsView`. Actual clipping, Dynamic Type rendering, theme behavior, and VoiceOver remain unverified. These are SwiftUI source findings; no CSS dimensions or browser type scale are prescribed.

**Invoked tools/checks:** `exec_command` read the skill/reference and numbered source. Inspected text styles, stack spacing, line limits, and fixed frames. No build or simulator was available as part of the fixture evidence.

**Edited files:** None.

## Case: editorial

**Request:** Use design-pages audit on editorial.html. Report actionable findings and preserve the approved product direction.

**Chosen skills:** `design-pages` leads its explicitly requested audit, using `references/verbs/audit.md`; `visual-fundamentals-review` supplies the narrow adaptive-layout handoff. The revised ownership and precedence rules preserve the approved identity over generic aesthetic gates.

**Actual response:**

No material product-composition defect is established by the source. The operational introduction, archive link, and current-project table are consistent with experienced project leads. The Georgia family, italic heading, compact table, and naturally wrapping archive link follow the approved direction and do not warrant redesign.

| Severity | Location | Evidence and user impact | Smallest correction |
| --- | --- | --- | --- |
| MEDIUM | `editorial.html:1` | No viewport metadata is present. On mobile browsers that use a wider default layout viewport, the page may be scaled down instead of laying out for the supported 360 CSS pixels. This is a source-level mobile-layout risk, not an observed rendering failure. | Add device-width viewport metadata, then verify the page at 360/1280 CSS pixels and 200% zoom while retaining the current type, density, and wrapping. |

Inspected the single page's source and supplied product brief. Actual mobile scaling, link reachability, table overflow, and zoom behavior remain unverified. The adaptive-layout finding is reported once; no second report or redesign is proposed.

**Invoked tools/checks:** `exec_command` read the description, relevant main-skill ownership/precedence and audit guidance, and the complete numbered HTML. Source inspection checked page order, content fit, approved type/density, wrapping declaration, and missing viewport metadata. No AI-authorship inference or subjective numeric stamp was added.

**Edited files:** None.

## Case: language

**Request:** Review copy.json across web, iOS, and Spanish for product-language consistency and recoverability. Propose corrected strings; do not edit the fixture.

**Chosen skills:** `product-language`, with `references/localization.md` and `references/terminology-migration.md`. This owns interface semantics across platforms and locales without rewriting author voice or changing behavior.

**Actual response:**

The most consequential problems are the unsupported save-error assurances, the claim that optional notifications are required, and ambiguous destructive-action labels.

| Location | Before | Proposed correction | Reason |
| --- | --- | --- | --- |
| `copy.json:7`, `web.save_error` | “Oops! Server is broken. Your data is safe.” | “Couldn’t save changes.” | Neither the server cause nor data safety is known. Keep any supplied error code in the existing error-detail mechanism; no retry, support, or recovery capability is established by this fixture. |
| `copy.json:17`, `ios.permission_intro` | “Allow notifications or you cannot use Harbor.” | “Notifications are optional. You can use Harbor without them.” | Projects remain usable when permission is denied. The wording must not imply otherwise. |
| `copy.json:10`, `web.delete_action` | “Yes” | “Delete project” | Name the consequential action. The existing confirmation already states permanence and should remain. |
| `copy.json:11`, `web.delete_cancel` | “No” | “Cancel” | Make the nondestructive exit explicit. |
| `copy.json:6`, `web.archive_toast` | “Workspace removed” | “Project archived” | Match the approved object name and reversible action, as the iOS and Spanish strings already do. |
| `copy.json:25`, `string_builder` | `"You have " + count + " project"` | Whole-message plural resources: singular “You have {count} project.”; plural “You have {count} projects.” | Avoid sentence fragments and the incorrect plural. Preserve the existing `count` value, and map these branches to the current localization system rather than introducing a new framework or assuming ICU support. |

Use **Project / Proyecto** for the object and **Archive / Archivar** for the reversible action. Keep delete distinct from archive. Retain the approved “Projects,” “Proyectos,” “Archive project,” “Archivar proyecto,” “Project archived,” and “Proyecto archivado.” The existing English first-use empty state and permanent-delete confirmation already communicate their meaning; no rewrite is warranted. Proposed strings follow sentence case.

The supplied Spanish section covers navigation and archive only. For parity, the following are proposed additions for the missing states, not replacements for approved Spanish strings:

| State | Proposed Spanish string |
| --- | --- |
| Save failure | “No se pudieron guardar los cambios.” |
| Optional notification explanation | “Las notificaciones son opcionales. Puedes usar Harbor sin ellas.” |
| Permanent-delete confirmation | “¿Eliminar este proyecto de forma permanente?” |
| Delete action / cancellation | “Eliminar proyecto” / “Cancelar” |
| First-use empty state | “Aún no hay proyectos. Crea un proyecto para empezar.” |
| Project count | Singular “Tienes {count} proyecto.”; plural “Tienes {count} proyectos.” |

No supported recovery action is supplied for save failures, so a complete recoverable flow cannot be established from copy alone. The proposed translations need native-language review. Resource consumers, interpolation/plural behavior, missing-key fallbacks, and rendering with Spanish/text growth are not supplied and remain unverified. No resource key or fixture was changed.

**Invoked tools/checks:** `exec_command` read both references, the skill, shared product context, and the complete numbered JSON. Python `json.loads` successfully parsed the fixture. Compared every supplied web/iOS/Spanish field against the explicit behavior context. No translation service, runtime, or app was accessed.

**Edited files:** None.

## Case: consolidation

**Request:** Review the system directory for duplicated design patterns and propose a consolidation plan. Do not change code.

**Chosen skills:** `design-system-consolidator`, with `references/drift-classification.md` and `references/incremental-migration.md`.

**Actual response:**

`Button` is the governing primitive because the current contract names it. Consolidate the save-action consumers around it while preserving the compact table variant and adding a separate destructive role.

| Classification | Evidence and affected consumers | Proposed correction |
| --- | --- | --- |
| Missing system capability | `system/patterns.md` requires a distinct destructive role, but `system/consumers.tsx:2` uses the ordinary `Button` for `deletePermanently`, and no destructive variant or role is defined. | Define the smallest supported destructive role/variant in the shared button system, then migrate this consumer. Preserve its permanent-delete handler and visible action meaning. The contract does not choose a destructive color, so do not infer one from the ordinary action color. |
| Outdated usage | `system/buttons.tsx:3` explicitly deprecates `LegacyButton` in favor of `Button`; the legacy save consumer is still active in `system/consumers.tsx:2`. | Migrate that save consumer to `Button`, preserving `children` and `onClick`. The wrapper's browser-default styling changes to the canonical action styling; verify that transition. |
| Accidental drift in the inspected save context | `CheckoutButton` hard-codes the canonical action colors and 9px padding (`system/buttons.tsx:5`). Its inspected consumer performs the same `save` action and uses the same label as `Button`, whose current spacing token is 8px. There is no separate checkout behavior or exception in the supplied contract. | Migrate this save consumer to `Button`. Check any additional consumers before retiring the export; the name alone does not establish checkout-specific intent. |
| Intentional variation | `CompactButton` uses the named 4px compact-spacing token and opens a table row. `system/patterns.md` explicitly preserves that density variant. | Keep the compact API and density. Share internal implementation only if behavior and public compatibility remain intact; do not flatten it to ordinary padding. |

Implement in small slices: establish the destructive contract and shared variant, verify one destructive consumer, migrate the legacy save consumer, then migrate the duplicate save wrapper. Search remaining references before removing obsolete exports. Keep handlers, visible labels, focus behavior, and platform/state distinctions unchanged. Equal raw colors alone are not the basis for merging roles.

Scope inspected: all four files in `system/`, containing four button exports, five rendered button instances in one synthetic consumer declaration, one token block, and the current pattern contract. This establishes neither consumer coverage outside the fixture nor coverage of all interaction states.

For an authorized migration, run the available type/build checks, verify save/open/delete handlers, and render ordinary, compact, and destructive buttons in their supported states and layouts. No package/build setup, rendered states, or interaction harness is supplied here, so none of those checks ran. Keep `DESIGN.md` changes with `design-md` after the governing implementation is established; this proposal is not current implemented truth.

**Invoked tools/checks:** `exec_command` read the skill, both references, and every system file; numbered inspection traced tokens → exports → active consumers → documented lifecycle. Read-only review only; no compilation claim or zero-drift claim.

**Edited files:** None.

## Case: documentation

**Request:** Update only documentation/DESIGN.md from the provided current contract. Do not change product code. If required validation cannot run, state the limitation and do not claim a validated deliverable.

**Chosen skills:** `design-md` in repository mode. It is the sole document owner; no page-design or consolidation workflow writes this document.

**Actual response:**

Updated `documentation/DESIGN.md` for Harbor from the current contract. Added the existing global `text` role (`#182a40`), preserved `action` (`#183f75`), Georgia, and italic editorial headings, and used the document format's Overview section.

Governing sources were the existing accepted document, `documentation/contract.md`, `documentation/styles.css`, and the supplied Harbor product context. No alternate themes, new token scales, speculative component rules, or code changes were added.

**This is an unvalidated update.** The required `@google/design.md` spec, lint, DTCG export, and diff commands could not run: every offline/no-install attempt returned `ENOTCACHED`. No dependency was installed and no exporter output was produced. A Python text diff and exact-value/preservation checks confirmed the requested local content change, but do not substitute for schema lint or compatibility export. No unsupported design information was removed to manufacture an export pass.

**Invoked tools/checks:**

- `exec_command` read the full `design-md` skill and all three documentation files; `command -v npx` returned `/opt/homebrew/bin/npx`.
- Validator commands used an isolated cache at `work/design-evals/revised/validator-cache` and `--offline --no-install`. Each exited 1 with `ENOTCACHED`: `npx @google/design.md spec`; `npx @google/design.md lint <DESIGN.md>`; `npx @google/design.md export --format dtcg <DESIGN.md>`; `npx @google/design.md diff <previous-DESIGN.md> <DESIGN.md>`. DTCG was selected because this fixture has no Tailwind configuration.
- Python retained the prior document in the validator-cache directory and updated only the permitted document in the fixture. Python `difflib.unified_diff` inspected the exact changes; assertions checked both color values, the existing Georgia family, and the accepted italic-heading sentence. These were text checks, not YAML/specification validation.
- The explicit case instruction to update and disclose unavailable validation took precedence over the skill's generic rule withholding any draft until validators succeed. The document is therefore accurately reported as unvalidated.

**Edited fixture file:** `fixtures/documentation/DESIGN.md`.

**Other local files:** A prior-document snapshot and npm diagnostic logs exist only under this arm's `validator-cache`. No exported token file was created or retained.

## Case: routing

**Request:** Select a lead skill and necessary sequence for seven independent requests. Explain clarification needed; do not implement.

**Chosen skills:** This is a routing-only use of the revised descriptions. Relevant owner/boundary bodies read: `visual-fundamentals-review`, `design-pages`, `design-md`, `product-language`, `design-with-taste` plus its Design DNA reference, `ui-craft`, `ux-review`, and `ux-heuristics`.

**Actual response:**

| Request | Lead and necessary sequence | Clarification needed |
| --- | --- | --- |
| (a) Make this prettier. | Provisional lead: `visual-fundamentals-review` to diagnose the existing surface. Use `ui-craft` if the intended scope is button/icon/surface finish, or `design-pages` if it is an actual web-page redesign. | Identify the target and whether the request means readability, small polish, or a new direction. Inspect any supplied surface first; do not silently replace its approved identity. |
| (b) Audit this flow. | Provisional lead: `ux-heuristics` for decision burden, grouping, feedback, and progress across steps. If the intended audit is web focus/forms/accessibility, `ux-review` should lead instead; Apple compliance routes to `apple-review`. Add a visual review only for a separate supported visual concern. | Establish the flow's start/end, platform, and audit concern. This library has no unqualified general flow-audit owner, so do not treat “audit” as a request for every review skill. Fetch law/guideline sources only when actually conducting the chosen audit. |
| (c) Lock the design system into DESIGN.md. | `design-md` leads and alone writes the document after tracing the current governing contract and validation requirements. Use `design-system-consolidator` first only if real unresolved drift must be resolved before documenting the current system. | Identify the product and governing source if not supplied. “Lock” is documentation scope unless source consolidation is also requested. |
| (d) Fix the wording of these empty states. | `product-language` leads; inspect each empty-state cause, supported action, existing terminology, and locales before changing strings. | Only clarify causes/actions that remain unknown, such as first use versus no results or insufficient permission. No author-voice skill is needed for ordinary interface copy. |
| (e) This feels like every other SaaS. | `design-with-taste` leads identity diagnosis. Use `design-pages` afterward for an explicitly requested web redesign, or `design-reference-scout` if research into new references is requested. | Determine the target and which identity decisions are open. Preserve approved Georgia, italic headings, navy actions, and expert density for Harbor unless a departure is authorized. Do not prescribe an unrelated generic aesthetic. |
| (f) Build a marketing page, then check its visual hierarchy. | `design-pages` leads the build/design phase, using `web-react` if React/Next implementation is required; then `visual-fundamentals-review` performs a distinct hierarchy check of the completed surface. | Resolve the page's audience, purpose, content, and stack from context; ask only for missing decisions that materially change the result. Do not conflate the build's self-check with the requested review. |
| (g) Polish our buttons while preserving the documented motion values. | `ui-craft` leads inside the current button system. Read the current shared primitive and motion contract first; add the platform implementation skill only if needed for the actual change. | No motion-choice clarification is needed: Harbor's 0.98 press scale and 120ms ease-out are fixed. Generic fallback values such as 0.96 or a new spring must not replace them. Clarify only an unresolved button target or undocumented state. |

**Invoked tools/checks:** Read all local skill frontmatter descriptions before selecting owners; read the relevant bodies and the Design DNA reference to confirm routing and precedence. This was selection only: no flow audit, external-law fetch, UI implementation, or document write occurred in this case.

**Edited files:** None.

## Integrity and verification record

Python SHA-256 checks before and after the documentation operation showed identical bytes for every fixture file except the authorized `documentation/DESIGN.md`. Its hash changed from `3e35ff36d0a56ed5fdf3fbdaaa3842cc2a0436fab72f5b0d416475b23542ce3b` to `2444ce87bee98ca1e5b2c38e0b0c32c3a3907a07f084058618deb06945b4c756`.

This report and the validator-cache artifacts are confined to the revised evaluation arm. No iterative product fixing, consultation with another arm, empirical outcome claims, or aggregate numeric scoring occurred.
