# macOS and desktop one-way doors

Applies to macOS and multi-window desktop apps. Record a choice or an explicit deferral for each.

## App shape

- Single window, multi-window, or document-based. Document-based changes the whole data model.
- Menu bar extra, full app, or both. A menu bar extra has no Dock presence and a different lifecycle.
- Settings surface: a standard Settings window with tabs, or in-window. People expect Command-comma.

## System integration

- Sandbox and entitlements: file access, network, hardware. Decides App Store eligibility.
- Distribution: App Store, notarized direct download, or both. Affects updates, payments, and review.
- File access model: open panels, security-scoped bookmarks, or a managed library.
- Sync: iCloud, custom backend, or local only. Retrofitting sync is a rewrite.

## Interaction

- Keyboard-first commands and shortcuts. The menu bar is the discoverable command list.
- Multi-window state: what is per-window, what is shared.
- Drag and drop, Services, share extensions: in scope or not.
- Companion iOS app: shared model now, or never.

## Settle before code

- What is on screen at first launch with no data?
- Which actions must be undoable?
- What must survive quit and relaunch?
- Is there an existing design system or macOS convention set to honor?

## Can wait

- Widgets and Spotlight indexing
- Automation: AppleScript, Shortcuts
- Localization beyond the launch language
- Accessory hardware
