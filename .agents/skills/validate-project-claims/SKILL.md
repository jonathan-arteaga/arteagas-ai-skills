---
name: validate-project-claims
description: "Check that project descriptions and status claims are supported by repository or runtime evidence, especially before publication."
license: MIT
metadata:
  owner: jonathan-arteaga
  kind: original
  source: local
---

# Validate project claims

1. List each reader-facing claim as a separate sentence.
2. Point every claim to code, a test, a demo, a result, or a public source.
3. Mark unsupported claims for removal or rewrite.
4. Check that `Concept`, `Prototype`, or `Complete` matches the current artifact.
5. Separate measured results from intended behavior.
6. Confirm limitations are visible beside the strongest claims.
7. Run the narrowest command that reproduces the stated evidence.

Return a table with: claim, evidence, status, needed change, and verification
command. Do not upgrade a status because the copy sounds finished.

## Example

| Claim | Evidence | Status | Needed change | Verification |
| --- | --- | --- | --- | --- |
| “CI runs validation” | Workflow configuration calls the validator | Configuration supported; execution unverified | Distinguish configured checks from a passing run | Inspect the latest run for the claimed revision |
| “Sync writes safely” | Only preview behavior was exercised | Not yet verified | Qualify the claim | Test writes against a disposable destination |
| “Complete” | No agreed acceptance evidence | Not established | State completed capabilities and remaining checks | Verify the project’s actual acceptance criteria; a tag alone is insufficient |
