import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AboutMeSection } from "./about-me-section";

describe("AboutMeSection", () => {
  it("renders the section heading and the profile link", () => {
    render(<AboutMeSection />);
    expect(screen.getByRole("heading", { level: 2, name: "自分について" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /自分について詳しく/ })).toHaveAttribute(
      "href",
      "/about",
    );
  });

  it("renders the focus list", () => {
    render(<AboutMeSection />);
    expect(screen.getByText("Focus")).toBeInTheDocument();
    expect(screen.getByText(/AI による開発プロセスの自走化/)).toBeInTheDocument();
  });
});
