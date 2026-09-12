---
name: apple-swiftui
description: "Build and refactor SwiftUI views — navigation, TabView, sheets, stacks, grids, and state. Use when the user invokes apple-swiftui, or is creating SwiftUI UI. Do not use for language-only Swift (apple-swift), full-repo audits (apple-review), or Expo/React Native (mobile-screens)."
license: MIT
metadata:
  owner: jonathan-arteaga
  kind: fork
  source: https://github.com/Dimillian/Skills
---

# Build SwiftUI views

Build and refactor SwiftUI views from practical, example-driven patterns.

## Quick start

Choose a track based on your goal:

### Existing project

- Identify the feature or screen and the primary interaction model (list, detail, editor, settings, tabbed).
- Find a nearby example in the repo with `rg "TabView\("` or similar, then read the closest SwiftUI view.
- Apply local conventions: prefer SwiftUI-native state, keep state local when possible, and use environment injection for shared dependencies.
- Choose the relevant component reference from the list under **Component references** below and follow its guidance.
- If the interaction reveals secondary content by dragging or scrolling the primary content away, read `references/scroll-reveal.md` before implementing gestures manually.
- Build the view with small, focused subviews and SwiftUI-native data flow.

### New project scaffolding

- Start with `references/app-wiring.md` to wire TabView + NavigationStack + sheets.
- Add a minimal `AppTab` and `RouterPath` based on the provided skeletons.
- Choose the next component reference based on the UI you need first (TabView, NavigationStack, Sheets).
- Expand the route and sheet enums as new screens are added.

## General rules to follow

- Use modern SwiftUI state (`@State`, `@Binding`, `@Observable`, `@Environment`) and avoid unnecessary view models.
- If the deployment target includes iOS 16 or earlier and cannot use the Observation API introduced in iOS 17, fall back to `ObservableObject` with `@StateObject` for root ownership, `@ObservedObject` for injected observation, and `@EnvironmentObject` only for truly shared app-level state.
- Prefer composition; keep views small and focused.
- Use async/await with `.task` and explicit loading/error states. For restart, cancellation, and debouncing guidance, read `references/async-state.md`.
- Keep shared app services in `@Environment`, but prefer explicit initializer injection for feature-local dependencies and models. For root wiring patterns, read `references/app-wiring.md`.
- Prefer the newest SwiftUI API that fits the deployment target and call out the minimum OS whenever a pattern depends on it.
- Maintain existing legacy patterns only when editing legacy files.
- Follow the project's formatter and style guide.
- **Sheets**: Prefer `.sheet(item:)` over `.sheet(isPresented:)` when state represents a selected model. Avoid `if let` inside a sheet body. Sheets should own their actions and call `dismiss()` internally instead of forwarding `onCancel`/`onConfirm` closures.
- **Scroll-driven reveals**: Prefer deriving a normalized progress value from scroll offset and driving the visual state from that single source of truth. Avoid parallel gesture state machines unless scroll alone cannot express the interaction.

## State ownership summary

Use the narrowest state tool that matches the ownership model:

| Scenario | Preferred pattern |
| --- | --- |
| Local UI state owned by one view | `@State` |
| Child mutates parent-owned value state | `@Binding` |
| Root-owned reference model on iOS 17+ | `@State` with an `@Observable` type |
| Child reads or mutates an injected `@Observable` model on iOS 17+ | Pass it explicitly as a stored property |
| Shared app service or configuration | `@Environment(Type.self)` |
| Legacy reference model on iOS 16 and earlier | `@StateObject` at the root, `@ObservedObject` when injected |

Choose the ownership location first, then pick the wrapper. Do not introduce a reference model when plain value state is enough.

## Cross-cutting references

- `references/navigationstack.md`: navigation ownership, per-tab history, and enum routing.
- `references/sheets.md`: centralized modal presentation and enum-driven sheets.
- `references/deeplinks.md`: URL handling and routing external links into app destinations.
- `references/app-wiring.md`: root dependency graph, environment usage, and app shell wiring.
- `references/async-state.md`: `.task`, `.task(id:)`, cancellation, debouncing, and async UI state.
- `references/previews.md`: `#Preview`, fixtures, mock environments, and isolated preview setup.
- `references/performance.md`: stable identity, observation scope, lazy containers, and render-cost guardrails.

## Anti-patterns

- Giant views that mix layout, business logic, networking, routing, and formatting in one file.
- Multiple boolean flags for mutually exclusive sheets, alerts, or navigation destinations.
- Live service calls directly inside `body`-driven code paths instead of view lifecycle hooks or injected models/services.
- Reaching for `AnyView` to work around type mismatches that should be solved with better composition.
- Defaulting every shared dependency to `@EnvironmentObject` or a global router without a clear ownership reason.

## Workflow for a new SwiftUI view

1. Define the view's state, ownership location, and minimum OS assumptions before writing UI code.
2. Identify which dependencies belong in `@Environment` and which should stay as explicit initializer inputs.
3. Sketch the view hierarchy, routing model, and presentation points; extract repeated parts into subviews. For complex navigation, read `references/navigationstack.md`, `references/sheets.md`, or `references/deeplinks.md`.
4. Implement async loading with `.task` or `.task(id:)`, plus explicit loading and error states when needed. Read `references/async-state.md` when the work depends on changing inputs or cancellation.
5. Add previews for the primary and secondary states, then add accessibility labels or identifiers when the UI is interactive. Read `references/previews.md` when the view needs fixtures or injected mock dependencies.
6. Validate with a build and previews: no compiler errors, previews render, state changes propagate, and list identity and observation scope do not cause avoidable re-renders. Read `references/performance.md` if the screen is large, scroll-heavy, or frequently updated.

## Component references

Read only the file for the component in play. Each reference holds intent and best-fit scenarios, a minimal usage pattern with local conventions, pitfalls and performance notes, and paths to existing examples in the current repo.

- TabView: `references/tabview.md` — Use when building a tab-based app or any tabbed feature set.
- NavigationStack: `references/navigationstack.md` — Use when you need push navigation and programmatic routing, especially per-tab history.
- Sheets and presentation: `references/sheets.md` — Use for local item-driven sheets, centralized modal routing, and sheet-specific action patterns.
- Form and Settings: `references/form.md` — Use for settings, grouped inputs, and structured data entry.
- macOS Settings: `references/macos-settings.md` — Use when building a macOS Settings window with SwiftUI's Settings scene.
- Split views and columns: `references/split-views.md` — Use for iPad/macOS multi-column layouts or custom secondary columns.
- List and Section: `references/list.md` — Use for feed-style content and settings rows.
- ScrollView and Lazy stacks: `references/scrollview.md` — Use for custom layouts, horizontal scrollers, or grids.
- Scroll-reveal detail surfaces: `references/scroll-reveal.md` — Use when a detail screen reveals secondary content or actions as the user scrolls or swipes between full-screen sections.
- Grids: `references/grids.md` — Use for icon pickers, media galleries, and tiled layouts.
- Theming and dynamic type: `references/theming.md` — Use for app-wide theme tokens, colors, and type scaling.
- Controls (toggles, pickers, sliders): `references/controls.md` — Use for settings controls and input selection.
- Input toolbar (bottom anchored): `references/input-toolbar.md` — Use for chat/composer screens with a sticky input bar.
- Top bar overlays (iOS 26+ and fallback): `references/top-bar.md` — Use for pinned selectors or pills above scroll content.
- Overlay and toasts: `references/overlay.md` — Use for transient UI like banners or toasts.
- Focus handling: `references/focus.md` — Use for chaining fields and keyboard focus management.
- Searchable: `references/searchable.md` — Use for native search UI with scopes and async results.
- Async images and media: `references/media.md` — Use for remote media, previews, and media viewers.
- Haptics: `references/haptics.md` — Use for tactile feedback tied to key actions.
- Matched transitions: `references/matched-transitions.md` — Use for smooth source-to-destination animations.
- Deep links and URL routing: `references/deeplinks.md` — Use for in-app navigation from URLs.
- Title menus: `references/title-menus.md` — Use for filter or context menus in the navigation title.
- Menu bar commands: `references/menu-bar.md` — Use when adding or customizing macOS/iPadOS menu bar commands.
- Loading & placeholders: `references/loading-placeholders.md` — Use for redacted skeletons, empty states, and loading UX.
- Lightweight clients: `references/lightweight-clients.md` — Use for small, closure-based API clients injected into stores.

## Adding a new component reference

- Create `references/<component>.md` with the four parts above. Keep it short and actionable; link to concrete files in the current repo.
- Add it to the list above with a one-line "when to use".

## Report

Lead with the view or component that changed. State the navigation or state pattern used, what was verified in preview or simulator, and what remains.
