# Mobile one-way doors

Applies to Expo, React Native, and native iOS. Record a choice or an explicit deferral for each.

## Platform

- Expo / React Native vs native SwiftUI. Changes team, tooling, and which sibling skill implements.
- iOS only, or iOS and Android from the start. Adding Android later means re-testing every screen.
- Minimum OS version. Sets which system components and APIs are available.

## Navigation

- Root structure: tab bar, single stack, or drawer. People learn this once.
- Which transitions are push vs replace, modal vs sheet vs overlay. Where back must not exist: post-purchase, post-submit, onboarding exit.
- Deep links and universal links. The URL scheme is a contract once shared.

## Identity, data, and money

- Auth: Sign in with Apple, email, OAuth, or anonymous-first. Apple requires Sign in with Apple when third-party login is offered.
- Offline: read-only cache, queued writes, or online-only. Retrofitting sync is a rewrite.
- Monetization: free, one-time, subscription, trial. In-app purchase rules constrain the flow.
- Permissions: camera, location, notifications, contacts. Each needs a reason string and an ask moment.

## Store and release

- App Store review constraints on the core flow: external purchase, user-generated content, account deletion.
- Push notifications at launch or not. Affects entitlements and onboarding.
- Account deletion path. Required if accounts exist.

## Settle before code

- What is the first screen a new user sees, and what do they do in the first 30 seconds?
- Which screens must work one-handed?
- What does the app show with no network?
- Is there an existing brand or design system to honor?

## Can wait

- Widgets, watch, or iPad layout, unless the product is those
- Analytics vendor
- Localization beyond the launch language
- App Clips, Siri, Shortcuts
