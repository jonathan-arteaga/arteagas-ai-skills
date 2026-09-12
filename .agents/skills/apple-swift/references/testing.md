# Testing with Swift Testing

Loaded from `SKILL.md` §11 when writing or migrating tests.

## Testing — Swift Testing by default

Use **Swift Testing** for new tests. XCTest remains required for exactly three things: UI automation (`XCUIApplication`), performance metrics (`XCTMetric`), and tests that must be written in Objective-C or that catch Objective-C exceptions.

- **`@Test` on any function** — global, static, or instance; `async`, `throws`, and global-actor-isolated all work.
- **`#expect(...)` takes ordinary expressions.** No family of `XCTAssertEqual`-style functions to memorize — `#expect(a == b)`, `#expect(list.isEmpty)`, `#expect(!x.contains(y))` all capture and display subexpression values on failure.
- **`try #require(...)`** to stop the test on failure, and to unwrap an optional safely. This replaces `continueAfterFailure = false` and lets you choose per-expectation.
- **Suites are `struct`s.** A fresh instance is created per test function, so state can't leak between tests. Use `init` for setup; only use a `class`/`actor` when you need `deinit` for teardown. Nest suites to group.
- **Parameterize instead of copy-pasting or looping.** `@Test(arguments: [...])` runs each case independently, in parallel, individually re-runnable, with the failing argument named in the results. Two argument collections produce the full cross product — use `zip()` when you want matched pairs instead.
- **Traits carry intent:** `.enabled(if:)` / `.disabled("reason")` for conditions (never comment a test out — a disabled test still compiles), `.bug(url)` for tracking, `.tags(...)` to relate tests across files and targets, `.timeLimit`, `.serialized` when a test genuinely can't run in parallel. Use `@available` rather than a runtime `#available` check so the testing library knows.
- **`withKnownIssue { }`** for a test failing on something outside your control — it keeps compiling and running and tells you when the issue is fixed, unlike `.disabled`.
- **`confirmation`** for callbacks that fire N times; `withCheckedContinuation` for one-shot callbacks with no async overload.
- **Tests run in parallel by default, in randomized order.** That's a feature: it surfaces hidden inter-test dependencies. Refactor rather than reaching for `.serialized`.
- **Exit tests** — `#expect(processExitsWith: .failure) { ... }` — cover `precondition`/`fatalError` paths in an isolated child process. macOS, Linux, FreeBSD, Windows only.
- Migrating: both frameworks coexist in one target, so migrate incrementally and write new tests in Swift Testing today. **Test framework interoperability** (swift-testing ST-0021; check your Xcode version for availability) lets helpers that wrap `XCTFail` be called from Swift Testing tests and vice versa; set the mode to **complete** or **strict** (not **limited**, and never **none**) so cross-framework issues stay errors and point you at the `Issue.record` replacement.

