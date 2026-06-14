import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import AiHubPage from "./page";

describe("AiHubPage", () => {
  it("renders the hero with the new self-introduction heading", () => {
    render(<AiHubPage />);
    expect(
      screen.getByRole("heading", { level: 2, name: "わたしの AI 活用事例" }),
    ).toHaveClass("font-serif");
  });

  it("renders the Why and Domains sections", () => {
    render(<AiHubPage />);
    expect(
      screen.getByRole("heading", { level: 3, name: "なぜ自動化に振り切るのか" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: "4 つの活用領域" }),
    ).toBeInTheDocument();
  });

  it("renders the 4 topic cards", () => {
    render(<AiHubPage />);
    expect(screen.getByRole("link", { name: /SNS 発信の自動化/ })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /情報収集・配信/ })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /コンテンツ生成/ })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /ナレッジ・記録の自動化/ })).toBeInTheDocument();
    expect(screen.getByText("01")).toHaveClass("text-accent");
    expect(screen.getByText("04")).toHaveClass("text-accent");
  });
});
