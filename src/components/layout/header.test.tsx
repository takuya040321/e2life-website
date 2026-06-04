import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Header } from "./header";

vi.mock("next/image", () => ({
  default: function MockImage(props: Record<string, unknown>) {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

describe("Header", () => {
  it("renders the site logo link and decorative hanko image", () => {
    render(<Header />);

    expect(screen.getByRole("link", { name: /e2life.dev/ })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: /e2life.dev/ }).querySelector("img")).toHaveAttribute(
      "src",
      "/illustrations/hanko-e2life.png",
    );
  });
});
