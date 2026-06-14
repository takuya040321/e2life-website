import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import HarnessHubPage from "./page";

describe("HarnessHubPage", () => {
  it("renders the hero heading", () => {
    render(<HarnessHubPage />);
    expect(
      screen.getByRole("heading", { level: 2, name: "わたしのハーネス設計" }),
    ).toHaveClass("font-serif");
  });

  it("renders the Principles section with orchestration items", () => {
    render(<HarnessHubPage />);
    expect(
      screen.getByRole("heading", { level: 3, name: "全体で意識していること" }),
    ).toBeInTheDocument();
    expect(screen.getByText("入口はひとつ")).toBeInTheDocument();
    expect(screen.getByText("役割で分業する")).toBeInTheDocument();
  });

  it("renders the 5 role cards as navigable links", () => {
    render(<HarnessHubPage />);
    expect(
      screen.getByRole("heading", { level: 3, name: "5 つの役割で分業する" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /秘書役/ })).toHaveAttribute(
      "href",
      "/harness/secretary",
    );
    expect(screen.getByRole("link", { name: /部門担当/ })).toHaveAttribute(
      "href",
      "/harness/department",
    );
    expect(screen.getByRole("link", { name: /実装担当/ })).toHaveAttribute(
      "href",
      "/harness/implementation",
    );
    expect(screen.getByRole("link", { name: /レビュー担当/ })).toHaveAttribute(
      "href",
      "/harness/review",
    );
    expect(screen.getByRole("link", { name: /記録担当/ })).toHaveAttribute(
      "href",
      "/harness/record",
    );
    expect(screen.getByText("01")).toHaveClass("text-accent");
    expect(screen.getByText("05")).toHaveClass("text-accent");
  });

  it("no longer shows the preparing badge", () => {
    render(<HarnessHubPage />);
    expect(screen.queryByText("準備中")).not.toBeInTheDocument();
  });
});
