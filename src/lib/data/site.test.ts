import { describe, expect, it } from "vitest";

import { siteMetadata } from "./site";

describe("siteMetadata.socialLinks", () => {
  it("lists GitHub then X in display order", () => {
    expect(siteMetadata.socialLinks.map((link) => link.platform)).toEqual(["GitHub", "X"]);
  });

  it("points X at the profile URL without query parameters", () => {
    const x = siteMetadata.socialLinks.find((link) => link.platform === "X");

    expect(x).toBeDefined();
    expect(x?.url).toBe("https://x.com/e2life040321");
    expect(x?.icon).toBe("x");
  });

  it("has unique platforms and absolute https URLs", () => {
    const platforms = siteMetadata.socialLinks.map((link) => link.platform);
    expect(new Set(platforms).size).toBe(platforms.length);

    for (const link of siteMetadata.socialLinks) {
      expect(link.url.startsWith("https://")).toBe(true);
      expect(link.url).not.toContain("?");
    }
  });
});
