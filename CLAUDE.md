# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Bilingual (EN/ES) agency site and founder portfolio for Batey Labs: Astro 7 (TypeScript strict) + Tailwind v4 + Biome + Vitest + Playwright, deployed to Cloudflare Workers as static assets (not Pages). There is no server runtime. Output is fully static (`dist/`, `build.format: "directory"`). Node version is pinned in `.nvmrc` (24; `engines` requires >=22.12). `plan.md` is the roadmap: phases, sitemap, pricing, and decisions. Check it before starting new work. **The repo is private and must stay private.**

## Commands

```bash
npm run dev            # dev server at http://localhost:4321 (CSP is not applied in dev)
npm run build          # astro check (type-check) + astro build → dist/
npm run preview        # serve dist/ (what Playwright and Lighthouse test against)
npm run lint           # biome check .   (lint:fix to auto-fix)
npm run typecheck      # astro check
npm run test           # vitest run (unit tests; also writes reports/vitest.json)
npm run test:e2e       # playwright incl. axe a11y scans; auto-starts `npm run preview`, so build first
npm run lighthouse     # Lighthouse CI (pinned @lhci/cli via npx) against the preview server
npm run quality        # aggregate reports/ into src/data/quality.json (CI does this; don't commit real numbers by hand)
```

Single tests:

```bash
npx vitest run src/i18n/routes.test.ts
npx vitest run -t "matches the page files"
npx playwright test e2e/a11y.spec.ts -g "/es/servicios/"
```

A Husky pre-commit hook runs `lint-staged`, which runs `biome check --write` on staged JS/TS/Astro/JSON files.

## Architecture & conventions

- **i18n routing:** English is unprefixed at `/`, Spanish lives under `/es/`, and slugs are translated (`/services/` ↔ `/es/servicios/`). `src/i18n/routes.json` is the single source of truth for every page URL in both locales. It's read by `routes.ts` (typed helpers), `astro.config.mjs` (sitemap `hreflang` pairs), and `e2e/pages.ts` (every e2e and a11y test iterates it). Adding a page takes three steps: add a route entry, create the page file for **both** locales, and add both URLs to `lighthouserc.json`. `routes.test.ts` fails if the table, the page files, or the Lighthouse URL list disagree.
- **Pages are thin wrappers:** `src/pages/services.astro` and `src/pages/es/servicios.astro` both render `src/views/ServicesView.astro` with a `locale` prop. Put markup in the view, never duplicated per locale. Each view passes `locale` and `routeKey` to `Layout`, which drives `<html lang>`, canonical, `hreflang` (+ `x-default` → EN), `og:locale`, the nav, and the language switcher.
- **Strings:** UI strings (nav, labels) live in `src/i18n/ui.ts`, where `es` is typed against `en`'s keys, so a missing translation fails `astro check`. Page copy lives in the views (placeholder for now) or in content collections.
- **Content Collections:** bilingual JSON at `src/content/<collection>/<locale>/<id>.json`, so ids come out as `en/websites`. Filter with `getCollection("services", (e) => e.id.startsWith(\`${locale}/\`))`. Never name a data field `slug`: the glob loader uses it as the entry id and drops the locale folder (that's why the field is `urlSlug`). `content.test.ts` enforces EN/ES parity. Prices live in the `services` data (`startingAt`), not in markup.
- **Indexing:** every page gets `noindex` until `PUBLIC_INDEXABLE=true`. That's intentional during the private preview and gets flipped at public launch via the GitHub repo variable.
- **Security:** `security.csp` in `astro.config.mjs` emits a per-page CSP `<meta>` with hashes for Astro's own scripts and styles. Headers a `<meta>` can't carry (`frame-ancestors`, HSTS, etc.) are in `public/_headers`, which Cloudflare applies in production only and `security-headers.test.ts` checks. Add third-party origins (form endpoint, Turnstile, analytics) to the CSP directives when they're introduced. An e2e test fails on any console error, which catches CSP violations. No inline `<script>` or `style=` attributes. Markdown uses Prism, not Shiki (Shiki's inline styles break the CSP).
- **Published quality stats:** `src/data/quality.json` (schema in `src/lib/quality.ts`) is generated in the deploy job by `scripts/quality-report.mjs` from that run's Vitest, Playwright/axe, npm audit, and Lighthouse reports. Values are worst-case across pages. The committed file holds nulls, and the UI must hide a null stat rather than show a made-up number.
- **Env vars:** go through `src/env/config.ts` (Zod; throws at build time). Import `env` from `@/env/config`, never `import.meta.env`. Add new vars to the schema and to `.env.example`. All vars are `PUBLIC_` and ship to the client.
- **Contact form:** posts to a third-party endpoint set by `PUBLIC_CONTACT_FORM_ENDPOINT`. With no endpoint set, it renders disabled with a mailto fallback. The CSP `form-action` must allow that endpoint's origin once it's set.
- **Theming:** brand tokens are Tailwind v4 `@theme` values in `src/styles/global.css` (`brand-*` utilities). Change the values, not the token names. Keep form-control borders at `brand-500` or darker (WCAG non-text contrast).
- **Path aliases:** `@/*` → `src/*`, plus `@components/*` and `@layouts/*`.
- **Biome style:** double quotes, semicolons, trailing commas, 100-col lines, LF line endings (enforced by `.gitattributes`), `import type` enforced in `.ts` files. Unused-import/variable and `useImportType` rules are off for `.astro` files.

## Deploy

GitHub Actions deploys: the `deploy` job in `ci.yml` runs `wrangler deploy` on pushes to `main`, and only after unit, security, e2e/a11y, and Lighthouse jobs pass. Cloudflare's Workers Builds Git integration must stay **disconnected** for this Worker, or it would deploy untested builds. `wrangler.toml` uses the Workers static-assets format (`[assets] directory = "./dist"`, no `main`). Don't reintroduce Pages-era `pages_build_output_dir` or `wrangler pages deploy`. The Worker is named `batey-labs`. The deploy job needs the repo secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`.

## CI (`.github/workflows/ci.yml`)

- **Lint + typecheck** and **unit tests** run first, followed by the **build**.
- Against the built `dist`: **Playwright** (smoke, i18n/hreflang, and axe WCAG 2.2 AA scans, where serious/critical violations fail) and **Lighthouse** (accessibility, best-practices, and SEO must score ≥ 0.95 and CLS ≤ 0.1, or the job fails; performance ≥ 0.95 only warns). While `PUBLIC_INDEXABLE` isn't `true`, Lighthouse skips its `is-crawlable` audit, since noindex is deliberate.
- **Security** runs `npm audit --audit-level=high`, plus Snyk once a `SNYK_TOKEN` secret exists.
- Every job except deploy blocks merges.
- `@lhci/cli` runs via pinned `npx` and is deliberately not a devDependency: its transitive dependencies carry high-severity advisories that would fail `npm audit`.
