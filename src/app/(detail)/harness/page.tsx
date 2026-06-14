import type { Metadata } from "next";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

import { JapaneseLineBreak } from "@/components/shared/japanese-line-break";

import { harnessRoles, orchestrationPrinciples } from "@/lib/data/harness-topics";

const roleNumbers = ["01", "02", "03", "04", "05"] as const;

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
        <p className="text-muted-foreground mt-5 max-w-2xl text-base leading-8">
          <JapaneseLineBreak text="AI を、ひとつの組織のように経営する仕組みです。秘書役を窓口に、部門担当・実装・レビュー・記録の 5 つの役割で分業させ、わたしは方針判断と最終確認だけを握っています。" />
        </p>
      </section>

      {/* Why: 全体方針で意識していること */}
      <section className="mt-20">
        <p className="text-accent font-mono text-xs font-bold tracking-[0.24em] uppercase">
          Principles
        </p>
        <h3 className="mt-3 font-serif text-2xl font-bold tracking-normal">
          <JapaneseLineBreak text="全体で意識していること" />
        </h3>
        <p className="text-muted-foreground mt-2 max-w-2xl text-sm leading-7">
          <JapaneseLineBreak text="複数の AI を束ねて 1 つの組織として動かすうえで、わたしが大事にしている考え方です。各役割の設計は、この方針に沿って組み立てています。" />
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {orchestrationPrinciples.map((principle) => (
            <div
              key={principle.title}
              className="border-border bg-card/70 rounded-lg border p-5 shadow-sm"
            >
              <h4 className="text-accent font-serif text-base font-bold tracking-normal">
                <JapaneseLineBreak text={principle.title} />
              </h4>
              <p className="text-muted-foreground mt-3 text-sm leading-7">
                <JapaneseLineBreak text={principle.body} />
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Members: 5つの役割 */}
      <section className="mt-20">
        <p className="text-accent font-mono text-xs font-bold tracking-[0.24em] uppercase">
          Roles
        </p>
        <h3 className="mt-3 font-serif text-2xl font-bold tracking-normal">
          <JapaneseLineBreak text="5 つの役割で分業する" />
        </h3>
        <p className="text-muted-foreground mt-2 max-w-2xl text-sm leading-7">
          <JapaneseLineBreak text="役割ごとに専任の AI を立てています。それぞれに何を任せていて、何を意識しているかをまとめています。" />
        </p>

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

      <div className="mt-16 flex flex-wrap gap-4">
        <Link href="/contact" className={buttonVariants({ variant: "outline" })}>
          お問い合わせ
        </Link>
        <Link href="/ai" className={buttonVariants({ variant: "outline" })}>
          AI活用事例を見る
        </Link>
      </div>
    </div>
  );
}
