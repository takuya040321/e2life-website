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
    expect(
      screen.getByRole("heading", { level: 3, name: "AI ネイティブな開発設計" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: "マルチエージェント品質管理" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: "自己改善する仕組み" }),
    ).toBeInTheDocument();
  });
});
