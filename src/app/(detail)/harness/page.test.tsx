import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import HarnessHubPage from "./page";

describe("HarnessHubPage", () => {
  it("renders the hero heading and the harness definition block", () => {
    const { container } = render(<HarnessHubPage />);
    expect(
      screen.getByRole("heading", { level: 2, name: "わたしのハーネス設計" }),
    ).toHaveClass("font-serif");
    expect(container.textContent).toMatch(/AI に役割・権限・停止条件を与えるための設計/);
  });

  it("clarifies the boundary with the AI usage page", () => {
    const { container } = render(<HarnessHubPage />);
    expect(container.textContent).toMatch(/なぜそうしているか/);
    expect(container.textContent).toMatch(/具体的なツール名や実装手順/);
    const aiLinks = screen.getAllByRole("link", { name: /AI活用事例/ });
    expect(aiLinks.length).toBeGreaterThan(0);
  });

  it("renders the Principles as a vertical numbered list with 6 items", () => {
    render(<HarnessHubPage />);
    expect(
      screen.getByRole("heading", { level: 3, name: "全体で意識していること" }),
    ).toBeInTheDocument();
    expect(screen.getByText("入口はひとつ")).toBeInTheDocument();
    expect(screen.getByText("最終決定はわたし")).toBeInTheDocument();
  });

  it("renders the role flow row and the 5 role cards", () => {
    render(<HarnessHubPage />);
    expect(
      screen.getByRole("heading", { level: 3, name: "5 つの役割で分業する" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /秘書役/ })).toHaveAttribute(
      "href",
      "/harness/secretary",
    );
    expect(screen.getByRole("link", { name: /記録担当/ })).toHaveAttribute(
      "href",
      "/harness/record",
    );
  });

  it("primary CTA is the AI usage page and contact is secondary", () => {
    render(<HarnessHubPage />);
    expect(
      screen.getByRole("link", { name: /AI活用事例を見る/ }),
    ).toHaveAttribute("href", "/ai");
    expect(screen.getByRole("link", { name: "お問い合わせ" })).toHaveAttribute(
      "href",
      "/contact",
    );
  });
});
