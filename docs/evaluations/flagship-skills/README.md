# Flagship skill trials

These synthetic trials compare preserved baseline skill snapshots with the revised library. They do not access employer/client data or real connectors. The runner is opt-in, uses the user's authenticated subscriptions, and is not part of CI.

## Inputs and execution

- `cases.json` holds eleven behavior requests, fixture files, allowed deliverable paths, and review criteria. The rubric is not given to the model.
- `routing.json` has one positive and one neighboring negative request for each of the 27 skills. Models receive anonymized request IDs, requests, and that arm's description catalog; expected choices are withheld.
- Each behavior case uses a fresh session and a private copy of the entire assigned library. Explicit file loading separates skill behavior from host discovery. Check the actual tool trace before counting a run as a skill trial.
- Each pair holds its host, model, effort, prompt, and input files constant. Different hosts expose different tools and context defaults; these are within-host comparisons, not model rankings.

From the repository root:

```sh
node tools/run-skill-trials.mjs --help
node tools/run-skill-trials.mjs --baseline /path/to/frozen-baseline --output /path/to/scratch-results --host codex
node tools/run-skill-trials.mjs --baseline /path/to/frozen-baseline --output /path/to/scratch-results --host claude
node tools/run-skill-trials.mjs --baseline /path/to/frozen-baseline --output /path/to/scratch-results --host cursor-fable
node tools/run-skill-trials.mjs --baseline /path/to/frozen-baseline --output /path/to/scratch-results --host cursor-grok
```

The full current baseline is the delivered `skills-baseline-27.tar.gz`, which contains the original 26 skills plus the original think-with-me addition. Commit `c1d5c74` in the recovery bundle is the earlier 26-skill checkpoint. Restore the matching snapshot to a separate directory. Use `--case <id>`, `--arm baseline|revised`, and a fresh `--repeat <label>` for focused reruns. Existing completed output directories are never overwritten. `--revised <snapshot>` selects an isolated revised library, and `--file-tools-only` supports matched source-edit reruns when host verification stalls. Overrides `SKILL_EVAL_CODEX`, `SKILL_EVAL_CLAUDE`, and `SKILL_EVAL_CURSOR` select installed executable paths; the runner does not change HOME or auth directories.

Models are explicit: GPT-6 Astra in Codex, Claude Fable 5.1 in Claude Code and Cursor, and Grok 4.6 High in Cursor. Resolve availability before running; do not silently substitute. Cursor/Astra was rejected by the provider and Grok was selected by the user instead. Record host-reported model names, including thinking/context variants. An estimated API-equivalent cost is not necessarily an additional subscription charge.

## Reading results

Each run writes its exact prompt, raw JSONL/stderr, workspace artifacts, pre-run library hashes, and `result.json`. Keep raw host logs local: startup events may include local paths and host configuration. Publish only reviewed, normalized synthetic outputs and summaries.

Evaluate the actual artifact and read trace, not exit status alone. A timed-out run or a run that did not read the assigned skill is not a passing skill evaluation. Review unexpected file changes in context: a saved brief can be appropriate for a framing-and-build request, while unrelated infrastructure is not. Cases that appear to regress receive two further fresh matched attempts.

The 240-second per-run limit bounds stalled verification. It can stop a run that already produced useful code; record that distinction rather than presenting a timeout as an ordinary final response. Source-only reviews do not establish rendered quality, native accessibility, real connector readiness, pet generation quality, or production correctness.

Static support files record package inventory, size changes, and script/validator checks. Size figures count characters, bytes, and lines; they are not token or latency estimates. The audit report contains the final interpreted results and limitations.
