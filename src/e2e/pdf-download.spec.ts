import { expect, test } from "@playwright/test";

test("PDF download link is present on home", async ({ page }) => {
  await page.goto("/");
  const pdfLink = page.getByRole("link", { name: "スキルシート PDF" });
  await expect(pdfLink).toBeVisible();
  await expect(pdfLink).toHaveAttribute("href", "/downloads/skill-sheet.pdf");
  await expect(pdfLink).toHaveAttribute("download", "");
});

test("PDF file is accessible", async ({ request }) => {
  const response = await request.get("/downloads/skill-sheet.pdf");
  expect(response.ok()).toBe(true);
  expect(response.headers()["content-type"]).toContain("pdf");
});
