import type { Metadata } from "next";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

import { JapaneseLineBreak } from "@/components/shared/japanese-line-break";

import { harnessRoles, orchestrationPrinciples } from "@/lib/data/harness-topics";

const roleNumbers = ["01", "02", "03", "04", "05"] as const;
const principleNumbers = ["01", "02", "03", "04", "05", "06"] as const;

export const metadata: Metadata = {
  title: "ハーネス設計",
  description:
    "AI を、ひとつの組織のように経営するための設計思想。秘書役・部門担当・実装・レビュー・記録の 5 つの役割で分業する、わたしのハーネス設計。",
  alternates: { canonical: "/harness" },
  openGraph: {
    title: "ハーネス設計",
    description:
      "AI を、ひとつの組織のように経営するための設計思想。秘書役・部門担当・実装・レビュー・記録の 5 つの役割で分業する、わたしのハーネス設計。",
    url: "/harness",
  },
};

export default function HarnessHubPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      {/* Hero */}
      <section className="relative">
        <p className="text-accent font-mono text-xs font-bold tracking-[0.24em] uppercase">
          About my harness design
        </p>
        <h2 className="mt-3 font-serif text-3xl font-bold tracking-normal sm:text-4xl">
          <JapaneseLineBreak text="わたしのハーネス設計" />
        </h2>

        {/* ハーネスとは(定義文) */}
        <div className="border-accent/40 bg-accent/5 mt-6 max-w-2xl rounded-lg border-l-4 p-4">
          <p className="text-foreground text-sm leading-7">
            <JapaneseLineBreak text="ここでいうハーネスとは、AI に役割・権限・停止条件を与えるための設計のことです。" />
          </p>
        </div>

        <p className="text-muted-foreground mt-6 max-w-2xl text-base leading-8">
          <JapaneseLineBreak text="AI を、ひとつの組織のように経営する仕組みです。秘書役を窓口に、部門担当・実装・レビュー・記録の 5 つの役割で分業させ、わたしは方針判断と最終確認だけを握っています。" />
        </p>

        {/* /harness と /ai の住み分け */}
        <p className="text-muted-foreground mt-4 max-w-2xl text-sm leading-7">
          <JapaneseLineBreak text="このページでは「なぜそうしているか / 何を任せているか」を扱います。具体的なツール名や実装手順は " />
          <Link href="/ai" className="text-accent hover:underline">
            AI活用事例
          </Link>
          <JapaneseLineBreak text=" のページで紹介しています。" />
        </p>
      </section>

      {/* Why: 全体方針 - 縦リスト形式 */}
      <section className="mt-20">
        <p className="text-accent font-mono text-xs font-bold tracking-[0.24em] uppercase">
          Principles
        </p>
        <h3 className="mt-3 font-serif text-2xl font-bold tracking-normal">
          <JapaneseLineBreak text="全体で意識していること" />
        </h3>
        <p className="text-muted-foreground mt-2 max-w-2xl text-sm leading-7">
          <JapaneseLineBreak text="複数の AI を束ねて 1 つの組織として動かすうえで、わたしが大事にしている考え方です。" />
        </p>

        <ol className="border-accent/40 mt-8 max-w-3xl space-y-7 border-l-2 pl-8">
          {orchestrationPrinciples.map((principle, index) => (
            <li key={principle.title} className="relative">
              <span
                className="border-accent bg-background text-accent absolute -left-[42px] flex size-6 items-center justify-center rounded-full border font-mono text-xs font-bold"
                aria-hidden="true"
              >
                {principleNumbers[index]}
              </span>
              <h4 className="text-accent font-serif text-base font-bold tracking-normal">
                <JapaneseLineBreak text={principle.title} />
              </h4>
              <p className="text-muted-foreground mt-2 text-sm leading-7">
                <JapaneseLineBreak text={principle.body} />
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* Roles: 関係フロー + 5役割カード */}
      <section className="mt-20">
        <p className="text-accent font-mono text-xs font-bold tracking-[0.24em] uppercase">
          Roles
        </p>
        <h3 className="mt-3 font-serif text-2xl font-bold tracking-normal">
          <JapaneseLineBreak text="5 つの役割で分業する" />
        </h3>
        <p className="text-muted-foreground mt-2 max-w-2xl text-sm leading-7">
          <JapaneseLineBreak text="役割ごとに専任の AI を立てています。秘書役を入口に、部門担当が判断し、実装担当が形にし、レビュー担当が止め、記録担当が次回へ返す、という流れです。" />
        </p>

        {/* 関係フロー */}
        <div className="border-border bg-card/40 mt-8 rounded-lg border border-dashed p-5">
          <div className="flex flex-col items-stretch gap-3 text-sm sm:flex-row sm:items-center sm:gap-2">
            {harnessRoles.map((role, index) => (
              <div key={role.slug} className="flex items-center gap-2 sm:flex-1">
                <div className="border-accent/40 bg-background flex-1 rounded-md border px-3 py-2 text-center">
                  <p className="font-serif text-sm font-bold">{role.title}</p>
                  <p className="text-muted-foreground mt-0.5 font-mono text-[10px] tracking-wider">
                    {role.role}
                  </p>
                </div>
                {index < harnessRoles.length - 1 && (
                  <span className="text-accent hidden font-mono text-base sm:inline" aria-hidden="true">
                    →
                  </span>
                )}
                {index < harnessRoles.length - 1 && (
                  <span className="text-accent text-center font-mono text-base sm:hidden" aria-hidden="true">
                    ↓
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 役割カード */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {harnessRoles.map((role, index) => (
            <Link
              key={role.slug}
              href={`/harness/${role.slug}`}
              className="border-border bg-card/70 hover:border-accent hover:bg-card group relative overflow-hidden rounded-lg border p-6 shadow-sm transition-colors sm:p-7"
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
                {roleNumbers[index]}
              </span>
              <h4 className="mt-4 font-serif text-lg font-bold tracking-normal">
                <JapaneseLineBreak text={role.title} />
              </h4>
              <p className="text-muted-foreground mt-1 font-mono text-xs tracking-wider">
                {role.role}
              </p>
              <p className="text-muted-foreground mt-3 text-sm leading-7">
                <JapaneseLineBreak text={role.summary} />
              </p>
              <p className="text-accent mt-5 font-mono text-xs font-bold tracking-[0.16em]">
                詳細を見る →
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA前の橋渡し */}
      <section className="mt-16">
        <p className="text-muted-foreground max-w-2xl text-sm leading-7">
          <JapaneseLineBreak text="ここまでが設計思想の話でした。実際にどう動かしているか(具体的なツール名や流れ)は、AI活用事例のページで領域別に紹介しています。" />
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <Link
            href="/ai"
            className={buttonVariants({
              className: "bg-accent text-accent-foreground hover:bg-accent/90 rounded-sm",
            })}
          >
            AI活用事例を見る →
          </Link>
          <Link href="/contact" className={buttonVariants({ variant: "outline" })}>
            お問い合わせ
          </Link>
        </div>
      </section>
    </div>
  );
}
