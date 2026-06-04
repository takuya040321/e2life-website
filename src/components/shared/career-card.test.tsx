import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { CareerProject } from "@/lib/data/career";

import { CareerCard } from "./career-card";

const mockProject: CareerProject = {
  id: "project-001",
  period: { start: "2023-04", end: "2024-03" },
  projectType: "web-app",
  title: "EC サイトリニューアル",
  description: "既存サイトのリニューアル",
  teamSize: "10-15名",
  role: "フロントエンドリード",
  technologies: ["Next.js", "TypeScript"],
  highlights: ["表示速度改善"],
};

describe("CareerCard", () => {
  it("renders project title", () => {
    render(<CareerCard project={mockProject} />);
    expect(screen.getByText("EC サイトリニューアル")).toBeInTheDocument();
  });

  it("renders period", () => {
    render(<CareerCard project={mockProject} />);
    expect(screen.getByText(/2023-04/)).toBeInTheDocument();
    expect(screen.getByText(/2024-03/)).toBeInTheDocument();
  });

  it("renders technologies as badges", () => {
    render(<CareerCard project={mockProject} />);
    expect(screen.getByText("Next.js")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });

  it("renders ongoing project without end date", () => {
    const ongoing = { ...mockProject, period: { start: "2024-04" } };
    render(<CareerCard project={ongoing} />);
    expect(screen.getByText(/現在/)).toBeInTheDocument();
  });

  it("uses the Japanese-modern timeline marker and accent token", () => {
    const { container } = render(<CareerCard project={mockProject} />);

    const marker = container.querySelector('[aria-hidden="true"]');
    const renderedClasses = container.innerHTML;

    expect(marker).toHaveClass("bg-accent");
    expect(screen.getByText(/2023-04/)).toHaveClass("text-accent");
    expect(renderedClasses).toContain("hover:ring-accent");
    expect(renderedClasses).not.toContain("accent-from");
  });
});
