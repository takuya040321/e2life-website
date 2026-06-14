import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import HarnessHubPage from "./page";

describe("HarnessHubPage", () => {
  it("renders the hero with the catchphrase", () => {
    render(<HarnessHubPage />);
    expect(
      screen.getByRole("heading", { level: 2, name: "AI を、ひとつの組織のように経営する" }),
    ).toHaveClass("font-serif");
  });

  it("renders the Why section with before/after", () => {
    render(<HarnessHubPage />);
    expect(
      screen.getByRole("heading", { level: 2, name: "なぜ、組織のように束ねるのか" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Before")).toBeInTheDocument();
    expect(screen.getByText("After")).toBeInTheDocument();
  });

  it("renders the 3-step flow summary", () => {
    render(<HarnessHubPage />);
    expect(
      screen.getByRole("heading", { level: 2, name: "全体の流れは 3 ステップ" }),
    ).toBeInTheDocument();
    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByText("02")).toBeInTheDocument();
    expect(screen.getByText("03")).toBeInTheDocument();
  });

  it("renders the 5 principles with benefit lines", () => {
    render(<HarnessHubPage />);
    expect(
      screen.getByRole("heading", { level: 2, name: "わたしが大事にしている 5 つの考え方" }),
    ).toBeInTheDocument();
    expect(screen.getByText("入口はひとつ")).toBeInTheDocument();
    expect(screen.getByText(/考えることが減り/)).toBeInTheDocument();
  });

  it("shows the secretary harness prominently as ready", () => {
    render(<HarnessHubPage />);
    expect(screen.getByRole("link", { name: /秘書役ハーネス/ })).toBeInTheDocument();
    expect(screen.getByText("公開中")).toBeInTheDocument();
  });

  it("groups preparing harnesses in a separate Preparing block", () => {
    render(<HarnessHubPage />);
    expect(screen.getByText("Preparing")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: "準備中のハーネス" }),
    ).toBeInTheDocument();
  });
});
