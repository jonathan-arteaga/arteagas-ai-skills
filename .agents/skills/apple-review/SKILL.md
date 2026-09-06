---
name: apple-review
description: "Audit an existing iOS or macOS codebase across architecture, tests, performance, security, release readiness, and product quality. Use when the user invokes apple-review, or asks for a repository audit of a Swift/SwiftUI/UIKit/AppKit app. Do not use for greenfield SwiftUI views (apple-swiftui) or language-level Swift writing (apple-swift)."
license: MIT
metadata:
  owner: jonathan-arteaga
  kind: original
  source: local
---

# Review an Apple platform app

## Operating protocol

1. Read the repository instructions and inspect the working tree before drawing conclusions.
2. Match the requested mode:
   - For an audit, diagnose and report without changing code.
   - For an improvement request, audit first, then make only supported changes.
   - For a broad review, identify the highest-risk areas before going deep.
3. Establish the real project shape: app targets, packages, schemes, tests, CI,
   persistence, services, and documented commands. Do not invent commands or
   assume every Apple project uses the same tooling.
4. Select the relevant review areas below and read only those reference files.
5. Work evidence-first. Tie findings to code, configuration, runtime behavior,
   test output, or a clearly named manual check.
6. Preserve unrelated work. Make small, reversible changes and validate after
   each coherent batch.

## Choose review areas

| Request | Reference |
| --- | --- |
| VoiceOver, Dynamic Type, keyboard access, motion, contrast | [accessibility.md](references/accessibility.md) |
| Xcode configuration, dependencies, CI, signing, release readiness | [build-release.md](references/build-release.md) |
| Maintainability, boundaries, naming, duplication, error handling | [code-quality.md](references/code-quality.md) |
| Dead code, stale assets, obsolete flags, unused dependencies | [cleanup.md](references/cleanup.md) |
| README, architecture docs, onboarding, `AGENTS.md` | [documentation.md](references/documentation.md) |
| Launch, rendering, memory, concurrency, stability, perceived speed | [performance-stability.md](references/performance-stability.md) |
| Secrets, storage, entitlements, permissions, sensitive data | [security-privacy.md](references/security-privacy.md) |
| SwiftUI state ownership, navigation, tasks, dependencies | [swiftui-architecture.md](references/swiftui-architecture.md) |
| Unit, integration, UI, regression, and performance tests | [testing.md](references/testing.md) |
| Terminology, UX writing, errors, empty states, localization | [product-language.md](references/product-language.md) |
| Product coherence, hierarchy, components, motion, platform fit | [ui-ux.md](references/ui-ux.md) |

For a comprehensive review, start with build/release, architecture, testing,
security/privacy, and performance/stability. Add the product-facing areas when
the request includes experience or polish.

## Audit

- Reproduce or trace a problem before assigning severity.
- Separate confirmed findings from risks that need runtime, device, VoiceOver,
  Instruments, signing, or App Store Connect access.
- Rank findings by user impact, likelihood, and confidence in the evidence.
- Prefer a small number of consequential findings over an unfiltered checklist.
- For each actionable finding, name the evidence, consequence, and smallest
  credible correction.

## Improve

- Fix only when the request authorizes changes.
- Prefer existing architecture, dependencies, styles, and test conventions.
- Add or update tests when behavior changes or a regression is plausible.
- Do not broadly rewrite architecture or redesign the product unless requested.
- Do not change signing, bundle identifiers, entitlements, deployment targets,
  production release automation, credentials, or backend behavior without
  explicit authorization and evidence.
- When evidence is weak, document the candidate and the manual check instead of
  making a speculative change.

## Verify and report

Run the narrowest commands that prove the reviewed paths. Include build, test,
lint, static analysis, or targeted runtime checks when the repository supports
them. State plainly when a device, simulator, accessibility pass, Instruments
session, or human visual review remains necessary.

Lead with the outcome. Then report:

1. Findings or changes, ordered by impact.
2. Evidence and validation results.
3. Deferred risks and exact manual checks.

Create a durable `AUDIT_*.md` file only when the user requests an audit artifact
or the repository already uses audit documents.
