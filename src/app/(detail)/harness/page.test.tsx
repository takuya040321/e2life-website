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

  it("renders the overview diagram and organization benefits", () => {
    render(<HarnessHubPage />);
    expect(screen.getByRole("img", { name: /組織型ハーネスの全体像/ })).toBeInTheDocument();
    expect(screen.getByText("窓口はひとつ")).toBeInTheDocument();
    expect(screen.getByText("資産を一元管理")).toBeInTheDocument();
  });

  it("renders Japanese-modern topic cards with accent numbers", () => {
    render(<HarnessHubPage />);

    expect(screen.getByText("01")).toHaveClass("text-accent");
    expect(screen.getByText("02")).toHaveClass("text-accent");
    expect(screen.getByText("03")).toHaveClass("text-accent");
    expect(screen.getByRole("link", { name: /エコシステム全体像/ })).toHaveClass("bg-card/70");
  });
});
