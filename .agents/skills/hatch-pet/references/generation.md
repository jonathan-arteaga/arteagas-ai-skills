# Pet generation

## Contents

- Generation Delegation
- Storage Controls
- Brand Discovery
- Generation Contract
- Pet-Safe Styles
- Transparency And Effects

Run command examples from the skill directory; `SKILL_DIR` refers to that directory, not this reference folder. Load only the sections needed by the active stage.

## Generation Delegation

Use `$imagegen` for all normal visual generation.

Before generating base art, row strips, or repair rows, load and follow the installed image generation skill:

```text
${CODEX_HOME:-$HOME/.codex}/skills/.system/imagegen/SKILL.md
```

Do not call the Image API, image CLI, or any other image-generation path directly. Let `$imagegen` choose its own built-in-first path and fallback rules. If `$imagegen` says a fallback requires confirmation, ask the user before continuing.

When invoking `$imagegen`, pass the generated pet prompt as the authoritative visual spec. Pet prompts should stay concise, state-specific, sprite-production oriented, and grounded in the listed input images. Keep longer policy and QA rules in this skill and the deterministic review scripts rather than expanding them into every image prompt. Do not wrap prompts in the generic `$imagegen` shared prompt schema.

Use this skill's scripts for deterministic image work only: preparing layout guides and prompts, mirroring approved `running-left`, extracting frames, validating rows, composing the final atlas, and creating contact-sheet plus motion-preview QA media. Parent-owned shell/`jq` steps handle manifest updates, packaging, and cleanup.

## Storage Controls

The built-in `$imagegen` path stores generated PNG bytes in the rollout that invokes it, even when it also writes a file under `${CODEX_HOME:-$HOME/.codex}/generated_images`. Deleting files later reduces filesystem use, but it does not shrink an already-written rollout. Keep image generation isolated and bounded:

- Use one lightweight generation worker per visual job. Do not batch multiple base/row jobs into the same worker.
- Workers must return only `selected_source=...` and `qa_note=...`; they must not include Markdown image previews, base64, or extra visual attachments in their final response.
- The parent must not open every generated PNG visually. Use worker QA for each job and inspect only the final contact sheet.
- After copying the selected generated output into `decoded/`, remove the selected original from `${CODEX_HOME:-$HOME/.codex}/generated_images` when it lives there, then remove its now-empty generation directory if possible.
- For storage-sensitive full runs, ask the user whether to use the `$imagegen` CLI fallback when available. That path requires local API credentials and explicit user confirmation, but it can avoid built-in image payloads being embedded in rollout events.

## Brand Discovery

If the user provides a brand, company, product, or prospect name rather than a concrete avatar description or reference image, run a lightweight discovery subagent before preparing the pet run. The discovery worker must use web search and prefer official sources such as the brand site, product pages, docs, about pages, press pages, or brand pages. Use reputable secondary sources only when official pages are too thin. Keep the search narrow: enough to extract visual and personality cues, not a market-research brief.

Skip discovery when the user already provides a concrete mascot/avatar description or reference images, unless the user explicitly asks for brand research.

Discovery worker responsibilities:

- search the web for 2-4 relevant sources, preferring official pages
- write an adaptive markdown brief rather than a rigid field dump
- cover identity/category, audience/use context, visual system, personality/tone, product/domain motifs, mascot translation cues, avoidances, and evidence/confidence
- mark mascot guidance that is inferred from sources as inference
- avoid copying logos, readable marks, UI screenshots, slogans, or text
- end with a compact `Generation handoff` section containing only `brand_name`, `brand_brief`, `avatar_seed`, `avoid`, and `brand_sources`
- do not generate images, prepare run folders, or edit unrelated files

Use this discovery worker prompt:

```text
Research a brand for hatch-pet mascot creation.

Brand/product/prospect: <brand name>
User context: <short user request>
Output file: <absolute path to brand-discovery.md>

Use web search. Prefer official brand, product, docs, about, press, or brand pages. Use reputable secondary sources only if official sources are too thin. Write an adaptive markdown brief to the output file. Headings may flex by brand, but the brief must cover:
- identity/category: canonical name, product type, what it does
- audience/use context: who it serves and where it appears
- visual system: palette, shapes, line quality, materials, typography feel, iconography, patterns
- personality/tone: emotional traits, energy, formality, playfulness
- product/domain motifs: objects, workflows, verbs, metaphors, environments
- mascot translation cues: candidate forms, signature traits, props, what must read at pet size
- avoidances: logos/text, trademark-sensitive elements, misleading cues, competitor confusion, poor mascot fits
- evidence/confidence: source URLs plus notes where evidence is weak or inferred

Do not copy logos, readable marks, UI screenshots, slogans, or text. Clearly label mascot guidance that is inferred rather than directly sourced.

End the brief with a `Generation handoff` section containing exactly:
- brand_name=<canonical brand/product name>
- brand_brief=<one sentence, max 45 words, covering palette/tone/domain motifs/personality>
- avatar_seed=<short mascot-safe visual idea, no logo copying>
- avoid=<short comma-separated list>
- brand_sources=<comma-separated source URLs>

Return exactly:
brand_discovery_file=<absolute output file path>
brand_name=<canonical brand/product name>
brand_brief=<same compact sentence from Generation handoff>
avatar_seed=<same short seed from Generation handoff>
avoid=<same short avoid list from Generation handoff>
brand_sources=<same comma-separated URLs from Generation handoff>
```

The parent should save the markdown brief before preparing the run, then pass it to `prepare_pet_run.py` as `--brand-discovery-file` together with `--brand-name`, `--brand-brief`, repeated `--brand-source`, and a concise `--pet-notes` value based on `avatar_seed` when the user did not provide a better avatar description. Keep the full brief for review; only the compact handoff fields should shape prompts. If web search is unavailable and the user gave only a bare brand name, ask for brand cues before generating.

## Generation Contract

### Visual Job Graph

Expect up to 13 visual jobs: 1 base pet, 9 standard row strips, 1 required four-cardinal anchor strip, and 2 required coherent look-direction row strips. The standard states are `idle`, `running-right`, `running-left`, `waving`, `jumping`, `failed`, `waiting`, `running`, and `review`. The only deterministic visual derivation is `running-left`, which may be produced by mirroring `running-right` only after `running-right` has been generated, visually inspected, and explicitly approved as safe to mirror. If mirroring is not appropriate, generate `running-left` as a normal grounded `$imagegen` row.

### Look Direction Sequence

After validating rows 0–8, write qa/look-mechanics.md, then generate and approve one four-pose cardinal strip in this fixed order: 000 up, 090 screen-right, 180 down, and 270 screen-left. Generate row 9 as one coherent eight-pose family from those approved cardinal pose families, interpolating the intermediate directions as even 22.5-degree steps. Deterministically register its eight ordered pose groups, then run final-cell edge, semantic, and continuity QA immediately. Only after row 9 passes, generate row 10 as one coherent eight-pose family, using the approved cardinals for direction meaning and completed row 9 for identity, scale, registration, and boundary continuity. Run the same QA immediately after row 10. Row 9 contains 000, 022.5, 045, 067.5, 090, 112.5, 135, and 157.5; row 10 contains 180, 202.5, 225, 247.5, 270, 292.5, 315, and 337.5. 000 means up, not neutral/front. Never ask $imagegen to generate or repair a complete 8×11 atlas.

### Visual Provenance And Grounding

After selecting a visual output, the parent agent copies that exact image into the job's `decoded/` path, runs its required incremental checks, and only then marks the job complete in `imagegen-jobs.json`. Do not write helper scripts that populate row outputs. The deterministic Python scripts may only process already-generated visual outputs.

Only the base job may be prompt-only. Every row-strip job generated through `$imagegen` must use the input images listed in `imagegen-jobs.json`, including the canonical base reference created after the selected base output is copied. Treat any row generation without attached grounding images as invalid.

## Pet-Safe Styles

Default style is `auto`: infer the pet's style from the user's prompt and references, then preserve that style across every row. If the user names a style, honor it. Supported style presets include `pixel`, `plush`, `clay`, `sticker`, `flat-vector`, `3d-toy`, `painterly`, `brand-inspired`, and `auto`.

Any style is acceptable when it remains pet-safe:

- compact whole-body silhouette readable inside a `192x208` cell
- consistent face, proportions, material, palette, and props across all rows
- clean removable chroma-key background
- details large enough to read at pet size
- no text, labels, UI, or readable logos unless the user explicitly provides approved reference art and asks for them

Non-pixel styles are first-class. Plush, clay, sticker, vector, 3D toy, painterly mascot, ink, and brand-inspired looks should be accepted when they satisfy the atlas and readability constraints.

## Transparency And Effects

Pet rows are processed into transparent `192x208` cells, so every generated pixel must either belong to the pet sprite or be cleanly removable chroma-key background. Prefer pose, expression, and silhouette changes over decorative effects.

The deterministic raster pipeline owns the transparency and chroma-cleanup invariants. Its final edge-local spill-suppression step selects every translucent silhouette-boundary pixel plus opaque boundary pixels whose chroma points toward the known key, then extends clean interior RGB outward through that band in linear light. It preserves alpha exactly, clears hidden RGB under fully transparent pixels, and reports the algorithm and parameters used. The cleanup report plus atlas validator are authoritative for chroma contamination. Once the final report has `ok: true` and atlas validation passes, do not regenerate imagery or add another chroma-cleanup pass.

Fully transparent pixels are allowed outside the sprite silhouette, in unused cells, and in intentional negative-space openings that are part of the pet's design, such as loops or holes in a ribbon body. Reject any generated or repaired cell with accidental 100%-transparent holes inside a filled body, including horizontal bands, seam rows, scanline-like gaps, sliced-tile boundaries, or "see-through" interior stripes. Inspect suspect cells on a high-contrast background or alpha mask before accepting them; ordinary atlas validation is not enough when the hole is inside the silhouette.

Allowed effects must satisfy all of these conditions:

- The effect is state-relevant and helps explain the animation.
- The effect is physically attached to, touching, or overlapping the pet silhouette, not floating nearby.
- The effect is inside the same frame slot as the pet and does not create a separate sprite component.
- The effect is opaque, hard-edged enough for clean extraction, and uses non-chroma-key colors.
- The effect is small enough to remain readable at `192x208` without clutter.

Avoid these by default because they usually break transparent-background cleanup or component extraction:

- wave marks, motion arcs, speed lines, action streaks, afterimages, blur, or smears
- detached stars, loose sparkles, floating punctuation, floating icons, falling tear drops, separated smoke clouds, or loose dust
- cast shadows, contact shadows, drop shadows, oval floor shadows, floor patches, landing marks, impact bursts, glow, halo, aura, or soft transparent effects
- text, labels, frame numbers, visible grids, guide marks, speech bubbles, thought bubbles, UI panels, code snippets, checkerboard transparency, white backgrounds, black backgrounds, or scenery
- chroma-key-adjacent colors in the pet, prop, effects, highlights, or shadows
- stray pixels, disconnected outline bits, speckle/noise, cropped body parts, overlapping poses, or any pose that crosses into a neighboring frame slot

State-specific guidance:

- `idle`: keep this calm and low-distraction. Use only subtle breathing, a tiny blink, a slight head or body bob, a very small material sway, or another quiet persona-preserving motion. The loop must still contain visible micro-variation; do not accept six effectively identical copies. Do not show waving, walking, running, jumping, talking, working, reviewing, emotional reactions, large gestures, item interactions, or new props.
- `waving`: show the wave through paw, hand, wing, or limb pose only. Do not draw wave marks, motion arcs, lines, sparkles, symbols, or floating effects around the gesture.
- `jumping`: show vertical motion through body position only. Do not draw shadows, dust, landing marks, impact bursts, bounce pads, or floor cues.
- `failed`: tears, attached smoke puffs, or attached stars are allowed if they obey the allowed-effects rules; do not use red X marks, floating symbols, detached smoke, detached stars, or separate tear droplets.
- `waiting`: show that Codex needs approval, help, or user input through an expectant asking pose. Keep it distinct from ordinary idle and review.
- `running`: show active task work, processing, thinking, scanning, typing, or focused effort. Do not show literal foot-running, jogging, sprinting, treadmill motion, raised knees, long steps, pumping arms, directional travel, speed lines, dust clouds, floor shadows, motion trails, or detached motion effects.
- `review`: show focus through lean, blink, eyes, head tilt, or paw/hand position. Do not add magnifying glasses, papers, code, UI, punctuation, symbols, or other new props unless they already exist in the base pet identity.
- `running-right` and `running-left`: show directional drag movement through body, limb, and prop movement only. `running-right` must face and travel right; `running-left` must face and travel left. Their cadence must visibly alternate across the loop rather than repeating one nearly static stride. Do not draw speed lines, dust clouds, floor shadows, motion trails, or detached motion effects.
