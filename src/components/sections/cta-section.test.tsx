import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CTASection } from "./cta-section";

describe("CTASection", () => {
  it("renders CTA heading", () => {
    render(<CTASection />);
    expect(screen.getByText("お気軽にご相談ください")).toBeInTheDocument();
  });

  it("renders two CTA links", () => {
    render(<CTASection />);
    expect(screen.getAllByRole("link")).toHaveLength(2);
  });

  it("renders contact link", () => {
    render(<CTASection />);
    const contactLink = screen.getByText("お問い合わせ");
    expect(contactLink.closest("a")).toHaveAttribute("href", "/contact");
  });

  it("renders skills link", () => {
    render(<CTASection />);
    const skillsLink = screen.getByText("スキルを見る");
    expect(skillsLink.closest("a")).toHaveAttribute("href", "/skills");
  });
});
