import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import HarnessRolePage from "./page";

describe("HarnessRolePage", () => {
  it("renders the secretary role with overview and principles in 01/02 form", async () => {
    const ui = await HarnessRolePage({
      params: Promise.resolve({ harness: "secretary" }),
    });
    render(ui);
    expect(screen.getByRole("heading", { level: 2, name: "秘書役" })).toHaveClass("font-serif");
    expect(screen.getByRole("heading", { level: 4, name: "何を任せているか" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 4, name: "この役割で意識していること" }),
    ).toBeInTheDocument();
    // 壱〜伍ではなく 01〜
    expect(screen.getByText("01")).toHaveClass("text-accent");
    expect(screen.getByText("02")).toHaveClass("text-accent");
    expect(screen.queryByText("壱")).not.toBeInTheDocument();
  });

  it("renders all 5 roles when each slug is requested", async () => {
    const slugs = ["secretary", "department", "implementation", "review", "record"] as const;
    for (const slug of slugs) {
      const ui = await HarnessRolePage({ params: Promise.resolve({ harness: slug }) });
      const { unmount } = render(ui);
      expect(
        screen.getByRole("heading", { level: 4, name: "この役割で意識していること" }),
      ).toBeInTheDocument();
      unmount();
    }
  });
});
