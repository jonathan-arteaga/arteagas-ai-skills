---
name: mobile-screens
description: "Build or refactor Expo and React Native screens, navigation, states, and native interactions. Use apple-swiftui for SwiftUI apps."
license: MIT
metadata:
  owner: jonathan-arteaga
  kind: fork
  source: local
---

# Build mobile screens

Build Expo and React Native screens that sit next to the best-designed apps on a phone.

You are building screens that will sit on a phone next to the best-designed apps
in the world. The user will compare your output to those apps within seconds of
launching it. This skill defines the bar and the method for clearing it.

## Start from the actual screen

Inspect nearby screens, the existing design system, navigation, supported platforms, and the requested behavior. Preserve explicit product choices. Research a few relevant references only when a new direction is open or a flow needs evidence; do not require ten external screens for a scoped edit. Use an available research tool’s own instructions, extract abstract principles, and never copy its watermarks or another product’s assets.

## Platform baseline

For a new project, these are candidate tools. In an existing app, use its installed versions and architecture; do not add or migrate dependencies unless the requested behavior needs it:

- **Expo + Expo Router**, React Native, TypeScript.
- `react-native-reanimated` for motion, `react-native-gesture-handler` for
  gestures, `@shopify/flash-list` (or FlashList v2) for any list that can grow.
- `expo-image` for images (and SF Symbols via `source="sf:name"` on iOS),
  `expo-video` / `expo-audio` (never the deprecated `expo-av`).
- `react-native-safe-area-context` for insets. Never hard-code notch numbers.
- `process.env.EXPO_OS` over `Platform.OS` for compile-time platform checks.

## Native fidelity laws

These are the details that separate "web page in a wrapper" from "native app".
Apply relevant platform constraints and distinguish actual usability defects from aesthetic preferences.

1. **Semantic colors, both themes, day one.** Use system/semantic color tokens
   (e.g. `Color` from `expo-router` on iOS: `Color.ios.label`,
   `Color.ios.secondarySystemBackground`; Material dynamic colors on Android).
   Verify the themes the product supports; add dark mode only when in scope.
   Never pass semantic color objects into Reanimated animated styles — resolve
   to strings first.
2. **Native controls over rebuilt ones.** Switch, Slider, SegmentedControl,
   context menus, date pickers: use the native control or a faithful wrapper.
   A rebuilt toggle that animates 50 ms differently than iOS's reads as fake
   instantly.
3. **SF Symbols / Material Symbols for iconography.** On iOS prefer SF Symbols
   (`expo-image` with `sf:` sources, or `expo-symbols`); they inherit weight,
   optical size, and Dynamic Type behavior. Do not mix three icon families on
   one screen.
4. **Typography is hierarchy.** Use the platform type ramp (Large Title / Title
   / Headline / Body / Footnote on iOS). One display size per screen. Tabular
   numerals (`fontVariant: ['tabular-nums']`) for anything that counts, times,
   or prices. `Text selectable` on data users may want to copy.
5. **Continuous corners.** `borderCurve: 'continuous'` on every rounded
   rectangle. Squircles are the single cheapest "feels iOS" win that exists.
6. **Shadows via CSS `boxShadow`**, not legacy `shadow*`/`elevation` props.
   Shadows are for elevation logic, not decoration — one elevation system per
   app.
7. **Spacing rhythm.** Use the project’s spacing scale; allow justified optical or content-driven exceptions. Prefer
   flexbox `gap` over margin stacking. ScrollView padding goes in
   `contentContainerStyle`, never on the ScrollView itself.
8. **Safe areas and the Dynamic Island are part of the design.** Screens must
   be verified with content scrolled under the island / status bar (does the
   blur/fade treatment hold?), with the home indicator (does the bottom CTA
   clear it?), and in landscape if supported.
9. **Navigation titles belong to the navigator.** Use the stack's native title
   (and large-title collapse behavior on iOS) rather than a hand-rolled header
   whenever possible.
10. **Haptics are punctuation.** Selection tick when a value passes a step,
    light impact when something snaps home, notification success/error for
    outcomes — on the same frame as the visual, one per user action, never
    the only feedback. Never on scroll, never in loops.
11. **Format numbers like a product, not a database**: 1.4M, 38k, \$4.99. Trim
    trailing zeros. Localize dates.
12. **Root scroll behavior**: screens that can ever overflow wrap content in a
    ScrollView (first component in the route) with
    `contentInsetAdjustmentBehavior="automatic"`. Use `useWindowDimensions`,
    never `Dimensions.get()`.

## Navigation laws

Navigation is the part of a screen a screenshot can't show, and users feel
it in ten seconds. Every transition answers three questions: what is the
destination to here, must the user be able to come back, and what does back
(chevron, iOS edge swipe, Android hardware back) do afterwards.

1. **Push goes deeper, replace moves on.** `router.push` when the user will
   want to return here; `router.replace` / `<Redirect>` when coming back
   would land in a state the world has moved past; `router.dismissTo(href)`
   for "finish this flow and land on X". Back undoes *navigation*, never
   *events*.
2. **Presentation is meaning.** A self-contained task with steps →
   `presentation: 'modal'` with its own stack and its own Cancel/Done; a
   short interruption (picker, filters, item options) → `formSheet` with
   detents, drag-to-dismiss; immersive content → `fullScreenModal` with an
   explicit Close; something floating over a still-visible screen (confirm
   card, lightbox, coach mark) → `transparentModal` overlay; destructive
   confirms → action sheet; item actions → native context menu; share /
   web / photo picking → the system controller, never a rebuilt route. A
   sheet that grows a second step was a modal all along; if a link could
   open it, it is a route, not a `useState` sheet.
3. **One-way doors leave the stack.** Sign-in on a wall app, finished
   onboarding (Skip included), a purchase, a completed session: guard with
   `Stack.Protected` and land with `replace`, so back can never re-enter
   the old state — Android back from home exits the app, never shows
   Login; a paid paywall never re-opens. But keep the user's *place*:
   sign-in demanded by one action (save, follow, buy) is a modal over the
   screen that completes the action where it was tapped, and a paywall
   opened from a feature dismisses back onto the feature, unlocked — never
   `replace('/(tabs)')` from there.
4. **Back is blocked in exactly two cases** — an irreversible request in
   flight (seconds, with visible progress) and unsaved work in a modal
   (ask first), both via `usePreventRemove` on the modal's root screen.
   Transient in-screen state (selection mode, an expanded search, an open
   in-screen sheet) consumes the first back, then back leaves. Anything
   else that traps back — a funnel, a rating prompt — is a defect; the
   edge swipe works everywhere else.
5. **Tabs are peers.** No slide between tabs, each tab keeps its own stack,
   re-tapping the active tab pops to its root; full-attention screens
   (composer, player, checkout) live in the root stack *above* the tabs.
   Deep links land with a real stack underneath (`initialRouteName` /
   `withAnchor`); cold start lands by state, splash held until session
   state has resolved — never a Login flash before Home.
6. **Study the grammar, not just the pixels.** Walking a winning flow on
   Appllama, note what each step *is* — push, modal, sheet — and copy that
   consistency.

## Product identity and states

Keep the established palette, typography, icon family, density, and shape system. Multiple accents, semantic status colors, expressive typography, and emoji can be valid product choices. Diagnose incoherence or poor readability rather than enforcing a color/radius count.

Use consistent terminology for the same intent; preserve distinctions and approved localization. Implement loading, empty, error, disabled, and success states only where the changed feature exposes them. Do not add unrelated state APIs to a static element.

When the task includes a new visual direction, make it specific to the product’s job and audience rather than defaulting to generic decoration.

## Motion laws

Motion is the highest-leverage polish surface and the easiest to overdo.
Decide in this order:

- **The frequency gate comes first.** Met 100+ times a day (tab switch,
  keyboard, scroll, back) → the platform default and nothing else; tens a
  day (press, row select) → near-imperceptible, under 150 ms; occasional
  (sheets, modals, toasts) → standard motion; delight only on rare,
  first-time moments. Tabs never slide; screen transitions stay native.
  Passing this gate with zero lines of code is a success — when unsure,
  the strongest move is to delete the animation.
- **Name the purpose in one word** — feedback, spatial continuity, state
  change, preventing a jarring cut, explanation, delight — or don't build
  it. Data the user is reading never moves for style.
- **If a finger was involved, it's a spring.** Start from the live value
  (capture it on grab), hand the release velocity into the spring, pick
  the target from projected momentum so a flick commits, rubber-band past
  boundaries, stay grabbable mid-flight. One vocabulary per app —
  `{ duration: 400, dampingRatio: 1 }` to settle, `{ 300, 0.8 }` for
  sheets — and bounce only when the gesture carried momentum.
- **Everything else is timing, under 300 ms, strong ease-out**
  (`Easing.bezier(0.23, 1, 0.32, 1)` — built-in curves are too weak; never
  ease-in on an entrance). Press feedback lands on press-*in*, 100–150 ms:
  scale 0.97 on buttons and cards, a background highlight (never scale) on
  list rows, opacity on bar buttons. Exits are faster than entrances and
  leave the way they came in; enter from `scale(0.95)` + fade, never
  `scale(0)`; menus grow from their trigger (centered modals exempt).
- **Gesture → animation never hops the JS thread.** Worklets + shared
  values (`.get()`/`.set()`; `scheduleOnRN` — Reanimated 4's `runOnJS` —
  only at gesture end), `transform`/`opacity` only, no `entering` on
  recycled list rows, never animate a header's height (translate inside a
  fixed clip), keyboard-tracking UI via `react-native-keyboard-controller`
  — never a keyboard listener plus a guessed duration.
- **Respect Reduce Motion**: your spatial motion collapses to cross-fades;
  native transitions stay the system's.
- The bar: 60 fps through the hero flow, measured on a **release build on
  the slowest device you support** — Expo Go and dev builds hide exactly
  the jank you're hunting
  ([references/performance.md](references/performance.md)).

## State architecture

Screens that feel great are screens whose state is boring:

- **Server state** in TanStack Query (or the project's equivalent): caching,
  retries, optimistic updates. Keep an established fetch pattern for scoped work; introduce a query library only when needed.
- Keep client state in the narrowest existing owner. Use a store only when sharing requirements justify it; avoid broad context subscriptions that invalidate unrelated views.
- **Ephemeral UI state** (open/closed, focus, scroll) stays local to the
  component.
- Give immediate interaction feedback. Use optimistic updates only when the operation has safe reconciliation and recovery; wait for confirmation on consequential or non-reversible actions.
- Uncontrolled `TextInput`s for high-frequency typing surfaces; controlled
  inputs are a top-3 cause of typing jank.
- Persist tiny client state in MMKV, not AsyncStorage, when latency shows.

## Perceived performance

- Skeletons only for content whose shape you know; otherwise progressive
  reveal. Never a full-screen spinner for a partial update.
- Use the existing list component with stable keys; introduce virtualization or a new library when size or measured cost warrants it.
- Preload the next screen's data on press-in, not on navigation-complete.
- Images: right-size sources, `expo-image` with `recyclingKey` in lists,
  thumbhash/blurhash placeholders.
- Cold-start TTI and bundle discipline live in
  [references/performance.md](references/performance.md) — apply the
  measure → optimize → re-measure loop, never blind memoization.

## Image & illustration assets

When a screen calls for illustration, empty-state art, hero imagery, or icons
beyond the symbol set:

- Generate assets with the **best image model available to you** (e.g. an
  imagegen tool or the Higgsfield MCP/CLI if connected) at the **highest
  quality settings**, then downscale to @1x/@2x/@3x. Never upscale.
- One visual language per app: pick a style (gradient-mesh, flat-duotone,
  3D-clay, hand-drawn, mascot style) and generate ALL assets in that same style, same
  palette, same lighting. A mixed-style asset set reads as template slop.
- Prompt for **transparent or solid-flat backgrounds** matched to your surface
  color; composite artifacts (white halos, wrong-color mattes) are an
  automatic redo.
- Full asset pipeline and prompt patterns:
  [references/image-assets.md](references/image-assets.md).

## Verify the changed behavior

Build and inspect affected screens in the available simulator or emulator. Check supported sizes/themes, text growth, focus, touch targets, safe areas, and relevant error/loading states. Exercise navigation or gestures when changed; recordings help inspect motion but are not required for a copy-only edit.

For broad flow work, use [the simulator checklist](references/simulator-loop.md). For performance claims, measure a representative release build and report the device. Fix observed failures introduced by the change, then rerun affected checks. Do not repeat full-device or full-motion passes after unrelated small edits.

When the required runtime is unavailable, finish independent source work and state which device checks remain. Do not claim visual or performance success from compilation alone. Return the requested implementation and verification results; do not stop at a proposal when implementation is already authorized.

## References

| File | Load when |
|---|---|
| [references/native-controls.md](references/native-controls.md) | Choosing/wiring iOS+Android native controls, menus, pickers, sheets |
| [references/motion.md](references/motion.md) | Any Reanimated work: gestures, transitions, springs, layout animations |
| [references/performance.md](references/performance.md) | Jank, slow TTI, big bundles, memory leaks, profiling method |
| [references/image-assets.md](references/image-assets.md) | Generating illustrations/icons/hero art with image models |
| [references/simulator-loop.md](references/simulator-loop.md) | Final verification checklist + device matrix |
