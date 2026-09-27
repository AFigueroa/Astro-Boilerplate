import { expect, test } from "@playwright/test";
import { allPages } from "./pages";

test("homepage renders and has a title", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Batey Labs/);
  await expect(page.locator("h1")).toBeVisible();
});

test("main navigation links are present in both languages", async ({ page }) => {
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Main navigation" });
  await expect(nav.getByRole("link", { name: "Services" })).toBeVisible();
  await expect(nav.getByRole("link", { name: "Contact" })).toBeVisible();

  await page.goto("/es/");
  const navEs = page.getByRole("navigation", { name: "Navegación principal" });
  await expect(navEs.getByRole("link", { name: "Servicios" })).toBeVisible();
  await expect(navEs.getByRole("link", { name: "Contacto" })).toBeVisible();
});

test("services list shows starting-at prices", async ({ page }) => {
  await page.goto("/services/");
  await expect(page.getByText(/Starting at \$/).first()).toBeVisible();
  await page.goto("/es/servicios/");
  await expect(page.getByText(/Desde \$/).first()).toBeVisible();
});

test("contact page renders the contact form", async ({ page }) => {
  await page.goto("/contact/");
  await expect(page.locator("#contact-form")).toBeVisible();
  await expect(page.getByLabel("Name")).toBeVisible();
  await expect(page.getByLabel("Email", { exact: true })).toBeVisible();
  await expect(page.getByLabel("Message")).toBeVisible();

  await page.goto("/es/contacto/");
  await expect(page.getByLabel("Nombre")).toBeVisible();
  await expect(page.getByLabel("Mensaje")).toBeVisible();
});

// CSP violations surface as console errors, so this also proves the
// generated Content-Security-Policy doesn't block the site's own assets.
test("no page logs console errors (including CSP violations)", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(`${page.url()}: ${message.text()}`);
  });
  page.on("pageerror", (error) => errors.push(`${page.url()}: ${error.message}`));

  for (const { path } of allPages) {
    await page.goto(path);
  }
  expect(errors).toEqual([]);
});
