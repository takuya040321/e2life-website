import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import SpecialistHarnessPage from "./page";

describe("SpecialistHarnessPage", () => {
  it("renders the secretary harness with its items", async () => {
    const ui = await SpecialistHarnessPage({
      params: Promise.resolve({ harness: "secretary" }),
    });
    render(ui);
    expect(screen.getByRole("heading", { level: 2, name: "秘書役ハーネス" })).toHaveClass(
      "font-serif",
    );
    expect(
      screen.getByRole("heading", { level: 3, name: "このハーネスでわたしが意識していること" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /議論パートナーになる/ })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /司令塔として束ねる/ })).toBeInTheDocument();
  });

  it("renders a preparing notice for harnesses without items", async () => {
    const ui = await SpecialistHarnessPage({
      params: Promise.resolve({ harness: "department" }),
    });
    render(ui);
    expect(screen.getByText("準備中")).toBeInTheDocument();
    expect(
      screen.getByText(/このハーネスの詳細は、現在準備中です。/),
    ).toBeInTheDocument();
  });
});
