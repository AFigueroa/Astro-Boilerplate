import { readdirSync, readFileSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { describe, expect, it } from "vitest";
import { locales, routeKeys, routes } from "./routes";

const pagesDir = join(process.cwd(), "src", "pages");

/** Map every .astro page file to the URL path it produces (build.format: "directory"). */
function pagePaths(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) return pagePaths(full);
    if (!entry.name.endsWith(".astro") || entry.name.startsWith("_")) return [];
    const route = relative(pagesDir, full)
      .split(sep)
      .join("/")
      .replace(/\.astro$/, "")
      .replace(/(^|\/)index$/, "");
    return [`/${route}${route ? "/" : ""}`];
  });
}

describe("route table", () => {
  it("defines every locale for every page", () => {
    for (const key of routeKeys) {
      for (const locale of locales) {
        expect(routes[key][locale], `${key}.${locale}`).toMatch(/^\/.*\/$|^\/$/);
      }
    }
  });

  it("prefixes non-default locales and leaves the default unprefixed", () => {
    for (const key of routeKeys) {
      expect(routes[key].en.startsWith("/es/")).toBe(false);
      expect(routes[key].es.startsWith("/es/")).toBe(true);
    }
  });

  it("has no duplicate URLs", () => {
    const all = routeKeys.flatMap((key) => locales.map((locale) => routes[key][locale]));
    expect(new Set(all).size).toBe(all.length);
  });

  it("matches the page files exactly (no unregistered or missing pages)", () => {
    const fromTable = routeKeys.flatMap((key) => locales.map((locale) => routes[key][locale]));
    const fromFiles = pagePaths(pagesDir).filter((path) => path !== "/404/");
    expect(fromFiles.sort()).toEqual(fromTable.sort());
  });
});

describe("lighthouserc.json", () => {
  it("audits every page in the route table", () => {
    const config = JSON.parse(readFileSync(join(process.cwd(), "lighthouserc.json"), "utf8"));
    const audited = (config.ci.collect.url as string[]).map((url) => new URL(url).pathname).sort();
    const fromTable = routeKeys.flatMap((key) => locales.map((locale) => routes[key][locale]));
    expect(audited).toEqual(fromTable.sort());
  });
});
