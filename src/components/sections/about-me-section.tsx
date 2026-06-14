import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

import { SectionHeading } from "@/components/shared/section-heading";
import { JapaneseLineBreak } from "@/components/shared/japanese-line-break";

export function AboutMeSection() {
  return (
    <section className="py-24">
      <SectionHeading
        title="自分について"
        description="AI と一緒に開発プロセスを設計するエンジニアです。"
        align="left"
      />

      <div className="mt-12 grid gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="space-y-5">
          <p className="text-muted-foreground text-base leading-8">
            <JapaneseLineBreak text="メーカーの製品技術者として工程設計を経験したのち、2023 年にシステムエンジニアへ転身。製造業の現場で得た改善目線を、AI を組み込んだ開発設計に持ち込みました。" />
          </p>
          <p className="text-muted-foreground text-base leading-8">
            <JapaneseLineBreak text="いまは Claude Code を中核にしたマルチエージェント基盤を個人開発で構築しながら、外部案件にも展開しています。実装と仕組みの整合性を両方追う判断軸で動いています。" />
          </p>
          <div className="pt-2">
            <Link
              href="/about"
              className={buttonVariants({
                variant: "outline",
                size: "sm",
                className: "hover:border-accent hover:text-accent rounded-sm",
              })}
            >
              自分について詳しく →
            </Link>
          </div>
        </div>

        <div className="border-accent/40 bg-card/40 self-start rounded-lg border p-6">
          <p className="text-accent font-mono text-xs font-bold tracking-[0.22em] uppercase">
            Focus
          </p>
          <ul className="text-muted-foreground mt-4 space-y-3 text-sm leading-7">
            <li>・AI による開発プロセスの自走化</li>
            <li>・マルチエージェント構成の設計</li>
            <li>・判断と知見の記録基盤</li>
            <li>・独立レビューによる品質設計</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
