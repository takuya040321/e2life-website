import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { siteMetadata } from "@/lib/data/site";

import { Footer } from "./footer";

vi.mock("next/image", () => ({
  default: function MockImage(props: Record<string, unknown>) {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

describe("Footer", () => {
  it("renders social links and decorative hanko image", () => {
    render(<Footer />);

    for (const link of siteMetadata.socialLinks) {
      expect(screen.getByRole("link", { name: link.platform })).toHaveAttribute("href", link.url);
    }

    expect(
      document.querySelector('img[src="/illustrations/hanko-e2life.png"]'),
    ).toBeInTheDocument();
  });
});
