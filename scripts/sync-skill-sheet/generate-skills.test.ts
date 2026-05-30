// @vitest-environment node
import { describe, expect, it } from "vitest";

import { formatTs } from "./emit";
import { buildSkills, renderSkillsFile } from "./generate-skills";
import { rowsToSkillRows } from "./parse";
import { SKILL_SHEET_ROWS } from "./__fixtures__/skill-sheet-rows";

const ir = rowsToSkillRows(SKILL_SHEET_ROWS);
const { skills, excluded } = buildSkills(ir);
const byId = (id: string) => skills.find((s) => s.id === id);

describe("buildSkills", () => {
  it("emits 38 sheet-derived skills + 1 manual overlay (Next.js)", () => {
    expect(skills).toHaveLength(39);
    expect(byId("nextjs")).toBeDefined();
  });

  it("excludes technologies without a registered logo", () => {
    for (const tech of ["VBA", "Tkinter", "MFC", "Perforce", "UML", "Amazon SP-API", "openpyxl"]) {
      expect(excluded).toContain(tech);
    }
    expect(skills.some((s) => s.name === "VBA")).toBe(false);
  });

  it("maps months / level / strong / note faithfully", () => {
    expect(byId("python")).toMatchObject({
      name: "Python",
      category: "language",
      businessMonths: 16,
      totalMonths: 22,
      level: "professional",
      projectCount: 4,
      isStrong: true,
      logoPath: "/logos/python.svg",
      note: "業務効率化ツール / EC 自動化",
    });
  });

  it("represents null months and omits optional fields", () => {
    // Copilot: 業務・トータルとも空 → null、isStrong/note の有無
    expect(byId("copilot")).toMatchObject({
      businessMonths: null,
      totalMonths: null,
      level: "work",
    });
    expect(byId("copilot")?.isStrong).toBeUndefined();
    // Tailwind CSS: note 空 → 省略
    expect(byId("tailwindcss")?.note).toBeUndefined();
  });

  it("places the manual overlay at the head of its category and keeps sheet order", () => {
    const framework = skills.filter((s) => s.category === "framework").map((s) => s.id);
    expect(framework[0]).toBe("nextjs");
    expect(framework.slice(1)).toEqual([
      "react",
      "vite",
      "aspnet-core",
      "mui",
      "tailwindcss",
      "google-apps-script",
      "playwright",
    ]);
  });

  it("orders categories by skillCategories declaration order", () => {
    const categories = [...new Set(skills.map((s) => s.category))];
    expect(categories).toEqual([
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
    ]);
  });
});

describe("renderSkillsFile", () => {
  it("produces Prettier-clean TypeScript and a stable snapshot", async () => {
    const raw = renderSkillsFile(skills);
    const formatted = await formatTs(raw, "src/lib/data/skills.ts");
    // 再整形しても変化しない（= format:check を必ず満たす）
    expect(await formatTs(formatted, "src/lib/data/skills.ts")).toBe(formatted);
    expect(formatted).toMatchSnapshot();
  });
});
