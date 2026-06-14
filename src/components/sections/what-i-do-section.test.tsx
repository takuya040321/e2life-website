import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { WhatIDoSection } from "./what-i-do-section";

describe("WhatIDoSection", () => {
  it("renders the heading and the three services", () => {
    render(<WhatIDoSection />);
    expect(screen.getByRole("heading", { level: 2, name: "やっていること" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: "AI による開発プロセスの自走化" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: "マルチエージェント構成の設計" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: "記録・レビュー基盤の組み込み" }),
    ).toBeInTheDocument();
  });
});
