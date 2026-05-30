// スキルシート同期の中間表現（IR）。
// 取得層（fetch）が生成し、生成層（generate）が消費する決定的な構造化データ。
// IR を挟むことで、生成層をネットワーク非依存でテスト・反復実行できる。

/** 「スキル一覧」シート 1 行ぶんのパース済み表現 */
export type RawSkillRow = {
  /** スプシ A 列: カテゴリ（日本語表記） */
  category: string;
  /** スプシ B 列: 技術名（レジストリ照合のキー） */
  tech: string;
  /** スプシ C 列: 業務経験（累計）月数。"-" 等は null */
  businessMonths: number | null;
  /** スプシ D 列: トータル（業務 + 個人）月数。空・"-" は null */
  totalMonths: number | null;
  /** スプシ E 列: レベル（日本語表記） */
  level: string;
  /** スプシ F 列: 業務案件数 */
  projectCount: number;
  /** スプシ G 列: 個人開発で使用（○/-） */
  personalUse: boolean;
  /** スプシ H 列: 特に得意（○/◎） */
  strong: boolean;
  /** スプシ I 列: 備考 */
  note: string;
};

/** スキルシート全体の中間表現 */
export type SkillSheetIR = {
  skills: RawSkillRow[];
  /** 取得時刻（IR にのみ保持し、生成物 .ts には含めない） */
  fetchedAt: string;
};
