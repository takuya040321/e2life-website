import Link from "next/link";

import { SectionHeading } from "@/components/shared/section-heading";
import { JapaneseLineBreak } from "@/components/shared/japanese-line-break";

type Entry = {
  label: string;
  title: string;
  body: string;
  href: string;
  emphasis?: boolean;
};

const featured: Entry[] = [
  {
    label: "具体例を見る",
    title: "AI活用事例",
    body: "12 領域でどんなツールでどう動かしているか、ステップ単位で紹介。「何が楽になるか」「自動化しないこと」も明記しています。",
    href: "/ai",
    emphasis: true,
  },
  {
    label: "設計思想を読む",
    title: "ハーネス設計",
    body: "AI を組織のように動かすための、わたしが大事にしている考え方と 5 つの役割。具体実装はあえて伏せ、なぜそうしているかを語ります。",
    href: "/harness",
    emphasis: true,
  },
];

const secondary: Entry = {
  label: "人物背景を確認する",
  title: "自分について",
  body: "経歴・転機・価値観・技術スタック・得意な相談・対応しないこと。",
  href: "/about",
};

export function ExploreSection() {
  return (
    <section className="py-24">
      <SectionHeading
        title="もっと詳しく見る"
        description="目的別の入口から、深掘りしてご覧ください。"
        align="left"
      />
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {featured.map((entry) => (
          <Link
            key={entry.href}
            href={entry.href}
            className="border-accent/40 bg-card/70 hover:border-accent hover:bg-card focus-visible:ring-accent focus-visible:ring-offset-background group relative overflow-hidden rounded-lg border-2 p-6 shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none sm:p-7 md:col-span-1"
          >
            <span
              className="border-accent/20 absolute top-5 right-5 size-20 rounded-full border"
              aria-hidden="true"
            />
            <p className="text-accent font-mono text-xs font-bold tracking-[0.22em] uppercase">
              {entry.label}
            </p>
            <h3 className="mt-4 font-serif text-lg font-bold tracking-normal">
              <JapaneseLineBreak text={entry.title} />
            </h3>
            <p className="text-muted-foreground mt-3 text-sm leading-7">
              <JapaneseLineBreak text={entry.body} />
            </p>
            <p className="text-accent mt-5 font-mono text-xs font-bold tracking-[0.16em]">
              詳細を見る →
            </p>
          </Link>
        ))}
        <Link
          href={secondary.href}
          className="border-border bg-card/40 hover:border-accent focus-visible:ring-accent focus-visible:ring-offset-background group relative overflow-hidden rounded-lg border p-6 shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none sm:p-7"
        >
          <p className="text-muted-foreground font-mono text-xs font-bold tracking-[0.22em] uppercase">
            {secondary.label}
          </p>
          <h3 className="mt-4 font-serif text-base font-bold tracking-normal">
            <JapaneseLineBreak text={secondary.title} />
          </h3>
          <p className="text-muted-foreground mt-3 text-sm leading-7">
            <JapaneseLineBreak text={secondary.body} />
          </p>
          <p className="text-accent mt-5 font-mono text-xs font-bold tracking-[0.16em]">
            プロフィールを見る →
          </p>
        </Link>
      </div>
    </section>
  );
}
