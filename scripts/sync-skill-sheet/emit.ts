// 生成した TypeScript 文字列を Prettier でリポ設定どおりに整形する I/O 層。
// 整形を通すことで、生成物が常に format:check を満たす。

import { writeFile } from "node:fs/promises";

import prettier from "prettier";

/** リポの Prettier 設定で TypeScript を整形して返す（書き込みはしない） */
export async function formatTs(code: string, filepath: string): Promise<string> {
  const config = await prettier.resolveConfig(filepath);
  return prettier.format(code, { ...config, parser: "typescript", filepath });
}

/** 整形して指定パスへ書き込む */
export async function emitFile(filepath: string, code: string): Promise<string> {
  const formatted = await formatTs(code, filepath);
  await writeFile(filepath, formatted, "utf8");
  return formatted;
}
