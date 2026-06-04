import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { GradientText } from "./gradient-text";

describe("GradientText", () => {
  it("renders children", () => {
    render(<GradientText>設計する</GradientText>);
    expect(screen.getByText("設計する")).toBeInTheDocument();
  });

  it("applies the accent utility class", () => {
    render(<GradientText>x</GradientText>);
    expect(screen.getByText("x")).toHaveClass("text-accent");
  });
});
