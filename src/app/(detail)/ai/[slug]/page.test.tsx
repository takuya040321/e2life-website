import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import AiTopicPage from "./page";

describe("AiTopicPage", () => {
  it("renders the overview and the How steps for a fully-written topic", async () => {
    const ui = await AiTopicPage({ params: Promise.resolve({ slug: "sns" }) });
    render(ui);
    expect(screen.getByRole("heading", { level: 2, name: "SNS 発信の自動化" })).toHaveClass(
      "font-serif",
    );
    expect(
      screen.getByRole("heading", { level: 4, name: "どんな取り組みをしているか" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 4, name: "どう実現しているか" }),
    ).toBeInTheDocument();
    // 具体ツール名が描画されている
    expect(screen.getByText("macOS launchd")).toBeInTheDocument();
    expect(screen.getByText("Playwright")).toBeInTheDocument();
  });

  it("shows the preparing placeholder for topics without howSteps", async () => {
    const ui = await AiTopicPage({ params: Promise.resolve({ slug: "accounting" }) });
    render(ui);
    expect(
      screen.getByRole("heading", { level: 4, name: "どう実現しているか" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/この領域の「どう実現しているか」は、現在準備中です。/),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /SNS 発信の自動化を見る/ }),
    ).toBeInTheDocument();
  });
});
