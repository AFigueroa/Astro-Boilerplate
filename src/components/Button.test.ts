import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, expect, it } from "vitest";
import Button from "./Button.astro";

describe("Button", () => {
  it("renders a button element when no href is given", async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Button, {
      props: { label: "Click me" },
    });

    expect(result).toContain("Click me");
    expect(result).toContain("<button");
  });

  it("renders an anchor element when href is given", async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Button, {
      props: { label: "Go", href: "/contact" },
    });

    expect(result).toContain('href="/contact"');
    expect(result).toContain("<a");
  });
});
