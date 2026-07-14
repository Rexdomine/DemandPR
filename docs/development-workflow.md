# Optimization-first development workflow

Demand PR follows Rex's cross-project optimization principle: choose the fastest safe high-value path, lock acceptance criteria early, avoid repeated broad verification, and protect quality with risk-based gates.

## Start every task

1. Fetch and prune `origin`.
2. Verify the required base and working-tree state.
3. Start a fresh, focused branch from current `main`.
4. Lock the outcome, scope, out-of-scope items, sources of truth and acceptance criteria.
5. Inspect public assets and unsupported brand/content claims before integration.

A reusable read-only preflight is available on the Hermes workspace host:

```sh
python /opt/data/agent-operations/scripts/project_preflight.py . --fetch
```

The repository does not depend on that external helper; standard Git commands remain sufficient for other contributors.

## Risk tiers

- **Low:** docs, copy, isolated styling or safe configuration. Use targeted checks and parent diff review.
- **Medium:** bounded page/component/feature. Use focused iteration, one checkpoint gate and one independent release review.
- **High:** authentication, privacy, destructive state, migrations or production integrations. Require a written plan, rollback path and deeper independent review.

## Verification tiers

### Revision gate

During implementation, run only the checks affected by the edit. Examples:

```sh
npm test -- src/components/header.test.tsx
npm run typecheck
```

Use one relevant viewport while layout is still changing. Do not regenerate all formal screenshots after every CSS edit.

### Checkpoint gate

When a coherent implementation unit is complete:

```sh
npm run verify:checkpoint
```

This runs formatting, lint, strict TypeScript and the full Vitest suite.

### Release gate

When the tree is stable and ready for independent review or PR handoff:

```sh
npm run verify:release
```

This adds dependency audit, an optimized production build and a candidate-aware diff check. `verify:diff` compares committed branch changes with `origin/main` and also checks staged, unstaged and text-based untracked files. Set `BASE_REF` when the required PR base differs. Required responsive/browser and deployment checks remain separate because they require a running production-mode application or hosted preview.

### Confirmation gate

After review findings, run focused tests for each correction. Once every blocker is resolved, run `npm run verify:release` one final time. Follow-up QA should confirm prior blockers and changed surfaces rather than repeat full discovery.

## Agent responsibilities

- **Groot:** sources of truth, scope, risk tier, orchestration, integration and PR lifecycle.
- **Drax:** bounded implementation with focused iteration checks and a concise handoff.
- **NightWing:** one independent release-candidate review; confirmation-only follow-up after blockers.

## Stop and reassess

Change approach when the same failure repeats without new evidence, an asset requires repeated sanitisation, a minor edit triggers repeated broad gate runs, or the task expands beyond its accepted outcome.

## Non-negotiable quality controls

Optimization does not waive accessibility, claim verification, privacy, security scanning, clean production builds, responsive behavior, or Rex's merge/deployment approval gates. It schedules those controls at the point where they provide the most value.
