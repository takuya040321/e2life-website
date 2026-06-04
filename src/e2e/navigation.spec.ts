import { expect, test } from "@playwright/test";

test.describe("navigation", () => {
  test("loads home page", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "AI で開発プロセス自体を設計する",
    );
  });

  test("navigates to skills page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("navigation").getByRole("link", { name: "スキル" }).click();
    await expect(page).toHaveURL(/\/skills/);
    await expect(page.getByRole("heading", { level: 2, name: "SE スキル" })).toBeVisible();
  });

  test("navigates to career page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("navigation").getByRole("link", { name: "経歴" }).click();
    await expect(page).toHaveURL(/\/career/);
    await expect(page.getByRole("heading", { level: 2, name: "職務経歴" })).toBeVisible();
  });

  test("navigates to contact page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("navigation").getByRole("link", { name: "お問い合わせ" }).click();
    await expect(page).toHaveURL(/\/contact/);
    await expect(page.getByRole("heading", { level: 2, name: "お問い合わせ" })).toBeVisible();
  });

  test("navigates to ai page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("navigation").getByRole("link", { name: "AI", exact: true }).click();
    await expect(page).toHaveURL(/\/ai/);
    await expect(page.getByRole("heading", { level: 2, name: "AI 活用" })).toBeVisible();
  });

  test("logo links back to home", async ({ page }) => {
    await page.goto("/skills");
    await page.getByRole("link", { name: "e2life.dev" }).click();
    await expect(page).toHaveURL(/\/$/);
  });
});
