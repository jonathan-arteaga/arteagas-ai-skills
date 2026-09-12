# Baseline behavioral evaluation

One pass through the seven independent requests in `../cases.json`. Only the baseline library at `../../baseline-library/.agents/skills` informed skill selection. Fixture context came from `fixtures/product.md`. No other evaluation arm, real app, private project, installed design skill, screenshot, or empirical outcome measurement was consulted. No aggregate scores are supplied.

All fixture paths below are relative to this arm's `fixtures/` directory. Results are actual responses to the case prompts, followed or preceded by execution metadata. Severity describes source-observed impact, not a measured user outcome.

## web

**Chosen skill:** `design-pages` in audit mode, selected because its description covers web-page audits. Read its main instructions plus `references/verbs/audit.md`, `references/anti-patterns.md`, `references/slop-test.md`, and `references/layout-and-space.md`. Its typography preference does not override the explicitly approved Georgia and italic identity. `ui-craft` was considered and rejected because it explicitly excludes typography and layout grouping.

**Tools/checks:** Read `settings.html` and shared product context with numbered lines. Python calculated sRGB contrast from the declared colors: hint/background 1.160:1, main ink/background 14.542:1, button text/fill 10.465:1. Inspected fixed width, heading sizes, and label/control spacing. No files edited.

**Verification limits:** Static source inspection only; no rendered viewport, zoom, keyboard, or assistive-technology checks. Color calculations use supplied declarations, not browser-computed styles. Audit output omits the skill's numeric self-rating because this evaluation requests no aggregate numeric scores.

**Actual response:**

- **Major — fixed-width layout (`settings.html:6`).** The 760px main exceeds the space available at the supported 360px viewport, even before the body's margins. Use a fluid width with a 760px maximum and retain room for the margins. Verify the resulting layout at 360px, 1280px, and 200% zoom; do not hide useful content with overflow clipping.
- **Major — contrast/readability (`settings.html:13`, helper copy at line 17).** The declared `#eeeeee` text on white calculates to only 1.16:1, making the explanation exceptionally faint. Use the existing ink role, or a separately approved readable secondary-text role.
- **Major — reversed visual hierarchy (`settings.html:7–8`, content at lines 14–15).** The optional newsletter heading is 30px while the page title is 16px, giving secondary content the strongest visual emphasis. Give the account title primary prominence and reduce the newsletter heading, preserving the approved family and italic heading treatment.
- **Major — disconnected field grouping (`settings.html:9–11`, field at lines 16–17).** The 32px label-to-control gap is much larger than the 4px section separation. Tighten label/control/helper spacing and increase separation between unrelated groups so the display-name explanation reads as part of its field.

## swiftui

**Chosen skill:** `apple-swiftui` as the nearest platform-specific view-pattern guidance. Its description emphasizes building/refactoring rather than visual review, so this is a limited-fit route. Read its main instructions, `references/components-index.md`, `references/form.md`, and `references/theming.md`. `design-pages` explicitly excludes SwiftUI; `ui-craft` excludes typography/layout grouping. No full-repository `apple-review` audit was opened.

**Tools/checks:** Read `Settings.swift` and product context; inspected font roles, constraints, stack spacing, and form structure. No build or simulator invoked; no code edited.

**Verification limits:** Source-only findings. No Xcode project or preview supplied; Dynamic Type, clipping, rendered typeface, and scrolling were not empirically verified.

**Actual response:**

- **High — constrained content (`Settings.swift:11,13`).** A 760-point outer width cannot adapt to a narrow iOS container, and the helper has a single-line, 110×12-point frame. Remove these rigid constraints, allow the helper to wrap, and use a scrolling settings layout so larger Dynamic Type can remain reachable.
- **Medium — reversed hierarchy (`Settings.swift:6–7`).** “Account settings” uses caption styling while “Optional newsletter” uses large-title styling. Make the account title the primary heading and treat the optional newsletter as a secondary section.
- **Medium — weak grouping (`Settings.swift:5,8–10`).** The 32-point gap separates the field label from its control while the surrounding stack uses only 4 points. Group the label, input, and explanation closely; separate that group from newsletter content. A Form with Sections is a suitable native structure if it preserves Harbor's approved density.
- **Medium — missing explicit product typography (`Settings.swift:6–11`).** The supplied view chooses built-in font roles without expressing the approved Georgia family. Route these text roles through a Georgia configuration that scales with Dynamic Type. The isolated fixture does not establish any external theme that already supplies this behavior.

## editorial

**Chosen skill:** Explicitly requested `design-pages audit`. Read the audit instructions and relevant anti-pattern, layout, and slop-test references. The user's instruction to preserve the approved identity supersedes the skill's blanket italic-heading ban. Contextual prose links are not automatically treated as button labels.

**Tools/checks:** Source inspection of `editorial.html` and product contract. Checked viewport metadata, table markup, typography declarations, and link styles. No edits.

**Verification limits:** No rendering; actual mobile wrapping, browser default link colors, font availability, zoom, and contrast remain unverified. No invented design score or claim that the page “looks AI-generated.”

**Actual response:**

- **Major — mobile viewport configuration (`editorial.html:1`).** The document has no viewport meta tag, so mobile browsers can use a wider layout viewport and shrink the page instead of presenting its intended reading width. Add `width=device-width, initial-scale=1`, then verify the page at Harbor's supported widths and 200% zoom.
- **Minor — action-color contract not applied (`editorial.html:2,4`).** The archive link has no declared action color, leaving its appearance to browser defaults instead of Harbor's approved navy role. Apply the named action role while retaining a clear link affordance and distinguishable interaction states.

Preserve Georgia, italic editorial headings, sentence case, the compact table, and tabular numbers. The long archive link can wrap naturally as contextual text; shortening it or forcing a single line requires evidence of a real layout problem. This is a source review, not rendered verification.

## language

**Chosen skills:** None. The baseline descriptions offer no direct cross-platform product-language/localization audit. `edit-in-authentic-voice` addresses humanizing/de-slopping a draft; this request concerns terminology and state truth. Used a scoped source review against the fixture's explicit contract.

**Tools/checks:** Read and compared `copy.json` keys and context across web, iOS, and Spanish. No files edited and no localization runtime executed.

**Verification limits:** Only supplied keys were reviewed. Recovery mechanisms and error-code formatting are unspecified; no assertion that a retry, undo control, archived-items screen, or preserved-data guarantee is implemented. Spanish copy proposals do not constitute native-speaker or rendered localization QA.

**Actual response:**

| Key | Corrected string | Reason |
| --- | --- | --- |
| `web.archive_toast` | `Project archived` | Matches the actual reversible action and the shared object name; aligns with iOS. |
| `web.save_error` | `Couldn’t save changes. Error code: {code}.` | Reports the known failure without inventing its cause or guaranteeing data safety. Add a concrete retry or other recovery instruction only when its behavior is established. |
| `web.delete_action` | `Delete project` | Names the action instead of requiring the user to interpret “Yes.” |
| `web.delete_cancel` | `Cancel` | Makes the safe exit explicit. |
| `ios.permission_intro` | `Notifications are optional. You can use Harbor without them.` | Corrects the false requirement without promising unspecified notification features. |

Keep the approved empty-state text, delete question, navigation, archive buttons, iOS archive toast, and supplied Spanish strings. “Projects” / “Proyectos” and “Project archived” / “Proyecto archivado” already agree.

Replace the concatenated `string_builder` with locale-aware complete plural messages. English: singular `You have {count} project`; plural `You have {count} projects`. Spanish: singular `Tienes {count} proyecto`; plural `Tienes {count} proyectos`. Let the platform's localization system choose categories, including zero, and format the count; do not append a translated noun fragment.

Where the same corrected states exist in Spanish, equivalent proposals are `No se pudieron guardar los cambios. Código de error: {code}.`, `Eliminar proyecto`, `Cancelar`, and `Las notificaciones son opcionales. Puedes usar Harbor sin ellas.` The fixture does not establish that these keys currently exist. For archive recovery, retain a reversible path and label an undo action `Undo` / `Deshacer` only if such an action is actually implemented.

## consolidation

**Chosen skills:** None as a direct lead. No baseline description owns consolidation of design patterns. Read `web-react` after considering its React-review route, but its performance rules do not establish semantic component ownership. `design-md` would add an unrequested documentation deliverable. Applied a bounded source inventory against `system/patterns.md`.

**Tools/checks:** Read all four files under `system/`; traced every imported button to its use and compared tokens, lifecycle annotations, handlers, and the explicit contract. No code changes, type checking, or runtime tests.

**Verification limits:** Only fixture consumers were traced. No inference that equal color values imply equal semantics; no runtime equivalence or accessibility guarantee.

**Actual response:**

1. **Use Button as the shared owner.** `system/patterns.md:2` explicitly establishes it as current. Move the `LegacyButton` save consumer (`system/consumers.tsx:2`) to Button; its deprecation marker already names that replacement (`system/buttons.tsx:3–4`). Remove the legacy export only after checking remaining consumers.
2. **Keep the compact table variant.** `CompactButton` intentionally uses the 4px compact spacing token (`system/buttons.tsx:2`, `system/tokens.css:1`). Share implementation through a size variant or a wrapper around Button while retaining the current compact API and table density. Do not normalize it to the regular 8px padding.
3. **Resolve CheckoutButton's role before merging its API.** It duplicates navy/white styling with a local 9px padding value (`system/buttons.tsx:5`) and is used for saving a project (`system/consumers.tsx:2`). Migrate that demonstrated save use to Button. Before retiring the export generally, establish whether a real checkout-specific behavior exists elsewhere; the fixture does not establish one. Replace local literals with the governing role tokens when the semantic role agrees.
4. **Define the missing destructive role before moving delete styling into the regular action role.** The permanent-delete consumer currently uses Button (`system/consumers.tsx:2`), but the contract requires a distinct role. Agree its semantics and states, then add a destructive variant or dedicated primitive with an explicit role contract. Do not invent a red token merely to complete the inventory.
5. **Migrate and verify by intent.** After the contract decision, compare save, compact-row open, and permanent-delete consumers separately, including labels, handlers, disabled/loading/focus behavior, and any confirmation flow. Check the documented 0.98 press scale and 120ms ease-out if motion is introduced into the shared owner. The current source does not define these states, so consolidation is not yet verified.

## documentation

**Chosen skill:** `design-md`, repository mode scoped to `documentation/`. Read full main instructions. Governing evidence: existing DESIGN.md, `documentation/contract.md`, `documentation/styles.css`, and product purpose from `product.md`.

**Tools/checks:** Preserved the original as `previous-DESIGN.md`. Changed only `fixtures/documentation/DESIGN.md`: added named text color, inserted the required Overview, and retained the single Georgia family and italic editorial-heading decision. Inspected the frontmatter shape and used Python difflib to compare accepted decisions. Selected `dtcg` because the fixture establishes no Tailwind configuration.

Availability probe before the edit: `npm exec --offline --yes=false --cache <arm>/.npm-cache --package=@google/design.md -- design-md lint <DESIGN.md>` failed during package resolution with ENOTCACHED. Canonical lint invocation after the edit: `npx --offline --yes=false --cache <arm>/.npm-cache @google/design.md lint <DESIGN.md>` also failed with ENOTCACHED. The package was unavailable in the isolated cache; no package installation occurred. The CLI never ran, so these are availability failures, not document-lint findings. Export, CLI diff, and specification inspection were not run because the same unavailable package is required. Local text comparison is not a substitute for those checks.

**Verification limits:** Unvalidated document update; no successful schema lint, compatibility export, or parsed-YAML validation claimed. The user explicitly allows a limitation report if required validation cannot run; this overrides the skill's unconditional withholding language. No supported information was deleted to satisfy a missing validator.

**Actual response:**

Updated `documentation/DESIGN.md` with the global `text` role (`#182a40`) from the current contract. Preserved the action color, single Georgia family, and italic editorial headings. No product code changed.

This is an **unvalidated update**: the required `@google/design.md` package was unavailable to the offline, no-install validator invocation. Lint could not run; export and CLI diff remain unverified. A local diff confirmed the approved typography decisions remain intact.

**Edited file:** `fixtures/documentation/DESIGN.md`.

## routing

**Chosen skills:** Routing-only evaluation of baseline descriptions, with already-read bodies resolving scope boundaries. No implementation or additional fixture access.

**Tools/checks:** Compared request intent with the baseline catalog; checked `ui-craft`'s exclusions/exact values, `design-pages`'s audit/build modes, `design-md`'s documentation scope, and `design-with-taste`'s identity scope. No edits.

**Verification limits:** Conditional routing recommendations; no actual interface, flow, or empty states were provided for these requests. No implementation or validation outcome claimed.

**Actual response:**

| Request | Lead and sequence | Clarification needed |
| --- | --- | --- |
| (a) Make this prettier. | No unconditional lead. If an existing web page needs visual direction, `design-pages` audit → scoped redesign; for icons/surfaces/button feel, `ui-craft`. | Identify the target and whether “prettier” means hierarchy, identity, or fine detail. The baseline lacks a broad platform-neutral visual-review owner. |
| (b) Audit this flow. | For web accessibility, forms, and interaction compliance, `ux-review`; for a psychology-grounded confusion/decision-load review, `ux-heuristics`. Neither description is a universal flow-audit route. | Establish platform, flow boundaries, and intended outcome before choosing. |
| (c) Lock the design system into DESIGN.md. | `design-md`: governing evidence → schema-shaped document → lint/export/diff as applicable. | Identify the product/source if absent; clarify ownership only if several products are in scope. |
| (d) Fix the wording of these empty states. | No direct lead in the baseline. Use a scoped product-copy review; `edit-in-authentic-voice` only if humanizing/de-slopping is actually requested. | Need the states, available next actions, terminology, and target languages; avoid inventing capabilities. |
| (e) This feels like every other SaaS. | `design-with-taste` to diagnose identity and the logo-swap problem; then `design-pages` for an approved web-page redesign. | Identify the target and which identity choices are open. Preserve locked decisions. |
| (f) Build a marketing page, then check its visual hierarchy. | `design-pages` build → `design-pages` audit; add `web-react` for React/Next implementation only if that stack is chosen. | Need product brief and target/stack if absent. The build and audit are distinct passes; browser checks need actual rendering. |
| (g) Polish our buttons while preserving documented motion values. | `ui-craft`, scoped to the current component and system; retain documented 0.98 press scale and 120ms ease-out. | No motion clarification needed: the explicit preservation request overrides ui-craft's prescribed 0.96 scale. Ask only if the component or governing document is missing. |

## Scope verification

A SHA-256 comparison of every fixture before/after the pass found only `documentation/DESIGN.md` changed and no fixture removed. Intermediate files and offline npm error logs are confined to this baseline arm. No browser, simulator, live service, or dependency installation was used.
