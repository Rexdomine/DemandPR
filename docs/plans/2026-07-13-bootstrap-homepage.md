# Bootstrap and homepage vertical slice plan

Date: 13 July 2026
Branch: `feat/bootstrap-homepage`

## Goal

Create a reproducible, static-first Next.js foundation and one polished, accessible homepage slice without expanding into the full site, CMS, enquiry backend, analytics or deployment.

## Bite-sized delivery plan

1. Preserve baseline governance; pin Node/npm and establish strict TypeScript, Tailwind, lint, format, test and build configuration.
2. Write behaviour tests first for approved content, homepage semantics/automated accessibility and keyboard mobile navigation; run and record RED.
3. Add typed local content and reusable layout/header/footer/section components; implement the responsive editorial homepage with local abstract CSS artwork.
4. Add metadata, environment-controlled indexing, sitemap, robots, 404 and static-site security headers.
5. Run tests to GREEN, then clean-install, format, lint, type-check, test and production-build gates; fix all in-scope findings.
6. Document setup, architecture, preview safety and contribution workflow; review the diff and create one conventional local commit.

## TDD evidence

The original bootstrap pass did not preserve a pre-implementation RED transcript. That limitation is recorded rather than backfilled. During completion review, two regression failures were captured and fixed test-first:

- RED: `npm test` failed `approved site content > provides unique, internal navigation targets` because hash-only links were not valid cross-page targets.
- RED: `npm test` failed `Header mobile navigation > ... restores focus` because focus returned to `<body>` after Escape.
- GREEN: the navigation targets were made root-relative and focus restoration was moved into the post-close effect; the final `npm test` acceptance result is recorded in the PR description.

Generated framework/configuration files are excluded from artificial TDD; authored content and interactive behaviour are covered.
