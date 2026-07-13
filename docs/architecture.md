# Architecture

## Current slice

Demand PR is a static-first Next.js App Router application. The initial scope contains one homepage, shared header/footer, a not-found route and framework-generated metadata routes. There is no CMS, analytics, contact-processing backend or deployment configuration.

- `src/app`: route UI, global styles and metadata routes.
- `src/components`: shared presentation and interactive navigation.
- `src/content`: typed, locally reviewed website copy.
- `src/test`: shared Vitest setup.

React Server Components are the default. The header is the only Client Component because its mobile dialog owns UI state and focus behaviour. Abstract hero artwork is CSS-only, avoiding remote or unlicensed media.

## Design system

Tailwind scans authored components and exposes the approved palette. CSS custom properties in `globals.css` are the canonical design tokens and are also used by bespoke component styles. Sora and Inter are represented by graceful system-font fallback stacks; adding hosted font files later requires licence and performance review.

## Indexing and metadata

Preview and local environments are noindex by default. Indexing is enabled only when `SITE_INDEXABLE=true` and `VERCEL_ENV=production`; the same condition controls robots output and the `X-Robots-Tag` header. `NEXT_PUBLIC_SITE_URL` supplies the canonical origin and sitemap URL.

## Security

`next.config.ts` removes the framework signature and applies a restrictive baseline CSP, clickjacking protection, MIME sniffing protection, a referrer policy and a least-privilege permissions policy. Any future third-party integration must deliberately update and document the CSP.
