import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "zod";

const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/blog" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      publishDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      draft: z.boolean().default(false),
      heroImage: image().optional(),
      tags: z.array(z.string()).default([]),
    }),
});

/**
 * Bilingual JSON collections: one file per entry per locale, at
 * `<collection>/<locale>/<id>.json`, so entry ids come out as "en/websites"
 * and "es/websites". Both locales share one schema; `content.test.ts` fails
 * if an entry exists in one locale but not the other.
 */
const services = defineCollection({
  loader: glob({ pattern: "{en,es}/*.json", base: "./src/content/services" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    /**
     * Translated URL slug for the service's own page (Phase 3). Not named
     * `slug`: the glob loader would use that as the entry id and drop the
     * locale folder from it.
     */
    urlSlug: z.string().regex(/^[a-z0-9-]+$/),
    /** "Starting at" price in USD; null means quoted per project. */
    startingAt: z.number().int().positive().nullable(),
    order: z.number().int(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { blog, services };
