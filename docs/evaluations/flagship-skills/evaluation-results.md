# Evaluation results — 2026-09-12

The final library contains **27 skills**, including think-with-me. The selected evidence covers **96 completed runs**: 88 behavior runs (11 cases × two arms × four configurations) and eight 54-request routing runs. There were 139 total process attempts including setup failures, excluded runs, and diagnostic repeats.

## Routing

Each skill had one positive and one neighboring negative request. Both arms used the same requests and their own description catalog. This measures discrimination between supplied descriptions, not automatic host activation.

| Configuration | Baseline | Revised |
| --- | --- | --- |
| Codex / GPT-6 Astra | 54/54 | 54/54 |
| Claude Code / Fable 5.1 | 54/54 | 54/54 |
| Cursor / Fable 5.1 High | 54/54 | 54/54 |
| Cursor / Grok 4.6 High | 54/54 | 54/54 |

## Behavioral observations

All selected revised runs completed the tested functional/authorization criteria. The baseline was already capable; these trials do not establish a general accuracy increase. Semantic judgments are qualitative and based on actual outputs, artifacts, and observed skill reads.

| Case | Observation |
| --- | --- |
| Small component edit | Correct radius change in every selected run. The Grok baseline additionally inserted critique/design-stamp comments; the revised arm made only the requested edit. |
| Frame then build | Both arms produced working calculators. Eight selected artifacts passed independent headless Chrome checks for bill/tip inputs 100/15 → 15/115 and 20/10 → 2/22. A saved brief was accepted as part of framing. |
| Audit only | Both arms left files untouched, found weak button contrast and missing persistent input labeling, and preserved approved italic typography. |
| Swift configuration | Both arms distinguished the disabled concurrency feature from the compiler version; the revised instructions state this directly. No build-setting edits. |
| Bilingual wording | Both languages became explicitly optional; approved “Avisarme” and the JSON structure were preserved. |
| Unavailable DESIGN.md tooling | Both arms produced useful source-backed documents; the revised arm consistently labeled official validation unavailable/unvalidated. No exporter success is claimed. |
| Voice editing | The technical “harness” concept, exact quotation, two retries, and unknown latency were preserved without invented numerical evidence. |
| Connector diagnosis | The 403 missing-scope result was treated as not ready, despite sign-in/plugin visibility. No real services were probed or repaired. |
| Pet format | Both arms rejected an 8×9/no-look-direction manifest as incomplete for a new v2 pet. No generation or installation occurred. |
| Think with me: exploration | Final tests stayed within fictional Avery’s context, offered provisional directions and meaningful questions, and created no files. Hypothesis framing was strengthened after overconfident causal language appeared. |
| Think with me: clear execution | Every arm made exactly the requested headline edit without an exploratory interview. |

## Context measurements

| Measure | Preserved 27-skill baseline | Revised | Reduction |
| --- | ---: | ---: | ---: |
| Description characters (serialized lines) | 9,445 | 3,995 | 57.7% |
| Combined SKILL.md bytes | 322,370 | 145,640 | 54.8% |
| Combined SKILL.md lines | 3,889 | 2,133 | 45.2% |

These are source-size measurements, not token, latency, or cost savings. Detailed references and the unchanged pet scripts remain available. Observed file-read paths and API usage, where reported, are retained in results.json. Full-file byte totals for read paths do not measure partial-read payloads.

## Corrections and exclusions

- Two initial Codex calls failed before inference because mutually exclusive CLI flags were combined; the corrected routing pairs passed.
- Initial restricted-Claude runs sometimes skipped the assigned skill. Those primary pairs were rerun with explicit file paths; no skipped-skill result is counted as proof of skill effectiveness.
- Two Cursor/Fable baseline runs produced correct artifacts but stalled during shell/browser verification and hit the 240-second cap. Both pairs were rerun with the same file-only constraint in both arms; the resulting calculator artifacts were independently checked.
- The first think-with-me Codex prompt used an ambiguous first-person fictional scenario and picked up the real user’s profile. Those runs were excluded. The case now explicitly identifies Avery, and the revised skill separates fictional/third-party evidence from personal context.
- Think-with-me also received a hypothesis-versus-fact clarification. The final wording was checked in all four configurations; Grok received two additional fresh matched exploration pairs.
- No empirical speed ranking is claimed: caching, concurrency, tools, context sizes, and host defaults differ. Cursor’s Fable configuration reported “High No Thinking”; native Claude used effort high. Comparisons are within configurations.
- Some conversational outputs remain longer or more generalized than an ideal live exchange. These synthetic turns establish scope and intent handling, not a guarantee of perfect brevity or researched market claims.

## Reproduce and inspect

See [the runbook](README.md), [selected normalized results](results.json), [calculator checks](calculator-checks.json), and [size comparison](size-comparison.json). Each selected run records host version, requested and reported model identifiers, effort, prompt/library digests, actual read paths, file changes, and output. Codex’s JSON stream does not echo a model identifier; the recorded exact model flag was accepted without fallback. Raw host startup/auth metadata is not included.

Use the delivered `skills-baseline-27.tar.gz` for the full current suite. Commit `c1d5c74` remains the earlier 26-skill recovery checkpoint. No generation-quality, simulator/device, production connector, or deployment outcome is established by these tests.
