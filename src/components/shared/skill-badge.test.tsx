import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import type { Skill } from "@/lib/data/skills";

import { SkillBadge } from "./skill-badge";

vi.mock("next/image", () => ({
  default: function MockImage(props: Record<string, unknown>) {
    const rest = { ...props };
    delete rest["onError"];
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...rest} />;
  },
}));

const mockSkill: Skill = {
  id: "python",
  name: "Python",
  category: "language",
  businessMonths: 16,
  totalMonths: 22,
  level: "professional",
  projectCount: 4,
  isStrong: true,
  logoPath: "/logos/python.svg",
};

describe("SkillBadge", () => {
  it("renders skill name", () => {
    render(<SkillBadge skill={mockSkill} />);
    expect(screen.getByText("Python")).toBeInTheDocument();
  });

  it("renders the level label and both experience spans by default", () => {
    render(<SkillBadge skill={mockSkill} />);
    expect(screen.getByText("実務経験あり")).toBeInTheDocument();
    expect(screen.getByText(/業務 1 年 4 ヶ月 \/ 累計 1 年 10 ヶ月/)).toBeInTheDocument();
  });

  it("marks skills flagged as strong", () => {
    render(<SkillBadge skill={mockSkill} />);
    expect(screen.getByLabelText("特に得意")).toBeInTheDocument();
  });

  it("renders a dash when months are null", () => {
    render(<SkillBadge skill={{ ...mockSkill, businessMonths: null, totalMonths: 10 }} />);
    expect(screen.getByText(/業務 — \/ 累計 10 ヶ月/)).toBeInTheDocument();
  });

  it("hides experience info when showYears is false", () => {
    render(<SkillBadge skill={mockSkill} showYears={false} />);
    expect(screen.queryByText("実務経験あり")).toBeNull();
  });

  it("renders the logo image from logoPath", () => {
    render(<SkillBadge skill={mockSkill} />);
    expect(screen.getByAltText("Python")).toHaveAttribute("src", "/logos/python.svg");
  });
});
