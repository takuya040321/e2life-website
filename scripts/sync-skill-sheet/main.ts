// スキルシート同期のオーケストレーター。
//   pnpm sync:skill-sheet              … 取得 → 生成
//   pnpm sync:skill-sheet:fetch        … 取得のみ（.cache/raw.json 更新）
//   pnpm sync:skill-sheet:generate     … キャッシュから生成のみ（ネット不要）

import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

import { emitFile } from "./emit";
import { buildSkills, renderSkillsFile } from "./generate-skills";
import { rowsToSkillRows } from "./parse";

const CACHE_PATH = resolve(process.cwd(), "scripts/sync-skill-sheet/.cache/raw.json");
const SKILLS_TS = resolve(process.cwd(), "src/lib/data/skills.ts");

async function loadRows(mode: "fetch" | "cache"): Promise<string[][]> {
  if (mode === "cache") {
    if (!existsSync(CACHE_PATH)) {
      throw new Error(
        `キャッシュがありません: ${CACHE_PATH}。先に --fetch-only を実行してください。`,
      );
    }
    const cached = JSON.parse(await readFile(CACHE_PATH, "utf8")) as { rows: string[][] };
    return cached.rows;
  }
  // 取得は副作用ありの fetch.ts を動的 import（生成のみのときに googleapis を読み込まない）
  const { fetchSkillRows } = await import("./fetch");
  const rows = await fetchSkillRows();
  await mkdir(dirname(CACHE_PATH), { recursive: true });
  await writeFile(
    CACHE_PATH,
    JSON.stringify({ rows, fetchedAt: new Date().toISOString() }, null, 2),
    "utf8",
  );
  return rows;
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const fetchOnly = args.includes("--fetch-only");
  const generateOnly = args.includes("--generate-only");

  const rows = await loadRows(generateOnly ? "cache" : "fetch");
  if (fetchOnly) {
    console.log(`取得完了: ${rows.length} 行を .cache/raw.json に保存しました。`);
    return;
  }

  const ir = rowsToSkillRows(rows);
  const { skills, excluded } = buildSkills(ir);
  await emitFile(SKILLS_TS, renderSkillsFile(skills));

  console.log(`skills.ts を生成: ${skills.length} 件を掲載。`);
  if (excluded.length > 0) {
    console.warn(`掲載対象外（ロゴ未登録のため除外）: ${excluded.join(", ")}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
