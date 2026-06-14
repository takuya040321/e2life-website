import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";

import { JapaneseLineBreak } from "@/components/shared/japanese-line-break";

import { aiTopics, getAiTopic } from "@/lib/data/ai-topics";

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
    title: `${topic.title} | AI活用事例`,
    description: topic.summary,
    alternates: { canonical: `/ai/${slug}` },
    openGraph: {
      title: `${topic.title} | AI活用事例`,
      description: topic.summary,
      url: `/ai/${slug}`,
    },
  };
}

export default async function AiTopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = getAiTopic(slug);
  if (!topic) notFound();

  const hasHow = !!topic.howSteps && topic.howSteps.length > 0;
  const hasBenefits = !!topic.benefits && topic.benefits.length > 0;
  const hasSafety = !!topic.safetyBoundary;

  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <p className="text-muted-foreground mb-6 text-sm">
        <Link href="/ai" className="hover:text-accent transition-colors">
          AI活用事例
        </Link>
        <span className="mx-2">/</span>
        <span>{topic.title}</span>
      </p>

      <div className="relative">
        <div
          className="border-gold/35 absolute -top-10 right-0 hidden size-32 rounded-full border md:block"
          aria-hidden="true"
        />
        <Badge variant="outline" className="font-mono text-[10px] tracking-wider">
          {topic.category}
        </Badge>
        <h2 className="mt-3 font-serif text-3xl font-bold tracking-normal">
          <JapaneseLineBreak text={topic.title} />
        </h2>
      </div>

      <section className="mt-12">
        <h3 className="text-accent font-mono text-xs font-bold tracking-[0.24em] uppercase">
          Overview
        </h3>
        <h4 className="mt-2 font-serif text-xl font-bold tracking-normal">
          <JapaneseLineBreak text="どんな取り組みをしているか" />
        </h4>
        <div className="mt-4 max-w-2xl space-y-2">
          <JapaneseModernProse text={topic.overview} />
        </div>
      </section>

      {hasBenefits && (
        <section className="mt-16">
          <h3 className="text-accent font-mono text-xs font-bold tracking-[0.24em] uppercase">
            Benefits
          </h3>
          <h4 className="mt-2 font-serif text-xl font-bold tracking-normal">
            <JapaneseLineBreak text="何が楽になるか・防げるか" />
          </h4>
          <ul className="border-accent/30 bg-card/40 mt-4 max-w-2xl space-y-3 rounded-lg border p-5">
            {topic.benefits!.map((benefit) => (
              <li
                key={benefit}
                className="text-foreground flex gap-2 text-sm leading-7"
              >
                <span className="text-accent shrink-0">◎</span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {hasSafety && (
        <section className="mt-16">
          <h3 className="text-accent font-mono text-xs font-bold tracking-[0.24em] uppercase">
            Safety
          </h3>
          <h4 className="mt-2 font-serif text-xl font-bold tracking-normal">
            <JapaneseLineBreak text="自動化の境界(安全設計)" />
          </h4>
          <p className="text-muted-foreground mt-2 max-w-2xl text-xs leading-6">
            この領域はミスの影響が大きいため、何を自動化していて、何で止まり、何を自動化しないかを明示しています。
          </p>

          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <div className="border-border bg-card/40 rounded-lg border p-4">
              <p className="text-accent font-mono text-[10px] font-bold tracking-[0.2em] uppercase">
                Auto
              </p>
              <h5 className="mt-2 font-serif text-sm font-bold">自動化していること</h5>
              <ul className="text-muted-foreground mt-3 space-y-2 text-xs leading-6">
                {topic.safetyBoundary!.autoOnly.map((item) => (
                  <li key={item} className="flex gap-1.5">
                    <span className="text-accent shrink-0">◎</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-gold/40 bg-card/40 rounded-lg border p-4">
              <p className="text-gold font-mono text-[10px] font-bold tracking-[0.2em] uppercase">
                Approval
              </p>
              <h5 className="mt-2 font-serif text-sm font-bold">人間が確認すること</h5>
              <ul className="text-muted-foreground mt-3 space-y-2 text-xs leading-6">
                {topic.safetyBoundary!.needsApproval.map((item) => (
                  <li key={item} className="flex gap-1.5">
                    <span className="text-gold shrink-0">△</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-destructive/40 bg-card/40 rounded-lg border p-4">
              <p className="text-destructive font-mono text-[10px] font-bold tracking-[0.2em] uppercase">
                Not automated
              </p>
              <h5 className="mt-2 font-serif text-sm font-bold">自動化しないこと</h5>
              <ul className="text-muted-foreground mt-3 space-y-2 text-xs leading-6">
                {topic.safetyBoundary!.notAutomated.map((item) => (
                  <li key={item} className="flex gap-1.5">
                    <span className="text-destructive shrink-0">×</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {hasHow && (
        <section className="mt-16">
          <h3 className="text-accent font-mono text-xs font-bold tracking-[0.24em] uppercase">
            How
          </h3>
          <h4 className="mt-2 font-serif text-xl font-bold tracking-normal">
            <JapaneseLineBreak text="どう実現しているか" />
          </h4>

          <ol className="border-accent/40 mt-6 max-w-3xl space-y-8 border-l-2 pl-10">
            {topic.howSteps!.map((step) => (
              <li key={step.step} className="relative">
                <span
                  className="border-accent bg-background text-accent absolute -left-[50px] flex size-8 items-center justify-center rounded-full border-2 font-mono text-xs font-bold"
                  aria-hidden="true"
                >
                  {String(step.step).padStart(2, "0")}
                </span>
                <h5 className="font-serif text-lg leading-snug font-bold tracking-normal">
                  <JapaneseLineBreak text={step.title} />
                </h5>
                <div className="mt-3 max-w-2xl space-y-2">
                  <JapaneseModernProse text={step.body} />
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}

      <div className="mt-16 flex flex-wrap gap-4">
        <Link href="/ai" className={buttonVariants({ variant: "outline" })}>
          ← AI活用事例に戻る
        </Link>
        <Link href="/harness" className={buttonVariants({ variant: "outline" })}>
          ハーネス設計を見る
        </Link>
        <Link href="/about" className={buttonVariants({ variant: "outline" })}>
          自分について
        </Link>
        <Link href="/" className={buttonVariants({ variant: "outline" })}>
          Home
        </Link>
      </div>
    </div>
  );
}
