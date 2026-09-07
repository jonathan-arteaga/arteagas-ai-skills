# Section guide

Funnel order. A later section never precedes an earlier one.

| Order | Section | Tier | Include when |
| --- | --- | --- | --- |
| 1 | Centered title (and logo) | Required title; logo optional | Always write the title. Add a logo only when a repo asset exists. |
| 2 | Centered tagline | Required | Always. One sentence. What it is, not a slogan. |
| 3 | Badges | Optional | A real target exists: CI workflow, license file, published package, or documented chat. |
| 4 | Anchor nav | Optional | Four or more `##` sections. |
| 5 | Demo image or GIF | Optional | A screenshot or GIF already lives in the repo or a stable public URL the project owns. |
| 6 | Features or Introduction | Optional | The repo has distinct capabilities a stranger would not infer from the tagline. |
| 7 | How To Use / Quick Start | Required | Always. Commands from real scripts. |
| 8 | Resources / Download | Optional | Docs site, releases, or a hosted product URL exists. |
| 9 | Contributing / Credits | Optional | `CONTRIBUTING.md` exists, or dependencies are named in a lockfile or manifest and worth crediting. |
| 10 | Related | Optional | Sister projects are already linked in the repo or the existing README. |
| 11 | Footer | Optional | Author or social URLs already appear in the README, `package.json` author, or git remote. |
| 12 | License | Required | Always last. Link `LICENSE`. If the file is missing, name the SPDX id from the manifest and say the file is absent. |

## Title and logo

Use a centered HTML `<h1>`. Wrap a linked `<img>` when an existing vector or PNG lives in the repo (`logo.svg`, `assets/`, `.github/assets/`). Keep width around `200` or height under `100`. Add `#gh-light-mode-only` / `#gh-dark-mode-only` only when both assets exist.

No logo asset: centered text title only. Do not generate a raster placeholder. Do not hotlink an unrelated image.

## Tagline

One sentence under the title (`<h4 align="center">` or italic `<p>`). Name the kind of thing and the job it does. Do not stack adjectives. Do not claim completeness, scale, or performance unless a file or measured result supports it.

## Badges

Use [shields.io](https://shields.io) or the host's native badge.

- At most five badges per row. Same height in a row. Blank line between rows.
- Row 1: health — CI, coverage, release.
- Row 2: distribution and community — version, license, chat.
- Every badge `href` must resolve to a file, workflow, package page, or documented URL in this repo.
- Skip vanity badges (download counts you cannot verify, "built with love").

## Anchor nav

Centered `<p>` of `Section • Section` links. Use GitHub slugs: lowercase, spaces to hyphens, drop punctuation. Heading `How To Use` → `#how-to-use`. Include only sections that exist in the file.

## Demo

One hero image or short GIF of the core workflow, immediately after the header. Alt text describes the screen. Prefer a path in the repo. Do not invent a capture. If none exists, skip and list it as a follow-up.

## Features

Short bullets. Bold the capability, then one clause of what it does. Each bullet must map to code, a script, a screenshot, or a documented command. Prefer five to nine. Move long tours into `<details>`.

An Introduction paragraph may replace Features when the project is a platform or library whose value is the whole, not a list.

## How To Use

Address a stranger.

1. Name prerequisites that the repo actually requires (engines, Docker, language version from the manifest).
2. Give three to five copy-paste commands with `#` comments, taken from `package.json` scripts, a Makefile, or equivalent.
3. State the visible result (URL, binary, or expected output).
4. Put platform forks and long setup under a second heading or `<details>`.
5. Use `> **Note**` for a gotcha that would block the first run.

Never invent a script name. If the only real entry is `pnpm check`, say so.

## Resources, contributing, related, footer

Link out. Do not paste docs, the full contributor list, or the license text. Contributing is a pointer to `CONTRIBUTING.md` plus issue types the repo already templates. Related lists sister repos that already exist. Footer is `website · GitHub · Twitter` (or the handles the project actually uses). Never invent a handle.

## License

Last section. One line: SPDX id and a link to `LICENSE`. Dual licenses: name each and where it applies, from files in the repo.

## Voice

Update mode keeps the project's existing voice. Create mode stays plain and specific. Do not add emoji decoration unless the current README already uses it.
