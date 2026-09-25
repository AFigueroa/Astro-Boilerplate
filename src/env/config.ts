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
  PUBLIC_SITE_NAME: z.string().min(1).default("My Site"),
  PUBLIC_CONTACT_FORM_ENDPOINT: z.url().optional().or(z.literal("")),
});

const parsed = envSchema.safeParse(import.meta.env);

if (!parsed.success) {
  console.error("Invalid environment variables:", z.treeifyError(parsed.error));
  throw new Error("Invalid environment variables — see .env.example and check your .env file.");
}

export const env = parsed.data;
