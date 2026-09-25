import { describe, expect, it } from "vitest";
import { formatDate, slugify } from "./format";

describe("slugify", () => {
  it("lowercases and hyphenates", () => {
    expect(slugify("Hello World")).toBe("hello-world");
  });

  it("strips non-alphanumeric characters", () => {
    expect(slugify("Ana M. Ramírez!")).toBe("ana-m-ram-rez");
  });

  it("trims leading and trailing hyphens", () => {
    expect(slugify("  -Extra Space-  ")).toBe("extra-space");
  });
});

describe("formatDate", () => {
  it("formats a date as a long US-style string", () => {
    expect(formatDate(new Date("2026-01-15T00:00:00Z"))).toBe("January 15, 2026");
  });
});
