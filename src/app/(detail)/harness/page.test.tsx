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

  it("renders the topic links", () => {
    render(<HarnessHubPage />);
    expect(screen.getByRole("link", { name: /エコシステム全体像/ })).toBeInTheDocument();
  });

  it("renders the organization benefits", () => {
    render(<HarnessHubPage />);
    expect(screen.getByText("窓口はひとつ")).toBeInTheDocument();
    expect(screen.getByText("資産を一元管理")).toBeInTheDocument();
  });

  it("renders the connection diagram with labeled nodes and the records layer", () => {
    render(<HarnessHubPage />);
    expect(screen.getByText("秘書役の AI（PA）")).toBeInTheDocument();
    expect(screen.getByText("各部門の担当 AI（部長役）")).toBeInTheDocument();
    expect(screen.getByText("記録層")).toBeInTheDocument();
    expect(screen.getByText("話すだけ")).toBeInTheDocument();
  });

  it("renders Japanese-modern topic cards with accent numbers", () => {
    render(<HarnessHubPage />);

    expect(screen.getByText("01")).toHaveClass("text-accent");
    expect(screen.getByText("02")).toHaveClass("text-accent");
    expect(screen.getByText("03")).toHaveClass("text-accent");
    expect(screen.getByRole("link", { name: /エコシステム全体像/ })).toHaveClass("bg-card/70");
  });
});
