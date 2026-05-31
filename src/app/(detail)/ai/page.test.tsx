import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import AiHubPage from "./page";

describe("AiHubPage", () => {
  it("renders the heading", () => {
    render(<AiHubPage />);
    expect(screen.getByRole("heading", { level: 2, name: "AI 活用" })).toBeInTheDocument();
  });

  it("renders the upcoming topics", () => {
    render(<AiHubPage />);
    expect(screen.getByText("エコシステム全体像")).toBeInTheDocument();
    expect(screen.getByText("SNS 自動化パイプライン")).toBeInTheDocument();
  });
});
