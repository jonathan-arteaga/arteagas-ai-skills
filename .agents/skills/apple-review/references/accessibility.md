# Accessibility

## Inspect

- VoiceOver labels, hints, traits, grouping, headings, and reading order
- Dynamic Type, text truncation, and layout at accessibility sizes
- Color contrast and information conveyed only by color
- Keyboard navigation, focus order, focus visibility, and menus on macOS
- Hit targets and custom-control accessibility roles
- Reduced Motion, Reduce Transparency, and Increase Contrast behavior
- Form validation, errors, status announcements, images, and icons
- Localization interactions with labels and layouts

## Improve safely

- Add missing labels, hints, traits, and roles when intent is unambiguous.
- Replace color-only status with text, symbols, or accessible values.
- Make obvious custom controls focusable and keyboard-operable.
- Improve text scaling and accessible error messages without changing product
  meaning.
- Remove or reduce nonessential motion when the system preference is enabled.

## Verify

Run available accessibility tests and build the affected targets. Name the
remaining manual checks: VoiceOver navigation, largest Dynamic Type sizes,
keyboard-only use, contrast, and reduced-motion behavior.
