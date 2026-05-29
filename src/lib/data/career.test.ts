import { describe, expect, it } from "vitest";

import { projects, projectTypes } from "./career";

describe("career data", () => {
  it("has unique ids", () => {
    const ids = projects.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("uses only known project types", () => {
    for (const project of projects) {
      expect(projectTypes).toContain(project.projectType);
    }
  });

  it("uses YYYY-MM period format", () => {
    const pattern = /^\d{4}-\d{2}$/;
    for (const project of projects) {
      expect(project.period.start).toMatch(pattern);
      if (project.period.end) {
        expect(project.period.end).toMatch(pattern);
      }
    }
  });

  it("never ends before it starts", () => {
    for (const project of projects) {
      if (project.period.end) {
        expect(project.period.end >= project.period.start).toBe(true);
      }
    }
  });

  it("is ordered from newest to oldest by start date", () => {
    const starts = projects.map((p) => p.period.start);
    const sorted = [...starts].sort().reverse();
    expect(starts).toEqual(sorted);
  });

  it("does not leak anonymized customer names", () => {
    const banned = ["キヤノン", "Canon"];
    const blob = JSON.stringify(projects);
    for (const word of banned) {
      expect(blob).not.toContain(word);
    }
  });
});
