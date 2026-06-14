import type { Metadata } from "next";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

import { JapaneseLineBreak } from "@/components/shared/japanese-line-break";

import { aiTopics } from "@/lib/data/ai-topics";

const topicNumbers = ["01", "02", "03", "04"] as const;

export const metadata: Metadata = {
  title: "AI活用事例",
  description:
    "SNS 発信・情報収集・コンテンツ生成・ナレッジ管理。AI を実際の開発・運用に組み込んでいる、わたしの活用事例。",
  alternates: { canonical: "/ai" },
  openGraph: {
    title: "AI活用事例",
    description:
      "SNS 発信・情報収集・コンテンツ生成・ナレッジ管理。AI を実際の開発・運用に組み込んでいる、わたしの活用事例。",
    url: "/ai",
  },
};

export default function AiHubPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      {/* Hero */}
      <section className="relative">
        <p className="text-accent font-mono text-xs font-bold tracking-[0.24em] uppercase">
          AI in practice
        </p>
        <h2 className="mt-3 font-serif text-3xl font-bold tracking-normal sm:text-4xl">
          <JapaneseLineBreak text="わたしの AI 活用事例" />
        </h2>
        <p className="text-muted-foreground mt-5 max-w-2xl text-base leading-8">
          <JapaneseLineBreak text="SNS 発信・情報収集・コンテンツ生成・ナレッジ管理。AI を実際の開発・運用に組み込んでいる、わたしの取り組みを領域別に紹介します。" />
        </p>
      </section>

      {/* Why */}
      <section className="mt-16">
        <p className="text-accent font-mono text-xs font-bold tracking-[0.24em] uppercase">
          Why
        </p>
        <h3 className="mt-3 font-serif text-2xl font-bold tracking-normal">
          <JapaneseLineBreak text="なぜ自動化に振り切るのか" />
        </h3>
        <p className="text-muted-foreground mt-4 max-w-3xl text-base leading-8">
          <JapaneseLineBreak text="手作業で続けるかぎり、忙しさで途切れます。判断基準を仕組みに埋め込んで AI に走らせれば、意志の力に頼らなくても継続でき、品質も安定します。わたしは、この発想で各領域を組み立てています。" />
        </p>
      </section>

      {/* 領域別カード */}
      <section className="mt-20">
        <p className="text-accent font-mono text-xs font-bold tracking-[0.24em] uppercase">
          Domains
        </p>
        <h3 className="mt-3 font-serif text-2xl font-bold tracking-normal">
          <JapaneseLineBreak text="4 つの活用領域" />
        </h3>
        <p className="text-muted-foreground mt-2 max-w-2xl text-sm leading-7">
          <JapaneseLineBreak text="それぞれの領域で、何をして、何を意識しているかをまとめています。" />
        </p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-2">
          {aiTopics.map((topic, index) => (
            <Link
              key={topic.slug}
              href={`/ai/${topic.slug}`}
              className="border-border bg-card/70 hover:border-accent hover:bg-card group relative overflow-hidden rounded-lg border p-6 shadow-sm transition-colors sm:p-7"
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
              <h4 className="mt-4 font-serif text-lg font-bold tracking-normal">
                <JapaneseLineBreak text={topic.title} />
              </h4>
              <p className="text-muted-foreground mt-3 text-sm leading-7">
                <JapaneseLineBreak text={topic.summary} />
              </p>
              <p className="text-accent mt-5 font-mono text-xs font-bold tracking-[0.16em]">
                詳細を見る →
              </p>
            </Link>
          ))}
        </div>
      </section>

      <div className="mt-16 flex flex-wrap gap-4">
        <Link href="/contact" className={buttonVariants({ variant: "outline" })}>
          お問い合わせ
        </Link>
        <Link href="/harness" className={buttonVariants({ variant: "outline" })}>
          ハーネス設計を見る
        </Link>
      </div>
    </div>
  );
}
