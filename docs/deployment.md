# Vercel deployment

Demand PR is hosted only in the dedicated Vercel team `demandprltd-8340s-projects` under the project `demandpr`.

- Project URL: `https://demandpr.vercel.app`
- Project ID: `prj_HggbtLdbdaJcuvDu89kGscjs5AlT`
- Team ID: `team_M5iRNyEcNZHaREmgnyWgJgI1`
- Framework: Next.js
- Runtime: Node.js 22.x
- Production branch policy: `main` after Rex-approved merge; automatic Git enforcement is pending the GitHub connection
- Canonical custom domain: pending stakeholder approval

## Access and secret handling

Use a Vercel Access Token scoped to the dedicated Demand PR account/team. Supply it as `DEMANDPR_VERCEL_TOKEN` from an external secret store; never commit the token, `.vercel/`, `.env.local`, or downloaded OIDC credentials.

Do not use an AI Gateway API key for deployments. Vercel REST API and CLI deployment operations require a Vercel Access Token.

## Deployment safety

`SITE_INDEXABLE=false` is configured for development, preview, and production. Keep it false until all launch dependencies are approved, including the canonical domain, contact destination, official contact details, legal-page destinations, final content fact-check, and publication approval.

Do not set `SITE_INDEXABLE=true` until `NEXT_PUBLIC_SITE_URL` is configured as the approved HTTPS production origin. The application fails closed when production indexing is enabled without that origin.

## Manual deployment

Use the tested Vercel CLI version `55.0.0`. From a fresh checkout, explicitly link and verify the existing dedicated project before deploying; `--scope` alone does not select the project.

```bash
npx vercel@55.0.0 link \
  --yes \
  --project demandpr \
  --scope demandprltd-8340s-projects \
  --token "$DEMANDPR_VERCEL_TOKEN"

node -e '
  const project = require("./.vercel/project.json");
  if (
    project.projectId !== "prj_HggbtLdbdaJcuvDu89kGscjs5AlT" ||
    project.orgId !== "team_M5iRNyEcNZHaREmgnyWgJgI1"
  ) process.exit(1);
'
```

Deploy only committed source from a clean tree. Until the GitHub connection is enabled, use an exact Git archive so an unrelated Git author/team-membership check cannot block an otherwise authorised CLI deployment:

```bash
test -z "$(git status --porcelain)"
DEPLOY_COMMIT="$(git rev-parse HEAD)"
DEPLOY_DIR="$(mktemp -d)"
trap 'rm -rf "$DEPLOY_DIR"' EXIT

git archive "$DEPLOY_COMMIT" | tar -x -C "$DEPLOY_DIR"
mkdir -p "$DEPLOY_DIR/.vercel"
cp .vercel/project.json "$DEPLOY_DIR/.vercel/project.json"

npx vercel@55.0.0 deploy \
  --yes \
  --cwd "$DEPLOY_DIR" \
  --scope demandprltd-8340s-projects \
  --token "$DEMANDPR_VERCEL_TOKEN"

printf 'Deployed commit: %s\n' "$DEPLOY_COMMIT"
```

A production deployment additionally requires Rex's recorded approval, a clean `main` checkout at the approved merged commit, and the explicit `--prod` flag. Do not merge or issue a production deployment without that approval. Verify the deployment URL, `/robots.txt`, `/sitemap.xml`, response security headers, browser console, and responsive layout after every production-facing deployment.

## GitHub integration

Automatic branch and pull-request deployments require the dedicated Vercel account to connect its GitHub login and grant access to `Rexdomine/DemandPR`. Until that connection is enabled, deployment is manual through the dedicated Vercel project and token.
