---
name: write-reproducible-demo
description: "Create a short demo path another person can run, inspect, and verify without private data. Use when the user invokes write-reproducible-demo, or a repository needs a reproducible demo."
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
6. Add an automated check for the key result.
7. Document what the demo does not establish.

Return setup, run command, expected result, evidence location, and limitations.
Never require credentials for the default demo path.
