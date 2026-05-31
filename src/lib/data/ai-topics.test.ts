import { describe, expect, it } from "vitest";

import { aiTopics, getAiTopic } from "./ai-topics";

describe("aiTopics", () => {
  it("has 6 topics with unique slugs", () => {
    expect(aiTopics).toHaveLength(6);
    const slugs = aiTopics.map((topic) => topic.slug);
    expect(new Set(slugs).size).toBe(6);
  });

  it("each topic has intro and at least 3 sections", () => {
    for (const topic of aiTopics) {
      expect(topic.intro.length).toBeGreaterThan(0);
      expect(topic.summary.length).toBeGreaterThan(0);
      expect(topic.sections.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("getAiTopic returns the matching topic or undefined", () => {
    expect(getAiTopic("ecosystem")?.title).toBe("エコシステム全体像");
    expect(getAiTopic("unknown")).toBeUndefined();
  });
});
