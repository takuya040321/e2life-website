import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import AiTopicPage from "./page";

describe("AiTopicPage", () => {
  it("renders the topic title, intro and sections", async () => {
    const ui = await AiTopicPage({ params: Promise.resolve({ slug: "ecosystem" }) });
    render(ui);
    expect(
      screen.getByRole("heading", { level: 2, name: "エコシステム全体像" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("役割を絞った AI エージェントと、権限の三層モデル"),
    ).toBeInTheDocument();
  });
});
