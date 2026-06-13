import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

import { JapaneseLineBreak } from "@/components/shared/japanese-line-break";

import { harnessTopics } from "@/lib/data/harness-topics";

const topicNumbers = ["01", "02", "03", "04", "05"] as const;

const benefits = [
  {
    title: "窓口はひとつ",
    body: "自分は秘書役の AI に話すだけ。各担当への細かい指示は秘書が引き受けます。",
  },
  {
    title: "資産を一元管理",
    body: "判断・知見・対話履歴を 1 か所に集約し、バラバラに散らばらせません。",
  },
  {
    title: "やり取りを保存して次に活かす",
    body: "会話を自動で要約・蓄積し、過去の経緯をいつでも辿れる状態を保ちます。",
  },
  {
    title: "組織のように分業する",
    body: "役割ごとに AI を分け、独立したレビューを挟んで品質を保ちます。",
  },
] as const;

export const metadata: Metadata = {
  title: "ハーネス設計",
  description: "AI を 1 つの組織のように経営し、資産を一元管理する仕組みの全体像。",
  alternates: { canonical: "/harness" },
  openGraph: {
    title: "ハーネス設計",
    description: "AI を 1 つの組織のように経営し、資産を一元管理する仕組みの全体像。",
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
        <JapaneseLineBreak text="複数の AI を思いつきで個別に動かすのではなく、ひとつの会社のように運営しています。窓口は秘書役の AI ひとつだけ。やりたいことを秘書に伝えれば、各担当の AI と連携して実装まで進みます。判断・知見・やり取りはすべて 1 か所に蓄積され、次の意思決定に活きていきます。" />
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {benefits.map((benefit) => (
          <div
            key={benefit.title}
            className="border-border bg-card/70 rounded-lg border p-5 shadow-sm"
          >
            <h3 className="text-accent font-serif text-base font-bold tracking-normal">
              <JapaneseLineBreak text={benefit.title} />
            </h3>
            <p className="text-muted-foreground mt-2 text-sm leading-7">
              <JapaneseLineBreak text={benefit.body} />
            </p>
          </div>
        ))}
      </div>

      <figure className="mt-14">
        <div className="border-border bg-card/40 overflow-hidden rounded-lg border">
          <Image
            src="/illustrations/harness-overview.webp"
            alt="秘書役の AI を中心に、社長・各担当の AI・記録層が連携する組織型ハーネスの全体像"
            width={1536}
            height={1024}
            className="h-auto w-full"
            sizes="(min-width: 1024px) 64rem, 100vw"
          />
        </div>
        <figcaption className="text-muted-foreground mt-3 text-center text-sm leading-7">
          <JapaneseLineBreak text="全体像: 社長は秘書役の AI に伝えるだけ。秘書が各担当の AI と連携し、やり取りと判断を記録層に蓄積していきます。" />
        </figcaption>
      </figure>

      <div className="mt-16">
        <div className="border-accent/70 flex items-end justify-between gap-6 border-l pl-5">
          <div>
            <p className="text-accent font-mono text-xs font-bold tracking-[0.24em] uppercase">
              Harness Design
            </p>
            <h2 className="mt-2 font-serif text-2xl font-bold tracking-normal">
              <JapaneseLineBreak text="取り組みの構成" />
            </h2>
          </div>
          <div className="bg-accent hidden h-px flex-1 sm:block" aria-hidden="true" />
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {harnessTopics.map((topic, index) => (
            <Link
              key={topic.slug}
              href={`/harness/${topic.slug}`}
              className="border-border bg-card/70 hover:border-accent group relative overflow-hidden rounded-lg border p-6 shadow-sm transition-colors"
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
              <h3 className="mt-5 font-serif text-lg font-bold tracking-normal">
                <JapaneseLineBreak text={topic.title} />
              </h3>
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
