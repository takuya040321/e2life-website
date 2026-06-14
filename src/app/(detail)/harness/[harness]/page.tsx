import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { buttonVariants } from "@/components/ui/button";

import { JapaneseLineBreak } from "@/components/shared/japanese-line-break";

import { getHarnessRole, harnessRoles } from "@/lib/data/harness-topics";

const principleNumbers = ["01", "02", "03", "04", "05"] as const;

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
  return harnessRoles.map((role) => ({ harness: role.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ harness: string }>;
}): Promise<Metadata> {
  const { harness: slug } = await params;
  const role = getHarnessRole(slug);
  if (!role) return {};
  return {
    title: `${role.title} | ハーネス設計`,
    description: role.summary,
    alternates: { canonical: `/harness/${slug}` },
    openGraph: {
      title: `${role.title} | ハーネス設計`,
      description: role.summary,
      url: `/harness/${slug}`,
    },
  };
}

export default async function HarnessRolePage({
  params,
}: {
  params: Promise<{ harness: string }>;
}) {
  const { harness: slug } = await params;
  const role = getHarnessRole(slug);
  if (!role) notFound();

  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <p className="text-muted-foreground mb-6 text-sm">
        <Link href="/harness" className="hover:text-accent transition-colors">
          ハーネス設計
        </Link>
        <span className="mx-2">/</span>
        <span>{role.title}</span>
      </p>

      <div className="relative">
        <div
          className="border-gold/35 absolute -top-10 right-0 hidden size-32 rounded-full border md:block"
          aria-hidden="true"
        />
        <p className="text-muted-foreground mb-2 font-mono text-sm">{role.role}</p>
        <h2 className="font-serif text-3xl font-bold tracking-normal">
          <JapaneseLineBreak text={role.title} />
        </h2>
      </div>

      <section className="mt-12">
        <h3 className="text-accent font-mono text-xs font-bold tracking-[0.24em] uppercase">
          Overview
        </h3>
        <h4 className="mt-2 font-serif text-xl font-bold tracking-normal">
          <JapaneseLineBreak text="何を任せているか" />
        </h4>
        <div className="mt-4 max-w-2xl space-y-2">
          <JapaneseModernProse text={role.overview} />
        </div>
      </section>

      <section className="mt-16">
        <h3 className="text-accent font-mono text-xs font-bold tracking-[0.24em] uppercase">
          Principles
        </h3>
        <h4 className="mt-2 font-serif text-xl font-bold tracking-normal">
          <JapaneseLineBreak text="この役割で意識していること" />
        </h4>

        <div className="mt-6 grid gap-5">
          {role.principles.map((principle, index) => (
            <section
              key={principle.heading}
              className="border-border bg-card/70 relative overflow-hidden rounded-lg border p-6 shadow-sm sm:p-8"
            >
              <span
                className="border-accent/15 absolute top-5 right-5 size-20 rounded-full border"
                aria-hidden="true"
              />
              <div className="flex flex-col gap-4 sm:flex-row sm:gap-7">
                <span className="text-accent shrink-0 font-mono text-3xl leading-none font-bold tracking-tight">
                  {principleNumbers[index]}
                </span>
                <div>
                  <h5 className="font-serif text-lg leading-snug font-bold tracking-normal">
                    <JapaneseLineBreak text={principle.heading} />
                  </h5>
                  <div className="mt-4 max-w-2xl space-y-2">
                    <JapaneseModernProse text={principle.body} />
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>
      </section>

      <div className="mt-12 flex flex-wrap gap-4">
        <Link href="/harness" className={buttonVariants({ variant: "outline" })}>
          ← ハーネス設計に戻る
        </Link>
        <Link href="/ai" className={buttonVariants({ variant: "outline" })}>
          AI活用事例を見る
        </Link>
      </div>
    </div>
  );
}
