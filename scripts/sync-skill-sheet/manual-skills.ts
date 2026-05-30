// 大本スキルシートに未反映の手動オーバーレイ。
// スプシ由来ではない暫定エントリをここで定義し、生成時にマージする。
//
// Next.js は当サイト構築で使用中だが、新しい実績のため大本スキルシートに未反映。
// スプシ側に反映されたらこのエントリを削除し、スプシ由来に一本化する。

import type { Skill } from "../../src/lib/data/skills";

export const manualSkills: Skill[] = [
  {
    id: "nextjs",
    name: "Next.js",
    category: "framework",
    businessMonths: null,
    totalMonths: 1,
    level: "learning",
    projectCount: 0,
    logoPath: "/logos/nextdotjs.svg",
    note: "当サイト構築（個人開発）",
  },
];
