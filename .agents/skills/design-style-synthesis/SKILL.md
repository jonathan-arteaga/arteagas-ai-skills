---
name: design-style-synthesis
description: "Analyze two or more user-selected local app or website projects and turn recurring visual evidence into a concise, original design direction for a new app. Use when the user invokes design-style-synthesis, or asks to synthesize visual patterns across their local projects. Do not use for external reference research (design-reference-scout), one-product design documentation (design-md), a general taste lens without selected projects (design-with-taste), work-history analysis (work-pattern-audit), or implementation."
license: MIT
metadata:
  owner: jonathan-arteaga
  kind: original
  source: local
---

# Synthesize a design direction

Turn evidence from selected local projects into an original direction that serves a new app's purpose.

## Establish the evidence base

Resolve the projects the user selected to concrete local roots. Use supplied paths or a scoped project index to resolve names; ask when a name is ambiguous. Do not roam unrelated repositories or the home directory. Keep employer, client, household, and personal material within the user's explicit scope.

Identify the target app's purpose, audience, platform, and primary task from the request and available project context. Ask only for missing information that would change the direction.

Inspect current design briefs, tokens, representative components, typography, brand sheets, screenshots, and rendered surfaces where available. Include design sheets alongside individual screens so a striking mockup does not stand in for the whole system. Record concrete paths or surfaces and identify superseded or actively changing artifacts.

Label evidence as implemented source, rendered product, prototype, or exploratory concept. A rendered brand sheet is still a prototype; source code alone does not establish runtime behavior. Inspect visual artifacts before describing composition or rhythm. Exact fonts, colors, or dimensions require source or measured evidence; static images do not establish motion or usability. Disclose missing or stale previews without repairing or launching the project as part of synthesis.

## Compare and translate

1. Characterize each project independently across the dimensions that matter: hierarchy, density, typography, color behavior, layout, navigation, surfaces, imagery, icons, and interaction feedback.
2. Promote a signal as shared only when it occurs independently in at least two projects. A shared starter, fork, framework default, or copied token file counts as one lineage. State which projects support the signal rather than implying it spans the entire set.
3. Separate portable craft principles, source-specific identity, shared technical substrate, and explicit target-app choices. Treat a small sample as a working taste hypothesis, not a permanent preference profile. Existing taste guidance can inform judgment but is not evidence of what these projects contain.
4. Report conflicts and exceptions. Do not average incompatible styles or invent consensus. With fewer than two usable independent projects, explain the evidence gap and offer only clearly labeled observations from the available sources.
5. Translate supported craft principles into the target app's primary task. Write one product-specific thesis and concrete rules that explain how hierarchy, information density, emphasis, and interaction should serve that task.

Preserve the references' standard of craft while making the target's identity original. Do not blend or transplant their palettes, layouts, marks, components, materials, or imagery. An explicitly chosen target font or other constraint remains a user decision, not an inferred shared preference. Possession of an asset does not establish reuse or embedding rights; flag unknown rights without retrieving or copying assets.

## Boundaries and handoff

This workflow reads and reports. Stop before asset retrieval, file edits, concepts, mockups, Figma work, or implementation. Saving a direction brief requires a separate explicit request. Never modify reference projects or turn the analysis into a new permanent taste profile.

Keep the method portable: no required Computer History, GitHub, browser service, or other connector. Use the tools available to inspect the selected evidence.

Route adjacent work to its existing owner:

- External reference research: `design-reference-scout`.
- One-product design documentation: `design-md`.
- General identity guidance or a distinctness review: `design-with-taste`.
- A supplied web URL or screenshot study: `design-pages`.
- Unresolved product definition: `frame-product-build`.
- Accepted direction to implementation: `apple-swiftui`, `mobile-screens`, or `web-react`, with `design-pages` for web-page design where appropriate.

For a combined synthesis-and-build request, finish this report as the synthesis stage and make the implementation handoff explicit. Do not treat the proposed direction as a validated design or a completed app.

## Report

Aim for one page, led by the direction name and one-sentence thesis:

- **Evidence base:** selected projects, inspected paths or surfaces, artifact state, and a short read of each reference.
- **Shared signals:** three to five supported principles, each with its source evidence and practical target translation. Use fewer when evidence is limited.
- **Do not carry:** source-specific identity, inherited defaults, and incompatible patterns to leave behind.
- **First-screen test:** one representative screen or flow and observable conditions for assessing the proposed direction in later exploration.
- **Limits and next handoff:** conflicts, missing evidence, unverified asset rights, and the next decision or matching skill.

If the evidence does not support a shared direction, say so and identify the smallest missing input that would make the synthesis useful.
