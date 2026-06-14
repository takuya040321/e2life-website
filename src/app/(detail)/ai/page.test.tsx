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
      screen.getByRole("heading", { level: 3, name: "活用領域の一覧" }),
    ).toBeInTheDocument();
  });

  it("renders the 12 topic cards covering all domains", () => {
    render(<AiHubPage />);
    expect(screen.getByRole("link", { name: /SNS 発信の自動化/ })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /情報収集・配信/ })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /画像コンテンツの生成/ })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /ナレッジ・記録の自動化/ })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /会計・経理の自動化/ })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /メール・カレンダー対応の半自動化/ }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /動画・キャラクター IP 制作/ })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Web サイトの AI 自走運営/ })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /マルチリポジトリ AI 開発基盤/ }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /設計工程の AI 化/ })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /ドキュメント作成の自動化/ })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /個人生活の AI サポート/ })).toBeInTheDocument();
    expect(screen.getByText("01")).toHaveClass("text-accent");
    expect(screen.getByText("12")).toHaveClass("text-accent");
  });
});
