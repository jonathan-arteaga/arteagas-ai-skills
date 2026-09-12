# Component scope

Use this flow when the requested work concerns one control, card, dialog, or similar component. Component scope follows the actual target; it does not depend on a word count or two matching signals.

Inspect the component, nearby examples, design tokens, and its consumers. Preserve its public props, accessible semantics, and established identity unless the task requires changing them. Implement only states the component actually exposes. A static card does not need invented loading/error/success APIs.

Make the requested change in the existing files. Add a demonstration or story only when requested or when the repository uses that mechanism to verify components. Do not generate a standalone demo page, theme, token file, design log, hero, navigation, or footer by default.

Test the changed interaction and relevant responsive/focus behavior. State what was checked and what remains. For an audit-only request, return findings without modifying the component.
