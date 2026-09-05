import type { Metadata } from "next";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

import { JapaneseLineBreak } from "@/components/shared/japanese-line-break";

import { aiTopicCategories, aiTopics, getAiTopicsByCategory } from "@/lib/data/ai-topics";

const topicNumbers = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
] as const;

const slugToNumber = aiTopics.reduce<Record<string, string>>((acc, topic, index) => {
  acc[topic.slug] = topicNumbers[index] ?? String(index + 1).padStart(2, "0");
  return acc;
}, {});

const categoryNumbers = ["01", "02", "03", "04"] as const;

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
          <JapaneseLineBreak text="SNS 発信・情報収集・コンテンツ生成・ナレッジ管理から、会計・メール・サイト運営・家計まで。AI を実際の開発・運用に組み込んでいる、わたしの取り組みをカテゴリ別に紹介します。" />
        </p>
      </section>

      {/* カテゴリ別に活用領域を表示 */}
      <section className="mt-16">
        <p className="text-accent font-mono text-xs font-bold tracking-[0.24em] uppercase">
          Domains
        </p>
        <h3 className="mt-3 font-serif text-2xl font-bold tracking-normal">
          <JapaneseLineBreak text="活用領域(カテゴリ別)" />
        </h3>
        <p className="text-muted-foreground mt-2 max-w-2xl text-sm leading-7">
          <JapaneseLineBreak text="それぞれの領域で、何をしていて何を意識しているかをまとめています。" />
        </p>

        {aiTopicCategories.map((category, categoryIndex) => {
          const topicsInCategory = getAiTopicsByCategory(category.id);
          return (
            <div key={category.id} className="mt-16">
              <div className="border-accent/30 flex flex-col gap-3 border-b pb-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
                <div className="flex items-baseline gap-3">
                  <span className="text-accent font-mono text-sm leading-none font-bold tracking-[0.2em]">
                    {categoryNumbers[categoryIndex]}
                  </span>
                  <h4 className="font-serif text-2xl font-bold tracking-normal">{category.id}</h4>
                </div>
                <p className="text-muted-foreground max-w-md text-xs leading-6 sm:text-right">
                  <JapaneseLineBreak text={category.description} />
                </p>
              </div>

              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {topicsInCategory.map((topic) => (
                  <Link
                    key={topic.slug}
                    href={`/ai/${topic.slug}`}
                    className="border-border bg-card/70 hover:border-accent hover:bg-card focus-visible:ring-accent focus-visible:ring-offset-background group relative overflow-hidden rounded-lg border p-6 shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none sm:p-7"
                  >
                    <span
                      className="border-accent/20 absolute top-5 right-5 size-20 rounded-full border"
                      aria-hidden="true"
                    />
                    <span className="text-accent font-mono text-sm leading-none font-bold tracking-[0.18em]">
                      {slugToNumber[topic.slug]}
                    </span>
                    <h5 className="mt-4 font-serif text-lg font-bold tracking-normal">
                      <JapaneseLineBreak text={topic.title} />
                    </h5>
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
          );
        })}
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
