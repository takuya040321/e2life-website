import { expect, test } from "@playwright/test";

test.describe("skills filter", () => {
  test("filters by category", async ({ page }) => {
    await page.goto("/skills");

    const skillCards = page.locator("img[alt='TypeScript']");
    await expect(skillCards).toHaveCount(1);

    await page.getByRole("button", { name: "言語" }).click();
    await expect(page.locator("img[alt='TypeScript']")).toBeVisible();
    await expect(page.locator("img[alt='Next.js']")).toHaveCount(0);
  });

  test("returns to all skills when すべて is clicked", async ({ page }) => {
    await page.goto("/skills");
    await page.getByRole("button", { name: "言語" }).click();
    await page.getByRole("button", { name: "すべて" }).click();
    await expect(page.locator("img[alt='TypeScript']")).toBeVisible();
    await expect(page.locator("img[alt='Next.js']")).toBeVisible();
  });
});
