import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SectionHeading } from "./section-heading";

describe("SectionHeading", () => {
  it("renders title", () => {
    render(<SectionHeading title="テスト見出し" />);
    expect(screen.getByText("テスト見出し")).toBeInTheDocument();
  });

  it("renders description when provided", () => {
    render(<SectionHeading title="見出し" description="説明文" />);
    expect(screen.getByText("説明文")).toBeInTheDocument();
  });

  it("does not render description when not provided", () => {
    const { container } = render(<SectionHeading title="見出し" />);
    expect(container.querySelector("p")).toBeNull();
  });

  it("renders label without comment prefix when provided", () => {
    render(<SectionHeading title="見出し" label="強み" />);
    expect(screen.getByText("強み")).toBeInTheDocument();
    expect(screen.queryByText("// 強み")).not.toBeInTheDocument();
  });
});
