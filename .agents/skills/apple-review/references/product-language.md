# Apple product-language checks

`product-language` owns cross-platform wording, terminology, glossary, and broad rename mapping. Use it when those concerns are in scope; keep this reference as the Apple-specific overlay. If it is unavailable, state the missing handoff and complete the platform checks supported by evidence.

- Check platform terminology for the actual control/action and supported OS against current Apple guidance when uncertain. Preserve intentional product terms that do not misrepresent system behavior.
- Inspect permission explanations and usage-description resources against actual requested capabilities and optional/required behavior. Copy must not invent a reason, imply optional permission is mandatory, or promise unsupported recovery.
- Trace string catalogs, strings/stringsdict, interpolation, plural branches, translator comments, and call sites. A visible wording correction must not silently change resource keys or behavior.
- Inspect localized navigation, menus, keyboard shortcut labels, alerts, and system presentations in the relevant iOS/macOS context. Leave accessible names, hints, announcements, and reading order to the accessibility reference.
- For English/Spanish journeys, verify relevant resources and identify native-language/render checks still needed. A build does not establish linguistic quality or fit at large Dynamic Type sizes.

Report platform-specific findings and validation alongside the shared language findings once. Do not maintain a second glossary or repeat general writing rules here.
