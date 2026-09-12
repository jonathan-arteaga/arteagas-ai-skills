# Localization readiness

- Inspect complete messages and their parameters. Use the existing message/plural system; do not assemble sentences from translated fragments or assume English word order and plural rules.
- Preserve placeholder names, resource keys, interpolation types, plural/select branches, translator comments, and accessibility relationships unless the requested migration explicitly changes them.
- Trace resource consumers before renaming a key. A visible copy edit does not require a key rename. Check fallback and missing-key behavior using existing tooling.
- For English/Spanish work, inspect the requested journey in both languages, including labels, buttons, errors, empty states, and confirmations. Preserve existing approved translations. Make shared terminology decisions explicit; distinguish proposed translations from native-language-reviewed copy.
- Identify idioms, ambiguous abbreviations, device-specific verbs, and formats that do not travel well. Use audience and locale context rather than a global ban on humor or colloquial voice.
- Rendering is a separate check: test long strings, plurals, text scaling, and applicable RTL. Pseudo-localization tests space, not linguistic quality.
- Web projects retain their current ICU/i18n resource conventions. Apple projects retain string catalogs or strings/stringsdict and platform permission resources. React Native projects retain their configured localization system. Do not install a new translation framework for copy work.
