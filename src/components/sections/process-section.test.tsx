import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ProcessSection } from "./process-section";

describe("ProcessSection", () => {
  it("renders the heading and the three steps", () => {
    render(<ProcessSection />);
    expect(
      screen.getByRole("heading", { level: 2, name: "ご一緒する場合の流れ" }),
    ).toBeInTheDocument();
    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByText("02")).toBeInTheDocument();
    expect(screen.getByText("03")).toBeInTheDocument();
    expect(screen.getByText("ヒアリングと現状診断")).toBeInTheDocument();
    expect(screen.getByText("ハーネス設計と組み込み")).toBeInTheDocument();
    expect(screen.getByText("自走化と継続改善")).toBeInTheDocument();
  });
});
