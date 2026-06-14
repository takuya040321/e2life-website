import { SectionHeading } from "@/components/shared/section-heading";
import { JapaneseLineBreak } from "@/components/shared/japanese-line-break";

const services = [
  {
    number: "01",
    eyebrow: "Process Automation",
    title: "AI による開発プロセスの自走化",
    body: "要件整理・実装・テスト・デプロイまでを、AI に自走させるフローを設計します。人間が逐一指示を出さなくても進む形に組み替えます。",
  },
  {
    number: "02",
    eyebrow: "Multi-agent Design",
    title: "マルチエージェント構成の設計",
    body: "役割ごとに専門のエージェントを分け、議論・実装・レビューを分業させます。1 体の万能 AI に頼らない、組織型の体制を作ります。",
  },
  {
    number: "03",
    eyebrow: "Record & Review",
    title: "記録・レビュー基盤の組み込み",
    body: "判断・知見・対話を 1 か所に集中させ、独立した目でレビューを通す仕組みを組み込みます。使うほど判断の精度が上がっていきます。",
  },
] as const;

export function WhatIDoSection() {
  return (
    <section className="py-24">
      <SectionHeading
        title="やっていること"
        description="主に 3 つの領域で開発プロセス設計をしています。"
        align="left"
      />

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {services.map((service) => (
          <div
            key={service.number}
            className="border-border bg-card/70 hover:border-accent/60 relative overflow-hidden rounded-lg border p-6 shadow-sm transition-colors sm:p-7"
          >
            <span
              className="border-accent/15 absolute top-5 right-5 size-20 rounded-full border"
              aria-hidden="true"
            />
            <div className="flex items-baseline gap-3">
              <span className="text-accent font-mono text-sm leading-none font-bold tracking-[0.18em]">
                {service.number}
              </span>
              <span className="text-muted-foreground/80 font-mono text-[10px] font-bold tracking-[0.22em] uppercase">
                {service.eyebrow}
              </span>
            </div>
            <h3 className="mt-4 font-serif text-lg font-bold tracking-normal">
              <JapaneseLineBreak text={service.title} />
            </h3>
            <p className="text-muted-foreground mt-3 text-sm leading-7">
              <JapaneseLineBreak text={service.body} />
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
