import { expect, test } from "@playwright/test";

const darkModePages = ["/", "/skills", "/career", "/contact", "/ai", "/ai/ecosystem"] as const;

test.describe("dark mode", () => {
  test.use({ colorScheme: "dark" });

  for (const path of darkModePages) {
    test(`${path} uses dark readable body colors`, async ({ page }) => {
      await page.goto(path);

      const colors = await page.locator("body").evaluate((body) => {
        const style = window.getComputedStyle(body);

        return {
          backgroundColor: style.backgroundColor,
          color: style.color,
        };
      });

      expect(colors).toEqual({
        backgroundColor: "rgb(13, 10, 8)",
        color: "rgb(245, 240, 230)",
      });
      await expect(page.locator("body")).toHaveCSS("background-image", /washi\.svg/);
    });
  }
});
