---
name: apple-swift
description: "Write, review, or migrate Swift language code, including types, concurrency, APIs, and tests. Use apple-swiftui for view composition."
license: MIT
metadata:
  owner: jonathan-arteaga
  kind: fork
  source: https://github.com/emilkowalski/skills
---

# Write Swift for the actual project

Inspect the compiler version, language mode, deployment targets, feature flags, and nearby code before choosing an API or isolation model. Preserve the project’s architecture and build settings unless the requested change requires changing them.

Prefer value semantics for data, concrete types until abstraction has a purpose, and safe APIs. Use reference identity, protocols, actors, or low-level memory operations where the problem needs them. These are defaults, not mandatory migration steps.

## Choose the relevant reference

| Work | Read |
| --- | --- |
| Value semantics, ownership, errors, optionals | [Values and errors](references/values-and-errors.md) |
| Isolation, Sendable, tasks, cancellation, actor reentrancy | [Concurrency](references/concurrency.md) |
| Protocol dispatch, generics, opaque/existential types | [Protocols and generics](references/protocols-and-generics.md) |
| Public APIs, macros, logging, C interop | [API and interop](references/api-and-interop.md) |
| Measured performance or memory problems | [Performance and ARC](references/performance.md) |
| Creating or maintaining tests | [Testing](references/testing.md) |
| New syntax supported by the target toolchain | [Modern syntax](references/modern-syntax.md) |
| An explicitly requested Swift migration | [Migration](references/migration.md) |

## Concurrency decisions

- `async` permits suspension; it does not by itself promise background execution. Inspect isolation and build settings.
- With `NonisolatedNonsendingByDefault` enabled, nonisolated async functions inherit the caller’s actor. Without it, their default execution follows the generic-executor behavior. Swift 6.2 availability alone does not establish which applies.
- `@concurrent` explicitly leaves the actor on supporting toolchains. Choose it for appropriate CPU work; do not require a previously observed hang before addressing known expensive work.
- UI state belongs on its required actor. A library, server, or existing app need not adopt main-actor-default isolation. Do not enable Approachable Concurrency as an incidental edit.
- Protect invariants across suspension points; preserve cancellation, lifetime, and ordering semantics. Do not silence isolation errors with unchecked annotations without a valid synchronization argument.

For SwiftUI view composition, use apple-swiftui when available. Stay with this skill for language-level work even when its callers are views.

## Verify and report

Use the project’s existing build and test conventions. Add a focused regression test for changed behavior when warranted; do not migrate test frameworks or expand to unrelated cleanup. For reviews, report findings without edits. For implementation, finish the requested change and relevant checks before returning.

State what changed, which toolchain/isolation assumptions applied, what checks ran, and any remaining uncertainty. A reference’s version label is not proof that an API exists in this project; verify uncertain APIs against current Swift/Apple documentation and the compiler.
