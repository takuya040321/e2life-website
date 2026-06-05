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

  it("renders business experience by default", () => {
    render(<SkillBadge skill={mockSkill} />);
    expect(screen.getByText("業務 1 年 4 ヶ月")).toBeInTheDocument();
    expect(screen.queryByText(/累計/)).toBeNull();
  });

  it("renders personal development experience when business months are null", () => {
    render(<SkillBadge skill={{ ...mockSkill, businessMonths: null, totalMonths: 10 }} />);
    expect(screen.getByText("個人開発のみ 10 ヶ月")).toBeInTheDocument();
  });

  it("hides experience months when both month values are null", () => {
    render(<SkillBadge skill={{ ...mockSkill, businessMonths: null, totalMonths: null }} />);
    expect(screen.queryByText(/業務|個人開発のみ|累計/)).toBeNull();
  });

  it("hides experience info when showYears is false", () => {
    render(<SkillBadge skill={mockSkill} showYears={false} />);
    expect(screen.queryByText(/業務|個人開発のみ|累計/)).toBeNull();
  });

  it("renders the logo image from logoPath", () => {
    render(<SkillBadge skill={mockSkill} />);
    expect(screen.getByAltText("Python")).toHaveAttribute("src", "/logos/python.svg");
  });
});
