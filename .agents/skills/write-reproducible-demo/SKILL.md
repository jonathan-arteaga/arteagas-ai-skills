---
name: write-reproducible-demo
description: "Create or document a short, reproducible demonstration of one behavior using public or synthetic inputs and inspectable evidence."
license: MIT
metadata:
  owner: jonathan-arteaga
  kind: original
  source: local
---

# Write a reproducible demo

1. Identify the single behavior the demo should prove.
2. Use bounded fictional, synthetic, or cited public input.
3. Make setup requirements explicit and minimal.
4. Provide one command that runs the primary path.
5. Show the expected output without hiding failures.
6. Reuse or add an automated check when it meaningfully verifies the demonstrated behavior. Do not add a test that merely repeats the example text.
7. Document what the demo does not establish.

Return setup, run command, expected result, evidence location, and limitations.
Never require credentials for the default demo path.

## Example

A validator demo can use one valid and one invalid synthetic skill. Document the actual setup command, run each fixture, and check its exit status and diagnostic. Quote output captured by the run rather than hardcoding the current library size. State separately whether real installation writes, automatic host discovery, and model behavior were tested.
