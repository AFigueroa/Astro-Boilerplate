# Astro Boilerplate

Standard starting point for presentational/marketing client sites: Astro +
TypeScript + Tailwind + Biome + Vitest + Playwright, with CI and Cloudflare
Workers (static assets) deploy wired up.

## Stack

| Concern | Tool |
| --- | --- |
| Framework | [Astro](https://astro.build) (TypeScript, strict mode) |
| Styling | [Tailwind CSS](https://tailwindcss.com) |
| Lint/format | [Biome](https://biomejs.dev) |
| Unit tests | [Vitest](https://vitest.dev) (+ Astro Container API for component tests) |
| E2E tests | [Playwright](https://playwright.dev) |
| Content | Astro Content Collections (Zod-validated frontmatter) |
| Hosting | [Cloudflare Workers static assets](https://developers.cloudflare.com/workers/static-assets/) (default) |
| CI | GitHub Actions |
| Dependency updates | Dependabot |

## Getting started (new client project)

1. **Use this as a template** — click "Use this template" on GitHub, or:
   ```bash
   git clone <this-repo-url> new-client-site
   cd new-client-site
   rm -rf .git && git init
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the env file and fill in values for this project:
   ```bash
   cp .env.example .env
   ```
4. Set `site` in `astro.config.mjs` to the project's production URL.
5. Update the `@theme` tokens in `src/styles/global.css` to the client's brand.
6. Start the dev server:
   ```bash
   npm run dev
   ```

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Local dev server |
| `npm run build` | Type-check + production build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` / `lint:fix` | Biome check / auto-fix |
| `npm run typecheck` | `astro check` |
| `npm run test` | Vitest (unit + component tests) |
| `npm run test:coverage` | Vitest with coverage report |
| `npm run test:e2e` | Playwright smoke tests (requires `npm run build && npm run preview` running, or let the config start it) |

## Project structure

```
src/
  components/     Reusable .astro components (Header, Footer, SEO, Button, ...)
  layouts/        Layout.astro — wraps every page with <head>, nav, footer
  pages/          File-based routing
  content/        Content Collections (blog/, services/) — schema in src/content.config.ts
  env/            Validated environment variables (src/env/config.ts)
  lib/            Plain TS utilities (tested with Vitest)
  styles/         global.css (Tailwind entry point)
e2e/              Playwright smoke tests
```

## CI

Every PR runs, via `.github/workflows/ci.yml`:
1. Lint (Biome) + type-check — **blocking**
2. Unit tests (Vitest) — **blocking**
3. Build — **blocking**
4. Playwright smoke tests against the built site — **blocking**
5. Lighthouse CI — **advisory** (won't block merge, flags regressions)

Dependabot opens weekly PRs for npm and GitHub Actions dependency updates.

## Deploying

**Cloudflare Workers (default):**
1. Cloudflare dashboard → Workers & Pages → Create → Workers → Import a repository
2. Build command: `npm run build`
3. Deploy command: `npx wrangler deploy` (reads `wrangler.toml`, uploads `dist/`)
4. The Worker name in the dashboard must exactly match `name` in `wrangler.toml`
5. Node version is read from `.nvmrc` automatically
6. Every push to `main` auto-deploys; PR branches get preview URLs

**Other hosts:** Vercel and Netlify both auto-detect Astro — connect the repo,
accept the defaults, done. `wrangler.toml` is only used by Cloudflare.

**AWS (S3 + CloudFront):** not included in this boilerplate by default — add
a CDK stack to a given project only when deliberately deploying to AWS.

## Adding a client's brand

- Colors/fonts: `@theme` block in `src/styles/global.css` (keep the `--color-brand-*` names)
- Site name / nav: `src/components/Header.astro`, `src/env/config.ts` (`PUBLIC_SITE_NAME`)
- Favicon: `public/favicon.svg`
- Contact form endpoint: `PUBLIC_CONTACT_FORM_ENDPOINT` in `.env` (e.g. Formspree, Web3Forms)
- Production URL (required for sitemap/canonical/OG tags): `site` in `astro.config.mjs`, and `Sitemap:` line in `public/robots.txt`
