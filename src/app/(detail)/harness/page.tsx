import type { Metadata } from "next";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";

import { HarnessDiagram } from "@/components/shared/harness-diagram";
import { JapaneseLineBreak } from "@/components/shared/japanese-line-break";

import { orchestrationPrinciples, specialistHarnesses } from "@/lib/data/harness-topics";

const harnessNumbers = ["01", "02", "03", "04", "05", "06"] as const;

export const metadata: Metadata = {
  title: "ハーネス設計",
  description:
    "複数の専門ハーネスをひとつの組織のように束ねる、AI 経営の全体構図と、その中で意識していること。",
  alternates: { canonical: "/harness" },
  openGraph: {
    title: "ハーネス設計",
    description:
      "複数の専門ハーネスをひとつの組織のように束ねる、AI 経営の全体構図と、その中で意識していること。",
    url: "/harness",
  },
};

export default function HarnessHubPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <div className="relative">
        <h2 className="font-serif text-3xl font-bold tracking-normal">
          <JapaneseLineBreak text="ハーネス設計" />
        </h2>
        <p className="text-muted-foreground mt-2">
          <JapaneseLineBreak text="AI を 1 つの組織のように経営する仕組みです。" />
        </p>
      </div>

      <p className="text-muted-foreground mt-10 max-w-3xl text-base leading-8">
        <JapaneseLineBreak text="複数の AI を思いつきで個別に動かすのではなく、役割ごとの専門ハーネスに分け、それらをひとつの会社のように束ねて動かしています。やりたいことは窓口役の AI ひとつに伝えるだけ。窓口が関連する専門ハーネスを集めて方針を決め、実装まで進めます。判断・知見・やり取りはすべて記録として蓄積し、振り返って次に活かします。" />
      </p>

      <figure className="border-border bg-background mt-14 rounded-xl border p-6 sm:p-8">
        <HarnessDiagram />
        <figcaption className="text-muted-foreground mt-6 text-center text-sm leading-7">
          <JapaneseLineBreak text="全体構図: 社長は窓口役の AI に伝えるだけ。窓口が各専門ハーネスと連携して方針を決め、実装し、独立した目で確認したうえで世に出します。やり取りと判断は記録層に蓄積されていきます。" />
        </figcaption>
      </figure>

      <div className="mt-16">
        <div className="border-accent/70 flex items-end justify-between gap-6 border-l pl-5">
          <div>
            <p className="text-accent font-mono text-xs font-bold tracking-[0.24em] uppercase">
              Orchestration
            </p>
            <h2 className="mt-2 font-serif text-2xl font-bold tracking-normal">
              <JapaneseLineBreak text="全体ハーネスで意識していること" />
            </h2>
            <p className="text-muted-foreground mt-2 max-w-2xl text-sm leading-7">
              <JapaneseLineBreak text="複数の専門ハーネスを束ねる「全体のオーケストレーション」で大切にしている考え方です。各専門ハーネスの設計は、この方針に沿って組み立てています。" />
            </p>
          </div>
          <div className="bg-accent hidden h-px flex-1 self-end sm:block" aria-hidden="true" />
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {orchestrationPrinciples.map((principle) => (
            <div
              key={principle.title}
              className="border-border bg-card/70 rounded-lg border p-5 shadow-sm"
            >
              <h3 className="text-accent font-serif text-base font-bold tracking-normal">
                <JapaneseLineBreak text={principle.title} />
              </h3>
              <p className="text-muted-foreground mt-2 text-sm leading-7">
                <JapaneseLineBreak text={principle.body} />
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-20">
        <div className="border-accent/70 flex items-end justify-between gap-6 border-l pl-5">
          <div>
            <p className="text-accent font-mono text-xs font-bold tracking-[0.24em] uppercase">
              Specialist Harnesses
            </p>
            <h2 className="mt-2 font-serif text-2xl font-bold tracking-normal">
              <JapaneseLineBreak text="専門ハーネス一覧" />
            </h2>
            <p className="text-muted-foreground mt-2 max-w-2xl text-sm leading-7">
              <JapaneseLineBreak text="役割・機能ごとに設計している専門ハーネスです。それぞれのハーネスでも、その役割固有に意識していることがあります。" />
            </p>
          </div>
          <div className="bg-accent hidden h-px flex-1 self-end sm:block" aria-hidden="true" />
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {specialistHarnesses.map((harness, index) => {
            const isReady = harness.status === "ready";
            return (
              <Link
                key={harness.slug}
                href={`/harness/${harness.slug}`}
                aria-disabled={!isReady}
                className={`border-border bg-card/70 hover:border-accent group relative overflow-hidden rounded-lg border p-6 shadow-sm transition-colors ${
                  isReady ? "" : "opacity-70"
                }`}
              >
                <span
                  className="border-accent/20 absolute top-5 right-5 size-20 rounded-full border"
                  aria-hidden="true"
                />
                <span
                  className="border-gold/25 absolute top-8 right-8 size-14 rounded-full border"
                  aria-hidden="true"
                />
                <div className="flex items-center gap-2">
                  <span className="text-accent font-mono text-sm leading-none font-bold tracking-[0.18em]">
                    {harnessNumbers[index]}
                  </span>
                  {!isReady && (
                    <Badge variant="outline" className="font-mono text-[10px]">
                      準備中
                    </Badge>
                  )}
                </div>
                <h3 className="mt-5 font-serif text-lg font-bold tracking-normal">
                  <JapaneseLineBreak text={harness.title} />
                </h3>
                <p className="text-muted-foreground mt-1 font-mono text-xs tracking-wider">
                  {harness.role}
                </p>
                <p className="text-muted-foreground mt-3 text-sm leading-7">
                  <JapaneseLineBreak text={harness.summary} />
                </p>
                <p className="text-accent mt-5 font-mono text-xs font-bold tracking-[0.16em]">
                  {isReady ? "詳細を見る →" : "概要を見る →"}
                </p>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="mt-12 flex gap-4">
        <Link href="/contact" className={buttonVariants({ variant: "outline" })}>
          お問い合わせ
        </Link>
        <Link href="/ai" className={buttonVariants({ variant: "outline" })}>
          AI活用を見る
        </Link>
      </div>
    </div>
  );
}
