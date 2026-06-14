import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";

import { JapaneseLineBreak } from "@/components/shared/japanese-line-break";

import { siteMetadata } from "@/lib/data/site";

const tags = [
  "AI 開発プロセス設計",
  "マルチエージェント運用",
  "記録基盤",
] as const;

const timeline = [
  {
    year: "2016",
    title: "新卒で製品技術者として就職",
    body: "メーカーの製品技術者として、コストダウンや工程設計を担当しました。製造業の現場で「不要な手順を減らす」「同じ判断を何度も繰り返さない」という改善目線を身につけました。",
  },
  {
    year: "2023",
    title: "システムエンジニアに転身、AI を業務に組み込む",
    body: "製造業向けの業務システム開発の現場に移り、Microsoft 365 Copilot をコード作成や設計書(画面・データ設計)作りに組み込んだところからキャリアをスタート。AI ネイティブな開発スタイルで始めました。",
  },
  {
    year: "2025",
    title: "Claude Code でマルチエージェント基盤を構築",
    body: "本業の開発に取り組みながら、個人開発でも Claude Code を中核にしたマルチエージェント開発エコシステムを構築。AI が自ら判断・記録・相互レビューを回す仕組みを設計し、実装で検証しました。",
  },
  {
    year: "2026〜",
    title: "外部案件へ展開、設計と運用を両輪で回す",
    body: "外部案件にも展開し、AI ネイティブな開発スタイルを継続中です。実装と仕組みの整合性を両方追う判断軸で動いています。",
  },
] as const;

const turningPoint = {
  title: "なぜ AI を「組織」として扱うようになったか",
  body: "1 体の万能 AI に頼ると、判断軸がぶれて品質が安定しないと感じていました。1 つの会話の流れの中でレビューも修正もすると、自分自身でミスを見落としやすい。そこで、役割を分けて、独立した目で確認させ、判断と知見を記録に残す構造へ寄せていきました。結果として、AI を「便利なツール」ではなく「組織」として扱う設計に行き着きました。",
};

const values = [
  {
    title: "整合とシンプルさ",
    body: "不要な情報を足さない判断を取ります。3 つあるなら 2 つに、複雑なら段階を 1 つ減らす方向に倒します。一度作った構造を増設より整理で延命させる傾向です。",
    effect: "依頼者にとって: 後から触れる範囲が狭く、引き継ぎや保守がしやすい状態になります。",
  },
  {
    title: "仕組み作り",
    body: "個別判断を毎回繰り返すより、一度仕組みにする方を選びます。属人化を避け、再利用と自動化に投資します。それが結果として実装速度にも返ってきます。",
    effect: "依頼者にとって: 「人に依存しない」「同じ作業を 2 度しない」業務基盤が手に入ります。",
  },
  {
    title: "透明性と振り返り",
    body: "判断と却下理由を記録に残す運用にしています。判断軸ドリフトを 2 度繰り返さないため、後から辿れる状態を保つことを優先します。",
    effect: "依頼者にとって: なぜそう作ったかが後から辿れ、変更時の「触っていい範囲」がはっきりします。",
  },
] as const;

const stack = {
  primary: ["Claude Code", "Next.js", "TypeScript", "React"],
  ai: ["Anthropic Claude", "OpenAI Codex CLI", "gpt-image-2", "MCP"],
  infrastructure: ["GitHub Actions", "Vercel", "macOS launchd", "Google Sheets / Calendar"],
  domain: ["要件定義", "基本設計", "ER 図(Mermaid)", "見積もり", "ドキュメント生成"],
} as const;

const goodAt = [
  "AI を組み込んだ開発プロセスの設計・導入",
  "マルチエージェント構成の設計(役割分離 / 独立レビュー / 記録基盤)",
  "Web フロントエンド(Next.js / TypeScript / React)の自走化設計",
  "業務自動化(SNS / メール / 会計 / ドキュメント / 家計など)",
  "受託案件の要件定義・基本設計・見積もり",
] as const;

const notDoing = [
  "対人接客や常駐稼働を前提とする案件",
  "保守・運用に AI を組み込めない縛りがある案件",
  "短納期で安全境界を取れない高リスク自動化",
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
    <div className="relative mx-auto max-w-5xl px-6 py-20">
      {/* Hero */}
      <section>
        <p className="text-accent font-mono text-xs font-bold tracking-[0.24em] uppercase">
          About
        </p>
        <h1 className="mt-3 max-w-3xl font-serif text-4xl leading-tight font-bold tracking-normal md:text-5xl">
          <JapaneseLineBreak text="仕組みを作って、判断負荷を下げる" />
        </h1>
        <p className="text-muted-foreground mt-5 max-w-3xl text-base leading-8 md:text-lg">
          <JapaneseLineBreak text="2016 年に製品技術者として就業し、製造業の改善目線を持ったまま 2023 年にシステムエンジニアへ転身。いまは AI ネイティブな開発プロセス設計に集中し、複数の AI を組織のように分業させて、開発・運用・コンテンツ生成まで AI 自走で回す仕組みを設計しています。" />
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="font-mono text-[11px] tracking-wider"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </section>

      {/* 経歴タイムライン */}
      <section className="mt-16">
        <div className="border-accent/70 border-l pl-5">
          <h2 className="font-serif text-2xl font-bold tracking-normal">
            <JapaneseLineBreak text="経歴" />
          </h2>
        </div>

        <ol className="border-accent/40 mt-8 max-w-3xl space-y-8 border-l-2 pl-8">
          {timeline.map((entry) => (
            <li key={entry.year} className="relative">
              <span
                className="border-accent bg-background text-accent absolute -left-[42px] flex size-6 items-center justify-center rounded-full border font-mono text-[10px] font-bold"
                aria-hidden="true"
              >
                {entry.year.slice(2, 4)}
              </span>
              <p className="text-accent font-mono text-xs font-bold tracking-wider">
                {entry.year}
              </p>
              <h3 className="mt-1 font-serif text-lg font-bold leading-snug tracking-normal">
                <JapaneseLineBreak text={entry.title} />
              </h3>
              <p className="text-muted-foreground mt-2 text-sm leading-7">
                <JapaneseLineBreak text={entry.body} />
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* 転機 */}
      <section className="mt-16">
        <div className="border-accent/70 border-l pl-5">
          <h2 className="font-serif text-2xl font-bold tracking-normal">
            <JapaneseLineBreak text="転機" />
          </h2>
        </div>
        <div className="border-border bg-card/40 mt-6 max-w-3xl rounded-lg border p-6 sm:p-7">
          <h3 className="font-serif text-lg font-bold leading-snug tracking-normal">
            <JapaneseLineBreak text={turningPoint.title} />
          </h3>
          <p className="text-muted-foreground mt-4 text-sm leading-7">
            <JapaneseLineBreak text={turningPoint.body} />
          </p>
          <p className="text-muted-foreground mt-4 text-xs leading-6">
            その設計思想の全体像は{" "}
            <Link href="/harness" className="text-accent underline-offset-4 hover:underline">
              ハーネス設計
            </Link>
            、具体的な実装は{" "}
            <Link href="/ai" className="text-accent underline-offset-4 hover:underline">
              AI活用事例
            </Link>{" "}
            に展開しています。
          </p>
        </div>
      </section>

      {/* 大事にしている軸(価値観) */}
      <section className="mt-16">
        <div className="border-accent/70 flex items-end justify-between gap-6 border-l pl-5">
          <h2 className="font-serif text-2xl font-bold tracking-normal">
            <JapaneseLineBreak text="大事にしている軸" />
          </h2>
          <div className="bg-accent hidden h-px flex-1 sm:block" aria-hidden="true" />
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {values.map((value, index) => (
            <article
              key={value.title}
              className="border-border bg-card/70 rounded-lg border p-6 shadow-sm"
            >
              <span className="text-accent font-mono text-sm leading-none font-bold tracking-[0.18em]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-serif text-lg leading-snug font-bold tracking-normal">
                <JapaneseLineBreak text={value.title} />
              </h3>
              <p className="text-muted-foreground mt-3 text-sm leading-7">
                <JapaneseLineBreak text={value.body} />
              </p>
              <p className="text-foreground border-accent/30 mt-4 border-t pt-3 text-xs leading-6">
                <JapaneseLineBreak text={value.effect} />
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* スキル / 得意な相談 / 対応しないこと */}
      <section className="mt-16">
        <div className="border-accent/70 border-l pl-5">
          <h2 className="font-serif text-2xl font-bold tracking-normal">
            <JapaneseLineBreak text="スキル・対応領域" />
          </h2>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {/* 技術スタック */}
          <div className="border-border bg-card/70 rounded-lg border p-6">
            <h3 className="font-serif text-lg font-bold leading-snug">
              <JapaneseLineBreak text="技術スタック" />
            </h3>
            <div className="mt-4 space-y-3 text-xs">
              <div>
                <p className="text-muted-foreground font-mono text-[10px] tracking-wider uppercase">
                  Core
                </p>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {stack.primary.map((item) => (
                    <Badge key={item} variant="outline" className="font-mono text-[10px]">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-muted-foreground font-mono text-[10px] tracking-wider uppercase">
                  AI
                </p>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {stack.ai.map((item) => (
                    <Badge key={item} variant="outline" className="font-mono text-[10px]">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-muted-foreground font-mono text-[10px] tracking-wider uppercase">
                  Infra
                </p>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {stack.infrastructure.map((item) => (
                    <Badge key={item} variant="outline" className="font-mono text-[10px]">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-muted-foreground font-mono text-[10px] tracking-wider uppercase">
                  Domain
                </p>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {stack.domain.map((item) => (
                    <Badge key={item} variant="outline" className="font-mono text-[10px]">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 得意な相談 + 対応しないこと */}
          <div className="space-y-5">
            <div className="border-accent/40 bg-card/70 rounded-lg border p-6">
              <h3 className="font-serif text-lg font-bold leading-snug">
                <JapaneseLineBreak text="得意な相談" />
              </h3>
              <ul className="text-muted-foreground mt-4 space-y-2 text-sm leading-7">
                {goodAt.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-accent shrink-0">◎</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-border bg-card/40 rounded-lg border border-dashed p-6">
              <h3 className="font-serif text-base font-bold leading-snug">
                <JapaneseLineBreak text="対応しないこと" />
              </h3>
              <ul className="text-muted-foreground mt-3 space-y-2 text-xs leading-6">
                {notDoing.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-muted-foreground shrink-0">×</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-border mt-16 border-t pt-10">
        <p className="text-muted-foreground max-w-2xl text-sm leading-7">
          <JapaneseLineBreak text="気になった方は、AI活用事例とハーネス設計もあわせてご覧いただけると、実際の動きと考え方がつながって伝わります。" />
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className={buttonVariants({
              size: "lg",
              className: "bg-accent text-accent-foreground hover:bg-accent/90 rounded-sm",
            })}
          >
            お問い合わせ
          </Link>
          <Link
            href="/ai"
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            AI活用事例を見る
          </Link>
          <Link
            href="/harness"
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            ハーネス設計を見る
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
      <Image
        src="/illustrations/hanko-e2life.png"
        alt=""
        width={72}
        height={72}
        className="absolute right-6 bottom-8 hidden opacity-80 sm:block"
        aria-hidden="true"
      />
    </div>
  );
}
