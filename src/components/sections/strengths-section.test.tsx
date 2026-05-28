import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { StrengthsSection } from "./strengths-section";

describe("StrengthsSection", () => {
  it("renders section title", () => {
    render(<StrengthsSection />);
    expect(screen.getByText("3 つの強み")).toBeInTheDocument();
  });

  it("renders all three strengths", () => {
    render(<StrengthsSection />);
    expect(screen.getByText("AI ネイティブな開発設計")).toBeInTheDocument();
    expect(screen.getByText("マルチエージェント品質管理")).toBeInTheDocument();
    expect(screen.getByText("自己改善する仕組み")).toBeInTheDocument();
  });
});
