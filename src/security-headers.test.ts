import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

// Cloudflare applies public/_headers in production only (not `astro preview`),
// so the file itself is the thing to test.
const headersFile = readFileSync(join(process.cwd(), "public", "_headers"), "utf8");

describe("public/_headers", () => {
  it.each([
    ["Content-Security-Policy", "frame-ancestors 'none'"],
    ["X-Frame-Options", "DENY"],
    ["X-Content-Type-Options", "nosniff"],
    ["Referrer-Policy", "strict-origin-when-cross-origin"],
    ["Permissions-Policy", "camera=()"],
    ["Strict-Transport-Security", "max-age="],
  ])("sets %s on every path", (name, value) => {
    const block = headersFile.split(/^\/\*\s*$/m)[1] ?? "";
    const line = block.split("\n").find((l) => l.trim().startsWith(`${name}:`));
    expect(line, `${name} missing from the /* block`).toBeDefined();
    expect(line).toContain(value);
  });
});
