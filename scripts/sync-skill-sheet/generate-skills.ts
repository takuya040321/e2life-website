// IR（RawSkillRow[]）から skills.ts のソースを決定的に生成する純粋ロジック。
// ネットワーク非依存。ロゴ・id・カテゴリ・レベルはマップ参照で、未知の値は throw する。

import { existsSync } from "node:fs";
import { resolve } from "node:path";

import type { Skill } from "../../src/lib/data/skills";
import { skillCategories } from "../../src/lib/data/skills";

import { manualSkills } from "./manual-skills";
import { mapCategory, mapLevel } from "./mappers";
import { TECH_REGISTRY } from "./tech-registry";
import type { RawSkillRow } from "./types";

const LOGO_DIR = resolve(process.cwd(), "public/logos");

export type BuildResult = {
  skills: Skill[];
  /** レジストリ未登録のため掲載対象外にした技術名 */
  excluded: string[];
};

/** IR を Skill[] に変換する（掲載対象の絞り込み・マージ・安定ソート込み） */
export function buildSkills(rows: RawSkillRow[]): BuildResult {
  const fromSheet: Skill[] = [];
  const excluded: string[] = [];

  for (const row of rows) {
    const entry = TECH_REGISTRY[row.tech];
    if (!entry) {
      excluded.push(row.tech);
      continue;
    }
    if (!existsSync(resolve(LOGO_DIR, entry.logo))) {
      throw new Error(
        `ロゴファイルが存在しません: public/logos/${entry.logo}（技術: ${row.tech}）。` +
          `tech-registry.ts のマップが古いか、ロゴ未配置です。`,
      );
    }

    const skill: Skill = {
      id: entry.id,
      name: entry.name,
      category: mapCategory(row.category),
      businessMonths: row.businessMonths,
      totalMonths: row.totalMonths,
      level: mapLevel(row.level),
      projectCount: row.projectCount,
      logoPath: `/logos/${entry.logo}`,
    };
    if (row.strong) skill.isStrong = true;
    if (row.note) skill.note = row.note;
    fromSheet.push(skill);
  }

  // 手動オーバーレイを先頭に置いてからカテゴリ宣言順で安定ソート
  // → 各カテゴリ内で manual が先頭、その後はスプシの元行順を保つ。
  const merged = [...manualSkills, ...fromSheet];
  const categoryOrder = (c: Skill["category"]) => skillCategories.indexOf(c);
  const skills = merged
    .map((skill, index) => ({ skill, index }))
    .sort(
      (a, b) =>
        categoryOrder(a.skill.category) - categoryOrder(b.skill.category) || a.index - b.index,
    )
    .map(({ skill }) => skill);

  return { skills, excluded };
}

const FILE_HEADER = `// このファイルは scripts/sync-skill-sheet により大本スキルシート（スキルシート v1）から
// 自動生成される。手動で編集しても次回同期で上書きされる。
// 暫定エントリ（スプシ未反映）は scripts/sync-skill-sheet/manual-skills.ts で管理する。
// 経験期間は「業務経験（累計）」と「トータル（業務 + 個人開発）」の 2 軸を月数で保持する。

export const skillCategories = [
  "language",
  "framework",
  "database",
  "vcs",
  "cicd",
  "package",
  "devtool",
  "ide",
  "library",
  "ai",
] as const;

export type SkillCategory = (typeof skillCategories)[number];

export const skillCategoryLabels: Record<SkillCategory, string> = {
  language: "言語",
  framework: "フレームワーク・UI",
  database: "データベース",
  vcs: "バージョン管理",
  cicd: "CI・自動化",
  package: "パッケージ・ビルド",
  devtool: "開発支援",
  ide: "IDE",
  library: "ライブラリ・API",
  ai: "AI",
};

/** 大本スキルシートの 3 段階レベル評価 */
export type SkillLevel = "professional" | "work" | "learning";

export const skillLevelLabels: Record<SkillLevel, string> = {
  professional: "実務経験あり",
  work: "業務で使用",
  learning: "学習中・個人開発レベル",
};

export type Skill = {
  id: string;
  name: string;
  category: SkillCategory;
  /** 業務経験の累計月数。業務経験がない場合は null */
  businessMonths: number | null;
  /** 業務 + 個人開発のトータル月数。実績がない場合は null */
  totalMonths: number | null;
  level: SkillLevel;
  /** 業務での担当案件数 */
  projectCount: number;
  /** 特に得意な技術か（大本シートの「特に得意」○/◎） */
  isStrong?: boolean;
  /** public/logos 配下のロゴパス */
  logoPath: string;
  /** 用途・補足（大本シートの「備考」） */
  note?: string;
};

/** 月数を「○年○ヶ月」形式に整形する。null は「—」を返す */
export function formatMonths(months: number | null): string {
  if (months === null) return "—";
  const years = Math.floor(months / 12);
  const remainder = months % 12;
  if (years === 0) return \`\${remainder} ヶ月\`;
  if (remainder === 0) return \`\${years} 年\`;
  return \`\${years} 年 \${remainder} ヶ月\`;
}
`;

/** Skill 1 件をオブジェクトリテラル文字列に（整形は emit 側の Prettier に任せる） */
function renderSkill(skill: Skill): string {
  const lines = [
    "{",
    `id: ${JSON.stringify(skill.id)},`,
    `name: ${JSON.stringify(skill.name)},`,
    `category: ${JSON.stringify(skill.category)},`,
    `businessMonths: ${skill.businessMonths === null ? "null" : skill.businessMonths},`,
    `totalMonths: ${skill.totalMonths === null ? "null" : skill.totalMonths},`,
    `level: ${JSON.stringify(skill.level)},`,
    `projectCount: ${skill.projectCount},`,
  ];
  if (skill.isStrong) lines.push("isStrong: true,");
  lines.push(`logoPath: ${JSON.stringify(skill.logoPath)},`);
  if (skill.note) lines.push(`note: ${JSON.stringify(skill.note)},`);
  lines.push("},");
  return lines.join("\n");
}

/** Skill[] から skills.ts の完全なソース文字列を生成する（未整形。emit で Prettier 適用） */
export function renderSkillsFile(skills: Skill[]): string {
  const labels = SKILL_CATEGORY_LABELS;
  const body: string[] = [];
  let prevCategory: Skill["category"] | null = null;
  for (const skill of skills) {
    if (skill.category !== prevCategory) {
      body.push(`// ${labels[skill.category]}`);
      prevCategory = skill.category;
    }
    body.push(renderSkill(skill));
  }
  return `${FILE_HEADER}\nexport const skills: Skill[] = [\n${body.join("\n")}\n];\n`;
}

// 見出しコメント用ラベル（生成ヘッダと同一定義）
const SKILL_CATEGORY_LABELS: Record<Skill["category"], string> = {
  language: "言語",
  framework: "フレームワーク・UI",
  database: "データベース",
  vcs: "バージョン管理",
  cicd: "CI・自動化",
  package: "パッケージ・ビルド",
  devtool: "開発支援",
  ide: "IDE",
  library: "ライブラリ・API",
  ai: "AI",
};
