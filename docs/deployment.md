# Vercel deployment

Demand PR is hosted only in the dedicated Vercel team `demandprltd-8340s-projects` under the project `demandpr`.

- Project URL: `https://demandpr.vercel.app`
- Framework: Next.js
- Runtime: Node.js 22.x
- Production branch: `main`
- Canonical custom domain: pending stakeholder approval

## Access and secret handling

Use a Vercel Access Token scoped to the dedicated Demand PR account/team. Supply it as `DEMANDPR_VERCEL_TOKEN` from an external secret store; never commit the token, `.vercel/`, `.env.local`, or downloaded OIDC credentials.

Do not use an AI Gateway API key for deployments. Vercel REST API and CLI deployment operations require a Vercel Access Token.

## Deployment safety

`SITE_INDEXABLE=false` is configured for development, preview, and production. Keep it false until all launch dependencies are approved, including the canonical domain, contact destination, official contact details, legal-page destinations, final content fact-check, and publication approval.

Do not set `SITE_INDEXABLE=true` until `NEXT_PUBLIC_SITE_URL` is configured as the approved HTTPS production origin. The application fails closed when production indexing is enabled without that origin.

## Manual deployment

From the repository root, with the dedicated token available in the environment:

```bash
npx vercel@latest deploy \
  --yes \
  --scope demandprltd-8340s-projects \
  --token "$DEMANDPR_VERCEL_TOKEN"
```

Use `--prod` only for an approved production release. Verify the deployment URL, `/robots.txt`, `/sitemap.xml`, response security headers, browser console, and responsive layout after each production-facing deployment.

## GitHub integration

Automatic branch and pull-request deployments require the dedicated Vercel account to connect its GitHub login and grant access to `Rexdomine/DemandPR`. Until that connection is enabled, deployment is manual through the dedicated Vercel project and token.
