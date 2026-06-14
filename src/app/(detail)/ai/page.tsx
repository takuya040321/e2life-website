import type { Metadata } from "next";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";

import { JapaneseLineBreak } from "@/components/shared/japanese-line-break";

import {
  aiTopicCategories,
  aiTopics,
  getAiTopicsByCategory,
} from "@/lib/data/ai-topics";

const glossary = [
  {
    term: "Claude Code",
    body: "Anthropic 製のターミナル型 AI コーディングエージェント。本サイトの中心。",
  },
  {
    term: "Codex CLI",
    body: "OpenAI 製の CLI 型エージェント。画像生成スキルの実体側として使用。",
  },
  {
    term: "スキル",
    body: "AI に手順や判断基準を渡すための再利用可能な定義(SKILL.md)。",
  },
  {
    term: "MCP",
    body: "Model Context Protocol。AI から外部サービス(Gmail / Sheets / 会計など)を操作する共通仕様。",
  },
] as const;

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

const slugToNumber = aiTopics.reduce<Record<string, string>>(
  (acc, topic, index) => {
    acc[topic.slug] = topicNumbers[index] ?? String(index + 1).padStart(2, "0");
    return acc;
  },
  {},
);

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

      {/* 用語ミニガイド */}
      <section className="mt-12">
        <p className="text-muted-foreground font-mono text-xs font-bold tracking-[0.22em] uppercase">
          Glossary
        </p>
        <h3 className="mt-2 font-serif text-base font-bold tracking-normal">
          <JapaneseLineBreak text="このページで出てくる用語" />
        </h3>
        <dl className="border-border bg-card/40 mt-4 grid gap-x-6 gap-y-3 rounded-lg border p-5 sm:grid-cols-2">
          {glossary.map((entry) => (
            <div key={entry.term} className="flex gap-3">
              <dt className="text-accent shrink-0 font-mono text-xs font-bold leading-6 tracking-wider">
                {entry.term}
              </dt>
              <dd className="text-muted-foreground text-xs leading-6">
                <JapaneseLineBreak text={entry.body} />
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* カテゴリ別に活用領域を表示 */}
      <section className="mt-20">
        <p className="text-accent font-mono text-xs font-bold tracking-[0.24em] uppercase">
          Domains
        </p>
        <h3 className="mt-3 font-serif text-2xl font-bold tracking-normal">
          <JapaneseLineBreak text="活用領域(カテゴリ別)" />
        </h3>
        <p className="text-muted-foreground mt-2 max-w-2xl text-sm leading-7">
          <JapaneseLineBreak text="それぞれの領域で、何をして、どんなツールで実現しているかをまとめています。" />
        </p>

        {aiTopicCategories.map((category) => {
          const topicsInCategory = getAiTopicsByCategory(category.id);
          return (
            <div key={category.id} className="mt-12">
              <div className="border-accent/40 border-l-2 pl-4">
                <h4 className="font-serif text-lg font-bold tracking-normal">
                  {category.id}
                </h4>
                <p className="text-muted-foreground mt-1 text-xs leading-6">
                  <JapaneseLineBreak text={category.description} />
                </p>
              </div>

              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {topicsInCategory.map((topic) => (
                  <Link
                    key={topic.slug}
                    href={`/ai/${topic.slug}`}
                    className="border-border bg-card/70 hover:border-accent hover:bg-card group relative overflow-hidden rounded-lg border p-6 shadow-sm transition-colors sm:p-7"
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
                    {topic.highlightTools && topic.highlightTools.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {topic.highlightTools.map((tool) => (
                          <Badge
                            key={tool}
                            variant="outline"
                            className="font-mono text-[10px] tracking-wider"
                          >
                            {tool}
                          </Badge>
                        ))}
                      </div>
                    )}
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
