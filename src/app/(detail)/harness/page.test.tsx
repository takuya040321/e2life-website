import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import HarnessHubPage from "./page";

describe("HarnessHubPage", () => {
  it("renders the heading", () => {
    render(<HarnessHubPage />);
    expect(screen.getByRole("heading", { level: 2, name: "ハーネス設計" })).toHaveClass(
      "font-serif",
    );
  });

  it("renders the orchestration principles section", () => {
    render(<HarnessHubPage />);
    expect(
      screen.getByRole("heading", { level: 2, name: "全体ハーネスで意識していること" }),
    ).toBeInTheDocument();
    expect(screen.getByText("入口はひとつ")).toBeInTheDocument();
    expect(screen.getByText("記録を活かす")).toBeInTheDocument();
  });

  it("renders specialist harness cards with the secretary harness link", () => {
    render(<HarnessHubPage />);
    expect(
      screen.getByRole("heading", { level: 2, name: "専門ハーネス一覧" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /秘書役ハーネス/ })).toBeInTheDocument();
  });

  it("marks preparing harnesses with the 準備中 badge", () => {
    render(<HarnessHubPage />);
    const badges = screen.getAllByText("準備中");
    expect(badges.length).toBeGreaterThan(0);
  });

  it("renders the connection diagram", () => {
    render(<HarnessHubPage />);
    expect(screen.getByText("秘書役の AI（PA）")).toBeInTheDocument();
    expect(screen.getByText("記録層")).toBeInTheDocument();
  });
});
