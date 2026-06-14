import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HeroSection } from "./hero-section";

describe("HeroSection", () => {
  it("renders the natural-Japanese headline and 3 CTAs", () => {
    render(<HeroSection />);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent(/AI を/);
    expect(heading).toHaveTextContent(/ひとつの/);
    expect(heading).toHaveTextContent(/組織/);
    expect(heading).toHaveTextContent(/経営するエンジニア/);
    expect(heading).not.toHaveTextContent(/ひとりの会社/);

    expect(screen.getByRole("link", { name: "お問い合わせ" })).toHaveAttribute("href", "/contact");
    expect(screen.getByRole("link", { name: "AI活用事例を見る" })).toHaveAttribute("href", "/ai");
    expect(screen.getByRole("link", { name: "ハーネス設計を見る" })).toHaveAttribute(
      "href",
      "/harness",
    );
  });

  it("renders the decorative enso image", () => {
    render(<HeroSection />);
    expect(screen.getByTestId("enso-layer")).toHaveClass("sm:w-[clamp(30rem,43vw,38rem)]");
  });
});
