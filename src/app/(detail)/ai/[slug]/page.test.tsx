import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import AiTopicPage from "./page";

describe("AiTopicPage", () => {
  it("renders the topic title, intro and sections", async () => {
    const ui = await AiTopicPage({ params: Promise.resolve({ slug: "sns" }) });
    render(ui);
    expect(screen.getByRole("heading", { level: 2, name: "SNS 発信の自動化" })).toHaveClass(
      "font-serif",
    );
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "記録の蓄積を発信の原資に変えるパイプライン",
      }),
    ).toBeInTheDocument();
  });

  it("renders sections as Japanese-modern cards", async () => {
    const ui = await AiTopicPage({ params: Promise.resolve({ slug: "sns" }) });
    const { container } = render(ui);

    expect(screen.getByText("壱")).toHaveClass("text-accent");
    expect(screen.getByText("弐")).toHaveClass("text-accent");
    expect(container.querySelector("section")).toHaveClass("bg-card/70");
  });
});
