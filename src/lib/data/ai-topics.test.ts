import { describe, expect, it } from "vitest";

import { aiTopics, getAiTopic } from "./ai-topics";

describe("aiTopics", () => {
  it("has 12 topics with unique slugs", () => {
    expect(aiTopics).toHaveLength(12);
    const slugs = aiTopics.map((topic) => topic.slug);
    expect(new Set(slugs).size).toBe(12);
  });

  it("each topic has overview and at least 3 points", () => {
    for (const topic of aiTopics) {
      expect(topic.overview.length).toBeGreaterThan(0);
      expect(topic.summary.length).toBeGreaterThan(0);
      expect(topic.points.length).toBeGreaterThanOrEqual(3);
      for (const point of topic.points) {
        expect(point.heading.length).toBeGreaterThan(0);
        expect(point.body.length).toBeGreaterThan(0);
      }
    }
  });

  it("getAiTopic returns the matching topic or undefined", () => {
    expect(getAiTopic("sns")?.title).toBe("SNS 発信の自動化");
    expect(getAiTopic("unknown")).toBeUndefined();
  });
});
