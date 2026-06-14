import type { Metadata } from "next";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";

import { JapaneseLineBreak } from "@/components/shared/japanese-line-break";

import { orchestrationPrinciples, specialistHarnesses } from "@/lib/data/harness-topics";

const flowSteps = [
  {
    number: "01",
    title: "わたしから秘書役に話す",
    body: "やりたいことは、秘書役の AI ひとつに伝えるだけ。複数の AI を自分で動かし分けません。",
  },
  {
    number: "02",
    title: "秘書役が専門ハーネスを束ねる",
    body: "関連する専門ハーネスを集めて方針を決め、実装まで段取りします。役割ごとに分業します。",
  },
  {
    number: "03",
    title: "判断とやり取りを記録に残す",
    body: "対話・判断・知見を蓄積し、区切りで振り返って次の判断に活かします。",
  },
] as const;

const principleBenefits: Record<string, string> = {
  入口はひとつ: "考えることが減り、本来やりたいことに集中できる",
  記録を活かす: "同じつまずきを繰り返さず、判断の精度が上がっていく",
  組織のように分業する: "各々が役割に集中でき、全体の質が上がる",
  独立した目でレビューする: "思い込みやミスを世に出す前に止められる",
  安全に自走させる: "都度確認の手間と暴走リスクの両方を避けられる",
};

const readyHarnesses = specialistHarnesses.filter((h) => h.status === "ready");
const preparingHarnesses = specialistHarnesses.filter((h) => h.status === "preparing");

export const metadata: Metadata = {
  title: "ハーネス設計",
  description:
    "AI を 1 つの組織のように経営する、わたしのハーネス設計の全体像。秘書役 1 人を窓口に、専門ハーネスが分業し、すべてを記録に残します。",
  alternates: { canonical: "/harness" },
  openGraph: {
    title: "ハーネス設計",
    description:
      "AI を 1 つの組織のように経営する、わたしのハーネス設計の全体像。秘書役 1 人を窓口に、専門ハーネスが分業し、すべてを記録に残します。",
    url: "/harness",
  },
};

export default function HarnessHubPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      {/* Hero: 8秒で「何のページか」を伝える */}
      <section className="relative">
        <p className="text-accent font-mono text-xs font-bold tracking-[0.24em] uppercase">
          About my harness design
        </p>
        <h2 className="mt-3 font-serif text-3xl font-bold tracking-normal sm:text-4xl">
          <JapaneseLineBreak text="AI を、ひとつの組織のように経営する" />
        </h2>
        <p className="text-muted-foreground mt-5 max-w-2xl text-base leading-8">
          <JapaneseLineBreak text="秘書役の AI 1 人を窓口に、複数の専門 AI に分業させ、すべての判断とやり取りを記録に残す。これがわたしのハーネス設計です。このページでは、その全体像と、わたしが大事にしている考え方を紹介します。" />
        </p>
      </section>

      {/* Why: なぜこの設計にしたか */}
      <section className="mt-20">
        <p className="text-accent font-mono text-xs font-bold tracking-[0.24em] uppercase">
          Why
        </p>
        <h2 className="mt-3 font-serif text-2xl font-bold tracking-normal">
          <JapaneseLineBreak text="なぜ、組織のように束ねるのか" />
        </h2>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <div className="border-border bg-card/40 rounded-lg border border-dashed p-6">
            <p className="text-muted-foreground font-mono text-xs tracking-[0.2em] uppercase">
              Before
            </p>
            <p className="mt-3 text-sm leading-7">
              <JapaneseLineBreak text="複数の AI を思いつきで個別に動かしていた頃は、どの AI に何を頼んだかが散らかり、判断の経緯が消え、同じつまずきを何度も繰り返していました。" />
            </p>
          </div>
          <div className="border-accent/40 bg-accent/5 rounded-lg border p-6">
            <p className="text-accent font-mono text-xs tracking-[0.2em] uppercase">After</p>
            <p className="mt-3 text-sm leading-7">
              <JapaneseLineBreak text="役割ごとに専門ハーネスを分け、秘書役 1 人を窓口にして、すべての判断とやり取りを記録に残す形にしたところ、ひとつの組織として判断を積み重ねられるようになりました。" />
            </p>
          </div>
        </div>
      </section>

      {/* How: 3ステップ要約 */}
      <section className="mt-20">
        <p className="text-accent font-mono text-xs font-bold tracking-[0.24em] uppercase">
          How it works
        </p>
        <h2 className="mt-3 font-serif text-2xl font-bold tracking-normal">
          <JapaneseLineBreak text="全体の流れは 3 ステップ" />
        </h2>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {flowSteps.map((step) => (
            <div
              key={step.number}
              className="border-border bg-card/70 relative overflow-hidden rounded-lg border p-6 shadow-sm"
            >
              <span
                className="border-accent/15 absolute top-5 right-5 size-16 rounded-full border"
                aria-hidden="true"
              />
              <span className="text-accent font-mono text-sm leading-none font-bold tracking-[0.18em]">
                {step.number}
              </span>
              <h3 className="mt-4 font-serif text-base font-bold tracking-normal">
                <JapaneseLineBreak text={step.title} />
              </h3>
              <p className="text-muted-foreground mt-3 text-sm leading-7">
                <JapaneseLineBreak text={step.body} />
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5つの原則(Benefits 風) */}
      <section className="mt-20">
        <p className="text-accent font-mono text-xs font-bold tracking-[0.24em] uppercase">
          Principles
        </p>
        <h2 className="mt-3 font-serif text-2xl font-bold tracking-normal">
          <JapaneseLineBreak text="わたしが大事にしている 5 つの考え方" />
        </h2>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {orchestrationPrinciples.map((principle) => (
            <div
              key={principle.title}
              className="border-border bg-card/70 rounded-lg border p-5 shadow-sm"
            >
              <h3 className="text-accent font-serif text-base font-bold tracking-normal">
                <JapaneseLineBreak text={principle.title} />
              </h3>
              {principleBenefits[principle.title] && (
                <p className="text-foreground mt-2 text-sm font-medium leading-6">
                  → {principleBenefits[principle.title]}
                </p>
              )}
              <p className="text-muted-foreground mt-3 text-sm leading-7">
                <JapaneseLineBreak text={principle.body} />
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 専門ハーネス一覧: ready を前面、preparing を別ブロック */}
      <section className="mt-20">
        <p className="text-accent font-mono text-xs font-bold tracking-[0.24em] uppercase">
          Specialist Harnesses
        </p>
        <h2 className="mt-3 font-serif text-2xl font-bold tracking-normal">
          <JapaneseLineBreak text="わたしが設計している専門ハーネス" />
        </h2>
        <p className="text-muted-foreground mt-2 max-w-2xl text-sm leading-7">
          <JapaneseLineBreak text="役割ごとに分けて設計している専門ハーネスです。それぞれのハーネスでも、固有に意識していることがあります。" />
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {readyHarnesses.map((harness) => (
            <Link
              key={harness.slug}
              href={`/harness/${harness.slug}`}
              className="border-accent/60 bg-card/70 hover:border-accent hover:bg-card relative overflow-hidden rounded-lg border-2 p-6 shadow-sm transition-colors sm:p-8"
            >
              <span
                className="border-accent/20 absolute top-5 right-5 size-20 rounded-full border"
                aria-hidden="true"
              />
              <Badge variant="default" className="font-mono text-[10px]">
                公開中
              </Badge>
              <h3 className="mt-4 font-serif text-xl font-bold tracking-normal">
                <JapaneseLineBreak text={harness.title} />
              </h3>
              <p className="text-muted-foreground mt-1 font-mono text-xs tracking-wider">
                {harness.role}
              </p>
              <p className="text-muted-foreground mt-4 text-sm leading-7">
                <JapaneseLineBreak text={harness.summary} />
              </p>
              <p className="text-accent mt-5 font-mono text-xs font-bold tracking-[0.16em]">
                詳細を見る →
              </p>
            </Link>
          ))}
        </div>

        {preparingHarnesses.length > 0 && (
          <div className="mt-10">
            <p className="text-muted-foreground font-mono text-xs tracking-[0.2em] uppercase">
              Preparing
            </p>
            <h3 className="mt-2 font-serif text-base font-bold tracking-normal">
              <JapaneseLineBreak text="準備中のハーネス" />
            </h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {preparingHarnesses.map((harness) => (
                <Link
                  key={harness.slug}
                  href={`/harness/${harness.slug}`}
                  className="border-border bg-card/40 hover:border-accent/50 block rounded-lg border p-4 opacity-80 transition-colors hover:opacity-100"
                >
                  <h4 className="font-serif text-sm font-bold tracking-normal">
                    {harness.title}
                  </h4>
                  <p className="text-muted-foreground mt-1 text-xs leading-5">
                    {harness.role}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>

      <div className="mt-16 flex gap-4">
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
