# React Native visual review

- Establish iOS/Android targets and whether this is Expo. Inspect text scaling, numberOfLines, fixed dimensions, flex behavior, safe areas, and list/container padding against project conventions.
- Verify supported screens and orientation with actual captures when available. Check large font settings, keyboard-visible layouts, themes, and long localized strings. Source alone cannot verify runtime layout.
- Preserve platform control and density differences that serve users. Do not translate CSS units, media queries, browser text wrapping, or font smoothing directly into native recommendations.
- Check that clipped text and actions remain available, and that expanded labels do not separate controls from their meaning.
- Use the installed native implementation workflow for corrections. Report accessibility risks separately and identify assistive-technology checks still needed; do not claim a web accessibility pass covers native behavior.
