import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import HarnessTopicPage from "./page";

describe("HarnessTopicPage", () => {
  it("renders the topic title, intro and sections", async () => {
    const ui = await HarnessTopicPage({ params: Promise.resolve({ slug: "ecosystem" }) });
    render(ui);
    expect(screen.getByRole("heading", { level: 2, name: "エコシステム全体像" })).toHaveClass(
      "font-serif",
    );
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "役割を絞った AI エージェントと、権限の三層モデル",
      }),
    ).toBeInTheDocument();
  });

  it("renders sections as Japanese-modern cards", async () => {
    const ui = await HarnessTopicPage({ params: Promise.resolve({ slug: "ecosystem" }) });
    const { container } = render(ui);

    expect(screen.getByText("壱")).toHaveClass("text-accent");
    expect(screen.getByText("弐")).toHaveClass("text-accent");
    expect(container.querySelector("section")).toHaveClass("bg-card/70");
  });
});
