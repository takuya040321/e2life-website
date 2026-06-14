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
            <JapaneseLineBreak text="2023 年に SE 業界へ入り、Microsoft 365 Copilot を業務に組み込むところから AI ネイティブな開発スタイルでキャリアを始めました。" />
          </p>
          <p className="text-muted-foreground text-base leading-8">
            <JapaneseLineBreak text="その後、Claude Code を中核にしたマルチエージェント基盤を個人開発で構築。判断・実装・レビュー・記録を役割ごとに分けて回す仕組みを設計し、自分自身の事業運営で検証してきました。" />
          </p>
          <p className="text-muted-foreground text-base leading-8">
            <JapaneseLineBreak text="いまは、設計思想と具体実装の両方を継続改善しながら、外部案件にも展開しています。" />
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
              プロフィール詳細 →
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
