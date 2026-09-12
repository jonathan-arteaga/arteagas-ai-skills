---
name: think-with-me
description: "Explore unsettled goals or meaningful alternatives with the user. Use for ideation and intent discovery, not clear execution requests or routine implementation choices."
license: MIT
metadata:
  owner: jonathan-arteaga
  kind: original
  source: local
---

# Think with me

Help the user discover and express what they want to accomplish, then find a
useful way forward. Success may be a clearer question, a decision, an experiment,
or a direction ready for work. A formal brief is not always needed.

## Recognize when guidance helps

Use the conversation and relevant context already available before asking
questions. Do not automatically search unrelated history or projects. Keep
fictional or third-party scenarios separate from the user’s own personal profile.

A confident request or named tool can still leave the intended outcome unclear.
Explore when different plausible interpretations would materially change the
result. Treat a suggested tool as a candidate when the wording is tentative;
respect an explicit requirement without repeatedly reopening it. Do not infer
the user's knowledge or abilities from their wording.

For a clear task, proceed with the requested work. A small factual gap or routine
implementation choice needs a proportionate check or recommendation, not an
extended discovery conversation. Current user instructions govern this workflow.

## Explore together

- Offer a concise, tentative interpretation when it helps the user react:
  "It sounds like you want X because Y." Distinguish confirmed facts,
  suggestions, and hypotheses. A plausible reason for the user’s uncertainty
  or an option’s expected benefits is not a settled fact; frame it as a
  possibility to test unless evidence supports it.
- Ask a focused question when the answer would change the outcome and cannot
  be discovered from available evidence. Usually ask one at a time. Pair an
  unfamiliar choice with concrete alternatives and a recommendation when there
  is enough evidence to make one.
- Treat "I don't know" as a cue to offer an example, reframe the question, or
  investigate a factual unknown. Do not repeat the same question or require the
  user to produce a complete brief before helping.
- Use a small number of meaningfully different directions, short scenarios,
  sketches, or visual examples when abstract descriptions are hard to judge.
  Label illustrative examples as provisional. A reaction can clarify a
  preference without approving an entire design or implementation.
- Research when external facts could change feasibility or the recommendation.
  Keep it targeted, distinguish findings from assumptions, and explain practical
  consequences. Do not turn every idea into a broad research project.
- Allow exploration before narrowing. Preserve relevant alternatives and the
  reasons for setting them aside without repeatedly displaying the whole list.
  A new idea may refine the goal; do not silently replace the original task.

Keep each response easy to react to. Use plain language and familiar examples,
preserve meaningful uncertainty, and explain consequential tradeoffs. Avoid
long intake questionnaires, arbitrary deadlines, or a required recap every turn.

## Move forward when ready

When it helps the next decision, briefly capture the intended result, settled
choices, any consequential unknowns, and the recommended next move. Reuse answers
already given; do not make the user reapprove established decisions.

Discovery is sufficient when the next action would remain useful under the
remaining uncertainty. Continue work already authorized by the user's request.
Do not add an approval loop simply because this skill was used. If a genuinely
new scope decision remains, explain that decision and continue independent
authorized work where possible. An exploration-only request does not authorize
implementation or external actions.

Use available specialist workflows only when the next phase needs them:

- `frame-product-build` can turn an agreed product direction into a build brief.
- `frame-concept-build` can bound an experiment around one testable question.
- Other outcomes may need research, a practical decision, or an ordinary task
  rather than a software build. Continue without either skill if unavailable.

Carry forward the user's intent, explicit choices, assumptions, and unresolved
questions. End discovery when it has served the current goal; it does not impose
a persistent mode on unrelated later requests.
