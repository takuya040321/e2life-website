import { describe, expect, it } from "vitest";

import { formatMonths, skillCategories, skills } from "./skills";

describe("formatMonths", () => {
  it("returns a dash for null", () => {
    expect(formatMonths(null)).toBe("—");
  });

  it("formats month-only durations", () => {
    expect(formatMonths(4)).toBe("4 ヶ月");
    expect(formatMonths(11)).toBe("11 ヶ月");
  });

  it("formats exact-year durations without a month part", () => {
    expect(formatMonths(12)).toBe("1 年");
    expect(formatMonths(36)).toBe("3 年");
  });

  it("formats year-and-month durations", () => {
    expect(formatMonths(16)).toBe("1 年 4 ヶ月");
    expect(formatMonths(34)).toBe("2 年 10 ヶ月");
  });
});

describe("skills data", () => {
  it("has unique ids", () => {
    const ids = skills.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("uses only known categories", () => {
    for (const skill of skills) {
      expect(skillCategories).toContain(skill.category);
    }
  });

  it("never reports business experience exceeding total experience", () => {
    for (const skill of skills) {
      if (skill.businessMonths !== null && skill.totalMonths !== null) {
        expect(skill.businessMonths).toBeLessThanOrEqual(skill.totalMonths);
      }
    }
  });

  it("flags learning-level skills as having no business months", () => {
    for (const skill of skills) {
      if (skill.level === "learning") {
        expect(skill.businessMonths).toBeNull();
      }
    }
  });
});
