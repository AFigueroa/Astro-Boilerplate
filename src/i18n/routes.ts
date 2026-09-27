import routeTable from "./routes.json";

/**
 * Single source of truth for page URLs in every locale.
 *
 * Slugs are translated per locale (/services/ ↔ /es/servicios/), so they
 * can't be derived from one another — every page is registered here once.
 * The JSON form lets astro.config.mjs (sitemap) and CI scripts (Lighthouse
 * URL list) read the same table without a TypeScript toolchain.
 *
 * Adding a page: add an entry here, then create the page file for EACH
 * locale. `routes.test.ts` fails if a page file and this table disagree.
 */
export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export type RouteKey = keyof typeof routeTable;
export const routes: Record<RouteKey, Record<Locale, string>> = routeTable;
export const routeKeys = Object.keys(routes) as RouteKey[];

/** Language tags used for `hreflang`, `og:locale`, and `<html lang>`. */
export const localeMeta: Record<Locale, { hreflang: string; ogLocale: string; label: string }> = {
  en: { hreflang: "en", ogLocale: "en_US", label: "English" },
  es: { hreflang: "es", ogLocale: "es_PR", label: "Español" },
};

export function localizedPath(key: RouteKey, locale: Locale): string {
  return routes[key][locale];
}

/** Every locale's version of a page, for hreflang tags and the language switcher. */
export function alternatesFor(key: RouteKey): { locale: Locale; path: string }[] {
  return locales.map((locale) => ({ locale, path: routes[key][locale] }));
}
