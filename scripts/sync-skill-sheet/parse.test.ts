// @vitest-environment node
import { describe, expect, it } from "vitest";

import { formatMonths } from "../../src/lib/data/skills";

import { parseCount, parseMonths, parseStrong, rowsToSkillRows } from "./parse";

describe("parseMonths", () => {
  it("parses bare month numbers", () => {
    expect(parseMonths("34")).toBe(34);
    expect(parseMonths("0")).toBe(0);
  });

  it("parses year-and-month notation", () => {
    expect(parseMonths("2 年 10 ヶ月")).toBe(34);
    expect(parseMonths("2年10ヶ月")).toBe(34);
    expect(parseMonths("1 年 4 ヶ月")).toBe(16);
  });

  it("parses year-only and month-only", () => {
    expect(parseMonths("3 年")).toBe(36);
    expect(parseMonths("11 ヶ月")).toBe(11);
  });

  it("normalizes full-width digits", () => {
    expect(parseMonths("１年２ヶ月")).toBe(14);
  });

  it("returns null for empty / dash", () => {
    expect(parseMonths("")).toBeNull();
    expect(parseMonths("-")).toBeNull();
    expect(parseMonths("—")).toBeNull();
    expect(parseMonths(undefined)).toBeNull();
  });

  it("throws on garbage", () => {
    expect(() => parseMonths("そのうち")).toThrow();
  });

  it("round-trips with formatMonths", () => {
    for (const m of [3, 7, 11, 14, 16, 22, 34, 36]) {
      expect(parseMonths(formatMonths(m))).toBe(m);
    }
  });
});

describe("parseCount", () => {
  it("parses numbers and treats empty/dash as 0", () => {
    expect(parseCount("4")).toBe(4);
    expect(parseCount("0")).toBe(0);
    expect(parseCount("")).toBe(0);
    expect(parseCount("-")).toBe(0);
  });

  it("throws on non-numeric", () => {
    expect(() => parseCount("たくさん")).toThrow();
  });
});

describe("parseStrong", () => {
  it("treats ○ and ◎ as strong", () => {
    expect(parseStrong("○")).toBe(true);
    expect(parseStrong("◎")).toBe(true);
    expect(parseStrong("")).toBe(false);
    expect(parseStrong("×")).toBe(false);
  });
});

describe("rowsToSkillRows", () => {
  it("skips rows with empty tech name", () => {
    const rows = [
      ["言語", "Python", "1 年", "1 年", "実務経験あり", "1", "○", "◎", "note"],
      ["", "", "", "", "", "", "", "", ""],
    ];
    const ir = rowsToSkillRows(rows);
    expect(ir).toHaveLength(1);
    expect(ir[0]).toMatchObject({
      tech: "Python",
      businessMonths: 12,
      totalMonths: 12,
      strong: true,
    });
  });
});
