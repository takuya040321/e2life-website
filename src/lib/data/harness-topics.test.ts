import { describe, expect, it } from "vitest";

import { getHarnessTopic, harnessTopics } from "./harness-topics";

describe("harnessTopics", () => {
  it("has 5 topics with unique slugs", () => {
    expect(harnessTopics).toHaveLength(5);
    const slugs = harnessTopics.map((topic) => topic.slug);
    expect(new Set(slugs).size).toBe(5);
  });

  it("each topic has intro and at least 3 sections", () => {
    for (const topic of harnessTopics) {
      expect(topic.intro.length).toBeGreaterThan(0);
      expect(topic.summary.length).toBeGreaterThan(0);
      expect(topic.sections.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("getHarnessTopic returns the matching topic or undefined", () => {
    expect(getHarnessTopic("ecosystem")?.title).toBe("エコシステム全体像");
    expect(getHarnessTopic("unknown")).toBeUndefined();
  });
});
