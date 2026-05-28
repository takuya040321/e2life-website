import { expect, test } from "@playwright/test";

test.describe("SEO metadata", () => {
  test("home page has title and description", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle("e2life.dev");
    const description = page.locator('meta[name="description"]');
    await expect(description).toHaveAttribute("content", /AI で開発プロセス/);
  });

  test("home page has OpenGraph metadata", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute("content", "website");
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
      "content",
      "e2life.dev",
    );
  });

  test("home page has Twitter card metadata", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
      "content",
      "summary_large_image",
    );
  });

  test("skills page has canonical URL", async ({ page }) => {
    await page.goto("/skills");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      "https://e2life.dev/skills",
    );
  });

  test("home page has JSON-LD structured data", async ({ page }) => {
    await page.goto("/");
    const jsonLd = page.locator('script[type="application/ld+json"]');
    await expect(jsonLd.first()).toBeAttached();
    const content = await jsonLd.first().textContent();
    expect(content).toContain("Person");
  });
});

test.describe("sitemap and robots", () => {
  test("sitemap.xml is accessible and includes all pages", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    expect(response.ok()).toBe(true);
    const body = await response.text();
    expect(body).toContain("https://e2life.dev");
    expect(body).toContain("/skills");
    expect(body).toContain("/career");
    expect(body).toContain("/contact");
  });

  test("robots.txt is accessible and references sitemap", async ({ request }) => {
    const response = await request.get("/robots.txt");
    expect(response.ok()).toBe(true);
    const body = await response.text();
    expect(body).toContain("User-Agent: *");
    expect(body).toContain("Sitemap: https://e2life.dev/sitemap.xml");
  });

  test("OGP image is accessible", async ({ request }) => {
    const response = await request.get("/opengraph-image");
    expect(response.ok()).toBe(true);
    expect(response.headers()["content-type"]).toContain("image/png");
  });
});
