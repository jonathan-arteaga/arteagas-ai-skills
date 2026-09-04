# Build, dependencies, CI, and release

## Inspect

- Xcode projects and workspaces, targets, schemes, and test plans
- Build configurations, Swift version, compiler settings, warnings, and
  deployment targets
- Swift Package Manager, CocoaPods, or Carthage dependencies and version policy
- Entitlements, signing assumptions, environment variables, and secret handling
- CI workflows, build scripts, release automation, and documented commands
- App Store or TestFlight checklists and metadata configuration when present

## Improve safely

- Verify and document build, test, lint, and release-check commands.
- Fix deterministic script failures and high-confidence warnings.
- Remove dependencies only after proving they are unused.
- Add missing CI validation when it follows existing project conventions.
- Clarify release checklists and environment requirements.

Do not change signing, bundle identifiers, entitlements, deployment targets,
credentials, or production release automation without explicit authorization.

## Verify

Run the same commands CI or the release checklist relies on. Report dependency
risks, CI gaps, signing or distribution checks that require a maintainer, and
the exact commands that passed or failed.
