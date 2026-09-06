---
name: example-skill
description: Perform a focused reusable workflow. Use when the user invokes example-skill, or a request needs the specific outcome this skill covers. Do not use for jobs owned by a sibling skill.
license: MIT
metadata:
  owner: jonathan-arteaga
  kind: original
  source: local
---

# Example skill

State the job in one sentence.

## Workflow

1. Read the task and identify the bounded inputs.
2. Follow repository and tool-specific constraints.
3. Read only the bundled references relevant to the request.
4. Produce the requested outcome.
5. Run the narrowest useful verification.

## Resources

- Put detailed guidance in `references/`.
- Add `scripts/` only for deterministic work that would otherwise be rewritten.
- Add `assets/` only for files copied or used in the output.

## Report

Lead with the result. State what changed, how it was verified, and what remains.
