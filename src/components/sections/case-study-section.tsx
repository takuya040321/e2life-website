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
      <div className="mt-12">
        <div className="relative py-2 pl-10">
          <div className="bg-primary/70 absolute top-0 bottom-0 left-3 w-px" aria-hidden="true" />
          <div
            className="bg-accent ring-background absolute top-3 left-1.5 size-3 rounded-full ring-4"
            aria-hidden="true"
          />
          <div className="border-border bg-card/70 border-y py-8 pr-2 pl-2 sm:pr-8 sm:pl-6">
            <div>
              <span className="text-accent font-mono text-sm font-bold">01</span>
              <h3 className="mt-2 font-serif text-lg font-bold">
                PA エコシステム — マルチリポ AI 開発基盤
              </h3>
              <p className="text-muted-foreground mt-2">
                個人の事業運営を AI
                エージェントで効率化するエコシステム。複数リポジトリを横断するマルチエージェント構成で、開発・運用・コンテンツ更新を自動化しています。
              </p>
              <p className="text-muted-foreground mt-2 text-sm">
                詳細は AI 活用ページにて体系的に紹介します。
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href="/ai"
                  className={buttonVariants({
                    variant: "outline",
                    size: "sm",
                    className: "hover:border-accent hover:text-accent rounded-sm",
                  })}
                >
                  AI 活用の詳細
                </Link>
                <Link
                  href="/skills"
                  className={buttonVariants({
                    variant: "outline",
                    size: "sm",
                    className: "hover:border-accent hover:text-accent rounded-sm",
                  })}
                >
                  技術スタック
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
