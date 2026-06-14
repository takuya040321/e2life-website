import Link from "next/link";

import { SectionHeading } from "@/components/shared/section-heading";
import { JapaneseLineBreak } from "@/components/shared/japanese-line-break";

const entries = [
  {
    label: "Case Study",
    title: "AI活用事例",
    body: "実際にどんな現場で、どのように AI を活用しているかを具体例で紹介します。",
    href: "/ai",
  },
  {
    label: "Design Thinking",
    title: "ハーネス設計",
    body: "AI を組織のように動かす設計思想と、わたしが意識していることをまとめています。",
    href: "/harness",
  },
  {
    label: "About Me",
    title: "自分について",
    body: "経歴や背景、いま取り組んでいることを、もう少し詳しく書いています。",
    href: "/about",
  },
] as const;

export function ExploreSection() {
  return (
    <section className="py-24">
      <SectionHeading
        title="もっと詳しく見る"
        description="気になる入口から、深掘りしてご覧ください。"
        align="left"
      />
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {entries.map((entry) => (
          <Link
            key={entry.href}
            href={entry.href}
            className="border-border bg-card/70 hover:border-accent hover:bg-card group relative overflow-hidden rounded-lg border p-6 shadow-sm transition-colors sm:p-7"
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
      </div>
    </section>
  );
}
