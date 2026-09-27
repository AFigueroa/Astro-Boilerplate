# Batey Labs — Portal

Agency website and founder portfolio for Batey Labs (`bateylabs.com`), bilingual EN/ES.
Astro + TypeScript + Tailwind + Biome + Vitest + Playwright, deployed to Cloudflare Workers
static assets by GitHub Actions. **Private repository.**

Roadmap, sitemap, pricing, and decisions: [`plan.md`](plan.md). Conventions for working in the
code: [`CLAUDE.md`](CLAUDE.md).

## Getting started

```bash
npm install
cp .env.example .env
npm run dev
```

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Local dev server (CSP isn't applied in dev; use `build` + `preview` to check it) |
| `npm run build` | Type-check + production build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` / `lint:fix` | Biome check / auto-fix |
| `npm run typecheck` | `astro check` |
| `npm run test` | Vitest unit tests |
| `npm run test:e2e` | Playwright: smoke, EN/ES `hreflang` checks, and axe WCAG 2.2 AA scans of every page (build first) |
| `npm run lighthouse` | Lighthouse CI against every page (build first) |
| `npm run quality` | Aggregate `reports/` into the published quality stats (`src/data/quality.json`) |

## Languages

English lives at `/` and Spanish under `/es/`, with translated slugs. Every page is registered
once in `src/i18n/routes.json`; tests fail if a page is missing in either language.

## CI and deploy

Every push and PR runs, via `.github/workflows/ci.yml`:

1. Lint + type-check
2. Unit tests
3. Security (`npm audit`; Snyk once `SNYK_TOKEN` is set)
4. Build
5. Playwright e2e and accessibility scans
6. Lighthouse budgets

All of these block. On `main`, a final **deploy** job regenerates the published quality stats
from that run's reports, rebuilds, and runs `wrangler deploy`.

### One-time setup (GitHub + Cloudflare)

1. **Cloudflare:** create an API token with the *Edit Cloudflare Workers* template. Note your
   Account ID (dashboard sidebar). If a Worker named `batey-labs` was connected to Git via
   Workers Builds, disconnect it: GitHub Actions deploys instead, so untested builds never go
   live.
2. **GitHub repo → Settings → Secrets and variables → Actions:**
   - Secrets: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`, and optionally `SNYK_TOKEN`
     (free Snyk account → Account settings → Auth token).
   - Variable: `PUBLIC_INDEXABLE` = `false` (set to `true` only at public launch).
3. Push to `main`. The site deploys to `batey-labs.<your-subdomain>.workers.dev`, marked
   noindex.

### Public launch

Once the LLC is registered (`plan.md` Phase 8): attach `bateylabs.com` as a custom domain on
the Worker, set `PUBLIC_INDEXABLE` to `true`, and push.
