import type { Metadata } from "next";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

import { SectionHeading } from "@/components/shared/section-heading";

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

const topics = [
  {
    title: "エコシステム全体像",
    description: "複数リポジトリを横断する AI 開発基盤の構成。",
  },
  {
    title: "サブエージェント構成",
    description: "役割ごとに分担するマルチエージェントの設計。",
  },
  {
    title: "記録システム",
    description: "知識を蓄積・活用する多層の記録の仕組み。",
  },
  {
    title: "自走モードと安全設計",
    description: "自律実行と、それを支える安全装置。",
  },
  {
    title: "セキュリティ設計",
    description: "権限分離と機密情報の取り扱い。",
  },
  {
    title: "SNS 自動化パイプライン",
    description: "コンテンツ生成・配信の自動化。",
  },
] as const;

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
          {topics.map((topic, index) => (
            <div key={topic.title} className="border-border border-r border-b p-6">
              <span className="text-gradient font-mono text-sm font-bold">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-medium">{topic.title}</h3>
              <p className="text-muted-foreground mt-2 text-sm">{topic.description}</p>
              <p className="text-muted-foreground mt-3 font-mono text-xs">今後公開予定</p>
            </div>
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
