import { describe, expect, it } from "vitest";

import { getHarnessRole, harnessRoles, orchestrationPrinciples } from "./harness-topics";

describe("orchestrationPrinciples", () => {
  it("has 6 principles including 「最終決定はわたし」", () => {
    expect(orchestrationPrinciples.length).toBe(6);
    const titles = orchestrationPrinciples.map((p) => p.title);
    expect(titles).toContain("最終決定はわたし");
    for (const principle of orchestrationPrinciples) {
      expect(principle.title.length).toBeGreaterThan(0);
      expect(principle.body.length).toBeGreaterThan(0);
    }
  });
});

describe("harnessRoles", () => {
  it("has 5 roles with unique slugs", () => {
    expect(harnessRoles).toHaveLength(5);
    const slugs = harnessRoles.map((role) => role.slug);
    expect(new Set(slugs).size).toBe(5);
  });

  it("each role has summary, overview and at least 3 principles", () => {
    for (const role of harnessRoles) {
      expect(role.title.length).toBeGreaterThan(0);
      expect(role.role.length).toBeGreaterThan(0);
      expect(role.summary.length).toBeGreaterThan(0);
      expect(role.overview.length).toBeGreaterThan(0);
      expect(role.principles.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("department and implementation roles have contrastive role labels", () => {
    const department = getHarnessRole("department");
    const implementation = getHarnessRole("implementation");
    expect(department?.role).toBe("作る前の判断役");
    expect(implementation?.role).toBe("決まった方針を形にする役");
  });

  it("getHarnessRole returns the matching role or undefined", () => {
    expect(getHarnessRole("secretary")?.title).toBe("秘書役");
    expect(getHarnessRole("unknown")).toBeUndefined();
  });
});
