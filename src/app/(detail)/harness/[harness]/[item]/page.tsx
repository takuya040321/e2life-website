import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { buttonVariants } from "@/components/ui/button";

import { JapaneseLineBreak } from "@/components/shared/japanese-line-break";

import { getHarnessItem, specialistHarnesses } from "@/lib/data/harness-topics";

const japaneseNumerals = ["壱", "弐", "参", "四", "伍"] as const;

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
  return specialistHarnesses.flatMap((harness) =>
    harness.items.map((item) => ({ harness: harness.slug, item: item.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ harness: string; item: string }>;
}): Promise<Metadata> {
  const { harness: harnessSlug, item: itemSlug } = await params;
  const result = getHarnessItem(harnessSlug, itemSlug);
  if (!result) return {};
  const { harness, item } = result;
  return {
    title: `${item.title} | ${harness.title}`,
    description: item.summary,
    alternates: { canonical: `/harness/${harness.slug}/${item.slug}` },
    openGraph: {
      title: `${item.title} | ${harness.title}`,
      description: item.summary,
      url: `/harness/${harness.slug}/${item.slug}`,
    },
  };
}

export default async function HarnessItemPage({
  params,
}: {
  params: Promise<{ harness: string; item: string }>;
}) {
  const { harness: harnessSlug, item: itemSlug } = await params;
  const result = getHarnessItem(harnessSlug, itemSlug);
  if (!result) notFound();
  const { harness, item } = result;

  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <p className="text-muted-foreground mb-6 text-sm">
        <Link href="/harness" className="hover:text-accent transition-colors">
          ハーネス設計
        </Link>
        <span className="mx-2">/</span>
        <Link href={`/harness/${harness.slug}`} className="hover:text-accent transition-colors">
          {harness.title}
        </Link>
        <span className="mx-2">/</span>
        <span>{item.title}</span>
      </p>

      <div className="relative">
        <div
          className="border-gold/35 absolute -top-10 right-0 hidden size-32 rounded-full border md:block"
          aria-hidden="true"
        />
        <p className="text-muted-foreground mb-2 font-mono text-sm">{harness.title}</p>
        <h2 className="font-serif text-3xl font-bold tracking-normal">
          <JapaneseLineBreak text={item.title} />
        </h2>
      </div>

      <section className="mt-12">
        <h3 className="text-accent font-mono text-xs font-bold tracking-[0.24em] uppercase">
          Overview
        </h3>
        <h4 className="mt-2 font-serif text-xl font-bold tracking-normal">
          <JapaneseLineBreak text="どんな取り組みか" />
        </h4>
        <div className="mt-4 max-w-2xl space-y-2">
          <JapaneseModernProse text={item.overview} />
        </div>
      </section>

      <section className="mt-16">
        <h3 className="text-accent font-mono text-xs font-bold tracking-[0.24em] uppercase">
          Points
        </h3>
        <h4 className="mt-2 font-serif text-xl font-bold tracking-normal">
          <JapaneseLineBreak text="意識していること" />
        </h4>

        <div className="mt-6 grid gap-5">
          {item.points.map((point, index) => (
            <section
              key={point.heading}
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
                  <h5 className="font-serif text-lg leading-snug font-bold tracking-normal">
                    <JapaneseLineBreak text={point.heading} />
                  </h5>
                  <div className="mt-4 max-w-2xl space-y-2">
                    <JapaneseModernProse text={point.body} />
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>
      </section>

      {item.links && item.links.length > 0 && (
        <section className="mt-16">
          <h3 className="text-accent font-mono text-xs font-bold tracking-[0.24em] uppercase">
            Related
          </h3>
          <h4 className="mt-2 font-serif text-xl font-bold tracking-normal">
            <JapaneseLineBreak text="関連するハーネス" />
          </h4>
          <ul className="mt-4 space-y-3">
            {item.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-accent hover:text-accent/80 inline-block text-sm leading-7 underline underline-offset-4 transition-colors"
                >
                  <JapaneseLineBreak text={link.label} />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="mt-12 flex gap-4">
        <Link
          href={`/harness/${harness.slug}`}
          className={buttonVariants({ variant: "outline" })}
        >
          ← {harness.title} に戻る
        </Link>
        <Link href="/harness" className={buttonVariants({ variant: "outline" })}>
          ハーネス設計トップへ
        </Link>
      </div>
    </div>
  );
}
