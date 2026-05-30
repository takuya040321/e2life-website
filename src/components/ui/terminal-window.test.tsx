import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { TerminalWindow } from "./terminal-window";

describe("TerminalWindow", () => {
  it("renders children", () => {
    render(<TerminalWindow>$ echo hello</TerminalWindow>);
    expect(screen.getByText("$ echo hello")).toBeInTheDocument();
  });

  it("renders title in the title bar when provided", () => {
    render(<TerminalWindow title="process.sh">body</TerminalWindow>);
    expect(screen.getByText("process.sh")).toBeInTheDocument();
  });

  it("does not render title text when not provided", () => {
    render(<TerminalWindow>body</TerminalWindow>);
    expect(screen.queryByText("process.sh")).not.toBeInTheDocument();
  });
});
