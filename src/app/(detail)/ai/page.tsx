import type { Metadata } from "next";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

import { SectionHeading } from "@/components/shared/section-heading";

import { aiTopics } from "@/lib/data/ai-topics";

export const metadata: Metadata = {
  title: "AI 活用",
  description: "AI で開発プロセス自体を設計する取り組みの概要",
  alternates: { canonical: "/ai" },
  openGraph: {
    title: "AI 活用",
    description: "AI で開発プロセス自体を設計する取り組みの概要",
    url: "/ai",
  },
};

export default function AiHubPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <SectionHeading
        title="AI 活用"
        description="AI で開発プロセス自体を設計する取り組みの概要です。"
        align="left"
      />

      <p className="text-muted-foreground mt-10 max-w-2xl">
        マルチエージェント構成による品質管理と、自己改善する開発プロセスを、複数リポジトリを横断するエコシステムとして構築・運用しています。各テーマの詳細は順次公開していきます。
      </p>

      <div className="mt-12">
        <h2 className="text-xl font-bold">取り組みの構成</h2>
        <div className="border-border mt-6 grid border-t border-l sm:grid-cols-2 lg:grid-cols-3">
          {aiTopics.map((topic, index) => (
            <Link
              key={topic.slug}
              href={`/ai/${topic.slug}`}
              className="border-border border-r border-b p-6 transition-colors hover:border-[var(--accent-from)]"
            >
              <span className="text-gradient font-mono text-sm font-bold">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-medium">{topic.title}</h3>
              <p className="text-muted-foreground mt-2 text-sm">{topic.summary}</p>
              <p className="mt-3 font-mono text-xs text-[var(--accent-from)]">詳細を見る →</p>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-12 flex gap-4">
        <Link href="/contact" className={buttonVariants({ variant: "outline" })}>
          お問い合わせ
        </Link>
        <Link href="/skills" className={buttonVariants({ variant: "outline" })}>
          スキルを見る
        </Link>
      </div>
    </div>
  );
}
