# SwiftUI architecture and state

## Inspect

- App entry point, view hierarchy, models, services, and persistence
- State ownership and use of `@State`, `@StateObject`, `@ObservedObject`,
  `@EnvironmentObject`, `@Observable`, and bindings
- Navigation state, dependency injection, networking, and tests
- Async tasks, cancellation, actor isolation, and object lifetimes

## Audit

- Business logic or expensive computation inside views
- Duplicate or unclear sources of truth
- Global environment dependencies that hide required inputs
- Unstable identity, navigation bugs, races, and tasks outliving views
- Incorrect main-actor assumptions and missing error handling
- Boundaries that block previews or focused tests

## Improve safely

- Clarify state ownership before extracting new types.
- Move logic out of views when the boundary becomes simpler and testable.
- Stabilize identity and task lifetime.
- Improve dependency boundaries using existing project patterns.
- Add focused tests for changed state or concurrency behavior.

Avoid wholesale architecture replacement and new frameworks unless explicitly
requested.
