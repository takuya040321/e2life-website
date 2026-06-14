import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ProblemSolutionSection } from "./problem-solution-section";

describe("ProblemSolutionSection", () => {
  it("renders the heading and before/after columns", () => {
    render(<ProblemSolutionSection />);
    expect(
      screen.getByRole("heading", { level: 2, name: "なぜ、AI を組織のように束ねるのか" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Before")).toBeInTheDocument();
    expect(screen.getByText("After")).toBeInTheDocument();
  });
});
