import { describe, expect, it } from "vitest";

import { projects, projectTypes } from "./career";

describe("career data", () => {
  it("matches the master project list in newest-first order", () => {
    expect(projects).toHaveLength(11);
    expect(projects.map((project) => project.title)).toEqual([
      "個人サイト e2life.dev 構築",
      "社内マスタメンテナンス機能フルスタック開発",
      "Amazon 在庫管理・マルチプラットフォーム商品同期システム",
      "レビュー依頼自動送信バッチ",
      "P4 ソースコード変更量分析ツール",
      "音声認識作業支援システム",
      "Amazon・メルカリ売上データ自動転記・在庫管理システム",
      "品質管理検査ロットシステム（フロントエンド）",
      "市況データ自動収集システム",
      "管理表自動転記ツール",
      "新製品 UI 部分の立ち上げ（一部受託開発）",
    ]);
  });

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
