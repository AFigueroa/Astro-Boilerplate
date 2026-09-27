import { z } from "zod";

/**
 * Typed, validated environment variables.
 *
 * Add new vars to the schema below, then to .env.example. A missing or
 * malformed var fails the build immediately with a clear error instead of
 * surfacing as a silent runtime bug in production.
 *
 * Usage: import { env } from "@/env/config"; env.PUBLIC_SITE_NAME
 */
const envSchema = z.object({
  PUBLIC_SITE_NAME: z.string().min(1).default("Batey Labs"),
  PUBLIC_CONTACT_EMAIL: z.email().default("antonio.figueroa@bateylabs.com"),
  PUBLIC_CONTACT_FORM_ENDPOINT: z.url().optional().or(z.literal("")),
  // Search engines are told not to index the site until this is "true".
  // Stays "false" for the private preview; flip it at public launch
  // (GitHub repo variable PUBLIC_INDEXABLE, read by the deploy job).
  PUBLIC_INDEXABLE: z
    .enum(["true", "false"])
    .default("false")
    .transform((value) => value === "true"),
});

const parsed = envSchema.safeParse(import.meta.env);

if (!parsed.success) {
  console.error("Invalid environment variables:", z.treeifyError(parsed.error));
  throw new Error("Invalid environment variables — see .env.example and check your .env file.");
}

export const env = parsed.data;
