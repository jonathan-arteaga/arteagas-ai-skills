---
name: design-reference-scout
description: "Research and distill at most three current visual references before a new visual direction. Use when the user invokes design-reference-scout, or visual direction is still open and they want references researched. Do not use when a reference is already chosen, for DESIGN.md writing (design-md), design-pages study of a supplied URL or screenshot, or routine implementation inside a locked system."
license: MIT
metadata:
  owner: jonathan-arteaga
  kind: original
  source: local
---

# Scout design references

Ground a new visual direction in a few real sources. Do not dump a reference library into the prompt and leave it there.

## Start with the project

Read the repo, attached files, and the current product before looking elsewhere. Check for a `DESIGN.md`, tokens, components, type, icons, brand files, screenshots, and platform limits.

- Keep an existing system unless the user asked for a redesign.
- If they already named a reference, study that one. Do not hunt for substitutes.
- Skip outside research when the change is fully determined by what is already in the project.

## Route the request

Load only the file that matches the work:

- Native Apple platforms: [references/native-apple.md](references/native-apple.md)
- Expo or React Native: [references/mobile-cross-platform.md](references/mobile-cross-platform.md)
- Web, product UI, dashboards, landing pages, or component systems: [references/web-product.md](references/web-product.md)
- Logos, identity, brand systems, or type: [references/brand-type.md](references/brand-type.md)
- Motion, transitions, interface icons, or symbol systems: [references/motion-icons.md](references/motion-icons.md)

Open a second file only when the work honestly spans both, such as an iOS app icon or a web identity system.

## Research contract

1. Inspect at most three external sources before proposing a direction. Prefer what the user supplied, then current first-party platform guidance, then a focused visual archive.
2. Open the live page or the supplied artifact. Do not rely on a snippet, a directory listing, or a remembered look.
3. Record each URL and what it taught.
4. Pull abstract principles: hierarchy, density, navigation, component anatomy, type roles, color behavior, image treatment, motion purpose, and accessibility consequences.
5. Do not copy a protected mark, a distinctive composition, a branded illustration, a proprietary asset, or another product's full identity. Name what must not travel.
6. Confirm the license and a legal implementation path before recommending a font, icon set, illustration, or downloadable asset. If you cannot confirm it, label it unverified and do not ship it.

## Direction handoff

Return a short grounding block before anyone builds:

- **Direction:** one sentence for the proposed visual system.
- **Sources:** up to three URLs, each with one useful observation.
- **Carry forward:** three to five principles to apply.
- **Do not carry:** copied brand marks, unfit patterns, or accessibility risks.
- **Implementation constraints:** tokens or components to keep, deprecated ones to avoid, plus any verified license limits.

Then hand off to the matching skill:

- SwiftUI views: `apple-swiftui`. Swift language: `apple-swift`.
- Expo or React Native screens: `mobile-screens`. Do not assume the Appllama MCP is connected; do not load `appllama-usage` from this library.
- Web or product UI: the project's design system first, then `design-pages` or `ui-craft` when their trigger matches.
- Raster concepts or brand exploration: the available image-generation tool.

This skill grounds direction. It does not implement, run accessibility tests, verify a simulator or browser, or replace the project's source of truth.

## Boundaries

- Do not install a plugin, connect an MCP, buy a font, start a subscription, or invent a new design system unless the user asked for that.
- Do not claim trademark clearance or legal approval for a logo or name.
- Do not make a reference site a permanent dependency. If it is down, use another approved source or say so.
- Keep local and cloud claims separate. A user-level local skill does not prove the same skill exists in a remote agent.

## Report

Lead with the grounding block. State which reference file you loaded, how many sources you opened, and what you left unverified.
