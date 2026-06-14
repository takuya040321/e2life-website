import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";

import { SectionHeading } from "@/components/shared/section-heading";
import { JapaneseLineBreak } from "@/components/shared/japanese-line-break";

type Case = {
  number: string;
  title: string;
  tag: string;
  summary: string;
  href?: string;
  ctaLabel?: string;
  emphasis?: boolean;
};

const cases: readonly Case[] = [
  {
    number: "01",
    title: "PA エコシステム",
    tag: "マルチリポ AI 基盤",
    summary:
      "個人の組織運営を AI エージェントで効率化。複数リポジトリを横断するマルチエージェント構成で、開発・運用・コンテンツ更新を自動化しています。",
    href: "/ai",
    ctaLabel: "詳細を見る",
    emphasis: true,
  },
  {
    number: "02",
    title: "ハーネス設計",
    tag: "設計思想",
    summary:
      "秘書役・部門担当・実装・レビュー・記録という役割別の専門ハーネスを束ねる、AI 経営の設計手法。窓口は秘書役 1 人だけに絞っています。",
    href: "/harness",
    ctaLabel: "設計を見る",
  },
  {
    number: "03",
    title: "コンテンツ自走パイプライン",
    tag: "SNS / note 自動化",
    summary:
      "ネタ選定から下書き作成、ブラウザ操作での反映までを一連の自走フローに。公開実行だけは人間が握る安全設計にしています。",
  },
  {
    number: "04",
    title: "サイト自走デプロイ",
    tag: "CI/CD × AI",
    summary:
      "このサイト自体、コード修正から本番反映までを AI が自走で進めています。レビューとビルド検証を必須ゲートとして組み込んでいます。",
  },
];

export function CaseStudySection() {
  return (
    <section className="py-20">
      <SectionHeading
        title="ケーススタディ"
        description="AI を活用した開発プロセス設計の実例"
        align="left"
      />
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {cases.map((entry) => (
          <article
            key={entry.number}
            className={`relative overflow-hidden rounded-lg border p-6 shadow-sm sm:p-7 ${
              entry.emphasis
                ? "border-accent/60 bg-card/80 border-2"
                : "border-border bg-card/70"
            }`}
          >
            <span
              className="border-accent/15 absolute top-5 right-5 size-16 rounded-full border"
              aria-hidden="true"
            />
            <div className="flex items-center gap-3">
              <span className="text-accent font-mono text-sm leading-none font-bold tracking-[0.18em]">
                {entry.number}
              </span>
              <Badge variant="outline" className="font-mono text-[10px]">
                {entry.tag}
              </Badge>
            </div>
            <h3 className="mt-4 font-serif text-lg font-bold tracking-normal">
              <JapaneseLineBreak text={entry.title} />
            </h3>
            <p className="text-muted-foreground mt-3 text-sm leading-7">
              <JapaneseLineBreak text={entry.summary} />
            </p>
            {entry.href && entry.ctaLabel && (
              <div className="mt-5">
                <Link
                  href={entry.href}
                  className={buttonVariants({
                    variant: "outline",
                    size: "sm",
                    className: "hover:border-accent hover:text-accent rounded-sm",
                  })}
                >
                  {entry.ctaLabel} →
                </Link>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
