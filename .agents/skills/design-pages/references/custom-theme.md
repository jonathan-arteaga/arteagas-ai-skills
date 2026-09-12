# Custom theme — protocol

## Contents

- Two routes, plain English
- Choose a custom direction when it fits
- § Bespoke depth — custom that designs the whole page
- § B · Palette construction
- § C · Font pairing
- Integrate with the project
- § G · Three worked examples
- Verify the resulting design

## Two routes, plain English

- **catalog** — the named-theme catalogue. design-pages' 21 themes (Specimen, Midnight, Brutal, Garden, Atelier, Newsprint, Terminal, Manifesto, Almanac, Sport, Studio, Riso, Bloom, Coral, Cobalt, Aurora, Editorial, Carnival, Lumen, Hum, Grid). Each one is a fixed combination of paper-band, display-style, and accent-hue. The rotation rule cycles through them so two consecutive runs don't read alike. **This is the default.** Most briefs use it.
- **custom** — made-to-measure, at the depth the brief needs:
  - **Tuned** — a one-off OKLCH palette + font pairing built for one brief, *keeping* design-pages' structures, archetypes, and macrostructures. The rules (paper L bands, accent chroma caps, font ban list, all slop-test gates) still apply; only the *combination* is per-brief.
  - **Bespoke** — when the brief's *structure itself* is the ask, custom goes further and designs the whole page from first principles — its own palette, type, **and** composition — dropping the catalog's structures too, floored only by the universal slop-test gates. Same route, deeper end. See **§ Bespoke depth** below.

  Either way, custom does **not** extend the catalog with a permanent theme.

## Choose a custom direction when it fits

Use a custom palette/type direction when requested or when it serves the brief better than a catalog. Infer routine choices from supplied context; ask only for a consequential missing decision. No mandatory opt-in question or fixed interview is required.

## § Bespoke depth — custom that designs the whole page

Most custom runs are *tuned* (a palette + pairing on design-pages' existing structures). **Bespoke** is the deep end, fired by signal 5: the brief's *structure itself* is the ask and no catalog shape fits. At this depth custom designs the page from first principles — palette, type, **and** composition — and the only thing it inherits is the floor.

Confirm the route once (same discipline as any custom — default to catalog on silence), then take **one** input: *"the direction in a sentence or two — what should this page feel like and do that an off-the-shelf theme wouldn't?"*

**It drops** (only at this depth):
- the named-theme tokens — write the palette inline for this page only (§ B still governs *how*);
- the genre cluster routing — no editorial / atmospheric / modern-minimal / playful archetype defaults;
- the fixed macrostructure + archetype catalog — compose the page's structure for the brief; a novel hero, nav, or section is *encouraged* when it serves the idea;
- the diversification rotation — bespoke is a one-off (like studied-DNA), though it shouldn't clone a recent bespoke run.

**It keeps** — the non-negotiable floor, identical to tuned custom:
- **every universal slop-test gate** ([`slop-test.md`](slop-test.md)) — the guarantee that survives the freedom;
- accessibility & contrast (APCA / WCAG), a visible `:focus-visible`, `prefers-reduced-motion`, semantic landmarks, alt text;
- the **font ban-list** (Gate 1) and free-baseline-only discipline (§ C);
- **OKLCH palette discipline** (§ B) — tinted neutrals, no pure `#000`/`#fff`, accent kept to a signal unless the concept earns more;
- one orchestrated motion; the Step 5 preview before code; the Step 6 stamp + log.

**Process:** read the brief + the one-line direction → design the *system and the one central move* (the idea that makes it not-a-template) → run the gates *as you compose* → surface the preview (palette, type, structure, central idea) → build, stamp, log. Bespoke is **more** design judgment, not less — a bespoke page that reads generic, or trips a gate, has failed; re-design.

**Stamp (bespoke runs):**
```css
/* design-pages · route: custom (bespoke) · structure: <one-line shape> · idea: "<central move>"
 * paper: oklch(...) · accent: oklch(...) · display: <font> · body: <font>
 * axes: <paper-band> / <display-style> / <accent-hue> · gates: all-pass · studied: no
 */
```

**Bespoke is rare.** Most briefs are catalog; some are tuned custom; few are bespoke. Reaching for bespoke on a vanilla brief is over-reach — route to catalog.

---

## § B · Palette construction

Build the palette in this order. Each step cites the rule it's obeying — do not restate the rule, just apply it.

### B.1 · Anchor accent first

- Convert the user's named or hex anchor into OKLCH.
- Clamp chroma to **0.12–0.20** per [`color.md`](color.md) § "Accent — the discipline".
- If user skipped: derive hue from the vibe — *warmth* → 30–60° · *technical/industrial* → 220–250° · *botanical/moss* → 130–160° · *late-night/neon* → 280–320° · *sun-drenched/market* → 60–80° amber. Keep chroma 0.12–0.16 (mid-saturation; saturation comes from contrast against neutral, not from chroma).

### B.2 · Paper

- Derive paper L from the vibe:
  - bright/airy/breakfast/hand-set → **L 95–98 %** (warm-tinted)
  - archival/editorial/restrained → **L 92–95 %** (warm-tinted)
  - technical/clinical/spec-sheet → **L 98–100 % near-white** (cool-tinted; can equal #fff but tinted neutrals downstream)
  - dark/restless/late-night/manifesto → **L 12–18 %** (anchor-tinted)
- **Always tint paper toward the anchor hue with chroma 0.005–0.020** per [`color.md`](color.md) § "Neutral tinting". Pure-white #fff is allowed only when ink + accent + greys carry the chroma; the paper itself never carries chroma 0 in *both* directions.
- Paper-2 (one elevation step): step ±2–4 % L from paper.
- Paper-3 (optional second step): step ±5–7 % L from paper. Skip on minimal palettes.

### B.3 · Ink

- If paper L < 50: ink L **88–96 %**.
- If paper L ≥ 50: ink L **16–24 %**.
- Tint ink chroma **0.005–0.014** toward anchor (a shade darker / lighter, never neutral).
- Ink-2 (secondary text): step 4–8 % L away from ink toward paper. Same hue family.

### B.4 · Supporting greys

Step by ~6–10 % L between paper and ink, all tinted toward anchor with chroma 0.005–0.018:

- `--color-rule` — dividers · L ~70–82 % (light paper) or ~26–34 % (dark paper).
- `--color-rule-2` — secondary dividers · 4–6 % L closer to paper than rule.
- `--color-muted` — de-emphasised text · L ~38–56 %.
- `--color-neutral` — mid-grey equivalent · L ~30–56 %.

These are not arbitrary. The L-step gives the palette **typographic depth** without leaning on accent.

### B.5 · Focus

- Same hue as accent, slightly higher chroma (0.18–0.22) for visibility.
- Same L as accent ±5 %.
- Used only on `:focus-visible` — must show instantly per [`microinteractions.md`](microinteractions.md) § "Focus is a first-class state".

### B.6 · Accent-ink (overlay text colour on accent)

- If accent L > 50: use ink (text reads dark on accent fill).
- If accent L ≤ 50: use paper (text reads light on accent fill).
- Verify **APCA contrast ≥ 7:1** for body, ≥ 3:1 for large text per [`color.md`](color.md).

### B.7 · Verification

- **Gate 7** (no pure #000 / #fff base): paper and ink both have chroma > 0. Pass.
- **Gate 22** (no zero-chroma neutrals): every grey has chroma ≥ 0.005. Pass.
- **Gate 23** (accent ≤ 5 % footprint): plan the accent's role on the page (active state, one wordmark dot, one CTA fill). Don't carpet a section in accent.

---

## § C · Font pairing

Custom pulls from the seven tone-pairings in [`typography.md`](typography.md) — Editorial, Technical, Brutalist, Soft, Luxury, Playful, Austere, Workshop. Each tone has a **free baseline** and a **paid upgrade**.

### C.1 · The freedom

The catalog pairs Display-from-tone-X with Body-from-tone-X. **Custom can mix tones** — that's the whole point:

- Editorial display + Technical body (italic Fraunces wordmark + Geist body) — works for an academic-tone SaaS.
- Brutalist display + Editorial body (Anton + Newsreader italic) — works for a left-leaning manifesto magazine.
- Playful display + Austere body (Bricolage Grotesque + Inter Tight) — works for a creator-tool brand.
- Luxury display + Technical body (Cormorant Garamond + JetBrains Mono) — works for a hand-crafted dev-tool.

Pick **one display face** and **one body face** from any tone's columns. Optional mono if the page has code or tabular data.

### C.2 · The discipline

- **Free baseline only** unless the user has confirmed paid licences. Per [`typography.md`](typography.md) § "The discipline": "Never name a paid font in code without confirming the user is licensed."
- **Banned defaults still banned** per [`typography.md`](typography.md) § "Banned defaults" — Inter / Roboto / Open Sans / Poppins / Lato / Work Sans / DM Sans / Montserrat / system-ui as display all fail Gate 1.
- **Variable fonts are preferred** when available (Fraunces, Bricolage Grotesque, Newsreader, Geist, EB Garamond, Inter Tight) — they support optical-size and weight axes for tighter typographic control.

### C.3 · The pair must read

Once you have display + body, mentally render the page:

- Does the display face have enough weight contrast (200/400 next to 700/900) per [`typography.md`](typography.md) § "Commit to extremes"?
- Does the body face read at the chosen body size (≥ 14 px floor; default 1 rem) at the chosen measure (45–75 ch)?
- If display is mono and body is mono — that's only allowed when the page IS the design (Terminal-aesthetic, true single-font specimen). Per [`typography.md`](typography.md) line 7.

If any answer is no, redirect — pick a different body face or shift the display weight.

---

## Integrate with the project

Use the existing token source and naming. If documentation is requested, hand the supported values and decisions to design-md. Do not rotate themes, record a design log, add stamps, or force axis changes between related pages. Do not create a second token source.

## § G · Three worked examples

Concrete generations to seed model imitation. Each shows the brief, the user's vibe answer, the constructed palette, the chosen pair, and the stamp.

### G.1 · Archival café — "Coffeebox"

**Brief:** *"Build me a landing page for Coffeebox — a small-batch coffee subscription. Roast on Sunday, ship on Monday, drink Tuesday. Audience: people who already buy good coffee and want fewer trips to the shop. Tone: warm, hand-set, editorial — like a small café's chalkboard. Theme route: custom."*

**Vibe answer:** *"archival warmth, hand-set, no varnish."*  **Anchor:** *"terracotta."*

**Palette:**
- paper `oklch(94% 0.020 65)` — warm-cream, hue 65 (amber-warm)
- paper-2 `oklch(91% 0.022 65)` — one elevation step
- ink `oklch(22% 0.014 60)` — warm dark brown-black
- ink-2 `oklch(40% 0.014 60)` — warm secondary
- rule `oklch(78% 0.018 65)` — warm hairline
- muted `oklch(54% 0.014 60)` — warm grey
- accent `oklch(58% 0.16 35)` — terracotta (hue 35, chroma 0.16)
- accent-ink `oklch(96% 0.014 65)` — paper for text on accent
- focus `oklch(56% 0.20 35)` — accent at higher chroma

**Pair:** display **Fraunces italic** (Editorial, free) · body **Source Serif 4** (Editorial, free) · mono **JetBrains Mono** (Technical, free).

**Axes:** **light / italic-serif / chromatic-terracotta**.

**Stamp:**
```css
/* design-pages · macrostructure: Long Document · H5 hero knobs: salutation=time-stamp, body=2 paragraphs, signoff=initials
 * theme: custom · vibe: "archival warmth, hand-set, no varnish" · paper: oklch(94% 0.020 65) · accent: oklch(58% 0.16 35)
 * display: Fraunces italic · body: Source Serif 4 · axes: light / italic-serif / chromatic-terracotta
 * studied: no · context: explicit · v0.8.0
 */
```

### G.2 · Industrial fintech — "Loop"

**Brief:** *"Loop is a real-time payment-rail observability platform for fintechs. Audience: platform engineers. Use case: try it / contact sales. Tone: industrial, cool, technical. Theme route: custom."*

**Vibe answer:** *"industrial precision, cool, technical."*  **Anchor:** *"sea-blue."*

**Palette:**
- paper `oklch(13% 0.012 220)` — dark cool
- paper-2 `oklch(17% 0.014 220)` — one step up
- paper-3 `oklch(22% 0.014 220)` — two steps up (panels)
- ink `oklch(94% 0.010 220)` — cool light
- ink-2 `oklch(72% 0.010 220)`
- rule `oklch(30% 0.012 220)`
- muted `oklch(58% 0.012 220)`
- accent `oklch(72% 0.16 220)` — sea-blue (cool)
- focus `oklch(78% 0.20 220)`

**Pair:** display **Geist Mono 500** (Technical, free) · body **Geist** (Technical, free) · mono **Geist Mono** (Technical, free).

Note: this *is* a single-family page (Geist + Geist Mono are the same family at different widths). [`typography.md`](typography.md) line 7 allows it: "single-font pages are allowed only when the single font IS the design choice." For an industrial-precision fintech, that's the design choice.

**Axes:** **dark / mono / cool**.

**Stamp:**
```css
/* design-pages · macrostructure: Workbench · F2 sticky-scroll knobs: pinned=right, content=trace-panel, steps=3
 * theme: custom · vibe: "industrial precision, cool, technical" · paper: oklch(13% 0.012 220) · accent: oklch(72% 0.16 220)
 * display: Geist Mono 500 · body: Geist · axes: dark / mono / cool
 * studied: no · context: explicit · v0.8.0
 */
```

### G.3 · Botanical apothecary — "Mossroot"

**Brief:** *"Mossroot is a small herbal apothecary in Porto. We make tinctures, salves, and tea blends. Audience: locals + visitors. Use: see what we make + visit. Tone: quiet, herbal, hand-poured. Theme route: custom."*

**Vibe answer:** *"moss, lichen, soft pink, herbal."*  **Anchor:** *(skipped — pick from vibe)*.

The vibe names two hues: *moss* (greenish, ~140°) and *soft pink* (warm, ~350°). Pick **soft pink as the accent** (single anchor — custom is one-accent strict) and use the moss-green as the *paper tint* (chroma 0.018 toward 145°). This carries the dual-vibe without splitting accent.

**Palette:**
- paper `oklch(96% 0.018 145)` — moss-tinted near-white
- paper-2 `oklch(93% 0.020 145)`
- ink `oklch(22% 0.014 140)` — moss-tinted dark
- ink-2 `oklch(42% 0.014 140)`
- rule `oklch(82% 0.018 145)`
- muted `oklch(56% 0.014 140)`
- accent `oklch(72% 0.13 350)` — dusty-pink (chromatic-other)
- focus `oklch(70% 0.18 350)`

**Pair:** display **Cormorant Garamond** (Luxury, free) · body **EB Garamond** (Luxury, free) · mono **Geist Mono** (rare on this page; only for ingredient lists).

**Axes:** **light / roman-serif / chromatic-other (dusty-pink)**.

**Stamp:**
```css
/* design-pages · macrostructure: Catalogue · F1 catalogue knobs: tiles=8, columns=2, rule=hairline-between
 * theme: custom · vibe: "moss, lichen, soft pink, herbal" · paper: oklch(96% 0.018 145) · accent: oklch(72% 0.13 350)
 * display: Cormorant Garamond · body: EB Garamond · axes: light / roman-serif / chromatic-other (dusty-pink)
 * studied: no · context: explicit · v0.8.0
 */
```

---

## Verify the resulting design

Check actual readability, accessibility, responsiveness, and product fit. Palette bands, typography pairings, and worked examples above are optional starting points. Respect the project's approved design, including pure white, system fonts, single-family type, or multiple accents when appropriate. A preview may help resolve an open choice, but an already-authorized build does not need a new approval round.
