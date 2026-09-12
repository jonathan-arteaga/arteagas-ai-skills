---
name: product-language
description: "Draft, review, or improve interface strings and terminology across web and native apps. Use for UI names, labels, CTAs, instructions, errors, empty states, confirmations, permissions copy, or localization readiness. Not author-voice prose, translation services, accessibility markup, or navigation restructuring."
license: MIT
metadata:
  owner: jonathan-arteaga
  kind: fork
  source: https://github.com/jakubkrehel/skills
---

# Make product language consistent and useful

Help users understand the product and act confidently. Start with the words and behavior already established.

## Establish context and mode

Read nearby strings, the product glossary, approved voice/capitalization rules, relevant UI states, and localization conventions. Establish what each action really does and which error causes or recovery paths are known.

- **Draft:** Return proposed strings for the requested states and constraints.
- **Review:** Return findings and proposed corrections without editing files.
- **Improve:** When changes are requested, update the scoped strings in the project's existing resource format and verify their consumers. Do not change behavior to make a proposed sentence true.

An explicit invocation alone does not turn a review into file edits. If the request is ambiguous, return proposed copy before treating it as an implementation request.

## Review the language

1. Use one term for one concept throughout a flow. Preserve meaningful distinctions such as archive versus delete. Keep platform-specific labels where the underlying action or convention differs.
2. Make action labels identify their consequence. Use precise verbs where appropriate; preserve valid platform conventions. Consequential confirmations should make the action and cancellation understandable.
3. Make errors state the known problem and a supported next step. Never invent an outage, error cause, retry guarantee, saved-data assurance, or recovery capability. When the cause is unknown, say only what failed and offer a recovery path only if it exists.
4. Make empty states orient users and offer a useful next action where available. Distinguish first use, no search results, unavailable data, and insufficient permission rather than applying one template to all four.
5. Preserve approved voice and vary tone with stakes. Explain permissions truthfully, including whether the feature is optional. Do not manufacture urgency or imply optional permission is necessary for the whole product.
6. Apply the existing capitalization and punctuation policy. Plain-language defaults are fallbacks, not grounds to overwrite a coherent brand or localized convention. Preserve precise technical terms the audience needs.
7. Keep labels independent of disappearing placeholders. Review link wording for clear destinations while leaving accessible markup and announcements to the platform accessibility reviewer.

For multiple locales or resource-file edits, read [localization](references/localization.md). For broad terminology changes, read [terminology migration](references/terminology-migration.md).

## Verify and report

Check proposed wording against real behavior and all affected occurrences. Include a concise before/after table with location and reason. For review, order findings by user impact; distinguish misleading consequences from minor style inconsistencies.

For edits, report changed resources, checked consumers, available validation results, and remaining render/native-language checks. Do not present an unchecked translation as approved. Plain words should not hide uncertainty about functionality.

Use `draft-in-authentic-voice` or `edit-in-authentic-voice` when matching an author's prose is the task. `product-language` remains the owner of interface terminology; an explicit voice pass may support it without changing behavior or object names. `apple-review` owns Apple platform/resource checks; `ux-review` owns web semantics, focus, forms, and accessible announcements. Layout capacity belongs to `visual-fundamentals-review`; site taxonomy and flow restructuring stay with the active product/flow workflow. Do not rewrite another review's findings as a second report.
