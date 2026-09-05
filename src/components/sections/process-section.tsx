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
    body: "役割ごとに専任エージェントを設計し、記録・レビュー・自走の仕組みを組み込みます。重要判断は必ず人間ゲートを通します。",
  },
  {
    number: "03",
    title: "自走化と継続改善",
    body: "実装したフローを動かし、記録から学んで継続的に改善します。区切りごとに振り返り、次の判断に活かす循環を作ります。",
  },
] as const;

export function ProcessSection() {
  return (
    <section className="py-24">
      <SectionHeading
        title="ご一緒する場合の流れ"
        description="お問い合わせから自走化まで、3 ステップで進めます。"
        align="left"
      />
      <ol className="border-accent/40 mt-12 max-w-3xl space-y-8 border-l-2 pl-10">
        {steps.map((step) => (
          <li key={step.number} className="relative">
            <span
              className="border-accent bg-background text-accent absolute -left-[42px] flex size-7 items-center justify-center rounded-full border-2 font-mono text-[11px] font-bold"
              aria-hidden="true"
            >
              {step.number}
            </span>
            <h3 className="font-serif text-lg leading-snug font-bold tracking-normal">
              <JapaneseLineBreak text={step.title} />
            </h3>
            <p className="text-muted-foreground mt-3 text-sm leading-7">
              <JapaneseLineBreak text={step.body} />
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
