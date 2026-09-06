---
name: connector-doctor
description: "Diagnose whether an existing connector is available, authenticated, authorized, and usable in the intended host and account using read-only evidence. Use when the user invokes connector-doctor, asks whether a connector, plugin, MCP, or app connection works, or sees a connected badge but the intended action fails. Do not use to install, connect, reauthenticate, change settings, or repair the connection."
license: MIT
metadata:
  owner: jonathan-arteaga
  kind: original
  source: local
---

# Diagnose connector readiness

Establish what an existing connection can actually do in the exact place the
user intends to use it, without changing the connection or its data.

## Scope first

Identify the intended service, capability, execution host, and account. Treat
local, cloud, browser, desktop, and delegated-account connections as separate
states. If the account or domain is ambiguous and choosing one could expose
unrelated personal, employer, or client data, stop and ask the user to choose.

Use only sources within the requested domain. Do not inspect one employer,
client, household, or personal connection to infer the state of another.

## Readiness check

1. Record the current date and the exact capability the user needs, such as
   listing tasks, reading a file, or fetching a public bookmark.
2. Inventory the tools already available in the intended host. An installed
   plugin, visible tool, OAuth callback, or connected badge is discovery
   evidence, not proof that the capability works.
3. Check each layer separately:
   - **Available:** the intended host exposes the connector or tool.
   - **Authenticated:** current state identifies a signed-in connection when
     that information is safely available.
   - **Authorized:** the needed read scope is present or a denial identifies
     the missing scope.
   - **Usable:** the smallest relevant, harmless read operation succeeds in
     the intended host and account.
   - **Current:** the result is fresh enough for the user's decision.
   For a local or file-backed capability with no separate service identity,
   mark authentication `Not applicable`; successful file access does not prove
   an account identity.
4. Use metadata or identity checks before content. When a content read is the
   only meaningful test, retrieve the minimum necessary record and avoid
   private fields unrelated to the diagnosis.
   For activity streams, logs, or histories, start with counts, field names,
   and timestamps. Do not return URLs, selected text, typed text, messages, or
   record bodies unless the requested capability cannot be tested without
   them.
5. Classify a failure as unavailable, account mismatch, authentication,
   authorization, unsupported capability, transient service failure, or not
   verified. Retry once only when the evidence indicates a transient read
   failure; never turn a retry into an authentication or mutation flow.

If no safe read-only probe exists, mark usability `Not verified` and name the
evidence that would prove it. Do not substitute another host's success.

Judge freshness against the user's intended decision or stated time window.
If neither supplies a meaningful threshold, report the observed age and mark
freshness `Not verified` rather than inventing a universal cutoff. A running
recorder with an empty current segment may be tested against the latest
completed segment, as long as that fallback and its age are explicit.

## Boundaries

This is a read-only diagnostic. Do not install a plugin or skill, initiate
OAuth, sign in, reauthenticate, refresh credentials, change settings or
permissions, schedule work, create or edit records, send or contact anyone,
commit, push, or delete anything. Do not expose secrets, tokens, private
content, or unnecessary account identifiers in the report.

When repair requires one of those actions, stop after the diagnosis and state
the smallest next action that would require explicit user authorization. Do
not perform the repair under this skill.

## Report

Lead with `Ready`, `Partially ready`, `Not ready`, or `Not verified`, followed
by the intended host, account label when safe, capability, and timestamp.

- `Ready`: every layer required for the requested capability is confirmed.
- `Not ready`: at least one required layer failed.
- `Not verified`: no required layer failed, but at least one remains unknown.
- `Partially ready`: a multi-capability check has both ready and not-ready or
  not-verified capabilities. Do not use it to soften a failed single check.

| Layer | Status | Evidence |
| --- | --- | --- |
| Available | Confirmed / Failed / Not verified | Tool or host observation |
| Authenticated | Confirmed / Failed / Not verified / Not applicable | Current connection state |
| Authorized | Confirmed / Failed / Not verified | Scope or denial evidence |
| Usable | Confirmed / Failed / Not verified | Read-only probe and result |
| Current | Confirmed / Failed / Not verified | Observation time and freshness |

Then give the diagnosis, the smallest authorized next action, and any domain
or evidence intentionally left uninspected.
