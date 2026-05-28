import { expect, test } from "@playwright/test";

const viewports = [
  { name: "mobile", width: 375, height: 667 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1280, height: 800 },
] as const;

for (const viewport of viewports) {
  test.describe(`${viewport.name} (${viewport.width}x${viewport.height})`, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    test("home page renders correctly", async ({ page }) => {
      await page.goto("/");
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    });

    test("skills page renders correctly", async ({ page }) => {
      await page.goto("/skills");
      await expect(page.getByRole("heading", { level: 2, name: "SE スキル" })).toBeVisible();
    });

    test("contact form is accessible", async ({ page }) => {
      await page.goto("/contact");
      await expect(page.getByLabel(/名前/)).toBeVisible();
      await expect(page.getByRole("button", { name: "送信" })).toBeVisible();
    });
  });
}
