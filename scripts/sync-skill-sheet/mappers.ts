// スプシの日本語表記 → skills.ts の型値へのマッピング。
// いずれも未知の表記は throw する（サイレント誤変換を防ぐ）。

import type { SkillCategory, SkillLevel } from "../../src/lib/data/skills";

/** スプシ A 列のカテゴリ表記 → SkillCategory */
const CATEGORY_MAP: Record<string, SkillCategory> = {
  言語: "language",
  FW: "framework",
  DB: "database",
  バージョン管理: "vcs",
  "CI/CD・自動化": "cicd",
  "パッケージ・ビルド": "package",
  開発支援: "devtool",
  IDE: "ide",
  "ライブラリ・API": "library",
  "AI / LLM 活用": "ai",
};

/** スプシ E 列のレベル表記 → SkillLevel */
const LEVEL_MAP: Record<string, SkillLevel> = {
  実務経験あり: "professional",
  業務で使用: "work",
  "学習中・個人開発レベル": "learning",
};

export function mapCategory(raw: string): SkillCategory {
  const value = CATEGORY_MAP[raw];
  if (!value) {
    throw new Error(
      `未知のカテゴリ表記です: "${raw}"（mappers.ts の CATEGORY_MAP に追加してください）`,
    );
  }
  return value;
}

export function mapLevel(raw: string): SkillLevel {
  const value = LEVEL_MAP[raw];
  if (!value) {
    throw new Error(`未知のレベル表記です: "${raw}"（mappers.ts の LEVEL_MAP に追加してください）`);
  }
  return value;
}
