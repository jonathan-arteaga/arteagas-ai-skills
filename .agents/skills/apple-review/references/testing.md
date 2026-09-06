# Testing and regression safety

## Inspect

- XCTest, Swift Testing, UI, snapshot, and performance tests
- Schemes, test plans, CI behavior, fixtures, mocks, and fakes
- Critical flows and bug-prone logic without coverage
- Async, persistence, networking, error, offline, and accessibility behavior

## Prioritize

- Pure business logic, parsers, mappers, and view models
- Persistence and network clients with controlled dependencies
- Error handling and previously broken behavior
- Critical user flows and performance-sensitive paths

Prefer stable assertions about intended behavior. Avoid tests tied to incidental
view structure or timing unless that structure or timing is the contract.

## Verify and report

Run the smallest relevant test target before the broader suite. Report tests
added or changed, failures, coverage gaps by behavior rather than percentage
alone, and the next highest-value regression cases.
