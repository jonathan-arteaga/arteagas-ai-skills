# Performance and object lifetime

Loaded from `SKILL.md` §9–§10 when profiling shows a cost worth paying for, or when reference cycles and `deinit` timing are in play.

## Performance — measure, then choose

Low-level Swift performance is dominated by four costs. Know which one you're paying.

1. **Function calls** — argument copies, static vs dynamic dispatch, call-frame allocation, and blocked optimization.
2. **Memory layout** — inline vs out-of-line storage; dynamically sized types.
3. **Allocation** — global (free), stack (cheap: one subtraction), heap (expensive: search plus locking).
4. **Copies** — retains/releases and recursive struct copies.

**But do the algorithmic work first.** Every time you write a loop, try replacing it with a call to an algorithm. The largest wins are almost never micro-optimizations:

- **Know the complexity of what you call.** `Array.remove(at:)` is O(n); calling it in a loop is O(n²). `removeAll(where:)` is O(n) total. Building a `Data` by re-slicing per byte is O(n²); `popFirst()` is O(1). Both of these were 100×+ regressions hiding behind clean-looking code.
- **Chained `map`/`flatMap`/`filter` allocate an array per stage.** Elegant ≠ fast. If a pipeline runs per-pixel or per-element in a hot loop, size the output once and write into it.
- **Then profile.** Instruments' Time Profiler and Allocations, run against a _test_ (secondary-click the test's run button → Profile) so you're measuring exactly the code you care about. `platform_memmove` dominating a flame graph means accidental copying; a million transient allocations means intermediate arrays; `swift_beginAccess` means runtime exclusivity checks; `swift_retain`/`swift_release` means reference-counting traffic.

**Concrete levers, roughly in order of what they buy:**

- **`final` on classes you don't intend to subclass** turns dynamic dispatch static and unlocks inlining. Whole-module optimization lets the compiler prove this for you in many cases — and enables generic specialization, which is where generics stop costing anything.
- **Struct storage is inline; class storage is out-of-line.** Small structs are free; a large struct with three reference-typed fields costs three retains _per copy_, versus one for a class. If you copy it a lot, use copy-on-write.
- **An `any P` existential has a 3-word inline buffer.** Values that fit live inline; larger ones get heap-allocated per copy. Same technique applies: give the large type indirect storage with copy-on-write and it fits in the buffer again.
- **Homogeneous `[MyModel]` beats `[any Model]`** — densely packed, type info passed once, specializable. `[any Model]` is the flexible-but-opaque option; take it when you need it.
- **Constraining a generic parameter to a class** (`T: AnyObject`) gives the compiler a known representation even without specialization.
- **`InlineArray<N, T>`** (Swift 6.2) for fixed-size storage: elements stored inline, size in the type via value generics, no heap allocation, no reference counting, no uniqueness or exclusivity checks. Wrong choice if it gets copied or shared.
- **`Span` / `RawSpan` / `OutputSpan`** (Swift 6.2) replace `withUnsafeBufferPointer` for direct access to contiguous storage. They're non-escapable, so the compiler ties their lifetime to the container — you get pointer performance with no lifetime bugs, and the retains/releases disappear.
- **Moving stored properties out of a nested class into the parent struct** removes runtime exclusivity checks.
- Shipped in Swift 6.3, when you've measured the need: `@inline(always)` (pair with `final` on methods) and `@specialized(where T == ...)` (SE-0460) to pre-specialize a generic for hot concrete types.
- In Swift 6.4 (see §15): `borrow`/`mutate` accessors instead of `get`/`set` for large stored values, `UniqueArray`/`UniqueBox`, and `Ref`/`MutableRef` to hoist a repeated lookup out of a loop.

**Async functions** keep their state on a per-task slab allocator rather than the C stack, and split into partial functions at each suspension point. The cost profile is similar to sync functions with slightly higher call overhead — which is another reason not to make something `async` that has nothing to await.

**Hops to and from the main actor cost a real context switch.** Batch: push the loop _into_ `loadArticles`/`updateUI` so they take arrays, rather than hopping twice per iteration.

---

## ARC and object lifetime

- **An object's guaranteed lifetime ends at its last use, not at the closing brace.** Observed lifetimes are an emergent property of the optimizer and _will_ change. Code that depends on when a `deinit` runs is a latent bug.
- **`weak`/`unowned` are for breaking reference cycles — nothing else.** Reading a `weak` reference after the strong owner's last use may legitimately give `nil`. Optional binding there is _worse_ than force-unwrap: it turns a loud crash into a silent wrong answer.
- **Better than `weak`: don't build the cycle.** Factor the shared data into a third type both sides reference, turning the cycle into a tree.
- **Next best: redesign the API** so the object is only reachable through a strong reference. `withExtendedLifetime` works but shifts correctness onto you and spreads through a codebase — treat it as a patch, not a design.
- **Keep `deinit` side effects local.** Publishing metrics or firing a global effect from `deinit` sequences against optimizer decisions. Use `defer` at the call site instead, and leave `deinit` for verification.
- Xcode's **Optimize Object Lifetimes** build setting shortens observed lifetimes toward the guaranteed minimum, and will surface exactly these bugs.

