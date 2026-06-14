import { describe, expect, it } from "vitest";

import {
  getHarnessItem,
  getSpecialistHarness,
  orchestrationPrinciples,
  specialistHarnesses,
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

describe("specialistHarnesses", () => {
  it("has at least 4 harnesses with unique slugs", () => {
    expect(specialistHarnesses.length).toBeGreaterThanOrEqual(4);
    const slugs = specialistHarnesses.map((h) => h.slug);
    expect(new Set(slugs).size).toBe(specialistHarnesses.length);
  });

  it("each harness has required text fields", () => {
    for (const harness of specialistHarnesses) {
      expect(harness.title.length).toBeGreaterThan(0);
      expect(harness.summary.length).toBeGreaterThan(0);
      expect(harness.role.length).toBeGreaterThan(0);
      expect(harness.overview.length).toBeGreaterThan(0);
      expect(["ready", "preparing"]).toContain(harness.status);
    }
  });

  it("ready harnesses have at least 1 item; preparing harnesses have empty items", () => {
    for (const harness of specialistHarnesses) {
      if (harness.status === "ready") {
        expect(harness.items.length).toBeGreaterThanOrEqual(1);
        for (const item of harness.items) {
          expect(item.title.length).toBeGreaterThan(0);
          expect(item.summary.length).toBeGreaterThan(0);
          expect(item.overview.length).toBeGreaterThan(0);
          expect(item.points.length).toBeGreaterThanOrEqual(1);
        }
      } else {
        expect(harness.items.length).toBe(0);
      }
    }
  });

  it("includes the secretary harness as ready", () => {
    const secretary = getSpecialistHarness("secretary");
    expect(secretary?.status).toBe("ready");
    expect(secretary?.items.length).toBeGreaterThan(0);
  });

  it("each item has unique slug within its harness", () => {
    for (const harness of specialistHarnesses) {
      const slugs = harness.items.map((i) => i.slug);
      expect(new Set(slugs).size).toBe(slugs.length);
    }
  });
});

describe("getSpecialistHarness", () => {
  it("returns the matching harness or undefined", () => {
    expect(getSpecialistHarness("secretary")?.title).toBe("秘書役ハーネス");
    expect(getSpecialistHarness("unknown")).toBeUndefined();
  });
});

describe("getHarnessItem", () => {
  it("returns harness + item for valid slugs", () => {
    const result = getHarnessItem("secretary", "discussion-partner");
    expect(result?.harness.slug).toBe("secretary");
    expect(result?.item.slug).toBe("discussion-partner");
  });

  it("returns undefined for missing harness or item", () => {
    expect(getHarnessItem("unknown", "x")).toBeUndefined();
    expect(getHarnessItem("secretary", "unknown")).toBeUndefined();
  });
});
