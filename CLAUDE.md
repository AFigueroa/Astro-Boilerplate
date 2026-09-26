# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Static Astro marketing site built from an internal boilerplate: Astro 7 (TypeScript strict) + Tailwind v4 + Biome + Vitest + Playwright, deployed to Cloudflare Workers as static assets (not Pages). There is no server runtime. Output is fully static (`dist/`, `build.format: "directory"`). Node version is pinned in `.nvmrc` (24; `engines` requires >=22.12).

## Commands

```bash
npm run dev            # dev server at http://localhost:4321
npm run build          # astro check (type-check) + astro build → dist/
npm run preview        # serve dist/ (what Playwright tests against)
npm run lint           # biome check .   (lint:fix to auto-fix)
npm run typecheck      # astro check
npm run test           # vitest run (unit + component tests)
npm run test:e2e       # playwright; auto-starts `npm run preview`, so build first
```

Single tests:

```bash
npx vitest run src/lib/format.test.ts
npx vitest run -t "renders an anchor"
npx playwright test e2e/smoke.spec.ts -g "contact page"
```

A Husky pre-commit hook runs `lint-staged`, which runs `biome check --write` on staged JS/TS/Astro/JSON files.

## Architecture & conventions

- **Layout chain:** every page wraps content in `src/layouts/Layout.astro` with required `title` and `description` props (optional `image`, `noindex`). Layout renders `SEO.astro`, which builds canonical/OG/Twitter tags from `Astro.site`. That means `site` in `astro.config.mjs` (currently the placeholder `https://example.com`) must be the real production URL, and so must the `Sitemap:` line in `public/robots.txt`.
- **Env vars:** go through `src/env/config.ts`, a Zod schema that throws at build time on invalid values. Import `env` from `@/env/config` rather than reading `import.meta.env` directly. To add a var, add it to the schema and to `.env.example`. All vars are `PUBLIC_`-prefixed and ship to the client, so this site has no secrets.
- **Content Collections:** schemas live in `src/content.config.ts` (`blog`: md/mdx; `services`: md sorted by `order`). They use glob loaders, and files prefixed with `_` are ignored. Frontmatter is Zod-validated, so a schema mismatch fails the build.
- **Contact form:** `ContactForm.astro` POSTs to a third-party endpoint (Formspree, Web3Forms, etc.) set by `PUBLIC_CONTACT_FORM_ENDPOINT`. With no endpoint set, the form renders disabled with a notice, because static hosts can't accept POSTs.
- **Theming:** brand colors and fonts are Tailwind v4 `@theme` tokens in `src/styles/global.css`. Components use the `brand-*` utilities (`bg-brand-600`, `text-brand-900`, …). Change the token values, not the token names, so components don't need rewriting.
- **Path aliases:** `@/*` → `src/*`, plus `@components/*` and `@layouts/*`.
- **Tests:** Vitest runs only `src/**/*.test.ts`, with globals enabled. Test components with the Astro Container API (`experimental_AstroContainer`); see `src/components/Button.test.ts`. Put plain utilities in `src/lib/`. E2E smoke tests in `e2e/` check the nav links ("Services", "Contact") and the `#contact-form` labels, so update them if those change.
- **Biome style:** double quotes, semicolons, trailing commas, 100-col lines, `import type` enforced in `.ts` files. Unused-import/variable and `useImportType` rules are turned off for `.astro` files.

## Deploy

`wrangler.toml` uses the Workers static-assets format (`[assets] directory = "./dist"`, no `main`). Don't reintroduce the Pages-era `pages_build_output_dir` key or `wrangler pages deploy`. Workers Builds runs `npm run build` and then `npx wrangler deploy`. `name` must match the Worker's name in the Cloudflare dashboard, or the build fails. `public/_headers` and `public/_redirects` still work under Workers.

## CI (`.github/workflows/ci.yml`)

Lint + typecheck and unit tests run first. The build runs after both pass, then Playwright runs against the built `dist` artifact. All of these block merges. Lighthouse CI only advises and does not block.
