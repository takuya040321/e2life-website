// スキルシート同期の設定。
// spreadsheet_id などの秘匿すべき値はリテラルで持たず、必ず環境変数から読む
// （public repo に露出させないため）。

/** Google Sheets API のシート名・レンジ */
export const SHEET_RANGES = {
  /** 「スキル一覧」シートのデータ範囲（ヘッダ行を除く） */
  skills: "スキル一覧!A2:I57",
} as const;

/** Sheets 読み取りスコープ（取得は読むだけなので readonly に絞る） */
export const SHEETS_READONLY_SCOPE = "https://www.googleapis.com/auth/spreadsheets.readonly";

/** スプレッドシート ID を環境変数から取得する。未設定なら fail-fast。 */
export function getSpreadsheetId(): string {
  const id = process.env.SKILL_SHEET_SPREADSHEET_ID;
  if (!id) {
    throw new Error(
      "環境変数 SKILL_SHEET_SPREADSHEET_ID が未設定です。.env.local もしくは Routine の環境変数に設定してください。",
    );
  }
  return id;
}
