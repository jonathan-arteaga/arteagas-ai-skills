# Expo and React Native references

Treat native platform behavior as the quality bar. Keep the cross-platform implementation limits in view.

## Sources

- [Appllama](https://appllama.io/) — public category patterns from shipping mobile apps. The paid MCP is optional; do not assume it is connected.
- [Refero](https://refero.design/) — focused mobile screens and flows.
- [Load More](https://loadmo.re/) — unusual mobile-web and interaction references when the brief wants exploration.
- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/) — iOS behavior and accessibility floor.

## Selection

- iOS-first Expo: HIG plus one visual archive.
- Category flow such as onboarding, subscription, checkout, or habit tracking: two visual archives at most.
- Prefer screenshots or screen IDs the user already supplied over open browsing.

## Handoff

Pass the grounded direction to `mobile-screens`. Name each transition as push, replace, modal, sheet, or overlay. Require semantic colors, reduced-motion behavior, accessible controls, and a full-flow simulator check.
