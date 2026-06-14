import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ExploreSection } from "./explore-section";

describe("ExploreSection", () => {
  it("renders three navigation cards to /ai, /harness, /about", () => {
    render(<ExploreSection />);
    expect(screen.getByRole("link", { name: /AI活用事例/ })).toHaveAttribute("href", "/ai");
    expect(screen.getByRole("link", { name: /ハーネス設計/ })).toHaveAttribute("href", "/harness");
    expect(screen.getByRole("link", { name: /自分について/ })).toHaveAttribute("href", "/about");
  });
});
