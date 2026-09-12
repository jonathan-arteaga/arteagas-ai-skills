# Web visual review

- Inspect the rendered foreground/background pair, including opacity, images, overlays, theme, and state. A computed ratio from declared solid colors is useful but does not prove the runtime pairing. Use available measurement tools and identify the method.
- Trace computed font family, size, weight, line height, and available font faces. Do not infer a loaded face from a CSS declaration alone or apply font smoothing as a universal fix.
- Compare DOM reading order with intended visual order. Review keyboard/focus risks as handoffs; do not claim a full accessibility audit.
- Test supported viewport/container widths and zoom, including 200% when applicable. Prefer content-driven reflow to arbitrary device rules. Do not conceal overflow with clipping merely to pass a width check.
- Long labels may wrap if the control remains understandable and usable. Keep full information available when truncation is necessary. Fixed text boxes, tiny labels, and forced no-wrap need evidence of resilience under zoom and localization.
- Use logical direction and real RTL content when applicable. Pseudo-localization can expose growth problems; it does not replace review of a real translation.
- Respect existing CSS, Tailwind, and component tokens. Suggest a local correction in that system; do not introduce a second palette, font stack, token file, or dependency for an audit.

Without runtime access, report declaration-level findings and the exact render checks still needed. Do not describe an unrendered fixture as visually verified.
