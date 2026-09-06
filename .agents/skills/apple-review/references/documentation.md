# Documentation and onboarding

## Inspect

- README setup, build, run, test, lint, and troubleshooting instructions
- Architecture, feature, API, contribution, and release documentation
- Public interfaces and comments where intent is otherwise unclear
- Existing `AGENTS.md` files and undocumented scripts or commands

## Improve safely

- Run commands before documenting them.
- Keep setup instructions complete but compact.
- Describe architecture and key flows from inspected code, not inference alone.
- Add or update `AGENTS.md` only with durable repository-specific guidance.
- Remove stale claims and misleading commands.
- Create an architecture document only when the system is complex enough to
  justify maintaining it.

## Verify

Follow the documented setup or validation path from a clean-enough state. Report
documents changed, commands confirmed, and gaps that still require maintainer
knowledge or external access.
