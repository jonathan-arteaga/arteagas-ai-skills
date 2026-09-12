---
name: frame-concept-build
description: "Frame a small experiment that tests one question before committing to a product build. Define its inputs, boundary, evidence, and limitations."
license: MIT
metadata:
  owner: jonathan-arteaga
  kind: original
  source: local
---

# Frame a concept build

1. State the question the build should answer.
2. Use the supplied in-scope scenario. Prefer synthetic or public inputs for reusable demos; never copy private task data into this skill library.
3. List every source and label each independently written assumption.
4. Define what the build will and will not do.
5. Choose the smallest runnable artifact that can answer the question.
6. Decide what evidence will make the result inspectable.
7. Record unresolved behavior and stop conditions.

Return a one-page brief with: question, scenario, sources, assumptions, build
boundary, evidence, limitations, and next test.

## Example

Question: Can staff find a matching invoice from a short description?
Scenario: Twenty synthetic invoices with an answer key kept out of the model prompt.
Boundary: Local search prototype and result inspection; no live accounting access.
Evidence: Correct invoice IDs, misses, and measured response times from the fixture run.
Limits: Synthetic examples do not establish production accuracy or savings.
Next test: Agreed representative data after the prototype is useful.
