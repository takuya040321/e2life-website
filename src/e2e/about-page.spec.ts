import { expect, test } from "@playwright/test";

test.describe("about page", () => {
  test("shows title and main heading", async ({ page }) => {
    await page.goto("/about");

    await expect(page).toHaveTitle(/自分について/);
    await expect(
      page.getByRole("heading", { level: 1, name: "仕組みを作って、判断負荷を下げる" }),
    ).toBeVisible();
    await expect(page.getByRole("heading", { level: 2, name: "大事にしている軸" })).toBeVisible();
    await expect(page.getByText("壱")).toBeVisible();
    await expect(page.getByRole("main").locator('img[src*="hanko-e2life.png"]')).toBeAttached();
  });
});
