import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import AiHubPage from "./page";

describe("AiHubPage", () => {
  it("renders the heading", () => {
    render(<AiHubPage />);
    expect(screen.getByRole("heading", { level: 2, name: "AI 活用" })).toHaveClass("font-serif");
    expect(screen.queryByText("AI")).not.toBeInTheDocument();
  });

  it("renders the topic links", () => {
    render(<AiHubPage />);
    expect(screen.getByRole("link", { name: /SNS 発信の自動化/ })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /情報収集・配信/ })).toBeInTheDocument();
  });

  it("renders Japanese-modern topic cards with accent numbers", () => {
    render(<AiHubPage />);

    expect(screen.getByText("01")).toHaveClass("text-accent");
    expect(screen.getByText("02")).toHaveClass("text-accent");
    expect(screen.getByText("03")).toHaveClass("text-accent");
    expect(screen.getByRole("link", { name: /SNS 発信の自動化/ })).toHaveClass("bg-card/70");
  });
});
