// 取得層: Service Account 認証で Google Sheets を読み取る唯一の I/O。
// SA 鍵は環境変数から読む（ファイルにコミットしない）。読み取り専用スコープに絞る。

import { readFileSync } from "node:fs";

import { google } from "googleapis";

import { SHEET_RANGES, SHEETS_READONLY_SCOPE, getSpreadsheetId } from "./config";

type ServiceAccountCredentials = {
  client_email: string;
  private_key: string;
  [key: string]: unknown;
};

/** SA 鍵を env から読む。JSON 文字列（Routine 用）優先、ファイルパス（ローカル用）にフォールバック。 */
function loadCredentials(): ServiceAccountCredentials {
  const json = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (json) return JSON.parse(json) as ServiceAccountCredentials;

  const file = process.env.GOOGLE_SERVICE_ACCOUNT_FILE;
  if (file) return JSON.parse(readFileSync(file, "utf8")) as ServiceAccountCredentials;

  throw new Error(
    "SA 認証情報がありません。GOOGLE_SERVICE_ACCOUNT_JSON（JSON 文字列）または " +
      "GOOGLE_SERVICE_ACCOUNT_FILE（鍵ファイルパス）を設定してください。",
  );
}

/** 「スキル一覧」シートの生 2 次元配列を取得する */
export async function fetchSkillRows(): Promise<string[][]> {
  const credentials = loadCredentials();
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: [SHEETS_READONLY_SCOPE],
  });
  const sheets = google.sheets({ version: "v4", auth });
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: getSpreadsheetId(),
    range: SHEET_RANGES.skills,
  });
  return (res.data.values ?? []) as string[][];
}
