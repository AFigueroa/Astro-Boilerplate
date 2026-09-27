import { expect, test } from "@playwright/test";
import { allPages } from "./pages";

for (const page of allPages) {
  test(`${page.path} declares its language and links reciprocal translations`, async ({
    page: browserPage,
    request,
  }) => {
    await browserPage.goto(page.path);
    await expect(browserPage.locator("html")).toHaveAttribute("lang", page.locale);

    const canonical = await browserPage.locator('link[rel="canonical"]').getAttribute("href");
    expect(new URL(canonical ?? "").pathname).toBe(page.path);

    const alternates = await browserPage
      .locator('link[rel="alternate"][hreflang]')
      .evaluateAll((links) =>
        links.map((link) => ({
          hreflang: link.getAttribute("hreflang"),
          path: new URL(link.getAttribute("href") ?? "").pathname,
        })),
      );
    expect(alternates.map((alt) => alt.hreflang).sort()).toEqual(["en", "es", "x-default"]);
    expect(alternates.find((alt) => alt.hreflang === page.locale)?.path).toBe(page.path);

    // Each translation exists and points back at this page.
    for (const alt of alternates.filter((a) => a.hreflang !== "x-default")) {
      const response = await request.get(alt.path);
      expect(response.status(), alt.path).toBe(200);
      const html = await response.text();
      expect(html, `${alt.path} links back to ${page.path}`).toContain(
        `hreflang="${page.locale}" href="https://bateylabs.com${page.path}"`,
      );
    }
  });
}

test("language switcher leads to the translated page", async ({ page }) => {
  await page.goto("/services/");
  await page.getByRole("link", { name: "Ver esta página en español" }).click();
  await expect(page).toHaveURL(/\/es\/servicios\/$/);
  await page.getByRole("link", { name: "View this page in English" }).click();
  await expect(page).toHaveURL(/\/services\/$/);
});

test("preview builds are hidden from search engines", async ({ page }) => {
  test.skip(process.env.PUBLIC_INDEXABLE === "true", "indexable build");
  await page.goto("/");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
});
