# Testing strategy

Vitest, Testing Library, user-event and jest-axe cover authored content and behaviour:

- approved identity, navigation and service-content invariants;
- homepage landmarks, heading hierarchy and automated accessibility checks;
- mobile-navigation focus placement, focus trapping, Escape handling, selection handling and scroll-lock cleanup.

Automated axe checks are useful but do not replace manual keyboard, screen-reader, zoom, contrast and responsive testing. Framework-generated declarations and declarative build configuration are validated through lint, strict TypeScript and the production build rather than artificial unit tests.

Run an affected test file while iterating, `npm run verify:checkpoint` when a coherent implementation unit is complete, and `npm run verify:release` once the tree is stable for review/PR handoff. The tiered gate rationale and responsive-QA boundary are documented in `docs/development-workflow.md`.
