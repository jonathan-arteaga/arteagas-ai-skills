# Concurrency in modern Swift

## Contents

- Concurrency follows project isolation and workload
- Sendable and sharing data
- Structured concurrency
- Concurrency in SwiftUI

Read this reference when the work touches `async`, actors, `Sendable`, task structure, or SwiftUI isolation. Isolation behavior depends on feature flags and language mode, as described below; compiler version alone is insufficient.

## Concurrency follows project isolation and workload

Check `swift --version`, the language mode, default actor isolation, and `NonisolatedNonsendingByDefault` before changing concurrency. Preserve existing architecture unless migration is requested.

`async` permits suspension, not necessarily a thread switch. With `NonisolatedNonsendingByDefault` enabled, nonisolated async functions inherit the caller’s actor; without that feature, they use the generic executor by default. `@concurrent` explicitly switches off an actor on supporting toolchains. `nonisolated(nonsending)` can express caller-actor execution without enabling the project-wide feature.

Keep UI work on its required actor and move appropriate CPU-heavy work away from it. Do not require a hang before isolating known expensive work. Do not enable Approachable Concurrency or MainActor default isolation automatically in existing apps, packages, or servers.

Profile uncertain performance claims. Use one task for sequential work and structured child tasks for independent work. Recheck invariants after an `await`; never hold a lock or rely on thread-local state across suspension.

Source: [Swift compiler documentation](https://github.com/swiftlang/swift/blob/main/userdocs/diagnostics/nonisolated-nonsending-by-default.md).

### Actor reentrancy

Actors guarantee mutual exclusion, not transactions. Between two `await`s on the same actor, other work runs.

- **Mutate actor state in synchronous methods.** Synchronous code on an actor runs to completion uninterrupted — that's your transaction boundary.
- **Keep async actor methods thin**, composed of synchronous transactional operations, and leave the actor in a consistent state at every `await`.
- The classic bug: check cache → `await` download → write cache. Two tasks both miss, both download, the second clobbers the first. Re-check after the `await`, or dedupe the in-flight work.
- **Actors are not FIFO.** They run highest-priority work first, precisely to avoid priority inversion. If you need ordering, use a task (which runs start to finish) or an `AsyncStream`, not an actor.

---

## Sendable and sharing data

`Sendable` marks a type safe to share across isolation domains. The compiler checks it at every task and actor boundary.

- **Value types are `Sendable` when their storage is** — inferred automatically for non-public types. **Public types never get inferred sendability**: marking a public type `Sendable` is a promise to your clients, so Swift makes you write it.
- **Actors and `@MainActor` classes are implicitly `Sendable`**, because their state is isolated.
- **Most model classes should be neither `@MainActor` nor `Sendable`.** Keep them non-`Sendable` on purpose — it prevents half the model being mutated on the main thread while the other half is mutated in the background. `nonisolated` changes isolation; it does not make mutable storage safe to share. Choose ownership transfer, actor isolation, or checked Sendable semantics according to actual use.
- **You can still _send_ a non-`Sendable` object between domains** as long as the sender stops using it. Make all your mutations _before_ handing it off; touching it afterward is the error.
- Closures capture state too. Only mark a function type `@Sendable` if it genuinely crosses domains.
- **`@unchecked Sendable` is a promise the compiler can't check.** Reserve it for types with real internal synchronization (a `Mutex`, a lock). Same for `nonisolated(unsafe)` on a global — last resort, not a warning silencer.

**When you hit a data-race error, work down this list:**

1. **Don't share it.** Move the shared object into a local so each concurrent job gets its own instance. (This is the fix for the overwhelming majority of real errors.)
2. **Make it a `Sendable` value type**, so "sharing" is really copying.
3. **Isolate it to an actor** — the main actor, or your own.
4. Only then reach for `Mutex`/`Atomic` from the `Synchronization` module (store them in `let` properties), or `@unchecked Sendable`.

**Global and static variables are the most common source of errors.** In order of preference: make it a `let`; put it on `@MainActor`; wrap it in a `Mutex`; `nonisolated(unsafe)`. Note globals in Swift are initialized lazily _and_ atomically — unlike C.

**Bridging old callback APIs:** annotate delegate protocols with `@MainActor` if you own them. For a callback you do not own, use `MainActor.assumeIsolated` only when its documented executor contract guarantees the main actor; otherwise explicitly hop and preserve ordering/lifetime semantics. `@preconcurrency` on the conformance is the shorthand for the same thing. Use `@preconcurrency import` to temporarily silence sendability warnings from a module that hasn't migrated; the warnings come back — correctly — once it does.

---

## Structured concurrency

Always prefer structured tasks.

Structured tasks (`async let`, task groups) are scoped like local variables: they can't outlive the block, they're awaited automatically, and they inherit cancellation, priority, and task-local values through the task tree. Unstructured tasks (`Task { }`, `Task.detached`) give you none of that automatically.

- **`async let`** for a fixed, statically known number of concurrent children.
- **`withTaskGroup`** when the number is dynamic. Task groups conform to `AsyncSequence` — iterate results as they land. Use **`withDiscardingTaskGroup`** when children return nothing: it frees each child's resources immediately and cancels siblings on the first error.
- **`Task { }`** only when the work's lifetime doesn't fit a scope — reacting to a delegate callback, a button tap, a view appearing. It inherits actor isolation and priority; you must manage cancellation yourself.
- **`Task.detached`** almost never. It inherits nothing — not isolation, not priority, not task-locals. If you need a detached root, put a task group _inside_ it rather than detaching repeatedly.

**Cancellation is cooperative.** Cancelling sets a flag; it stops nothing. Check `Task.isCancelled` or `try Task.checkCancellation()` **before starting expensive work**, and in synchronous helpers too. For work that's suspended rather than running (an `AsyncSequence`'s `next()`), use `withTaskCancellationHandler` — and remember the handler runs immediately and concurrently with the body, so the state it touches needs real synchronization (an atomic or a lock, not an actor — you can't guarantee ordering on an actor).

**Bound your concurrency.** Don't fan out one child per item over an unbounded list. Start N children, then add a new one each time one finishes.

**Task-local values** (`@TaskLocal`) propagate context — a request ID, a trace span — down the task tree without threading a parameter through every signature. Make them optional so unbound reads have a sensible default.

**Bridging callbacks:** `withCheckedContinuation` / `withCheckedThrowingContinuation`. The contract is **resume exactly once on every path** — never resuming hangs the caller forever; resuming twice is a fatal error. For delegate APIs that fire later, store the continuation and nil it out when you resume. Check the installed compiler before using newer continuation APIs.

**`AsyncSequence`:** iterate with `for await` / `for try await`. Adapt an existing handler- or delegate-based API with `AsyncStream` / `AsyncThrowingStream` — construct the source inside the closure, `yield` from the handler, and clean up in `onTermination`.

---

## Concurrency in SwiftUI

- **`View` is `@MainActor`-isolated**, and so is everything it contains, including your `@State`. You almost never need to write `@MainActor` on a view or a view model — and with main-actor-by-default you can delete the ones you have.
- **SwiftUI deliberately runs some of your code off the main thread** to keep frames cheap. The signal is `@Sendable` in the API's signature: `visualEffect`, `Shape.path(in:)`, `Layout` requirements, `onGeometryChange`. When you hit an isolation error inside one of those closures, **don't send `self` — copy the one value you need into the closure's capture list.**

```swift
.visualEffect { [pulse] effect, proxy in    // copy the Bool, don't capture self
  effect.blur(radius: pulse ? 2 : 0)
}
```

- **SwiftUI's action callbacks are synchronous on purpose.** Time-sensitive UI updates — starting an animation in response to a gesture or a scroll event — must happen on the same frame as the event. Put the `withAnimation` state change in the synchronous callback; open a `Task` only for the long-running work that follows.
- **Put a piece of state on the seam between UI and async work.** The view kicks off a task; the async layer does a synchronous mutation when it finishes; the UI reacts. That keeps view logic synchronous and makes the async logic testable without importing SwiftUI.
