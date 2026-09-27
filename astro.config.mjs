import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import routes from "./src/i18n/routes.json" with { type: "json" };

const SITE_URL = "https://bateylabs.com";
const HREFLANG = { en: "en", es: "es" };

// Translated slugs (/services/ ↔ /es/servicios/) can't be paired by the
// sitemap integration's built-in i18n option, which assumes mirrored paths.
// Pair them from the shared route table instead.
const alternatesByUrl = new Map();
for (const localized of Object.values(routes)) {
  const links = Object.entries(localized).map(([locale, path]) => ({
    url: new URL(path, SITE_URL).href,
    lang: HREFLANG[locale],
  }));
  for (const link of links) alternatesByUrl.set(link.url, links);
}

export default defineConfig({
  site: SITE_URL,
  integrations: [
    sitemap({
      serialize(item) {
        const links = alternatesByUrl.get(item.url);
        return links ? { ...item, links } : item;
      },
    }),
  ],
  i18n: {
    locales: ["en", "es"],
    defaultLocale: "en",
    routing: { prefixDefaultLocale: false },
  },
  // Emits a per-page CSP <meta> with hashes for Astro's own scripts/styles.
  // Directives a <meta> CSP can't carry (frame-ancestors) and the other
  // security headers live in public/_headers. Add third-party origins here
  // as they're introduced (form endpoint, Turnstile, analytics).
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "font-src 'self'",
        "connect-src 'self'",
        "form-action 'self'",
        "base-uri 'self'",
        "object-src 'none'",
        "upgrade-insecure-requests",
      ],
    },
  },
  // Shiki's inline styles are incompatible with the CSP above; Prism isn't.
  markdown: {
    syntaxHighlight: "prism",
  },
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    format: "directory",
  },
});
