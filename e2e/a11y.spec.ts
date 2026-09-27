import { mkdirSync, writeFileSync } from "node:fs";
import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { allPages } from "./pages";

// WCAG 2.2 AA — the level we sell (plan.md §5), so the site must meet it.
const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

for (const page of allPages) {
  test(`${page.path} has no serious or critical axe violations`, async ({ page: browserPage }) => {
    await browserPage.goto(page.path);
    const results = await new AxeBuilder({ page: browserPage }).withTags(WCAG_TAGS).analyze();

    const byImpact = (impact: string) =>
      results.violations.filter((violation) => violation.impact === impact).length;

    // Per-page summary for scripts/quality-report.mjs (published stats).
    mkdirSync("reports/axe", { recursive: true });
    writeFileSync(
      `reports/axe/${page.key}-${page.locale}.json`,
      JSON.stringify({
        url: page.path,
        critical: byImpact("critical"),
        serious: byImpact("serious"),
        moderate: byImpact("moderate"),
        minor: byImpact("minor"),
      }),
    );

    const blocking = results.violations.filter(
      (violation) => violation.impact === "serious" || violation.impact === "critical",
    );
    expect(
      blocking.map((violation) => `${violation.id}: ${violation.help}`),
      "serious/critical accessibility violations",
    ).toEqual([]);
  });
}
