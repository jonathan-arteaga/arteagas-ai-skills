# UI, UX, and product coherence

## Inspect

- SwiftUI, UIKit, or AppKit views and reusable components
- Navigation, information architecture, and full screen-state coverage
- Typography, color, spacing, assets, dark mode, and accessibility modifiers
- Motion, previews, snapshots, and design tokens when present

## Audit

- Product clarity, hierarchy, navigation, and layout rhythm
- Component consistency and reuse
- Calls to action, forms, and loading, empty, error, and success states
- Platform fit across iOS and macOS
- Whether visual choices support the existing product direction

## Improve safely

- Fix high-confidence inconsistencies in spacing, hierarchy, labels, and
  component use.
- Add missing states when intended behavior is clear.
- Consolidate repeated one-off styling only when the abstraction is genuinely
  shared.
- Preserve distinctive product choices that remain usable.
- Propose larger redesigns with concrete screens and evidence before building
  them.

## Verify

Build affected targets and inspect relevant previews, snapshots, simulator
states, sizes, themes, and accessibility settings. Name screens that still need
human visual review and provide a focused screenshot checklist.
