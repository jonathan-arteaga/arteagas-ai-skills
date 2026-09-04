# Performance, responsiveness, and stability

## Inspect performance

- Cold and warm launch, first usable screen, and main-thread blocking
- Rendering cost, view invalidation, list and scroll behavior
- Image loading, caching, memory growth, CPU, battery, and network efficiency
- Duplicate work and excessive recomputation

## Inspect responsiveness and stability

- Tap and input latency, loading behavior, and perceived progress
- Crashes, force unwraps, unsafe assumptions, and failed-request handling
- Race conditions, cancellation, navigation edges, and lifecycle behavior
- Persistence, data loss, loading, empty, error, and success states

## SwiftUI checks

- Expensive work or unstable dependencies in `body`
- Oversized views and unclear state ownership
- Unstable `ForEach` or `List` identity and missing lazy containers
- Animations attached too broadly
- Tasks that refire unnecessarily or outlive their views

## Improve and verify

Prefer measured or reproducible fixes in small batches. Build and test affected
paths, then name any remaining Instruments, memory graph, energy, launch,
network conditioning, or device checks. Do not claim a performance gain without
a measurement or a defensible proxy.
