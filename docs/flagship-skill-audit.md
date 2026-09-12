# Flagship-model skill audit — 2026-09-12

## Verdict

Keep a single portable library. Adopt the useful parts of Claude's format audit, correct its validator and examples, and simplify instructions that can override a capable model's judgment. Preserve each workflow's scope, factual evidence, real access boundaries, and domain-specific contracts.

The source baseline is the user's 26-skill working tree, preserved as commit `c1d5c74` on the isolated `codex/flagship-skills-optimization` branch. The original checkout was not used as an editing destination. The subsequently supplied `think-with-me` skill receives its own preserved baseline and comparison before joining the final library.

This report separates structural validity, controlled routing, behavioral outcomes, and installed state. None alone establishes every other layer. See [evaluation results](evaluations/flagship-skills/evaluation-results.md), [per-skill decisions](evaluations/flagship-skills/skill-decisions.json), and [size measurements](evaluations/flagship-skills/size-comparison.json).

## Why these changes

[OpenAI's Astra guidance](https://developers.openai.com/blog/rethinking-skills-and-prompts-for-gpt-6-astra) recommends concise descriptions, selective references, and revisiting rigid workflows and unnecessary approval stops. [Astra's model guidance](https://developers.openai.com/api/docs/guides/latest-model?model=gpt-6-astra) also calls for proportional testing and completing already-authorized work. These principles support removing instructions that add context or process without changing a useful decision.

[Anthropic's Fable 5.1 guidance](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-1) supports explicit completion criteria, focused scope, targeted file edits, and appropriate communication. Host-level behavior belongs in operating guidance rather than being copied into every domain skill. The library does not encode model effort, hidden reasoning procedures, or vendor API parameters in portable frontmatter.

## Findings addressed

| Priority | Finding | Correction |
| --- | --- | --- |
| High | Descriptions and large entrypoints impose substantial unconditional context. `design-pages`, `apple-swift`, and `hatch-pet` dominate the load. | Shortened discovery text; converted large workflows into selective routers while retaining reference material and pet scripts. |
| High | Old design-study instructions conflict with the newer design-md ownership and can recreate a competing schema. | Kept the current ownership decision and rewrote the extracted study handoff. |
| High | Literal stage stops can interrupt an explicitly combined request. | Kept audits read-only while allowing already-authorized downstream work through the correct owner. |
| Medium | Theme rotation, eight mandatory states, append-only CSS, broad research, and full-device testing can expand small edits. | Made these choices depend on the actual product, task, and changed behavior. |
| Medium | Swift concurrency guidance treats a toolchain version as proof that caller-actor defaults are enabled. | Required inspection of language mode, actor isolation, and `NonisolatedNonsendingByDefault`; removed incidental build-setting migrations. |
| Medium | The proposed validator accepts sibling-prefix escapes and treats example Markdown as dependencies; its old parser mishandles YAML types and multiline limits. | Added real YAML/Markdown parsing, package-boundary checks, recursive reference-link checks, and targeted regression tests. |
| Medium | Documentation workflow withholds useful output when optional tooling cannot run. | Allowed explicitly unvalidated drafts; distinguished unavailable tools from actual schema failures. |
| Medium | Some examples imply that configured CI or a release tag proves functionality or completion. | Replaced them with examples that require actual execution and acceptance evidence. |
| Medium | Editing word bans can remove precise technical terms, and examples can suggest invented numerical evidence. | Made the vocabulary list contextual and made example numbers conditional on source evidence. |
| Low | Packaged references still point outside the skill to upstream site files. | Replaced stale relative paths with verified paths at the recorded upstream commit. Output-template links remain fenced examples. |

The Swift correction follows the [compiler's feature documentation](https://github.com/swiftlang/swift/blob/main/userdocs/diagnostics/nonisolated-nonsending-by-default.md): the flag changes nonisolated async execution semantics; Swift 6.2's availability alone does not establish that it is enabled.

## Claude PR review

Reviewed [PR #2](https://github.com/jonathan-arteaga/arteagas-ai-skills/pull/2), head `c7e1cc1ada0fd38de95f15653e6cf703cbce1382`, base `77ac2abfd39a6c3e613bf6791a68e68d4b67a021`. The branch audited the committed 23-skill library, not the user's later local additions and ownership changes.

| Change | Decision and reason |
| --- | --- |
| Swift/reference extraction | Adopted the references and went further on the entrypoint; corrected configuration-sensitive concurrency claims. |
| SwiftUI component index | Adopted direct routing; removed maintenance instructions from the task-facing workflow. |
| Contents lists | Retained useful navigation and regenerated lists from the revised headings so they do not describe deleted sections. |
| Offline UX guideline snapshot | Adopted with its dated source and license; preserved the newer scope and precedence constraints. |
| `compatibility` and dollar escaping | Adopted. These address actual environment requirements and Claude Code argument substitution. |
| Design-study extraction | Rewritten against the current local ownership decisions; not copied verbatim. |
| Four output examples | Rewritten to avoid stale inventory counts, false proof, and accidental architecture choices. |
| Validator | Reimplemented the useful intent with parsed YAML/Markdown and regression coverage. Diagnostics distinguish format, packaging, host, and editorial concerns. |
| Reserved words and XML restrictions | Labeled as Claude host constraints, not universal Agent Skills specification requirements. |
| `hatch-pet` warning exception | Replaced the whole-skill exemption with documented exceptions for `CODEX_HOME` and `$imagegen`, conditional on explicit Codex-only compatibility. Other warnings remain visible. |

This is a recommendation to integrate the revised work, not an approval or execution of a merge. No PR comments or external messages were posted.

## Per-skill disposition

| Skill | Decision | Change or retained strength |
| --- | --- | --- |
| apple-review | Keep | Preserved evidence-first platform review; shortened trigger and recognized CLAUDE.md. |
| apple-swift | Correct | Split language guidance into selective references; made concurrency flag-dependent and preserved project architecture/test conventions. |
| apple-swiftui | Simplify | Inlined direct component routing; removed reference-authoring instructions and compulsory tab/router scaffolding. |
| connector-doctor | Correct | Kept diagnostic reads scoped; allowed an explicit handoff when the user already authorized repair. |
| design-md | Correct | Kept the document schema/ownership; separated missing tooling from failed checks and allowed labeled unvalidated drafts. |
| design-pages | Correct | Replaced the itinerary with scope routing; removed theme rotation, mandatory state expansion, duplicate documentation authorship, and stage reapproval. |
| design-reference-scout | Keep | Preserved selected-source priority and bounded research; shortened discovery text. |
| design-style-synthesis | Correct | Preserved evidence maturity and original identity; continued already-authorized next stages without changing reference projects. |
| design-system-consolidator | Keep | Preserved incremental migration and classification of intentional variants; shortened discovery text. |
| design-with-taste | Simplify | Kept product distinctness; removed an arbitrary minimum number of identity changes. |
| draft-in-authentic-voice | Keep | Preserved evidence-based voice matching, factuality, and channel-specific prose; shortened trigger. |
| edit-in-authentic-voice | Correct | Made word lists contextual; preserved technical terms/quotes and removed examples that could manufacture numeric claims. |
| frame-concept-build | Simplify | Kept one-question scope; allowed supplied in-scope data and added a concrete evidence example. |
| frame-product-build | Correct | Removed the unconditional stop for combined requests; kept consequential questions and platform decisions. |
| hatch-pet | Simplify | Routed production, generation, look directions, workers, and acceptance into references; kept v2 invariants and all 17 scripts unchanged. |
| mobile-screens | Correct | Removed mandatory ten-screen research, aesthetic counts, state-library migrations, and full-device testing for small edits. |
| product-language | Keep | Preserved approved terminology, localization boundaries, and truthful consequence wording; shortened trigger. |
| think-with-me | Correct | Kept the calibrated exploration/execute boundary; shortened the trigger and separated fictional subjects from the user’s personal profile. |
| ui-craft | Keep | Preserved existing identity/precedence and focused polish; improved navigation in long references. |
| ux-heuristics | Keep | Preserved source licensing and graceful unavailable-source handling; declared compatibility. |
| ux-review | Correct | Added the dated offline snapshot without losing current scope/identity precedence; reports live versus snapshot use. |
| validate-project-claims | Correct | Added examples distinguishing configured CI, actual runs, tested behavior, and acceptance evidence. |
| visual-fundamentals-review | Keep | Preserved source/render distinction, identity, and review-only behavior; shortened trigger. |
| web-react | Simplify | Preserved selective performance references; prohibited incidental dependency/architecture migration to follow a recipe. |
| work-pattern-audit | Correct | Preserved history/domain boundaries; allowed handoff to already-requested implementation. |
| write-readme | Correct | Added a small-edit path; fenced destination-repository template links and avoided unrequested whole-file restructuring. |
| write-reproducible-demo | Simplify | Made testing proportional; added an example without stale library counts or fabricated CI evidence. |

## Validation and reproducibility

- `pnpm check` retains the existing test/validation/Codex-preview gate. The expanded tests exercise actual YAML values, nested reference links, sibling-prefix traversal, symlinks, code examples, host exceptions, and CLI exit behavior.
- Strict validation checks every entrypoint and Markdown link in the packaged reference tree. Editorial warnings remain distinct from packaging failures.
- All 17 pet scripts retain their original bytes. Syntax and each `--help` interface were checked with the bundled Python/Pillow runtime. This is not an end-to-end pet-generation or image-quality test.
- The opt-in [trial runner and fixtures](evaluations/flagship-skills/README.md) retain exact prompts, fixture bytes, library hashes, versions, and outputs. Raw host logs stay in local scratch storage; published results contain normalized synthetic evidence.
- Two initial Codex invocations failed before reaching the model because of incompatible CLI options; they are excluded. Initial native-Claude trials that did not load the assigned skill are also excluded and rerun with explicit file loading.
- Cursor did not advertise or accept Astra. At the user's request, Grok 4.6 High was used as the additional Cursor configuration; Grok 4.7 was not listed. The original Astra target remains tested in Codex.

## Bundled Skill Creator fix

The [Agent Skills specification](https://agentskills.io/specification#compatibility-field) permits `compatibility` as an optional, non-empty string of at most 500 characters. Both the installed quick validator and its public upstream version omitted that property. Following the user's explicit request, a minimal local patch added the field and its type/length checks while preserving newer bundled TODO checks.

Eight regression tests passed against both the candidate and installed validator, and every revised skill passed after the fix. The original file, patch, hashes, and tests are delivered separately in `skill-creator-validator/`. PyYAML was supplied through an isolated task dependency directory. System Python was not changed. This local system-skill patch may be replaced by a Codex update; no upstream patch was published.

## Limits and deferred work

All entrypoints were reviewed for routing, scope, completion, and context cost. Supporting files were inventoried, structurally checked, and inspected selectively for conflicting or outdated instructions. This is not a fresh correctness certification of every upstream React, Swift, design, or platform recipe. Framework-version claims still require verification in the target project, and measured performance advice remains conditional.

Behavioral cases are small synthetic tasks, not statistical benchmarks or production work. Routing classifications do not prove automatic skill activation in every host. Where file access was explicit, report that fact. Timing depends on caching, host tooling, and service conditions; avoid broad speed or model-ranking claims from single pairs.

Global skill copies were not synchronized and Claude's PR was not merged. Preview skips do not imply matching bytes; the installed-state comparison distinguishes missing, identical, different, and symlinked destinations. The original checkout, unrelated installed skills, and existing integrations remain separate from this revised branch.
