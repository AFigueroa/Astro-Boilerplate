import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { qualitySchema } from "./quality";

const script = join(process.cwd(), "scripts", "quality-report.mjs");

function runReport(files: Record<string, unknown>) {
  const dir = mkdtempSync(join(tmpdir(), "quality-"));
  for (const [path, content] of Object.entries(files)) {
    const full = join(dir, "reports", path);
    mkdirSync(join(full, ".."), { recursive: true });
    writeFileSync(full, JSON.stringify(content));
  }
  const out = join(dir, "quality.json");
  execFileSync(process.execPath, [script, "--reports", join(dir, "reports"), "--out", out], {
    env: { ...process.env, GITHUB_SHA: "abcdef1234567890" },
  });
  return JSON.parse(readFileSync(out, "utf8"));
}

describe("quality data", () => {
  it("committed src/data/quality.json matches the schema", () => {
    const raw = JSON.parse(
      readFileSync(join(process.cwd(), "src", "data", "quality.json"), "utf8"),
    );
    expect(() => qualitySchema.parse(raw)).not.toThrow();
  });

  it("report script writes nulls when no reports exist", () => {
    const result = runReport({});
    expect(qualitySchema.parse(result)).toMatchObject({
      commit: "abcdef1",
      lighthouse: null,
      tests: null,
      security: null,
    });
  });

  it("report script aggregates worst-case values across pages", () => {
    const result = runReport({
      "vitest.json": { numPassedTests: 12 },
      "playwright.json": {
        suites: [
          { file: "smoke.spec.ts", specs: [{ ok: true }, { ok: true }], suites: [] },
          { file: "a11y.spec.ts", specs: [{ ok: true }, { ok: true }, { ok: false }], suites: [] },
        ],
      },
      "axe/home-en.json": { url: "/", critical: 0, serious: 1, moderate: 0, minor: 2 },
      "axe/home-es.json": { url: "/es/", critical: 0, serious: 0, moderate: 1, minor: 0 },
      "npm-audit.json": {
        metadata: { vulnerabilities: { critical: 0, high: 0, moderate: 1, low: 3 } },
      },
      "lighthouse/manifest.json": [
        {
          isRepresentativeRun: true,
          jsonPath: "lhr-1.json",
          summary: { performance: 0.99, accessibility: 1, "best-practices": 1, seo: 0.92 },
        },
        {
          isRepresentativeRun: true,
          jsonPath: "lhr-2.json",
          summary: { performance: 0.97, accessibility: 1, "best-practices": 0.96, seo: 1 },
        },
        { isRepresentativeRun: false, jsonPath: "lhr-3.json", summary: { performance: 0.1 } },
      ],
      "lighthouse/lhr-1.json": {
        audits: {
          "largest-contentful-paint": { numericValue: 1200.4 },
          "cumulative-layout-shift": { numericValue: 0 },
          "total-blocking-time": { numericValue: 10 },
        },
      },
      "lighthouse/lhr-2.json": {
        audits: {
          "largest-contentful-paint": { numericValue: 1500.6 },
          "cumulative-layout-shift": { numericValue: 0.01 },
          "total-blocking-time": { numericValue: 0 },
        },
      },
    });

    const parsed = qualitySchema.parse(result);
    expect(parsed.tests).toEqual({ unit: 12, e2e: 2, accessibility: 2 });
    expect(parsed.accessibility).toEqual({
      pagesScanned: 2,
      critical: 0,
      serious: 1,
      moderate: 1,
      minor: 2,
    });
    expect(parsed.security).toEqual({ critical: 0, high: 0, moderate: 1, low: 3 });
    expect(parsed.lighthouse).toEqual({
      pagesAudited: 2,
      performance: 97,
      accessibility: 100,
      bestPractices: 96,
      seo: 92,
    });
    expect(parsed.webVitals).toEqual({ lcpMs: 1501, cls: 0.01, tbtMs: 10 });
  });
});
