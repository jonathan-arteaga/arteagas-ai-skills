# Security and privacy

## Scope

Assess only the authorized repository and its local configuration. Do not probe
external systems, expose secrets, rotate credentials, delete data, or change
production backend behavior.

## Inspect

- Secrets in source, configuration, logs, fixtures, and CI
- API keys, tokens, Keychain use, and sensitive values in `UserDefaults`
- File protection, local databases, app sandboxing, and entitlements
- Network security, input validation, URLs, and deep links
- Clipboard, permissions, analytics, crash logs, and privacy-sensitive access
- Third-party SDKs, privacy manifests, and permission explanations

## Improve safely

- Remove accidental sensitive logging without echoing the value.
- Use platform storage and protection APIs when requirements are clear.
- Validate untrusted input and URL routes.
- Improve permission copy and document privacy-sensitive flows.
- Escalate credentials, data migration, production configuration, and legal or
  policy decisions to a human owner.

## Verify and report

Separate confirmed vulnerabilities from hardening ideas. Include the source,
reachable behavior, impact, fix, validation, and any manual device or
configuration checks.
