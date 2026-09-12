# Design skill evaluation — 2026-09-08

The three new workflows provide direct owners for neutral visual review, cross-platform UI wording, and system consolidation. In the matched source-level trials, both libraries found material defects and preserved explicit product decisions. The observed improvement is clearer ownership and fewer conflicting instructions, not a measured improvement in rendered UI quality.

## Method

- Baseline: canonical library at commit `77ac2ab`, 23 skills. Revised: the 26-skill working change accompanying this report.
- Two fresh evaluation agents inherited the same parent model configuration, with no model or reasoning overrides. Their task prompts differed only in library/arm paths; each received the same seven cases and fixture bytes. No previous conclusions or intended findings were supplied.
- Each agent chose from its assigned library's descriptions and read relevant instructions/references. Each ran one pass without consulting the other arm. Explicit fixture instructions remained authoritative in both arms.
- These were source-only synthetic trials, not browser/device tests or host-level measurements of automatic skill loading. Review cases were read-only. Only the documentation case could edit its own DESIGN.md.
- Complete case inputs and actual responses are retained under [evaluations/design-skills](evaluations/design-skills/). Absolute local workspace paths in the revised response were replaced with portable labels; review content was not rewritten. Baseline relative paths reflect the original evaluation workspace.

## Observed results

| Case | Baseline | Revised |
| --- | --- | --- |
| Web settings | Found source layout, hierarchy, grouping, and contrast issues through broader page guidance. | Selected visual-fundamentals-review and its web reference; calculated the declared color pair and separated it from rendered verification. |
| SwiftUI screen | Used scoped Apple/source review with no neutral visual owner. | Selected visual-fundamentals-review and native guidance; reported frames, text-growth risks, and inverted hierarchy without CSS prescriptions. |
| Intentional editorial/compact UI | Explicit fixture identity overrode the old italic/type prescriptions. | Preserved italic Georgia, compact rows, and readable wrapped links as valid choices; reported the missing viewport metadata as a source-level risk. |
| Product language | A direct cross-platform owner was missing; the agent supplied a general scoped review. | Selected product-language, retained approved Spanish terms, removed unsupported assurances, and distinguished optional permission and permanent deletion. Proposed translations were labeled unreviewed. |
| Consolidation | A direct consolidation owner was missing; the agent used the provided source contract. | Classified intentional compact density, outdated usage, save-context duplication, and missing destructive semantics; did not edit code or invent a palette. |
| Documentation-only | Only DESIGN.md changed; approved decisions survived. | Same boundary and preservation held; no component migration was triggered. |
| Routing | Missing neutral visual/copy/consolidation owners and explicit motion overrides were visible. | Named owners and build → review sequence were clear. Ambiguous requests still required target/intent context; general flow auditing remained optional/external rather than claimed as a new repo skill. |

Both arms' SHA-256 fixture comparisons found only the authorized documentation file changed, with no removed fixture. The two resulting documents are saved as baseline-DESIGN.md and revised-DESIGN.md alongside the responses.

## Structural validation

The revised library passed `pnpm check`: six tooling/structure tests, validation of 26 skills, and the Codex dry-run preview. All three additions passed Skill Creator quick_validate.py using an existing isolated PyYAML dependency path; no system Python or project dependency was changed. A differential local-file-link check introduced zero broken links; 14 unrelated pre-existing file-link issues remain outside this change. This check did not establish every Markdown anchor or remote URL.

Source commits, licenses, and adaptation details are recorded in origins/. Existing schema, naming, and metadata validation checks remain in the repository test suite; no test merely asserting instruction wording was added.

## Limits

- The isolated offline/no-install `@google/design.md` probes returned ENOTCACHED in both arms. The documentation edits are explicitly unvalidated by that CLI; lint, specification, export, and CLI diff success are not claimed. This does not establish that the CLI is unavailable in every user environment.
- No browser rendering, simulator/device behavior, accessibility compliance, native-language translation approval, real user study, or production component migration was tested.
- One matched pass per case is not a statistical benchmark, cross-model comparison, or guarantee of automatic discovery in Codex/Cursor. The baseline already produced useful findings.
- Minor final static cleanup removed stale document-export references and strengthened existing project-precedence wording. No new runtime behavior was introduced; future trials should use the committed revision of the full change.

## Reproduce

Use the same configured model and fresh contexts for each arm. Prepare the baseline from `77ac2ab` and the revised library from the commit containing this change. Copy [fixtures](evaluations/design-skills/fixtures/) into separate arm directories and provide [cases.json](evaluations/design-skills/cases.json) plus product.md to each agent. Ask it to choose from that arm's skill descriptions, perform the seven requests, save its actual outputs/tools/limits, and change only the documentation fixture when requested. Do not show either arm the other response or this interpretation before it finishes.

Use the existing source fixtures for matched source review. A later runtime evaluation should add identical rendered captures or runnable projects to both arms and report those results separately.
