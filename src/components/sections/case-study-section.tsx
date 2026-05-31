import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

import { SectionHeading } from "@/components/shared/section-heading";

export function CaseStudySection() {
  return (
    <section className="py-20">
      <SectionHeading
        title="ケーススタディ"
        description="AI を活用した開発プロセス設計の実例"
        align="left"
      />
      <div className="border-border mt-12 border-t">
        <div className="border-border border-b py-8">
          <div className="flex gap-6">
            <span className="text-gradient font-mono text-sm font-bold">01</span>
            <div>
              <h3 className="text-lg font-medium">PA エコシステム — マルチリポ AI 開発基盤</h3>
              <p className="text-muted-foreground mt-2">
                個人の事業運営を AI
                エージェントで効率化するエコシステム。複数リポジトリを横断するマルチエージェント構成で、開発・運用・コンテンツ更新を自動化しています。
              </p>
              <p className="text-muted-foreground mt-2 text-sm">
                詳細は AI 活用ページ（今後公開予定）にて体系的に紹介します。
              </p>
              <div className="mt-4">
                <Link href="/skills" className={buttonVariants({ variant: "outline", size: "sm" })}>
                  技術スタックを見る
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
