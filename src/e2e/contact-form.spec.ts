import { expect, test } from "@playwright/test";

test.describe("contact form", () => {
  test("displays form fields", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.getByLabel(/名前/)).toBeVisible();
    await expect(page.getByLabel(/メールアドレス/)).toBeVisible();
    await expect(page.getByLabel(/会社名/)).toBeVisible();
    await expect(page.getByLabel(/メッセージ/)).toBeVisible();
  });

  test("shows validation errors on empty submit", async ({ page }) => {
    await page.goto("/contact");
    await page.getByRole("button", { name: "送信" }).click();
    await expect(page.getByText("名前を入力してください")).toBeVisible();
    await expect(page.getByText("メールアドレスを入力してください")).toBeVisible();
  });

  test("shows error for invalid email", async ({ page }) => {
    await page.goto("/contact");
    await page.getByLabel(/名前/).fill("テスト太郎");
    await page.getByLabel(/メールアドレス/).fill("not-an-email");
    await page.getByLabel(/メッセージ/).fill("テスト用メッセージです。");
    await page.getByRole("button", { name: "送信" }).click();
    await expect(page.getByText("正しいメールアドレスを入力してください")).toBeVisible();
  });
});
