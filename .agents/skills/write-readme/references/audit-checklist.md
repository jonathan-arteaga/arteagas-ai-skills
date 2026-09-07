# Audit checklist

Use this in update mode. Read the current `README.md` and the repository before changing anything.

## Preserve

- Accurate prose, links, and the project's voice
- Working commands, real URLs, and named people or handles
- Screenshots, logos, and GIFs already in the repo
- License text and SPDX id
- Detail that still belongs; if it is too long for the funnel, move it to `docs/` and leave a link

Do not flatten personality into generic marketing. Do not delete accurate content to look tidy.

## Header

- [ ] Title is a centered HTML `<h1>` (logo image only if an asset exists)
- [ ] Tagline is one centered sentence
- [ ] Badge rows exist only for targets that resolve; at most five per row; health before community
- [ ] Centered nav exists when there are four or more `##` sections; every href matches a heading slug
- [ ] Hero screenshot or GIF sits immediately after the header when an image exists

## Body order

Confirm this sequence, skipping sections the repo cannot support:

1. Features or Introduction
2. How To Use / Quick Start
3. Resources / Download
4. Contributing / Credits
5. Related
6. Footer
7. License (last)

- [ ] No required section is missing (title, tagline, How To Use, License)
- [ ] No optional section is a stub or "Coming soon"
- [ ] Secondary material is in `<details>` or `docs/`
- [ ] `> **Note**` callouts are limited to first-run blockers

## Evidence

For each reader-facing sentence, tick one:

- [ ] Backed by a file, script, test, image, or public URL in this repo
- [ ] Rewritten to match the evidence
- [ ] Removed

If more than two claims are uncertain, stop and run `validate-project-claims` before publishing the rewrite.

## Commands and identity

- [ ] Prerequisites match `engines`, Docker files, or language files
- [ ] Every command in How To Use exists in a manifest or Makefile
- [ ] Badge, nav, and resource links resolve
- [ ] Footer handles appear in the old README, `package.json` author, or git remote — none invented
- [ ] No `[bracket]` placeholders remain

## After the rewrite

Return a table:

| Section | Action | Evidence |
| --- | --- | --- |
| Features | kept / reordered / added / removed | path or reason |

Then list follow-ups the user must supply (logo, screenshot, missing `LICENSE`).
