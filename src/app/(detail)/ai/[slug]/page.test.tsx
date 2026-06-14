import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import AiTopicPage from "./page";

describe("AiTopicPage", () => {
  it("renders the topic title, overview and points sections", async () => {
    const ui = await AiTopicPage({ params: Promise.resolve({ slug: "sns" }) });
    render(ui);
    expect(screen.getByRole("heading", { level: 2, name: "SNS 発信の自動化" })).toHaveClass(
      "font-serif",
    );
    expect(
      screen.getByRole("heading", { level: 4, name: "どんな取り組みをしているか" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 4, name: "わたしが意識していること" }),
    ).toBeInTheDocument();
  });

  it("renders point cards with japanese numerals", async () => {
    const ui = await AiTopicPage({ params: Promise.resolve({ slug: "sns" }) });
    render(ui);
    expect(screen.getByText("壱")).toHaveClass("text-accent");
    expect(screen.getByText("弐")).toHaveClass("text-accent");
    expect(screen.getByText("参")).toHaveClass("text-accent");
    expect(screen.getByText("四")).toHaveClass("text-accent");
  });
});
