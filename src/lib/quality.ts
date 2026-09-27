import { z } from "zod";
import raw from "@/data/quality.json";

/**
 * Quality metrics published on the site ("Under the Hood", plan.md §6).
 *
 * `src/data/quality.json` is written by `scripts/quality-report.mjs` in the
 * deploy job, from the reports that the same CI run produced. Never edit the
 * numbers by hand. Every section is nullable: the committed file has nulls,
 * and the UI must hide a stat rather than show a made-up one.
 */
const score = z.number().int().min(0).max(100);
const count = z.number().int().min(0);

export const qualitySchema = z.object({
  generatedAt: z.iso.datetime().nullable(),
  commit: z.string().nullable(),
  lighthouse: z
    .object({
      pagesAudited: count,
      // Lowest score across all audited pages, so the claim holds for every page.
      performance: score,
      accessibility: score,
      bestPractices: score,
      seo: score,
    })
    .nullable(),
  webVitals: z
    .object({
      // Worst value across audited pages (lab data, mobile emulation).
      lcpMs: z.number().min(0),
      cls: z.number().min(0),
      tbtMs: z.number().min(0),
    })
    .nullable(),
  accessibility: z
    .object({
      pagesScanned: count,
      critical: count,
      serious: count,
      moderate: count,
      minor: count,
    })
    .nullable(),
  tests: z
    .object({
      unit: count,
      e2e: count,
      accessibility: count,
    })
    .nullable(),
  security: z
    .object({
      critical: count,
      high: count,
      moderate: count,
      low: count,
    })
    .nullable(),
});

export type Quality = z.infer<typeof qualitySchema>;

export const quality: Quality = qualitySchema.parse(raw);
