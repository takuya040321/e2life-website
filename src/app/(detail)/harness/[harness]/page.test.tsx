import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import HarnessRolePage from "./page";

describe("HarnessRolePage", () => {
  it("renders the secretary role with overview and principles", async () => {
    const ui = await HarnessRolePage({
      params: Promise.resolve({ harness: "secretary" }),
    });
    render(ui);
    expect(screen.getByRole("heading", { level: 2, name: "秘書役" })).toHaveClass("font-serif");
    expect(
      screen.getByRole("heading", { level: 4, name: "どんなメンバーか" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 4, name: "この役割で意識していること" }),
    ).toBeInTheDocument();
    expect(screen.getByText("壱")).toHaveClass("text-accent");
    expect(screen.getByText("弐")).toHaveClass("text-accent");
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
