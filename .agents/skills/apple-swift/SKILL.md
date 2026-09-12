---
name: apple-swift
description: "Write modern Swift — value types, Swift 6 concurrency, protocols, API design, performance, and Testing. Use when the user invokes apple-swift, or is writing or migrating Swift. Do not use for SwiftUI view patterns (apple-swiftui) or a full iOS/macOS audit (apple-review)."
license: MIT
metadata:
  owner: jonathan-arteaga
  kind: fork
  source: https://github.com/emilkowalski/skills
---

# Write modern Swift

Write Swift the way the language wants to be written, current through Swift 6.4.

**Toolchain baseline: Swift 6.3.** Everything here compiles on 6.3 unless marked ⚠, which flags Swift 6.4 features; check the project's toolchain before using one. Concurrency guidance assumes the Swift 6.2 model — if the project is on 6.1 or earlier, §3's rules about `async` and `@concurrent` do not apply.

The through-line: **Swift is a progressive-disclosure language. Start with the simplest, most static, most single-threaded thing that works, and buy dynamism — concurrency, reference semantics, existentials, unsafe pointers — only where you can point at the reason.** Every rule below is an application of that.

Model this hierarchy of defaults. Move down a level only with a reason you can state:

| Need         | Reach for               | Move down only when                                        |
| ------------ | ----------------------- | ---------------------------------------------------------- |
| Data         | `struct` / `enum`       | you need identity, sharing, or inheritance                 |
| Abstraction  | concrete type           | you have repeated code across types                        |
| Polymorphism | `some P` (generic)      | you need heterogeneous storage → `any P`                   |
| Execution    | main actor, synchronous | profiling shows a hang → `async` → `@concurrent` → `actor` |
| Memory       | `Array`, `String`       | profiling shows the cost → `InlineArray`, `Span`           |
| Safety       | safe API                | C interop or a measured hot path → `Unsafe*`               |

---

## 1. Model data with value types

Value types are the default in Swift, not a special case.

- **Default to `struct` and `enum`. Use `class` only for identity, shared mutable state, inheritance, or resource lifetime.** A window, a database connection, an entity stored in a rendering engine — those have identity. A `Point`, a `Drink`, a `Material` does not.
- **`let` by default; `var` only when you mutate.** This is the same discipline as `some` before `any` and value before reference: start narrow, widen with cause.
- **A struct with a mutable reference-type property is neither a value nor a reference.** Copies share the object; mutations leak across copies. Either keep the referenced type immutable, expose only computed properties that forward to it, or make it a `private` stored property behind copy-on-write.
- **Copy-on-write is how you get out-of-line storage _and_ value semantics.** Wrap a final class in a struct and check `isKnownUniquelyReferenced(&storage)` before mutating; copy first if it isn't. This is exactly how `Array`, `String`, and `Dictionary` work.
- **Enums are the tool for "a fixed set of things" and for mutually exclusive state.** Replacing a pile of optional stored properties (`isSharing`, `selectedRows`, `shareTarget`) with one `enum State` makes invalid combinations unrepresentable and makes state change atomic instead of a sequence of property writes you can forget to finish.
- **Composing values yields a value.** A struct whose stored properties are all value types has value semantics for free — which is what makes undo, diffing, and state restoration a single code path instead of one per property.

```swift
struct Material {                       // value semantics preserved
  var roughness: Double
  private var _texture: Texture         // a class

  var color: Color {
    get { _texture.color }
    set {
      if !isKnownUniquelyReferenced(&_texture) { _texture = Texture(copying: _texture) }
      _texture.color = newValue
    }
  }
}
```

**Noncopyable types** (`~Copyable`) express unique ownership: a file descriptor, a bank transfer, an open resource. Suppressing the copy turns "you must not run this twice" from an assertion into a compile error, and makes `deinit` on a struct meaningful. Mark the finishing method `consuming` so the compiler proves it's the last use. Parameter ownership becomes explicit: `borrowing` (read-only, the default), `consuming` (takes it away), `inout`/`mutating` (temporary write access).

---

## 2. Errors and optionals — make the failure paths visible

Swift error handling rests on three points: sources of error are marked so they can't surprise you; errors carry enough context to act on; and **recoverable errors are different from programmer mistakes**.

- **Recoverable → `throw`. Programmer mistake → `precondition`/`fatalError`.** A failed network call keeps the program running. An out-of-bounds index means the code is wrong and must halt before the bug becomes a security issue.
- **Enums with associated values make the best error types.** `case duplicateFriend(String)` beats `case duplicateFriend` — the context is the whole point.
- **`guard` for error conditions**, because it forces the exit path. `if let` for the ordinary unwrap.
- **Typed throws (`throws(MyError)`) are for internal functions, error-forwarding generic code, and constrained environments** where boxing `any Error` is too costly. For public API, untyped `throws` preserves your freedom to change the error type later. Note the unification: `throws` is `throws(any Error)`, and non-throwing is `throws(Never)` — which is what lets `map` abstract over both.
- **Force-unwrap only where you can state the invariant**, and prefer a failing `#require`/`precondition` with a message over a bare `!`.

---

## 3. Concurrency: stay single-threaded until profiling says otherwise

The concurrency model changed in Swift 6.2; guidance written for earlier versions does not apply. Start every app entirely on the main thread. Most apps never need to leave it.

**The progression, in order. Do not skip steps.**

1. **Single-threaded on the main actor.** No concurrency at all.
2. **`async`/`await`** to hide latency. SDK APIs offload on your behalf.
3. **`@concurrent`** to move _your_ expensive work off the main thread — only after Instruments shows a hang.
4. **`actor`** to move _state_ off the main actor — only when main-actor state forces constant hops.

Enable **Approachable Concurrency** in every project, and **Default Actor Isolation = MainActor** for app and UI modules (not for general-purpose libraries, which should ship `nonisolated` APIs).

**In Swift 6.2, marking a function `async` does _not_ move it off the current actor.** `@concurrent` always switches to the pool; `nonisolated` runs wherever it is called and is the right default for library APIs. Profile before you offload. Every `await` breaks atomicity: re-check state after it, and never hold a lock across one. Actors guarantee mutual exclusion, not transactions — mutate actor state in synchronous methods.

Read [`references/concurrency.md`](references/concurrency.md) for actor reentrancy, the full rule set, and code.

---

## 4. Sendable and sharing data

- Value types are `Sendable` when their storage is; public types must declare it. Actors and `@MainActor` classes are implicitly `Sendable`.
- Most model classes should be neither `@MainActor` nor `Sendable`. If they must leave the main actor, make them `nonisolated`.
- **On a data-race error, work down this list:** don't share it (a local per job) → make it a `Sendable` value type → isolate it to an actor → only then `Mutex`/`Atomic` or `@unchecked Sendable`.
- Globals, in order of preference: `let` → `@MainActor` → `Mutex` → `nonisolated(unsafe)`.

Bridging delegate and callback APIs, `MainActor.assumeIsolated`, and `@preconcurrency` are in [`references/concurrency.md`](references/concurrency.md) § Sendable and sharing data.

---

## 5. Structured concurrency

- `async let` for a fixed number of children; `withTaskGroup` (bounded) for a dynamic number; `withDiscardingTaskGroup` when children return nothing. `Task { }` only when the lifetime doesn't fit a scope. `Task.detached` almost never.
- Cancellation is cooperative: check `Task.isCancelled` before expensive work. Continuations resume exactly once on every path. Adapt handler-based APIs with `AsyncStream`.

Task-locals, cancellation handlers, and continuation rules are in [`references/concurrency.md`](references/concurrency.md) § Structured concurrency.

---

## 6. Concurrency in SwiftUI

- `View` and everything it contains, including `@State`, is `@MainActor`-isolated. You rarely need to write the annotation.
- When a `@Sendable` SwiftUI closure (`visualEffect`, `Shape.path(in:)`, `Layout`, `onGeometryChange`) raises an isolation error, copy the one value you need into the capture list instead of sending `self`.
- Action callbacks are synchronous on purpose: put the `withAnimation` state change in the callback and open a `Task` only for the long-running work that follows.

Code and the UI/async seam pattern are in [`references/concurrency.md`](references/concurrency.md) § Concurrency in SwiftUI.

---

## 7. Protocols and generics

Don't start with a class. **Don't start with a protocol either.** Write concrete types → notice repeated code across them → factor the shared capability into a protocol → write generic code against it.

- A protocol with no per-type customization is a wasted protocol; write a constrained extension on an existing protocol instead. Prefer has-a to is-a. Composition over inheritance. A forced downcast is a code smell.
- A protocol **requirement** is a customization point (dynamic dispatch). A method only in an extension is statically dispatched, so a conformer's version merely shadows it.
- **Write `some P` by default. Change to `any P` only when you need to store arbitrary types.** You cannot call a method that takes an associated type on an `any P`; pass it into a function taking `some P` to unbox it.

Constrained existentials, primary associated types, and same-type requirements are in [`references/protocols-and-generics.md`](references/protocols-and-generics.md).

---

## 8. API design — clarity at the point of use

Clarity at the point of use is the goal that outranks every other one here.

- **No type prefixes in Swift-only APIs.** Modules disambiguate. Keep prefixes only where the API mirrors an Objective-C one. But avoid very general names from specific frameworks — they read badly out of context and force manual disambiguation.
- **Drop leading `get`** from async alternatives and from anything that returns its result directly. `persistentPosts`, not `getPersistentPosts`.
- **Access control is documentation.** `private` (file), `internal` (module, and the default), `package`, `public`. Being explicit at the boundary is what forces the sendability and API-evolution decisions above.
- **Design the model so illegal states can't be spelled.** Private setters plus a validating mutating method; enums for closed sets; a strongly typed `UUID` instead of a `String`.
- **Property wrappers** factor out an _access policy_ (`@Argument`, `@Published`, defensive copying, lazy, thread-local) so the declaration site states the policy in one word. Combine with `@dynamicMemberLookup` on a key path to project through a wrapper (that's how `$binding.title` works).
- **Result builders** for declarative DSLs. **Macros** when the boilerplate is code the compiler could have written (§12).

---

## 9. Performance — measure, then choose

Four costs dominate: function calls, memory layout, allocation, and copies. **Do the algorithmic work first.** Know the complexity of what you call (`remove(at:)` in a loop is O(n²); `removeAll(where:)` is O(n)); chained `map`/`filter` allocate an array per stage. Then profile with Instruments against a _test_ so you measure exactly the code in question.

Levers in rough order of payoff: `final` plus whole-module optimization; inline struct storage with copy-on-write for large values; homogeneous `[MyModel]` over `[any Model]`; `InlineArray` and `Span` on measured hot paths; batching hops to and from the main actor.

Read [`references/performance.md`](references/performance.md) for the full lever list, flame-graph signatures, and the async cost profile.

---

## 10. ARC and object lifetime

- An object's guaranteed lifetime ends at its last use, not the closing brace. Code that depends on when `deinit` runs is a latent bug.
- `weak`/`unowned` exist only to break cycles. Better: don't build the cycle — factor shared data into a third type both sides reference. Keep `deinit` side effects local.
- Turn on Xcode's **Optimize Object Lifetimes** to surface exactly these bugs.

Details in [`references/performance.md`](references/performance.md) § ARC and object lifetime.

---

## 11. Testing — Swift Testing by default

Use **Swift Testing** for new tests. XCTest remains only for UI automation, performance metrics, and Objective-C exceptions.

- `@Test` on any function; `#expect(expression)` captures subexpression values on failure; `try #require` halts the test or unwraps an optional.
- Suites are `struct`s, one fresh instance per test. Parameterize with `@Test(arguments:)` instead of looping or copy-pasting.
- Traits carry intent (`.enabled(if:)`, `.disabled("reason")`, `.bug`, `.tags`, `.timeLimit`). Use `withKnownIssue` rather than disabling a test.
- Tests run in parallel and in random order by default. Refactor rather than reaching for `.serialized`.

Exit tests, `confirmation`, and incremental migration from XCTest are in [`references/testing.md`](references/testing.md).

---

## 12. Macros

Reach for a macro when you're writing code the compiler could derive — and only then.

- **Macros are type-checked before expansion.** Arguments are checked against the macro's declared signature, so misuse is a clean error at the call site, not a mess inside generated code.
- **Freestanding (`#foo`)** produce an expression or declaration. **Attached (`@Foo`)** augment a declaration in one of five roles: member, peer, accessor, member-attribute, conformance. Roles compose — `@Observable` is member + member-attribute + conformance.
- **Test macros as pure syntax-tree transforms** with `assertMacroExpansion`. It's the fastest loop, and it's how you avoid bugs in code nobody reads. Set a breakpoint in `expansion` and `po` the syntax node to learn its shape.
- **Emit real diagnostics when the macro doesn't apply.** Throw an error, or use `context.addDiagnostic` for warnings and fix-its at a specific location. Never let a macro silently generate code that won't compile.
- Expanded code is ordinary Swift: inspectable ("Expand Macro"), debuggable, steppable.

---

## 13. Logging and debugging

- **`Logger` from `os`, not `print`.** Create one per subsystem and category. Messages are stored in an optimized form and only rendered when displayed, so logging is cheap enough to leave in.
- **Non-numeric interpolations are redacted by default.** Opt in per value with `privacy: .public` only for data that is genuinely not personal. Use `.private(mask: .hash)` when you need to correlate values without exposing them.
- **Levels control persistence and cost:** `debug` (never persisted, fastest — the message construction is optimized away entirely when not streaming), `info`, `notice` (default), `error`, `fault` (most persistent, slowest). Log at `error`/`fault` for the things you'll want in a bug report.
- **Log a correlation ID** (a task or request UUID) and you can filter a whole failure's history out of a device log archive without reproducing it. `log collect --device --start ...`, then filter by subsystem in Console.
- `format:` and `align:` are free — use them so logs are readable and column-selectable.
- LLDB understands Swift tasks: it steps through `await` across threads, `swift task info` shows priority and children, and named tasks show up in both the debugger and Instruments' Swift Concurrency template.

---

## 14. Unsafe code and interop

- **"Unsafe" means the API cannot fully validate its input, so violating its preconditions is undefined behavior** — not that it crashes. Safe APIs _do_ trap deliberately; a clean fatal error is the safe outcome.
- **Prefer `Span` over `Unsafe*Pointer`.** Since Swift 6.2 there is a safe, non-escaping, equally fast way to get at contiguous storage. Reserve raw pointers for C interop.
- If you must use pointers: keep the unsafe region as small as possible, use **buffer** pointers (address + count) rather than bare pointers so bounds are tracked, never let a pointer escape the closure that vends it, and run the **Address Sanitizer**.
- Enable **strict memory safety** in security-critical modules — it forces every unsafe use to be acknowledged in source, which is what makes an audit possible. Swift 6.4's `@diagnose` attribute lets you turn it on for individual functions.
- **Interop is bidirectional and incremental.** C, Objective-C, and C++ types map into Swift directly (including C++ value semantics, containers as Swift collections, and move-only types as `~Copyable`). Swift 6.3's `@c` attribute exposes Swift functions back to C (with `@implementation` when the declaration already exists in a header). Adopt Swift one file at a time; don't rewrite.

---

## 15. Modern syntax you should be using

`if`/`switch` expressions, parameter packs, `@Observable` and `Observations { }`, typed notification messages, Swift Regex composed with Foundation's parsers, `InlineArray`, `.span`, and raw identifiers for test names. Rows marked ⚠ in the table require Swift 6.4; check the project's toolchain before using one.

The instead-of / write / since table is [`references/modern-syntax.md`](references/modern-syntax.md).

---

## 16. Migrating an existing codebase to Swift 6

Build with the new compiler in Swift 5 mode → per target, enable complete concurrency checking, UI layer first → fix warnings cheapest-first (hundreds of warnings usually trace to a handful of root causes) → flip the target to Swift 6 language mode → next target → refactor afterwards, separately. Enable Approachable Concurrency and main-actor-by-default _before_ you start.

The step-by-step and the tooling notes are in [`references/migration.md`](references/migration.md).

---

## Quick Reference

| Need                               | Reach for                       | Not                                       |
| ---------------------------------- | ------------------------------- | ----------------------------------------- |
| A data type                        | `struct` / `enum`               | `class` without identity or sharing       |
| Shared mutable state               | `actor`, or `@MainActor` class  | `class` + a lock you must remember        |
| Move work off the main thread      | `@concurrent func … async`      | `Task.detached`, `DispatchQueue.global()` |
| A library API's isolation          | `nonisolated`                   | `@MainActor`, `@concurrent`               |
| Fixed number of parallel jobs      | `async let`                     | N unstructured `Task`s                    |
| Dynamic number of parallel jobs    | `withTaskGroup` (bounded)       | one task per element, unbounded           |
| Children that return nothing       | `withDiscardingTaskGroup`       | `withTaskGroup` you never drain           |
| Work tied to a UI event            | `Task { }` inside the callback  | making the callback `async`               |
| Fixing a data race                 | stop sharing the object         | `@unchecked Sendable`                     |
| A shared model class               | non-`Sendable`, or `@MainActor` | `Sendable` + manual locking               |
| Blocking primitive across `await`  | nothing — restructure           | `DispatchSemaphore`, `NSCondition`        |
| Polymorphism                       | `some P`                        | `any P` unless you need storage           |
| Heterogeneous collection           | `[any P]`                       | a class hierarchy                         |
| Shared behavior, no customization  | constrained `extension`         | a new protocol                            |
| A customization point              | protocol **requirement**        | a method only in an extension             |
| Breaking a reference cycle         | restructure to a tree           | `weak` + `withExtendedLifetime`           |
| Removing matching elements         | `removeAll(where:)` — O(n)      | `remove(at:)` in a loop — O(n²)           |
| Direct access to contiguous memory | `.span`                         | `withUnsafeBufferPointer`                 |
| Fixed-size buffer in a hot path    | `InlineArray<N, T>`             | `Array`                                   |
| A new test                         | `@Test` + `#expect`             | `XCTestCase` + `XCTAssertEqual`           |
| The same test over many inputs     | `@Test(arguments:)`             | a `for` loop, or copy-paste               |
| Halting a test on failure          | `try #require`                  | `continueAfterFailure = false`            |
| A temporarily broken test          | `withKnownIssue`                | `.disabled`, or commenting it out         |
| Diagnostics in shipping code       | `Logger` + a correlation ID     | `print`                                   |
| Deciding to optimize               | Instruments on a profiled test  | intuition                                 |

## Report

Lead with the Swift change. State which language rules applied, what was verified (build, tests, or a named limitation), and what remains.
