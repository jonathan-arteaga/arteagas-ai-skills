---
name: frame-concept-build
description: "Turn an exploratory idea into a bounded concept build that proves one question with a small artifact — inputs, exclusions, evidence, and limitations. Use when the user invokes frame-concept-build, or wants to test whether something works before committing to it. Do not use to define a product's audience, flows, and one-way doors (frame-product-build)."
license: MIT
metadata:
  owner: jonathan-arteaga
  kind: original
  source: local
---

# Frame a concept build

1. State the question the build should answer.
2. Choose a fictional, synthetic, or public-data scenario.
3. List every source and label each independently written assumption.
4. Define what the build will and will not do.
5. Choose the smallest runnable artifact that can answer the question.
6. Decide what evidence will make the result inspectable.
7. Record unresolved behavior and stop conditions.

Return a one-page brief with: question, scenario, sources, assumptions, build
boundary, evidence, limitations, and next test.

## Example

```markdown
# Concept build: can a skill validator catch format drift before install?

Question: Does a 60-line validator catch every frontmatter error in the agentskills.io spec?
Scenario: Twelve synthetic skill folders, each breaking one rule (bad name, long description, missing body).
Sources: agentskills.io/specification; three real skills copied from the library as controls.
Assumptions: (independent) hosts reject the same errors the spec lists.
Build boundary: a Node script and a test file. No sync, no install, no CI wiring.
Evidence: the test prints one line per fixture with the rule it tripped; controls pass.
Limitations: does not test host-specific fields or body quality.
Next test: run the validator against a skill from another author's repo.
```
