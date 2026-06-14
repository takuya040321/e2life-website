import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";

import { JapaneseLineBreak } from "@/components/shared/japanese-line-break";

import { getSpecialistHarness, specialistHarnesses } from "@/lib/data/harness-topics";

const itemNumbers = ["01", "02", "03", "04", "05"] as const;

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
  return specialistHarnesses.map((harness) => ({ harness: harness.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ harness: string }>;
}): Promise<Metadata> {
  const { harness: slug } = await params;
  const harness = getSpecialistHarness(slug);
  if (!harness) return {};
  return {
    title: harness.title,
    description: harness.summary,
    alternates: { canonical: `/harness/${slug}` },
    openGraph: {
      title: harness.title,
      description: harness.summary,
      url: `/harness/${slug}`,
    },
  };
}

export default async function SpecialistHarnessPage({
  params,
}: {
  params: Promise<{ harness: string }>;
}) {
  const { harness: slug } = await params;
  const harness = getSpecialistHarness(slug);
  if (!harness) notFound();

  const isReady = harness.status === "ready";

  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <p className="text-muted-foreground mb-6 text-sm">
        <Link href="/harness" className="hover:text-accent transition-colors">
          ハーネス設計
        </Link>
        <span className="mx-2">/</span>
        <span>{harness.title}</span>
      </p>

      <div className="relative">
        <div
          className="border-gold/35 absolute -top-10 right-0 hidden size-32 rounded-full border md:block"
          aria-hidden="true"
        />
        <div className="flex items-center gap-3">
          <p className="text-muted-foreground font-mono text-sm">{harness.role}</p>
          {!isReady && (
            <Badge variant="outline" className="font-mono text-[10px]">
              準備中
            </Badge>
          )}
        </div>
        <h2 className="mt-2 font-serif text-3xl font-bold tracking-normal">
          <JapaneseLineBreak text={harness.title} />
        </h2>
        <div className="mt-6 max-w-2xl space-y-2">
          <JapaneseModernProse text={harness.overview} />
        </div>
      </div>

      {isReady ? (
        <div className="mt-20">
          <div className="border-accent/70 flex items-end justify-between gap-6 border-l pl-5">
            <div>
              <p className="text-accent font-mono text-xs font-bold tracking-[0.24em] uppercase">
                Items
              </p>
              <h3 className="mt-2 font-serif text-2xl font-bold tracking-normal">
                <JapaneseLineBreak text="このハーネスで意識していること" />
              </h3>
            </div>
            <div className="bg-accent hidden h-px flex-1 self-end sm:block" aria-hidden="true" />
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {harness.items.map((item, index) => (
              <Link
                key={item.slug}
                href={`/harness/${harness.slug}/${item.slug}`}
                className="border-border bg-card/70 hover:border-accent group relative overflow-hidden rounded-lg border p-6 shadow-sm transition-colors"
              >
                <span
                  className="border-accent/20 absolute top-5 right-5 size-20 rounded-full border"
                  aria-hidden="true"
                />
                <span className="text-accent font-mono text-sm leading-none font-bold tracking-[0.18em]">
                  {itemNumbers[index]}
                </span>
                <h4 className="mt-5 font-serif text-lg font-bold tracking-normal">
                  <JapaneseLineBreak text={item.title} />
                </h4>
                <p className="text-muted-foreground mt-3 text-sm leading-7">
                  <JapaneseLineBreak text={item.summary} />
                </p>
                <p className="text-accent mt-5 font-mono text-xs font-bold tracking-[0.16em]">
                  詳細を見る →
                </p>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="border-border bg-card/40 mt-16 rounded-lg border border-dashed p-8 text-center">
          <p className="text-muted-foreground text-sm leading-7">
            このハーネスの詳細は、現在準備中です。
          </p>
          <p className="text-muted-foreground mt-2 text-sm leading-7">
            まずはトップの全体構図と、秘書役ハーネスからご覧ください。
          </p>
        </div>
      )}

      <div className="mt-12">
        <Link href="/harness" className={buttonVariants({ variant: "outline" })}>
          ← ハーネス設計に戻る
        </Link>
      </div>
    </div>
  );
}
