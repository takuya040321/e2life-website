import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HarnessDiagram } from "./harness-diagram";

describe("HarnessDiagram", () => {
  it("renders the flow steps in order", () => {
    render(<HarnessDiagram />);
    expect(screen.getByText("あなた（社長）")).toBeInTheDocument();
    expect(screen.getByText("秘書役の AI（PA）")).toBeInTheDocument();
    expect(screen.getByText("各部門の担当 AI（部長役）")).toBeInTheDocument();
    expect(screen.getByText("実装エージェント")).toBeInTheDocument();
    expect(screen.getByText("レビュー → 公開・成果")).toBeInTheDocument();
  });

  it("labels the connections between steps", () => {
    render(<HarnessDiagram />);
    expect(screen.getByText("話すだけ")).toBeInTheDocument();
    expect(screen.getByText("指示する")).toBeInTheDocument();
    expect(screen.getByText("実装を任せる")).toBeInTheDocument();
    expect(screen.getByText("独立レビュー")).toBeInTheDocument();
  });

  it("marks the PA as the command center", () => {
    render(<HarnessDiagram />);
    expect(screen.getByText("司令塔")).toBeInTheDocument();
  });

  it("shows the bidirectional records layer", () => {
    render(<HarnessDiagram />);
    expect(screen.getByText("記録層")).toBeInTheDocument();
    expect(screen.getByText("各ステップのやり取りを記録する")).toBeInTheDocument();
    expect(screen.getByText("次の判断で参照する")).toBeInTheDocument();
  });
});
