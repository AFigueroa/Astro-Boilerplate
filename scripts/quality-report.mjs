#!/usr/bin/env node
/**
 * Aggregates the CI reports into src/data/quality.json, which the site
 * renders as its published quality stats (plan.md §6).
 *
 *   node scripts/quality-report.mjs [--reports reports] [--out src/data/quality.json]
 *
 * Inputs (all optional; a missing report leaves its section null so the site
 * hides that stat instead of showing a stale or invented number):
 *   reports/vitest.json               vitest JSON reporter
 *   reports/playwright.json           Playwright JSON reporter
 *   reports/axe/*.json                one file per page, written by e2e/a11y.spec.ts
 *   reports/npm-audit.json            `npm audit --json`
 *   reports/lighthouse/manifest.json  `lhci upload --target=filesystem`
 *
 * Scores are the worst value across pages, so every published claim holds
 * for every page, not just the home page.
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const args = process.argv.slice(2);
const arg = (name, fallback) => {
  const i = args.indexOf(name);
  return i === -1 ? fallback : args[i + 1];
};
const reportsDir = arg("--reports", "reports");
const outFile = arg("--out", join("src", "data", "quality.json"));

const readJson = (path) => (existsSync(path) ? JSON.parse(readFileSync(path, "utf8")) : null);

function tests() {
  const vitest = readJson(join(reportsDir, "vitest.json"));
  const playwright = readJson(join(reportsDir, "playwright.json"));
  if (!vitest || !playwright) return null;

  let e2e = 0;
  let accessibility = 0;
  const walk = (suite, file) => {
    const currentFile = suite.file ?? file;
    for (const spec of suite.specs ?? []) {
      if (!spec.ok) continue;
      if (currentFile?.endsWith("a11y.spec.ts")) accessibility += 1;
      else e2e += 1;
    }
    for (const child of suite.suites ?? []) walk(child, currentFile);
  };
  for (const suite of playwright.suites ?? []) walk(suite);

  return { unit: vitest.numPassedTests ?? 0, e2e, accessibility };
}

function axe() {
  const dir = join(reportsDir, "axe");
  if (!existsSync(dir)) return null;
  const pages = readdirSync(dir)
    .filter((file) => file.endsWith(".json"))
    .map((file) => readJson(join(dir, file)));
  if (pages.length === 0) return null;
  const sum = (key) => pages.reduce((total, page) => total + (page[key] ?? 0), 0);
  return {
    pagesScanned: pages.length,
    critical: sum("critical"),
    serious: sum("serious"),
    moderate: sum("moderate"),
    minor: sum("minor"),
  };
}

function security() {
  const audit = readJson(join(reportsDir, "npm-audit.json"));
  const v = audit?.metadata?.vulnerabilities;
  if (!v) return null;
  return {
    critical: v.critical ?? 0,
    high: v.high ?? 0,
    moderate: v.moderate ?? 0,
    low: v.low ?? 0,
  };
}

function lighthouse() {
  const dir = join(reportsDir, "lighthouse");
  const manifest = readJson(join(dir, "manifest.json"));
  const runs = (manifest ?? []).filter((run) => run.isRepresentativeRun);
  if (runs.length === 0) return { lighthouse: null, webVitals: null };

  const minScore = (key) => Math.round(Math.min(...runs.map((run) => run.summary[key] ?? 0)) * 100);
  const audits = runs
    .map((run) => readJson(join(dir, run.jsonPath.split(/[\\/]/).pop()))?.audits)
    .filter(Boolean);
  const worst = (id) => Math.max(...audits.map((a) => a[id]?.numericValue ?? 0));

  return {
    lighthouse: {
      pagesAudited: runs.length,
      performance: minScore("performance"),
      accessibility: minScore("accessibility"),
      bestPractices: minScore("best-practices"),
      seo: minScore("seo"),
    },
    webVitals:
      audits.length === 0
        ? null
        : {
            lcpMs: Math.round(worst("largest-contentful-paint")),
            cls: Math.round(worst("cumulative-layout-shift") * 1000) / 1000,
            tbtMs: Math.round(worst("total-blocking-time")),
          },
  };
}

const quality = {
  generatedAt: new Date().toISOString(),
  commit: process.env.GITHUB_SHA ? process.env.GITHUB_SHA.slice(0, 7) : null,
  ...lighthouse(),
  accessibility: axe(),
  tests: tests(),
  security: security(),
};

mkdirSync(dirname(outFile), { recursive: true });
writeFileSync(outFile, `${JSON.stringify(quality, null, 2)}\n`);
console.log(`Wrote ${outFile}`);
