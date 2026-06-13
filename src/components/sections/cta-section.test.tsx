import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CTASection } from "./cta-section";

describe("CTASection", () => {
  it("renders CTA heading", () => {
    render(<CTASection />);
    expect(screen.getByText("お気軽にご相談ください")).toBeInTheDocument();
  });

  it("renders four CTA links", () => {
    render(<CTASection />);
    expect(screen.getAllByRole("link")).toHaveLength(4);
  });

  it("renders contact link", () => {
    render(<CTASection />);
    const contactLink = screen.getByText("お問い合わせ");
    expect(contactLink.closest("a")).toHaveAttribute("href", "/contact");
  });

  it("renders ai link", () => {
    render(<CTASection />);
    const aiLink = screen.getByText("AI活用を見る");
    expect(aiLink.closest("a")).toHaveAttribute("href", "/ai");
  });

  it("renders harness link", () => {
    render(<CTASection />);
    const harnessLink = screen.getByText("ハーネス設計を見る");
    expect(harnessLink.closest("a")).toHaveAttribute("href", "/harness");
  });

  it("renders about link", () => {
    render(<CTASection />);
    const aboutLink = screen.getByText("自分について");
    expect(aboutLink.closest("a")).toHaveAttribute("href", "/about");
  });
});
