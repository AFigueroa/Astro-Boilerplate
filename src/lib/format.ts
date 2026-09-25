/**
 * Small pure-function utilities live here as an example testing target.
 * Delete or replace once real project logic exists.
 */
export function slugify(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function formatDate(date: Date): string {
  // timeZone is pinned to UTC so output doesn't shift depending on the
  // machine's local timezone (dev laptop vs. CI runner vs. host).
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
}
