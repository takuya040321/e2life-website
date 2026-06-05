import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { buttonVariants } from "@/components/ui/button";

import { JapaneseLineBreak } from "@/components/shared/japanese-line-break";

import { aiTopics, getAiTopic } from "@/lib/data/ai-topics";

const japaneseNumerals = ["壱", "弐", "参", "四"] as const;

function splitJapaneseSentences(text: string): string[] {
  const sentences = text
    .split("。")
    .flatMap((sentence, index, parts) => {
      const trimmed = sentence.trim();
      if (!trimmed) return [];

      const sentenceWithPunctuation = index === parts.length - 1 ? trimmed : `${trimmed}。`;
      if (sentenceWithPunctuation.length <= 48) return [sentenceWithPunctuation];

      return sentenceWithPunctuation
        .split("、")
        .map((clause, clauseIndex, clauses) => {
          const trimmedClause = clause.trim();
          if (!trimmedClause) return "";

          return clauseIndex === clauses.length - 1 ? trimmedClause : `${trimmedClause}、`;
        })
        .filter(Boolean);
    })
    .filter(Boolean);

  return sentences.length > 0 ? sentences : [text];
}

function JapaneseModernProse({ text }: { text: string }) {
  return (
    <>
      {splitJapaneseSentences(text).map((sentence, index) => (
        <p
          key={`${sentence}-${index}`}
          className="text-muted-foreground [font-family:system-ui,sans-serif] text-sm leading-7"
        >
          {sentence}
        </p>
      ))}
    </>
  );
}

export function generateStaticParams() {
  return aiTopics.map((topic) => ({ slug: topic.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const topic = getAiTopic(slug);
  if (!topic) return {};
  return {
    title: topic.title,
    description: topic.summary,
    alternates: { canonical: `/ai/${slug}` },
    openGraph: { title: topic.title, description: topic.summary, url: `/ai/${slug}` },
  };
}

export default async function AiTopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = getAiTopic(slug);
  if (!topic) notFound();

  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <div className="relative">
        <div
          className="border-gold/35 absolute -top-10 right-0 hidden size-32 rounded-full border md:block"
          aria-hidden="true"
        />
        <p className="text-muted-foreground mb-2 font-mono text-sm">{"// AI"}</p>
        <h2 className="font-serif text-3xl font-bold tracking-normal">
          <JapaneseLineBreak text={topic.title} />
        </h2>
        <div className="mt-6 max-w-xl space-y-2">
          <JapaneseModernProse text={topic.intro} />
        </div>
      </div>

      <div className="mt-20 grid gap-5">
        {topic.sections.map((section, index) => (
          <section
            key={section.heading}
            className="border-border bg-card/70 relative overflow-hidden rounded-lg border p-6 shadow-sm sm:p-8"
          >
            <span
              className="border-accent/15 absolute top-5 right-5 size-20 rounded-full border"
              aria-hidden="true"
            />
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-7">
              <span className="text-accent shrink-0 font-serif text-3xl leading-none font-bold">
                {japaneseNumerals[index]}
              </span>
              <div>
                <h2 className="font-serif text-xl leading-snug font-bold tracking-normal">
                  <JapaneseLineBreak text={section.heading} />
                </h2>
                <div className="mt-4 max-w-xl space-y-2">
                  <JapaneseModernProse text={section.body} />
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      <div className="mt-12">
        <Link href="/ai" className={buttonVariants({ variant: "outline" })}>
          ← AI 活用ハブに戻る
        </Link>
      </div>
    </div>
  );
}
