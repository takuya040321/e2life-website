import type { MetadataRoute } from "next";

// サイトは直接リンク配布のみで運用し、検索エンジンにはインデックスさせない方針。
// 全クローラに対してクロールを禁止する（sitemap も意図的に公開しない）。
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: "/",
    },
  };
}
