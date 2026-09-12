# SwiftUI visual review

- Inspect semantic text styles and text scaling, layout priorities, fixed frames, line limits, truncation, and container choices. A fixed frame is not inherently wrong; identify the content or supported window size it cannot accommodate.
- Use current previews, simulator/device captures, or supplied images for visual conclusions. Inspect relevant Dynamic Type sizes, iPad or macOS window resizing when supported, themes, and localized content. Source-only review must name these as unverified.
- Keep native system colors, controls, navigation, lists, and platform density when appropriate. Points, CSS pixels, and text styles are not interchangeable. Do not prescribe CSS, browser font smoothing, or a web type scale.
- Check how labels remain associated with values and controls when rows expand. Prefer preserving semantic hierarchy and readable content over shrinking text to fit.
- Route VoiceOver, keyboard behavior, accessibility contrast settings, and platform-specific interaction compliance to `apple-review` when available. A screenshot does not prove these behaviors.
- Handoff implementation to the existing SwiftUI workflow. Review findings should not create a new view architecture or custom control system.
