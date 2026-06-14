import { describe, expect, it } from "vitest";

import { aiTopics, getAiTopic } from "./ai-topics";

describe("aiTopics", () => {
  it("has 12 topics with unique slugs", () => {
    expect(aiTopics).toHaveLength(12);
    const slugs = aiTopics.map((topic) => topic.slug);
    expect(new Set(slugs).size).toBe(12);
  });

  it("each topic has summary and overview", () => {
    for (const topic of aiTopics) {
      expect(topic.summary.length).toBeGreaterThan(0);
      expect(topic.overview.length).toBeGreaterThan(0);
    }
  });

  it("sns topic has a fully-written howSteps with concrete tool names", () => {
    const sns = getAiTopic("sns");
    expect(sns?.howSteps?.length).toBeGreaterThanOrEqual(5);
    const flatTools = sns?.howSteps?.flatMap((step) => step.tools ?? []) ?? [];
    expect(flatTools).toContain("macOS launchd");
  });

  it("getAiTopic returns the matching topic or undefined", () => {
    expect(getAiTopic("sns")?.title).toBe("SNS 発信の自動化");
    expect(getAiTopic("unknown")).toBeUndefined();
  });
});
