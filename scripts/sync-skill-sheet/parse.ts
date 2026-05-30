// スプシのセル値（文字列）を IR へ変換する純粋関数群。
// すべて副作用なし・ネットワーク非依存。不正値はサイレントに握りつぶさず throw する。

import type { RawSkillRow } from "./types";

/** 全角数字→半角、連続空白の正規化、前後トリム */
export function normalizeCell(raw: string | undefined): string {
  return (raw ?? "")
    .replace(/[０-９]/g, (d) => String.fromCharCode(d.charCodeAt(0) - 0xfee0))
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * 期間表記を月数へ変換する。skills.ts の formatMonths の逆関数。
 * 例: "34" → 34、"2 年 10 ヶ月" → 34、"3 年" → 36、"11 ヶ月" → 11。
 * "" / "-" / "—" → null。解釈不能なら throw。
 */
export function parseMonths(raw: string | undefined): number | null {
  const s = normalizeCell(raw);
  if (s === "" || s === "-" || s === "—") return null;
  if (/^\d+$/.test(s)) return Number(s);

  const match = s.match(/^(?:(\d+)\s*年)?\s*(?:(\d+)\s*[ヶケか]?月)?$/);
  if (match && (match[1] || match[2])) {
    const years = match[1] ? Number(match[1]) : 0;
    const months = match[2] ? Number(match[2]) : 0;
    return years * 12 + months;
  }
  throw new Error(`parseMonths: 解釈できない期間表記です: "${raw}"`);
}

/** 「特に得意」列（○/◎ なら true） */
export function parseStrong(raw: string | undefined): boolean {
  const s = normalizeCell(raw);
  return s === "○" || s === "◎";
}

/** 「個人開発で使用」列（○ なら true） */
export function parsePersonalUse(raw: string | undefined): boolean {
  return normalizeCell(raw) === "○";
}

/** 業務案件数（空・"-" は 0、数値以外は throw） */
export function parseCount(raw: string | undefined): number {
  const s = normalizeCell(raw);
  if (s === "" || s === "-" || s === "—") return 0;
  if (/^\d+$/.test(s)) return Number(s);
  throw new Error(`parseCount: 不正な案件数です: "${raw}"`);
}

/** 「スキル一覧」の生 2 次元配列を IR 行配列へ変換する */
export function rowsToSkillRows(rows: string[][]): RawSkillRow[] {
  const result: RawSkillRow[] = [];
  for (const row of rows) {
    const tech = normalizeCell(row[1]);
    // 技術名が空の行（区切り行・小計行など）はスキップ
    if (tech === "") continue;
    result.push({
      category: normalizeCell(row[0]),
      tech,
      businessMonths: parseMonths(row[2]),
      totalMonths: parseMonths(row[3]),
      level: normalizeCell(row[4]),
      projectCount: parseCount(row[5]),
      personalUse: parsePersonalUse(row[6]),
      strong: parseStrong(row[7]),
      note: normalizeCell(row[8]),
    });
  }
  return result;
}
