# Batey Labs — Site & Launch Plan

Agency website and founder portfolio for **Batey Labs LLC** (registration pending, Texas), founded
and run by **Antonio Figueroa**. This plan covers three tracks that run in parallel: business
setup, brand, and the website. The website can be built and previewed privately before the LLC
exists. Only the **public launch** waits on registration.

Domain: `bateylabs.com` · Business email: `antonio.figueroa@bateylabs.com`

## 0. Current state

- Repo is the unmodified Astro boilerplate: `index`, `about`, `services`, `contact`, with
  placeholder brand tokens, `site` still `https://example.com`, and `package.json` still named
  `astro-boilerplate`.
- `wrangler.toml` is already in Workers static-assets format (see `CLAUDE.md` → Deploy).
- No logo, palette, bio, or portfolio screenshots yet. The resume (`Resume-AFigueroa.pdf`) is the
  working source for experience and credentials until the bio arrives.
- **This repo stays private.** Proof of quality is published as numbers and artifacts on the
  site (§6), not by opening the source.

## 1. Business context

| | |
| --- | --- |
| Entity | Batey Labs LLC, Texas, not yet registered. Sole owner and operator. Self-funded. |
| Founder | Antonio Figueroa: 10+ years; Principal Software Developer at Dell (2021–2026); Accessibility Lead and Security Champion; CI/CD owner; component-library architect; Full Sail B.S. Web Design & Development. |
| Markets | Texas and Puerto Rico at first. |
| Core offer | Websites built with Astro + Tailwind, engineered with Claude Code: accessible, responsive, secure, fully tested. |
| Supporting offers | Accessibility audits and remediation (**featured service**); web apps (database, server, third-party APIs); quality and security setup; AI image and video generation; cloud hosting (Cloudflare by default, AWS/GCP when warranted); native mobile apps (secondary). |
| Delivery standard | GitHub repo, CI pipeline, unit + e2e + accessibility tests, Lighthouse, Snyk / security scanning. |
| Tech stance | Astro + Tailwind by default; other technologies only when the client requires them. |

### Client pipeline

| Client | Location | Status | Portfolio use | Likely services |
| --- | --- | --- | --- | --- |
| AR & Associates (Ana M. Ramírez) | Dallas, TX / DR | In build | Launch portfolio piece once live and approved | Bilingual site, AI media, ongoing care. **Billed under her pre-existing agreement, not this price list.** |
| Miapiel (aesthetics clinic) | Puerto Rico | Lined up | Add when live and approved | Bilingual site, booking integration, AI media, care plan |
| Flower shop (name TBD, new business) | TBD | Lined up | Add when live and approved | Site + online ordering (first **web-app / integration** example), possibly branding help |
| Koper Furniture | TBD | Pending owner approval of the project plan | **Don't list** until signed and approved | TBD |

Portfolio rules: a project appears on the site only when it's live **and** the client has
approved being listed (tracked by the `permission` field, §9 Phase 3). Case-study metrics are
captured at handoff (§6).

Client-specific cautions to carry into those projects:
- **Miapiel:** the contact and booking forms must not collect medical or health details (keep to
  name, contact, service interest, and preferred time). Before/after photos need written patient
  consent. Treatment-result claims should be reviewed by the clinic.
- **Flower shop:** online ordering means payments. Use a hosted checkout (Stripe Checkout,
  Square, or Shopify Buy Button) so card data never touches our code.

## 2. Competitor review

A small sample, not a full market study. It covers the three kinds of competitor a prospect in
TX or PR is likely to compare you against.

| Competitor | Type | What they do well | Gap we can exploit |
| --- | --- | --- | --- |
| [DEVX LAB](https://devxlab.com/) (PR) | Dev studio, works behind agencies | 20+ yrs claim; named clients; HIPAA/PII and **WCAG 2.1 AA** statement | Thin navigation; English only; no visible process or quality proof |
| [Limonade](https://limonadeinc.com/portfolio/) (PR) | WordPress shop since 2011 | Large portfolio | WordPress-only; no engineering-quality story |
| [Infinite Development](https://infinitedev.co/service-areas/austin) (Austin) | Volume/local-SEO shop | "$0 upfront, 72-hour delivery"; $50–$700/mo retainer; FAQ; reviews | Speed pitch with no quality evidence |
| [Rawcut Creative](https://rawcutcreative.com/austin/areas/round-rock) (Austin) | Full-service agency | Case studies, testimonials, FAQ, city pages | Long, SEO-heavy pages; WordPress; no technical proof |
| Round Rock/Austin boutiques ([Clutch PR list](https://clutch.co/pr/web-designers), [Expertise Round Rock](https://www.expertise.com/business/web-design/texas/round-rock)) | Small studios | Local trust, longevity | Mostly WordPress/templates |

Market pricing reference points: boutique Austin custom builds run $12k–$40k
([FactoryJet](https://factoryjet.com/blog/web-design-austin-tx-small-business-guide-2026)).
Small-business brochure sites run $3k–$8k with a freelancer and $8k–$15k with a boutique agency
([Digital Applied](https://www.digitalapplied.com/blog/website-development-cost-2026-complete-pricing-data)).

**What the review tells us**

1. **Nobody proves quality. They only claim it.** None shows test suites, CI, Lighthouse, or
   accessibility results. We show ours (§6).
2. **Speed claims are common.** The pitch is **fast *and* enterprise-grade**, backed by a named
   senior engineer.
3. **Bilingual is rare.** The PR studios sampled are English-first or English-only. We go fully
   bilingual with SEO in both languages (§7).
4. **Trust sections are table stakes**: portfolio, testimonials, FAQ, a clear CTA, and a
   response-time promise.
5. **Accessibility is under-sold.** We make it a headline service (§5).

## 3. Positioning

**One-liner (draft):** *Enterprise-grade web engineering, delivered at AI speed.*
**ES (draft):** *Ingeniería web de nivel empresarial, a la velocidad de la IA.*

- **Engineer-led, AI-accelerated.** Claude Code does the heavy lifting; a senior engineer with 10+
  years sets the architecture, reviews every change, and owns the result.
- **Every project ships with the standard** ("The Batey Standard", working name): repo, CI,
  tests, accessibility checks, security scanning, performance budget, documentation.
- **You own everything.** Client owns the domain, repo, hosting account, and content. No lock-in.
  This is a strong trust point against agencies that hold sites hostage.
- **Right tool, not the fanciest.** Cloudflare by default; AWS/GCP only when warranted.

Wording guardrails:
- Say "built with AI-assisted engineering (Claude Code)" in plain text. Don't use Anthropic or
  Claude logos, and don't imply a partnership.
- Until the LLC is registered, don't publish "LLC" or legal-entity copy publicly.
- No fabricated metrics, clients, or testimonials. Every number shown must be real.

## 4. Pricing (suggested, "starting at")

**Why these numbers.** You're a principal-level engineer with enterprise accessibility and
security credentials, and you deliver a tested, documented codebase that most local shops don't.
That puts you at **boutique-agency** pricing, not freelancer pricing. AI makes *you* faster; it
doesn't make the result worth less. The client pays for the outcome and the standard, not your
hours. These are starting points to adjust after the first 3–5 projects.

Pricing principles:
- **Publish full prices, discount privately.** If you want to help a first client, give a named,
  time-limited discount that appears as a line item on the invoice ("Founding client −20%").
  The public price stays anchored, and the client sees the real value.
- **Fixed price per scope (SOW)**, with a 50% deposit and the balance at launch (or 40/30/30
  milestones for web apps).
- **Change requests** outside the SOW are quoted separately or billed hourly.
- Third-party costs (domain, email, paid APIs, stock media, premium plugins) are billed at cost
  and owned by the client.

### Build services

| Service | Starting at | What the starting price covers | Typical timeline |
| --- | --- | --- | --- |
| **Starter Site** | **$4,500** | Up to 5 pages, one language, brand tokens from the client's existing identity, contact form, the full delivery standard | 2–3 weeks |
| **Business Site** | **$8,500** | 6–15 pages, content collections (services, team, FAQ, blog), CMS-ready structure, analytics, SEO setup | 3–5 weeks |
| **Signature Site** | **$15,000** | Custom design and motion (parallax, scroll storytelling), AI hero media, advanced interactions | 5–8 weeks |
| Bilingual (EN/ES) add-on | **+35%** of build | Full second locale: translated slugs, `hreflang`, localized SEO metadata, Spanish copy review, language switcher | +1 week |
| **Web App** | **$15,000** | Auth, database, server/API, admin views, deployment, and tests | 6–12 weeks, scoped per project |
| Integration add-on | **$1,500** each | Connect one third-party service (booking, payments via hosted checkout, CRM, email marketing, forms) | +2–5 days |
| **Mobile App** | **$25,000** | Cross-platform or native app with store submission | Scoped per project |

### Specialist services

| Service | Starting at | Notes |
| --- | --- | --- |
| **Accessibility Audit** | **$1,500** | Up to 10 templates; see §5 for scope |
| Accessibility Remediation | **$2,500** | Or $150/hr for sites we didn't build |
| Accessibility Conformance Report (VPAT-based ACR) | **$3,000** | Often required in B2B and government procurement |
| **Quality & Security Setup** | **$3,500** | Add CI, unit/e2e/a11y tests, Snyk, Dependabot, security headers, and a Lighthouse budget to an existing codebase |
| **AI Media Pack** | **$750** | 1 hero video + 5 images, web-optimized, with alt text; $1,000 as a stand-alone job |
| Hosting Setup / Migration | **$750** | Cloudflare (default) or AWS/GCP; DNS, SSL, redirects, zero-downtime cutover |
| Hourly rate (out-of-scope work) | **$150/hr** | $125/hr for care-plan clients |

## 4a. Care plans (monthly)

Every site we build needs updates: dependencies go stale, security advisories land, content
changes. Care plans turn that into predictable income for you and a predictable cost for the
client. **Minimum term: 3 months, then month-to-month.** Unused hours don't roll over.
Out-of-plan work is billed at the $125/hr care-plan rate.

| | **Essential** | **Growth** | **Partner** |
| --- | --- | --- | --- |
| **Price** | **$149/mo** | **$349/mo** | **$749/mo** |
| Best for | Brochure sites that rarely change | Active businesses and bilingual sites | Businesses that ship updates every month |
| Hosting management (Cloudflare) | ✓ | ✓ | ✓ |
| SSL, domain, and DNS monitoring | ✓ | ✓ | ✓ |
| Uptime monitoring + alerts | ✓ | ✓ | ✓ |
| Dependency and security updates (Dependabot / Snyk triage) | Monthly | Monthly | Weekly |
| Repo and content backups | ✓ | ✓ | ✓ |
| Content edits / small changes | 30 min | 2 hrs | 5 hrs |
| Bilingual content updates (EN ↔ ES) | — | ✓ | ✓ |
| Performance + SEO report (Lighthouse, Search Console) | Quarterly | Monthly | Monthly |
| Automated accessibility scan (axe) | Quarterly | Monthly | Monthly |
| Manual accessibility spot-check | — | Quarterly | Monthly |
| AI media refresh | — | — | 2 images/mo |
| Strategy call | — | Quarterly | Monthly |
| Support response time | 2 business days | 1 business day | Same business day |

AR & Associates is billed under her pre-existing agreement, not these tiers. The tiers apply
to new clients from Miapiel onward.

## 5. Accessibility service (featured)

**Why it's a headline, not a bullet:** you led accessibility for Dell's ISG web apps, almost no
local competitor sells it, and it can win work on sites we didn't build. Demand is growing: the
DOJ's ADA Title II rule sets WCAG 2.1 AA as the standard for state and local government web
content, with compliance deadlines in 2026–2027. Businesses serving the public face ADA demand
letters and lawsuits as well.

Offer structure:
1. **Audit** (from $1,500): automated scan (axe) **plus** a manual WCAG 2.2 AA review, which
   automated tools alone can't cover: keyboard-only, screen readers (NVDA, VoiceOver, TalkBack),
   zoom/reflow, contrast, forms, and media. Deliverable: a prioritized report (severity, WCAG
   criterion, screenshot, fix guidance) and a walkthrough call.
2. **Remediation** (from $2,500 or hourly): fix the issues, then re-test.
3. **Conformance documentation** (from $3,000): Accessibility Conformance Report (VPAT format)
   and a drafted accessibility statement.
4. **Monitoring**: included in care plans (automated monthly, manual spot-checks by tier).

Wording guardrails: we provide **technical** accessibility services, not legal advice, and we
don't promise immunity from lawsuits. Say "conforms to WCAG 2.2 AA as of [date], verified by
[method]", never "ADA compliant, guaranteed".

## 6. Proof: showing the stats

Goal: every quality claim on the site is backed by a number generated by the site's own
pipeline, **without making the repo public**.

- **"Under the Hood" section** (on How We Work, with a strip on Home) showing, for *this site*:
  - Lighthouse scores (mobile) for Performance, Accessibility, Best Practices, and SEO
  - axe results: serious/critical violations across all pages, EN + ES
  - Test counts: unit, e2e, and accessibility
  - Security: known vulnerabilities from `npm audit` (Snyk as an extra gate)
  - Web vitals (lab): LCP, CLS, and Total Blocking Time (INP needs real-user data)
  - "Last verified" date and the commit short-hash
- **How the numbers are produced:** a CI job writes a `quality.json` (test results, axe, audit,
  Lighthouse) that the build reads and renders. Nothing is typed in by hand, so the numbers
  can't drift from reality.
- **Deploy decision:** move the deploy from Workers Builds to **GitHub Actions →
  `wrangler deploy`**, as the last CI step after all checks pass. Reasoning: the stats shown
  then come from the exact build that went live, and a failing test *blocks* the deploy. Your
  Cloudflare API token lives in GitHub Actions secrets, never in the repo.
- **Per-client proof:** capture the same metrics at each client handoff and store them in the
  project's case-study entry. Screenshots of CI runs and test reports can appear on case
  studies with client-identifying details removed.

## 7. Bilingual SEO (EN + ES)

Both languages are first-class for search, not a translated afterthought.

- **Routing:** English at `/` (default, no prefix) and Spanish at `/es/` (Astro i18n with
  `prefixDefaultLocale: false`). Reasoning: the root URL serves real content with no redirect,
  which is the cleanest option for crawlers. Unlike AR-A, **no auto-redirect** on `/`: a
  non-blocking "¿Prefieres español?" banner appears for Spanish-language browsers and remembers
  the choice.
- **Translated slugs:** `/services/accessibility/` ↔ `/es/servicios/accesibilidad/`. One slug
  table is the source of truth, stored in the content JSON.
- **Every page emits:**
  - `<html lang>` (`en` or `es`)
  - Self-referencing canonical
  - `hreflang` for `en`, `es`, and `x-default` (→ EN)
  - Localized `<title>`, meta description, OG title/description, and OG image text
  - JSON-LD with `inLanguage`
- **Sitemap:** `@astrojs/sitemap` with i18n alternates so each URL lists its translation.
  Submit it to Google Search Console and Bing Webmaster Tools.
- **Spanish keyword research** separate from English, targeting how PR and Texas Spanish speakers
  actually search, e.g. "diseño de páginas web Puerto Rico", "desarrollo web", "accesibilidad
  web", "páginas web para negocios". Don't just translate the English keywords.
- **Copy quality:** Claude drafts, and Antonio reviews all Spanish for natural Puerto Rican
  business Spanish. Machine-only Spanish reads as low effort to the exact audience we're
  targeting.
- **Local signals:** service-area copy for Texas and Puerto Rico on Services and About; a Google
  Business Profile (service-area business, address hidden) in both languages; consistent
  business name and email everywhere.
- **Structured data:** `ProfessionalService` (areaServed: Texas, Puerto Rico; availableLanguage:
  en, es), `Person` (Antonio), `Service` per service page, `FAQPage` on FAQ, and
  `BreadcrumbList`.
- **Tests:** a Vitest check that every EN entry has an ES counterpart, and a Playwright check that
  every page's `hreflang` pair resolves with 200 and points back.

## 8. Sitemap

| # | EN | ES | Notes |
| --- | --- | --- | --- |
| 1 | **Home** `/` | Inicio `/es/` | See §8a |
| 2 | **Services** (hub) | Servicios | Cards, each with "starting at" price |
| 2a | Websites | Sitios web | Starter / Business / Signature tiers, bilingual add-on |
| 2b | **Accessibility** | Accesibilidad | Featured; Audit / Remediation / ACR (§5) |
| 2c | Web Apps & Integrations | Aplicaciones web e integraciones | Flower-shop ordering becomes the first example |
| 2d | Quality & Security | Calidad y seguridad | For existing codebases |
| 2e | AI Media | Medios con IA | Image and video packs |
| 2f | Hosting & Cloud | Hospedaje y nube | Cloudflare default; AWS/GCP when warranted |
| 2g | Mobile Apps | Aplicaciones móviles | Secondary, lower in nav |
| 3 | **Work** | Proyectos | Portfolio grid: thumbnail → live site (new tab) + case-study link |
| 3a | Case study (per project) | Caso de estudio | Problem, approach, stack, measured results, live link |
| 4 | **How We Work** | Cómo trabajamos | §8b |
| 5 | **Pricing** | Precios | Build + specialist tables and care plans (§4, §4a) |
| 6 | **About** | Sobre mí / Sobre nosotros | Antonio's story, credentials, photo, LinkedIn |
| 7 | **FAQ** | Preguntas frecuentes | `FAQPage` schema |
| 8 | **Contact** | Contacto | Project-brief form + booking link |
| 9 | Privacy Policy | Política de privacidad | Needs entity name, so it waits on the LLC |
| 10 | Terms of Use | Términos de uso | Needs entity name, so it waits on the LLC |
| 11 | Accessibility Statement | Declaración de accesibilidad | We sell it, so we model it |
| 12 | 404 | 404 | Branded, bilingual |
| Later | Lab Notes (blog) | Notas del Lab | Post-launch |

### 8a. Home page sections

1. **Hero:** one-liner, subline ("Websites and web apps for Texas & Puerto Rico businesses"),
   CTAs "Start a project" / "See the work". Layered parallax.
2. **Proof strip:** live stats from §6.
3. **Services:** cards with starting-at prices; Accessibility visually featured.
4. **Selected work:** portfolio tiles (AR & Associates at launch; others as they're approved).
5. **The standard:** what every project ships with.
6. **Founder intro:** photo and two sentences, leading to About.
7. **Process:** 6 steps, leading to How We Work.
8. **Care plans teaser:** "From $149/mo", leading to Pricing.
9. **FAQ teaser**.
10. **Final CTA**, with "Reply within one business day".

### 8b. How We Work page

1. **Process**, where each step names what happens, what the client provides, what they receive,
   and a typical duration:

   | Step | What happens | Client provides | Client receives |
   | --- | --- | --- | --- |
   | 1. Discovery (free 30-min call) | Goals, audience, scope, budget fit | Business info, examples they like | Clear next step within 2 business days |
   | 2. Proposal & SOW | Fixed scope, price, timeline | Approval + 50% deposit | Signed SOW, project kickoff date |
   | 3. Design | Sitemap, wireframes, visual direction (+ AI media) | Content, brand assets, feedback (2 rounds included) | Approved design direction |
   | 4. Build | Engineered with Claude Code under senior review; weekly preview links | Feedback on previews | Private preview URL that updates as work lands |
   | 5. QA | Automated + manual testing (a11y, performance, security, devices, EN/ES) | Final content check | Quality report (the §6 metrics for *their* site) |
   | 6. Launch | Domain, DNS, SSL, Search Console, analytics, handoff | Final payment | Live site, repo/account ownership, docs, walkthrough |
   | 7. Care (optional) | Ongoing plan (§4a) | — | Monthly/quarterly reports |

2. **The Batey Standard**, listed as concrete artifacts every client receives: GitHub repo,
   CI pipeline, unit tests, e2e tests, accessibility tests, Lighthouse budget, Snyk/Dependabot,
   security headers, bilingual SEO (if purchased), README and runbook, and ownership of every
   account.
3. **How AI fits in**: plain-language explanation of Claude Code plus senior review; what that
   means for speed and cost; and what stays human (architecture, review, client communication,
   accessibility testing with real assistive tech).
4. **Communication**: one point of contact (Antonio), weekly update, response-time promise, and
   tools used (email, shared preview links, optional GitHub access).
5. **Under the Hood**: the stats from §6.

## 9. Phases

### Track A: Business & legal (Antonio; parallel with everything below)
- [ ] Trademark knockout search for "Batey Labs" (USPTO search plus Texas SOS name availability)
      **before** paying for a logo.
- [ ] Register the Texas LLC (Certificate of Formation, Form 205, via SOSDirect); choose a
      registered agent.
- [ ] EIN (IRS, free) → business bank account → keep business money fully separate.
- [ ] Confirm with a CPA: Texas sales-tax treatment (hosting and care plans can be taxed
      differently from design/build work), Puerto Rico IVU on services delivered to PR clients,
      Texas franchise-tax annual report obligations, and quarterly estimated taxes.
- [ ] Contract templates: MSA + per-project SOW (scope, 2 revision rounds, change requests, IP
      transfer on final payment, third-party costs at cost) + care-plan agreement (3-month
      minimum, hours don't roll over, response times).
- [ ] Professional liability / E&O insurance quote. Cyber liability is worth pricing too.
- [ ] Payment and invoicing (Stripe invoicing or the bank's tool); recurring billing for care
      plans.
- [ ] Portfolio permission clause in the SOW template, so listing approval is collected up front.
- [ ] LinkedIn and GitHub updated to Batey Labs; résumé's "Windsurf" line → Claude Code.

### Track B: Brand
- [ ] Name story and voice (EN + ES), tagline shortlist. *Batey* is the Taíno word for the
      community plaza and ball court, a strong PR-rooted identity. In the Dominican Republic it
      also names sugar-cane worker settlements, so check the imagery if you ever market there.
- [ ] Logo (primary + mark + favicon). Have it human-designed or human-finalized: purely
      AI-generated artwork generally isn't copyrightable in the US.
- [ ] Palette and type pairing, contrast-checked against WCAG AA before locking.
- [ ] Real headshot for About (never AI-generated).
- [ ] Social/OG image template in EN and ES.

### Phase 0: Foundations (done 2026-09-26, branch `phase-0-foundations`)
- [x] `site` → `https://bateylabs.com`; `Sitemap:` in `public/robots.txt`; `package.json`
      `name` → `batey-labs-portal`; Worker `name` → `batey-labs`.
- [x] Site-wide `noindex` until `PUBLIC_INDEXABLE=true` (GitHub repo variable).
- [x] Astro i18n per §7: `en` default unprefixed, `es` under `/es/`, translated slugs from one
      route table (`src/i18n/routes.json`), `hreflang` + `x-default`, sitemap alternates,
      bilingual JSON collections (`services` seeded with §4 prices), and EN/ES parity tests.
- [x] Security: Astro-generated CSP `<meta>` (script/style hashes) plus `public/_headers`
      (`frame-ancestors`, HSTS, nosniff, Referrer-Policy, Permissions-Policy, COOP).
- [x] CI: axe WCAG 2.2 AA scans of every page in both languages, Lighthouse budgets (a11y,
      best practices, SEO ≥ 95 and CLS blocking; performance warns), `npm audit` blocking at
      high, Snyk step that activates when `SNYK_TOKEN` is set, `quality.json` generation.
- [x] Deploy moved to GitHub Actions (`wrangler deploy` after all checks pass).
- [x] **Antonio:** GitHub secrets/variable added; Git-connected Worker deleted.
- [ ] Merge `phase-0-foundations` to `main` for the first preview deploy.
- [ ] **Antonio:** review the Spanish service summaries in `src/content/services/es/`.
- [x] **Antonio:** leftover boilerplate files deleted.

Notes from the build:
- Local run of the full pipeline: Lighthouse 100/100/100/100 on all 8 pages, 0 axe violations,
  0 npm vulnerabilities, 45 automated tests.
- "Security-headers grade" (§6) was dropped as a published stat: `_headers` only applies on
  Cloudflare, so it's verified by a unit test on the file instead. INP isn't measurable in lab
  runs, so Total Blocking Time is published alongside LCP and CLS.

### Phase 1: Shell & components
- [ ] Header (nav, mobile menu, language switcher), Footer (email, social, legal links).
- [ ] Skip link, visible focus styles.
- [ ] Parallax primitives: CSS scroll-driven animations (`animation-timeline`) behind
      `@supports`; animate only `transform`/`opacity`; `prefers-reduced-motion` disables all
      motion. No heavy animation libraries. Motion must keep CLS at 0.
- [ ] Reusable CTA component; every "Start a project" link goes through it.
- [ ] Language-suggestion banner (non-redirecting, remembered).
- [ ] `404.astro` + `not_found_handling = "404-page"` in `wrangler.toml`.

### Phase 2: Contact & lead capture
- [ ] Form endpoint (Web3Forms or Formspree) → `antonio.figueroa@bateylabs.com`.
- [ ] Cloudflare Turnstile + honeypot.
- [ ] Project-brief fields: name, email, company, location (TX / PR / other), preferred language,
      service(s), budget range (bands matching §4), timeline, existing site URL, message.
- [ ] Discovery-call booking link (Cal.com free tier).

### Phase 3: Content model & pages
- [ ] Collections (EN/ES JSON pairs): `services` (with `startingAt` price and tier data),
      `carePlans`, `projects`, `faq`, `testimonials` (hidden until a real quote exists).
- [ ] Pricing lives in content data, not hard-coded, so one edit updates Services, Pricing, and
      Home together.
- [ ] `projects` schema: title, client, url, thumbnail, stack, services, year, location,
      `metrics` (from handoff), case-study body, `featured`, `permission`, `status`
      (`live` | `in-progress`). Only `permission: true` + `live` render.
- [ ] Build pages in §8 order.

### Phase 4: Portfolio content
- [ ] **This site** as the first case study (§6 metrics).
- [ ] **AR & Associates:** add when live and approved (target: portfolio at launch).
- [ ] **Miapiel** and **flower shop:** add as each launches; the flower shop's ordering
      integration becomes the Web Apps example.
- [ ] **Koper Furniture:** only after the owner approves the plan and the project ships.
- [ ] Screenshot pipeline: Playwright captures at fixed desktop + mobile viewports → Astro
      `<Image />`.
- [ ] Optional: one internal demo (accessibility before/after on a sample page) for the
      Accessibility service page, clearly labeled as a demo.

### Phase 5: Media
- [ ] Founder photos (in `Batey Labs/media/`, real studio portraits on a mottled blue backdrop):
      - `profile2.jpg`: formal suit headshot → About hero, `Person` JSON-LD, OG image, and
        LinkedIn/Google Business Profile.
      - `profile1.jpg`: casual three-quarter standing shot with open space on the left → Home
        founder intro; the space leaves room for text.
      - Downscale originals (4–5k px, 1.5–2.8 MB) to ~2400 px before committing to
        `src/assets/about/`; Astro `<Image />` generates the responsive AVIF/WebP sizes.
      - Optional: cut `profile1` out from its background and use it as a foreground parallax
        layer.
- [ ] AI-generated parallax layers (separated depth layers, no rendered text), AVIF/WebP via
      Astro assets.
- [ ] Alt text EN + ES for every image.

### Phase 6: SEO & analytics
- [ ] Everything in §7.
- [ ] Cloudflare Web Analytics (cookieless, free): no cookie banner needed. Add GA4 only if you
      start paid ads.
- [ ] Search Console + Bing Webmaster at public launch.

### Phase 7: QA
- [ ] axe: 0 serious/critical violations on every template, EN and ES.
- [ ] Keyboard and screen-reader pass (NVDA + VoiceOver) on Home, Work, Pricing, and Contact.
- [ ] Reduced-motion pass.
- [ ] Real-device mobile pass (iOS Safari especially).
- [ ] Lighthouse ≥ 95 in all categories on mobile, published via §6.

### Phase 8: Public launch (gated on the LLC)
- [ ] Entity name in footer, Terms, Privacy, and JSON-LD.
- [ ] Remove `noindex`; attach the `bateylabs.com` custom domain; verify SSL.
- [ ] Submit sitemaps; Google Business Profile (EN/ES, service-area, address hidden).

### Phase 9: Post-launch
- [ ] Testimonials from AR & Associates, Miapiel, and the flower shop at handoff.
- [ ] Review pricing after 3–5 projects: if you win nearly every proposal, raise prices.
- [ ] Lab Notes (blog): one engineering write-up per shipped project, EN + ES.
- [ ] Re-run the competitor review after 3–6 months.

## 10. Decisions (resolved)

- **Proof of quality:** published stats generated by CI (§6). The repo stays **private**.
- **Languages:** EN (default, `/`) + ES (`/es/`), full bilingual SEO (§7).
- **Accessibility:** featured service with audit, remediation, and ACR tiers (§5).
- **Pricing:** §4 and §4a prices approved for now, shown as "starting at" on the site. Care plans
  are fully itemized with exact monthly prices. AR & Associates is billed separately under her
  earlier agreement.
- **How We Work:** its own page (§8b).
- **Portfolio:** AR & Associates at launch; Miapiel and the flower shop as they ship; Koper
  Furniture pending approval. Listing requires client permission.

## 11. Open questions

1. About page voice: first person ("I") or studio voice ("we")? *Recommendation:* "we" for
   the studio pages and "I" on About. That's honest about being a one-person studio while
   leaving room to grow.
2. Bio and social links: pending from Antonio (headshots received).
3. Flower shop: name, and whether online ordering is in scope for their v1.
