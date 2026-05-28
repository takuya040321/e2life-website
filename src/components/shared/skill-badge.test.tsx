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
  id: "typescript",
  name: "TypeScript",
  category: "language",
  yearsOfExperience: 5,
  logoPath: "/logos/typescript.svg",
};

describe("SkillBadge", () => {
  it("renders skill name", () => {
    render(<SkillBadge skill={mockSkill} />);
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });

  it("renders experience years by default", () => {
    render(<SkillBadge skill={mockSkill} />);
    expect(screen.getByText(/5年/)).toBeInTheDocument();
  });

  it("hides years when showYears is false", () => {
    render(<SkillBadge skill={mockSkill} showYears={false} />);
    expect(screen.queryByText(/年/)).toBeNull();
  });
});
