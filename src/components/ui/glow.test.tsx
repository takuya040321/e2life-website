import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Glow } from "./glow";

describe("Glow", () => {
  it("renders a decorative element hidden from assistive tech", () => {
    const { container } = render(<Glow />);
    expect(container.firstChild).toHaveAttribute("aria-hidden", "true");
  });

  it("uses the Japanese-modern accent glow", () => {
    const { container } = render(<Glow />);
    expect(container.firstChild).toHaveStyle({
      backgroundImage: "radial-gradient(circle, var(--accent), transparent 70%)",
    });
  });

  it("merges custom className", () => {
    const { container } = render(<Glow className="size-96" />);
    expect(container.firstChild).toHaveClass("size-96");
  });
});
