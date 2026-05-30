import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { SectionHeading } from "@/components/shared/section-heading";

const accentGradient = "linear-gradient(to right, var(--accent-from), var(--accent-to))";

export function CaseStudySection() {
  return (
    <section className="py-20">
      <SectionHeading title="ケーススタディ" description="AI を活用した開発プロセス設計の実例" />
      <Card className="relative mt-12 overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-0.5"
          style={{ backgroundImage: accentGradient }}
        />
        <CardHeader>
          <CardTitle>PA エコシステム — マルチリポ AI 開発基盤</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            個人の事業運営を AI
            エージェントで効率化するエコシステム。複数リポジトリを横断するマルチエージェント構成で、開発・運用・コンテンツ更新を自動化しています。
          </p>
          <p className="text-muted-foreground mt-3 text-sm">
            詳細は AI 活用ページ（今後公開予定）にて体系的に紹介します。
          </p>
          <div className="mt-4">
            <Link href="/skills" className={buttonVariants({ variant: "outline", size: "sm" })}>
              技術スタックを見る
            </Link>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
