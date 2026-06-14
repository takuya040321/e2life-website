import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CTASection } from "./cta-section";

describe("CTASection", () => {
  it("renders the let's talk heading", () => {
    render(<CTASection />);
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "AI を組織のように動かすご相談を受け付けています",
      }),
    ).toBeInTheDocument();
  });

  it("renders only primary contact CTA and a single secondary link", () => {
    render(<CTASection />);
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(2);
  });

  it("renders the contact CTA pointing to /contact", () => {
    render(<CTASection />);
    const contactLink = screen.getByText("お問い合わせ");
    expect(contactLink.closest("a")).toHaveAttribute("href", "/contact");
  });

  it("renders the about secondary link pointing to /about", () => {
    render(<CTASection />);
    const aboutLink = screen.getByText("自分について");
    expect(aboutLink.closest("a")).toHaveAttribute("href", "/about");
  });
});
