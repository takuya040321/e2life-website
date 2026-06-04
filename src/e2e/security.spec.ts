import { expect, test } from "@playwright/test";

test.describe("security headers", () => {
  test("home page has security headers", async ({ request }) => {
    const response = await request.get("/");
    const headers = response.headers();

    expect(headers["x-frame-options"]).toBe("DENY");
    expect(headers["x-content-type-options"]).toBe("nosniff");
    expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
    expect(headers["content-security-policy"]).toContain("frame-ancestors 'none'");
    expect(headers["content-security-policy"]).toContain("https://www.google.com");
    expect(headers["permissions-policy"]).toContain("camera=()");
    expect(headers["permissions-policy"]).toContain("browsing-topics=()");
  });
});

test.describe("XSS prevention", () => {
  test("does not render script tags from URL params", async ({ page }) => {
    await page.goto("/?test=<script>window.xssTriggered=true</script>");
    const triggered = await page.evaluate(
      () => (window as unknown as { xssTriggered?: boolean }).xssTriggered,
    );
    expect(triggered).toBeUndefined();
  });
});
