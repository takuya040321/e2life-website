import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import AiTopicPage from "./page";

describe("AiTopicPage", () => {
  it("renders the overview and the How steps for sns", async () => {
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
    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByText("07")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 5,
        name: "Mac の launchd で毎朝、定時に起動する",
      }),
    ).toBeInTheDocument();
  });

  it("renders the How steps for accounting (now fully written)", async () => {
    const ui = await AiTopicPage({ params: Promise.resolve({ slug: "accounting" }) });
    render(ui);
    expect(screen.getByRole("heading", { level: 2, name: "会計・経理の自動化" })).toHaveClass(
      "font-serif",
    );
    expect(
      screen.getByRole("heading", { level: 4, name: "どう実現しているか" }),
    ).toBeInTheDocument();
    // 準備中表示は出ない
    expect(
      screen.queryByText(/この領域の「どう実現しているか」は、現在準備中です。/),
    ).not.toBeInTheDocument();
  });
});
