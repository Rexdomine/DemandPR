# Demand PR Digital Ecosystem

Official web platform repository for Demand PR Ltd. This foundation is a static-first, accessible and conversion-focused Next.js homepage based on the approved Demand PR direction.

## Scope

The current vertical slice includes the responsive homepage, shared navigation and footer, local typed content, metadata/robots/sitemap/404 handling, preview indexing controls, security headers, automated quality gates, and a dedicated Vercel deployment. It intentionally excludes the remaining site pages, enquiry processing, CMS, and analytics.

## Requirements

- Node.js 22.22.3 (see `.nvmrc`)
- npm 10.9.8 (pinned in `package.json`)

## Local setup

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. Environment variables:

- `NEXT_PUBLIC_SITE_URL`: canonical production origin, without a trailing slash.
- `SITE_INDEXABLE`: set to `true` only for an approved production release.
- `VERCEL_ENV`: supplied by Vercel; indexing additionally requires the value `production`.

Local and preview builds are noindex by default. An indexable production build fails closed unless `NEXT_PUBLIC_SITE_URL` is a valid HTTPS origin.

## Launch dependencies

The approved Demand PR production domain, consultation/contact destination and official social/contact details have not yet been supplied. They are intentionally not fabricated in this foundation. These values must be approved and connected before production launch.

## Commands

- `npm run dev` — local development server
- `npm run format` / `npm run format:check` — write/check Prettier formatting
- `npm run lint` — ESLint with zero warnings allowed
- `npm run typecheck` — strict TypeScript check
- `npm test` / `npm run test:watch` — Vitest suite
- `npm run build` — production Next.js build
- `npm start` — serve a completed production build

## Project documentation

- [Architecture](docs/architecture.md)
- [Testing strategy](docs/testing.md)
- [Contributing](CONTRIBUTING.md)
- [Bootstrap plan](docs/plans/2026-07-13-bootstrap-homepage.md)

## Governance

`main` is the production integration branch. Use short-lived branches and reviewed pull requests. Do not commit API keys, environment files, customer enquiry data, private design credentials or unapproved claims/assets. CI must pass before merge.

## Licence

Proprietary. All rights reserved by Demand PR Ltd.
