# Contributing

## Workflow

1. Create a short-lived branch from `main` using a clear prefix such as `feat/`, `fix/` or `docs/`.
2. Keep changes focused. Do not add claims, metrics, client names, testimonials, addresses or imagery without approval and provenance.
3. Add meaningful tests for authored behaviour and content rules. Generated framework configuration does not need artificial test-first coverage.
4. During iteration, run affected tests and targeted checks only. When a coherent implementation checkpoint is complete, run:

   ```sh
   npm run verify:checkpoint
   ```

5. Once the tree is stable and ready for independent review or pull-request handoff, run the complete local release gate:

   ```sh
   npm run verify:release
   ```

   Responsive browser and hosted-preview checks remain required when relevant. Do not repeatedly run the full release gate after minor edits; use focused regression checks and run it once after all review blockers are resolved. See `docs/development-workflow.md`.

6. Use Conventional Commits, for example `feat: add market entry overview`.
7. Complete the pull request checklist and obtain review. Do not merge or enable auto-merge without Rex's recorded approval. Merging an approved pull request into `main` authorises the automatic production deployment of that exact merge commit; manual deployment or retry remains restricted to the current approved `main` SHA.

## Accessibility and content

Maintain semantic landmarks and heading order, visible keyboard focus, a working skip link, keyboard-operable controls, 44px minimum interactive targets and reduced-motion support. Write in UK English and prefer plain, verifiable language.

## Security and privacy

Never commit secrets, real enquiry data or private design credentials. Copy `.env.example` to `.env.local` for local values; environment files remain ignored. New third-party scripts, forms, remote media and data collection require explicit architecture and privacy review.
