import type { Metadata } from "next";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

import { JapaneseLineBreak } from "@/components/shared/japanese-line-break";

import { siteMetadata } from "@/lib/data/site";

const values = [
  {
    title: "整合とシンプルさ",
    body: "不要な情報を足さない判断を取ります。3 つあるなら 2 つに、複雑なら段階を 1 つ減らす方向に倒します。一度作った構造を増設より整理で延命させる傾向です。",
  },
  {
    title: "仕組み作り",
    body: "個別判断を毎回繰り返すより、一度仕組みにする方を選びます。属人化を避け、再利用と自動化に投資します。それが結果として実装速度にも返ってきます。",
  },
  {
    title: "透明性と振り返り",
    body: "判断と却下理由を記録に残す運用にしています。判断軸ドリフトを 2 度繰り返さないため、後から辿れる状態を保つことを優先します。",
  },
] as const;

const githubLink = siteMetadata.socialLinks.find((link) => link.platform === "GitHub");

export const metadata: Metadata = {
  title: "自分について",
  description: "AI で開発プロセス自体を設計するたくやの自己紹介",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "自分について",
    description: "AI で開発プロセス自体を設計するたくやの自己紹介",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <section>
        <p className="text-accent font-mono text-xs font-bold tracking-[0.24em] uppercase">About</p>
        <h1 className="mt-3 max-w-3xl font-serif text-4xl leading-tight font-bold tracking-normal md:text-5xl">
          <JapaneseLineBreak text="仕組みを作って、判断負荷を下げる" />
        </h1>
        <p className="text-muted-foreground mt-5 max-w-3xl text-base leading-8 md:text-lg">
          <JapaneseLineBreak text="2023 年から SE 業界、AI で開発プロセス自体を設計するたくやです" />
        </p>
      </section>

      <section className="mt-16">
        <div className="border-accent/70 border-l pl-5">
          <h2 className="font-serif text-2xl font-bold tracking-normal">
            <JapaneseLineBreak text="経歴ストーリー" />
          </h2>
        </div>

        <div className="mt-8 max-w-3xl space-y-7 font-serif text-base leading-9 md:text-lg">
          <p>
            <JapaneseLineBreak text="2023 年に SE 業界に入り、製造業の SI 案件で AI を業務に持ち込む選択を取りました。Microsoft 365 Copilot をコード作成・設計書作成 (UML 図) に組み込み、AI ネイティブな開発スタイルでスタートしました。案件履歴は " />
            <Link href="/career" className="text-accent underline-offset-4 hover:underline">
              /career
            </Link>
            <JapaneseLineBreak text=" へ。" />
          </p>
          <p>
            <JapaneseLineBreak text="業務並行で個人開発を進め、Claude Code を中核にしたマルチエージェント開発エコシステムを構築しました。AI が自ら判断・記録・相互レビューを回す仕組みを設計し、実装で検証しています。詳細は " />
            <Link href="/ai" className="text-accent underline-offset-4 hover:underline">
              /ai
            </Link>
            <JapaneseLineBreak text=" へ。" />
          </p>
          <p>
            <JapaneseLineBreak text="SE エージェント経由で外部案件にも展開し、AI ネイティブな開発スタイルを継続中です。実装と仕組みの整合性を両方追う判断軸で動いています。" />
          </p>
        </div>
      </section>

      <section className="mt-16">
        <div className="border-accent/70 flex items-end justify-between gap-6 border-l pl-5">
          <h2 className="font-serif text-2xl font-bold tracking-normal">
            <JapaneseLineBreak text="大事にしている軸" />
          </h2>
          <div className="bg-accent hidden h-px flex-1 sm:block" aria-hidden="true" />
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {values.map((value) => (
            <article
              key={value.title}
              className="border-border bg-card/70 rounded-sm border p-6 shadow-sm"
            >
              <h3 className="font-serif text-lg font-bold tracking-normal">
                <JapaneseLineBreak text={value.title} />
              </h3>
              <p className="text-muted-foreground mt-4 text-sm leading-7">
                <JapaneseLineBreak text={value.body} />
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-border mt-16 border-t pt-10">
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/contact" className={buttonVariants({ variant: "outline", size: "lg" })}>
            お問い合わせ
          </Link>
          {githubLink && (
            <a
              href={githubLink.url}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              GitHub
            </a>
          )}
        </div>
      </section>
    </div>
  );
}
