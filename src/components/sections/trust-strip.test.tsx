import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { TrustStrip } from "./trust-strip";

describe("TrustStrip", () => {
  it("renders the three trust figures with their labels", () => {
    render(<TrustStrip />);
    expect(screen.getByText("6")).toHaveClass("text-accent");
    expect(screen.getByText("Multi-Agent")).toHaveClass("text-accent");
    expect(screen.getByText("Central")).toHaveClass("text-accent");
    expect(screen.getByText("部門運営")).toBeInTheDocument();
    expect(screen.getByText("記録管理")).toBeInTheDocument();
  });
});
