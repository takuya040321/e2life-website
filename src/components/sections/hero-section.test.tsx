import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HeroSection } from "./hero-section";

describe("HeroSection", () => {
  it("renders headline and primary/secondary CTAs", () => {
    render(<HeroSection />);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent(/AI を/);
    expect(heading).toHaveTextContent(/会社/);
    expect(heading).toHaveTextContent(/経営するエンジニア/);
    expect(screen.getByRole("link", { name: "お問い合わせ" })).toHaveAttribute("href", "/contact");
    expect(screen.getByRole("link", { name: "ハーネス設計を見る" })).toHaveAttribute(
      "href",
      "/harness",
    );
    expect(screen.queryByRole("link", { name: "AI活用を見る" })).not.toBeInTheDocument();
  });

  it("renders the decorative enso image", () => {
    render(<HeroSection />);

    expect(screen.getByTestId("enso-layer")).toHaveClass("sm:w-[clamp(30rem,43vw,38rem)]");
    expect(screen.getByTestId("enso-illustration")).toHaveStyle({
      maskImage: "url('/illustrations/enso.webp')",
    });
  });
});
