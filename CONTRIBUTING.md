# Contributing

## Workflow

1. Create a short-lived branch from `main` using a clear prefix such as `feat/`, `fix/` or `docs/`.
2. Keep changes focused. Do not add claims, metrics, client names, testimonials, addresses or imagery without approval and provenance.
3. Add meaningful tests for authored behaviour and content rules. Generated framework configuration does not need artificial test-first coverage.
4. Run every local quality gate before opening a pull request:

   ```sh
   npm run format:check
   npm run lint
   npm run typecheck
   npm test
   npm run build
   ```

5. Use Conventional Commits, for example `feat: add market entry overview`.
6. Complete the pull request checklist and obtain review before merging.

## Accessibility and content

Maintain semantic landmarks and heading order, visible keyboard focus, a working skip link, keyboard-operable controls, 44px minimum interactive targets and reduced-motion support. Write in UK English and prefer plain, verifiable language.

## Security and privacy

Never commit secrets, real enquiry data or private design credentials. Copy `.env.example` to `.env.local` for local values; environment files remain ignored. New third-party scripts, forms, remote media and data collection require explicit architecture and privacy review.
