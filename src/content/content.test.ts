import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { locales } from "@/i18n/routes";

/** Collections stored as `<collection>/<locale>/<id>.json` (see content.config.ts). */
const bilingualCollections = ["services"];

describe.each(bilingualCollections)("%s collection", (collection) => {
  const dir = join(process.cwd(), "src", "content", collection);
  const idsFor = (locale: string) =>
    existsSync(join(dir, locale))
      ? readdirSync(join(dir, locale))
          .filter((file) => file.endsWith(".json"))
          .map((file) => file.replace(/\.json$/, ""))
          .sort()
      : [];

  it("has at least one entry", () => {
    expect(idsFor("en").length).toBeGreaterThan(0);
  });

  it.each(locales.filter((locale) => locale !== "en"))(
    "has the same entries in en and %s",
    (locale) => {
      expect(idsFor(locale)).toEqual(idsFor("en"));
    },
  );
});
