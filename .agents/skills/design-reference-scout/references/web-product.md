# Web and product UI references

Read the project's components, tokens, Storybook, screenshots, and layout conventions before opening anything external. Note which components and tokens the system marks current, experimental, or deprecated (Storybook status, `@deprecated` annotations, migration notes) so the direction builds on what the team still ships.

## Component sources

- [shadcn/ui](https://ui.shadcn.com/) — source-owned accessible primitives for projects that already use shadcn or choose it on purpose.
- [Beautiful UI](https://www.beautifului.dev/) — crafted primitives for AI-native interfaces.
- [ReUI](https://reui.io/components) — component anatomy and interaction references.

## Composition sources

- [Refero](https://refero.design/) — product UI and web screenshots.
- [Supahero](https://supahero.io/) — hero composition.
- [Footer Design](https://www.footer.design/) — footer structure and information hierarchy.
- [Recent Design](https://recent.design/) — current web-design references.

## Selection

- Product UI: the existing design system plus at most two focused product references.
- New landing page: one composition source and one compatible component source.
- Existing shadcn project: shadcn is the implementation source. Do not swap in a second primitive library.
- Redesign from a supplied URL or screenshot: study that target and add at most one supporting source.

## Constraints to report

Keep route behavior, component ownership, breakpoints, tokens, accessibility states, and the project's icon and font families. Name deprecated components and primitive tokens under Do not carry so the build reaches for the current component and the semantic role token instead. Do not add a second component system to reproduce one visual detail.
