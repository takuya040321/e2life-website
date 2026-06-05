import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HeroSection } from "./hero-section";

describe("HeroSection", () => {
  it("renders headline and current CTA copy", () => {
    render(<HeroSection />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "AI で開発プロセス自体を設計するエンジニア",
    );
    expect(screen.getByRole("link", { name: "お問い合わせ" })).toHaveAttribute("href", "/contact");
    expect(screen.getByRole("link", { name: "スキルを見る" })).toHaveAttribute("href", "/skills");
  });

  it("renders the decorative enso image", () => {
    render(<HeroSection />);

    expect(screen.getByTestId("enso-layer")).toHaveClass("sm:w-[clamp(30rem,43vw,38rem)]");
    expect(screen.getByTestId("enso-illustration")).toHaveStyle({
      maskImage: "url('/illustrations/enso.webp')",
    });
  });
});
