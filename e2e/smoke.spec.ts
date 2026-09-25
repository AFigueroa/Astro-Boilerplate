import { expect, test } from "@playwright/test";

test("homepage renders and has a title", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/./);
  await expect(page.locator("h1")).toBeVisible();
});

test("main navigation links are present", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: "Services" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Contact" })).toBeVisible();
});

test("contact page renders the contact form", async ({ page }) => {
  await page.goto("/contact");
  await expect(page.locator("#contact-form")).toBeVisible();
  await expect(page.getByLabel("Name")).toBeVisible();
  await expect(page.getByLabel("Email")).toBeVisible();
  await expect(page.getByLabel("Message")).toBeVisible();
});
