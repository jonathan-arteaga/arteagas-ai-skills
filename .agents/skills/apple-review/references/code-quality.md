# Code quality and maintainability

## Inspect

- Module boundaries, dependency direction, and file organization
- Naming, access control, public API clarity, and Swift idioms
- Oversized types or functions, complex conditionals, and duplication
- Error handling, unsafe assumptions, and separation of concerns
- Testability, protocol and extension use, comments, and build warnings

## Improve safely

- Remove proven duplication and extract focused helpers.
- Clarify private names and narrow access control when references are known.
- Simplify complex logic without changing behavior.
- Replace fragile patterns with safer Swift constructs.
- Add missing error handling and focused tests where behavior is clear.

Avoid broad rewrites, public API changes without compatibility analysis, and
behavior changes that lack tests or direct evidence.

## Verify

Build and test affected modules. Explain the before-and-after rationale and list
remaining maintainability risks separately from completed refactors.
