---
name: ux-heuristics
description: "Review a flow or screen against named UX psychology laws — choice count, grouping, feedback timing, progress, memory limits, and end moments — citing lawsofux.com at runtime. Use when the user invokes ux-heuristics, or asks why a flow feels confusing, slow, or overwhelming, or wants a psychology-grounded reason for a UX decision. Do not use for code-level accessibility and forms compliance (ux-review), polish values (ui-craft), or visual direction (design-pages, design-with-taste)."
license: MIT
compatibility: "Fetches law pages from lawsofux.com at review time. Without network access it degrades to the law name plus URL and marks takeaways Not fetched."
metadata:
  owner: jonathan-arteaga
  kind: original
  source: local
---

# Review UX against psychology heuristics

Explain why a flow feels confusing, slow, or overwhelming by naming the psychology law it works against, then propose the fix that law implies.

This skill works on web, Expo/React Native, and SwiftUI. It reads code, screenshots, or a written description of the flow. It cites [Laws of UX](https://lawsofux.com) by Jon Yablonski as its reference and fetches each cited law live instead of carrying the text.

## Workflow

1. **Scope the review.** Name the flow (onboarding, checkout, settings, search), the single screen, or the one decision the user wants justified. Read what exists: source files, screenshots, or the description. Ask only when the flow's start and end are genuinely unclear.
2. **Walk the flow and note symptoms.** For each step, record what the user must decide, remember, find, or wait for. Map each symptom to a law with [references/laws-index.md](references/laws-index.md). Cite a law only when it changes a decision, and cap the review at about seven laws. A finding that fits several laws cites the most specific one.
3. **Fetch the takeaways for each cited law.** Request `https://lawsofux.com/<slug>/` with the header `Accept: text/markdown` and read the Takeaways section to sharpen the fix. If the fetch fails, keep the finding, cite the law name and URL, and mark takeaways `Not fetched`.

   ```bash
   curl -sL -H 'Accept: text/markdown' https://lawsofux.com/hicks-law/
   ```

4. **Verify numeric claims against the code where possible.** Feedback under 400 ms, the count of options in a menu, the number of fields per step, the size and spacing of touch targets. State what you measured and what you estimated.
5. **Hand off what belongs elsewhere.** Web accessibility, focus, and form compliance go to `ux-review`. Motion values and surface polish go to `ui-craft`. Expo/RN native fidelity goes to `mobile-screens`; SwiftUI patterns go to `apple-swiftui`.

## License

Laws of UX content is licensed CC BY-NC-ND 4.0 by Jon Yablonski. Paraphrase takeaways in the report and link the law page. Do not paste law pages, takeaways, or examples into repository files, and do not add them to this skill.

## Boundaries

- Do not invent a law or stretch one past what its page says. When no law fits, report the observation without a citation.
- Do not run an accessibility audit or a visual audit here.
- Do not make lawsofux.com a hard dependency. Degrade to the law name plus URL when it is unreachable.
- Do not tag every element. Fewer, sharper findings are worth more than a full catalogue pass.

## Report

Lead with the findings table, ordered by severity:

| Severity | Location | Law | Observation | Fix |
| --- | --- | --- | --- | --- |

`Severity`: `HIGH` blocks or misleads the user at a decision point, `MEDIUM` adds avoidable effort or waiting, `LOW` is a missed opportunity. `Location` is `path/to/file:line`, a screen name, or a step number. `Law` is the law name linked to its page. `Fix` is the concrete change, not the takeaway restated.

Then list every law URL consulted, any fetch that returned `Not fetched`, and any check marked `Not verified`.
