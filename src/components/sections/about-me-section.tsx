import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

import { SectionHeading } from "@/components/shared/section-heading";
import { JapaneseLineBreak } from "@/components/shared/japanese-line-break";

export function AboutMeSection() {
  return (
    <section className="py-24">
      <SectionHeading
        title="わたしについて"
        description="AI と一緒に開発プロセスを設計するエンジニアです。"
        align="left"
      />

      <div className="mt-12 grid gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="space-y-5">
          <p className="text-muted-foreground text-base leading-8">
            <JapaneseLineBreak text="AI を「補助ツール」ではなく、ひとつの組織のメンバーとして位置づけ、開発プロセス全体を AI が自走して回せる形に再設計するエンジニアです。" />
          </p>
          <p className="text-muted-foreground text-base leading-8">
            <JapaneseLineBreak text="役割ごとに専門のエージェントを設計し、窓口・部門担当・実装・レビュー・記録という分業体制を作って動かしています。人間が握るのは、最終ゲートと重要判断だけ。" />
          </p>
          <p className="text-muted-foreground text-base leading-8">
            <JapaneseLineBreak text="個人で複数の領域を並行運営する中で得た知見を、そのまま設計に反映しています。" />
          </p>
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
          <div className="mt-6">
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
      </div>
    </section>
  );
}
