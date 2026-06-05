import type { Metadata } from "next";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

import { JapaneseLineBreak } from "@/components/shared/japanese-line-break";

import { aiTopics } from "@/lib/data/ai-topics";

const topicNumbers = ["01", "02", "03", "04", "05", "06"] as const;

export const metadata: Metadata = {
  title: "AI 活用",
  description: "AI で開発プロセス自体を設計する取り組みの概要",
  alternates: { canonical: "/ai" },
  openGraph: {
    title: "AI 活用",
    description: "AI で開発プロセス自体を設計する取り組みの概要",
    url: "/ai",
  },
};

export default function AiHubPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <div className="relative">
        <h2 className="font-serif text-3xl font-bold tracking-normal">
          <JapaneseLineBreak text="AI 活用" />
        </h2>
        <p className="text-muted-foreground mt-2">
          <JapaneseLineBreak text="AI で開発プロセス自体を設計する取り組みの概要です。" />
        </p>
      </div>

      <p className="text-muted-foreground mt-10 max-w-3xl text-base leading-8">
        <JapaneseLineBreak text="マルチエージェント構成による品質管理と、自己改善する開発プロセスを、複数リポジトリを横断するエコシステムとして構築・運用しています。各テーマの詳細は順次公開していきます。" />
      </p>

      <div className="mt-16">
        <div className="border-accent/70 flex items-end justify-between gap-6 border-l pl-5">
          <div>
            <p className="text-accent font-mono text-xs font-bold tracking-[0.24em] uppercase">
              AI Ecosystem
            </p>
            <h2 className="mt-2 font-serif text-2xl font-bold tracking-normal">
              <JapaneseLineBreak text="取り組みの構成" />
            </h2>
          </div>
          <div className="bg-accent hidden h-px flex-1 sm:block" aria-hidden="true" />
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {aiTopics.map((topic, index) => (
            <Link
              key={topic.slug}
              href={`/ai/${topic.slug}`}
              className="border-border bg-card/70 hover:border-accent group relative overflow-hidden rounded-lg border p-6 shadow-sm transition-colors"
            >
              <span
                className="border-accent/20 absolute top-5 right-5 size-20 rounded-full border"
                aria-hidden="true"
              />
              <span
                className="border-gold/25 absolute top-8 right-8 size-14 rounded-full border"
                aria-hidden="true"
              />
              <span className="text-accent font-mono text-sm leading-none font-bold tracking-[0.18em]">
                {topicNumbers[index]}
              </span>
              <h3 className="mt-5 font-serif text-lg font-bold tracking-normal">
                <JapaneseLineBreak text={topic.title} />
              </h3>
              <p className="text-muted-foreground mt-3 text-sm leading-7">
                <JapaneseLineBreak text={topic.summary} />
              </p>
              <p className="text-accent mt-5 font-mono text-xs font-bold tracking-[0.16em]">
                詳細を見る →
              </p>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-12 flex gap-4">
        <Link href="/contact" className={buttonVariants({ variant: "outline" })}>
          お問い合わせ
        </Link>
        <Link href="/skills" className={buttonVariants({ variant: "outline" })}>
          スキルを見る
        </Link>
      </div>
    </div>
  );
}
