import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CTASection } from "./cta-section";

describe("CTASection", () => {
  it("renders CTA heading", () => {
    render(<CTASection />);
    expect(screen.getByText("お気軽にご相談ください")).toBeInTheDocument();
  });

  it("renders PDF download link", () => {
    render(<CTASection />);
    const pdfLink = screen.getByText("スキルシート PDF");
    expect(pdfLink.closest("a")).toHaveAttribute("href", "/downloads/skill-sheet.pdf");
  });

  it("renders contact link", () => {
    render(<CTASection />);
    const contactLink = screen.getByText("お問い合わせ");
    expect(contactLink.closest("a")).toHaveAttribute("href", "/contact");
  });
});
