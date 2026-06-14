import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import HarnessItemPage from "./page";

describe("HarnessItemPage", () => {
  it("renders the item title, overview and points", async () => {
    const ui = await HarnessItemPage({
      params: Promise.resolve({ harness: "secretary", item: "discussion-partner" }),
    });
    render(ui);
    expect(
      screen.getByRole("heading", { level: 2, name: "議論パートナーになる" }),
    ).toHaveClass("font-serif");
    expect(
      screen.getByRole("heading", { level: 4, name: "どんな取り組みをしているか" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 4, name: "わたしが意識していること" }),
    ).toBeInTheDocument();
  });

  it("renders point cards with japanese numerals", async () => {
    const ui = await HarnessItemPage({
      params: Promise.resolve({ harness: "secretary", item: "discussion-partner" }),
    });
    render(ui);
    expect(screen.getByText("壱")).toHaveClass("text-accent");
    expect(screen.getByText("弐")).toHaveClass("text-accent");
  });

  it("renders related links when present", async () => {
    const ui = await HarnessItemPage({
      params: Promise.resolve({ harness: "secretary", item: "discussion-partner" }),
    });
    render(ui);
    expect(
      screen.getByRole("heading", { level: 4, name: "関連するハーネス" }),
    ).toBeInTheDocument();
  });
});
