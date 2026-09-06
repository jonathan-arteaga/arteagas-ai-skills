# Web one-way doors

Decisions that are expensive to reverse after the first release. Record a choice or an explicit deferral for each.

## Architecture

- Rendering: static, server-rendered, client-rendered, or mixed. Drives SEO, hosting, and data fetching.
- Framework and routing model. Nested layouts vs flat pages changes how the product grows.
- Hosting target. Edge, serverless, or a long-running server constrains what code can do.

## Identity and data

- Auth: none, email and password, magic link, OAuth, SSO. Who owns the identity?
- Tenancy: single user, teams, or organizations. Retrofitting teams is a rewrite.
- Data that cannot be migrated later: IDs, slugs, URLs people will bookmark or share.
- Payments: none, one-off, subscription. The provider sets the tax and refund story.

## Product surface

- Public vs authenticated surface. Marketing site and app in one codebase or two.
- URL scheme. Public URLs are a contract.
- Localization: one language at launch or many. Adding later touches every string.
- Accessibility floor: which WCAG level ships on day one.

## Settle before code

- Is there an existing design system or `DESIGN.md` to honor?
- What does the first empty state show, before any data exists?
- Which flow must work on a phone-sized viewport?
- What is the slow-network or offline expectation?

## Can wait

- Analytics vendor
- Email provider
- Admin tooling
- Dark mode, unless identity depends on it
