import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import AiHubPage from "./page";

describe("AiHubPage", () => {
  it("renders the heading", () => {
    render(<AiHubPage />);
    expect(screen.getByRole("heading", { level: 2, name: "AI 活用" })).toHaveClass("font-serif");
  });

  it("renders the upcoming topics", () => {
    render(<AiHubPage />);
    expect(screen.getByRole("link", { name: /エコシステム全体像/ })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /SNS 自動化パイプライン/ })).toBeInTheDocument();
  });

  it("renders Japanese-modern topic cards with accent numbers", () => {
    render(<AiHubPage />);

    expect(screen.getByText("01")).toHaveClass("text-accent");
    expect(screen.getByText("02")).toHaveClass("text-accent");
    expect(screen.getByText("03")).toHaveClass("text-accent");
    expect(screen.getByRole("link", { name: /エコシステム全体像/ })).toHaveClass("bg-card/70");
  });
});
