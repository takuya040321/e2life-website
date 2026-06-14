import { SectionHeading } from "@/components/shared/section-heading";
import { JapaneseLineBreak } from "@/components/shared/japanese-line-break";

const steps = [
  {
    number: "01",
    title: "ヒアリングと現状診断",
    body: "やりたいことと、既存の開発・運用フローを伺います。AI で自走化できる箇所と、人間が握るべき判断を切り分けます。",
  },
  {
    number: "02",
    title: "ハーネス設計と組み込み",
    body: "役割ごとに専門エージェントを設計し、記録・レビュー・自走の仕組みを組み込みます。重要判断は必ず人間ゲートを通します。",
  },
  {
    number: "03",
    title: "自走化と継続改善",
    body: "実装したフローを動かし、記録から学んで継続的に改善します。区切りごとに振り返り、次の判断に活かす循環を作ります。",
  },
] as const;

export function ProcessSection() {
  return (
    <section className="py-20">
      <SectionHeading
        title="ご一緒する場合の流れ"
        description="お問い合わせから自走化までの 3 ステップ。"
        align="left"
      />
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {steps.map((step, index) => (
          <div
            key={step.number}
            className="border-border bg-card/70 relative overflow-hidden rounded-lg border p-6 shadow-sm sm:p-7"
          >
            <span
              className="border-accent/15 absolute top-5 right-5 size-20 rounded-full border"
              aria-hidden="true"
            />
            <div className="flex items-center gap-3">
              <span className="text-accent font-mono text-sm leading-none font-bold tracking-[0.18em]">
                {step.number}
              </span>
              {index < steps.length - 1 && (
                <span className="text-muted-foreground hidden font-mono text-xs md:inline">
                  →
                </span>
              )}
            </div>
            <h3 className="mt-4 font-serif text-lg font-bold tracking-normal">
              <JapaneseLineBreak text={step.title} />
            </h3>
            <p className="text-muted-foreground mt-3 text-sm leading-7">
              <JapaneseLineBreak text={step.body} />
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
