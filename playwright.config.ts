import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  // JSON output feeds scripts/quality-report.mjs (published test counts).
  reporter: [
    [process.env.CI ? "github" : "list"],
    ["json", { outputFile: "reports/playwright.json" }],
  ],
  use: {
    baseURL: "http://localhost:4321",
    trace: "on-first-retry",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "npm run preview",
    url: "http://localhost:4321",
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
