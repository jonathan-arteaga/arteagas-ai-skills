# Migrating an existing codebase to Swift 6

Loaded from `SKILL.md` §16 when enabling data-race safety on an existing project.

## Migrating an existing codebase to Swift 6

The order matters, and mixing steps is how migrations stall.

1. **Build with the new compiler first.** Source compatibility means this should just work, in Swift 5 mode.
2. **Per target, enable complete concurrency checking** (Swift 5 mode + all Swift 6 warnings). Start with the **UI/app layer**, not the frameworks below it — much of it is already main-actor-annotated by the SDK, so the fix rate is high.
3. **Fix the warnings, cheapest first.** Expect hundreds of warnings from a handful of root causes: `var` globals that should be `let`, free functions that belong on `@MainActor`, one public struct that needs `: Sendable`. A single line can clear dozens.
4. **Flip the target to the Swift 6 language mode** to lock the work in.
5. **Move to the next target and repeat.**
6. **Refactor afterwards, separately.** Never combine a significant refactor with enabling data-race safety — you'll have to back out both.

You can turn strict checking back off and ship; every fix you made is a genuine improvement that survives. Enable **Approachable Concurrency** and, for app modules, main-actor-by-default _before_ you start — both dramatically reduce the number of errors you'll see, and Xcode ships migration tooling that applies many of the changes for you (swift.org/migration).

