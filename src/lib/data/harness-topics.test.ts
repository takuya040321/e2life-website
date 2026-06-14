import { describe, expect, it } from "vitest";

import {
  getHarnessRole,
  harnessRoles,
  orchestrationPrinciples,
} from "./harness-topics";

describe("orchestrationPrinciples", () => {
  it("has at least 3 principles, all with title and body", () => {
    expect(orchestrationPrinciples.length).toBeGreaterThanOrEqual(3);
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
      for (const principle of role.principles) {
        expect(principle.heading.length).toBeGreaterThan(0);
        expect(principle.body.length).toBeGreaterThan(0);
      }
    }
  });

  it("getHarnessRole returns the matching role or undefined", () => {
    expect(getHarnessRole("secretary")?.title).toBe("秘書役");
    expect(getHarnessRole("unknown")).toBeUndefined();
  });
});
