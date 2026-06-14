import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CTASection } from "./cta-section";

describe("CTASection", () => {
  it("renders the heading", () => {
    render(<CTASection />);
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "AI を組織のように動かすご相談を受け付けています",
      }),
    ).toBeInTheDocument();
  });

  it("renders the three CTA links", () => {
    render(<CTASection />);
    expect(screen.getByRole("link", { name: "お問い合わせ" })).toHaveAttribute("href", "/contact");
    expect(screen.getByRole("link", { name: "AI活用事例を見る" })).toHaveAttribute("href", "/ai");
    expect(screen.getByRole("link", { name: "ハーネス設計を見る" })).toHaveAttribute(
      "href",
      "/harness",
    );
  });
});
