import { SectionHeading } from "@/components/shared/section-heading";
import { JapaneseLineBreak } from "@/components/shared/japanese-line-break";

const strengths = [
  {
    title: "AI ネイティブな開発設計",
    description:
      "AI を補助ツールではなく、開発プロセスの中核に据えた設計を行います。要件定義から実装・テスト・デプロイまで、AI が一貫して関与する開発フローを構築します。",
  },
  {
    title: "マルチエージェント品質管理",
    description:
      "複数の AI エージェントによるレビュー・テスト・監視で、品質を多層的に担保します。人間のレビューと AI レビューを組み合わせたハイブリッド品質管理を実現します。",
  },
  {
    title: "自己改善する仕組み",
    description:
      "開発プロセスそのものが学習・改善を繰り返し、継続的に最適化されます。記録システムとフィードバックループで、ナレッジが蓄積・活用される仕組みを構築します。",
  },
] as const;

export function StrengthsSection() {
  return (
    <section className="py-20">
      <SectionHeading title="3 つの強み" align="left" />
      <div className="border-border bg-card/70 mt-12 grid overflow-hidden border-t border-l shadow-[0_18px_60px_color-mix(in_srgb,var(--foreground)_8%,transparent)] sm:grid-cols-3">
        {strengths.map((strength, index) => (
          <div
            key={strength.title}
            className="border-border relative border-r border-b p-6 backdrop-blur-[1px]"
          >
            <div className="bg-accent absolute top-0 left-0 h-px w-12" aria-hidden="true" />
            <span className="text-accent font-mono text-sm font-bold">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-3 font-serif text-lg font-bold">
              <JapaneseLineBreak text={strength.title} />
            </h3>
            <p className="text-muted-foreground mt-2 text-sm">
              <JapaneseLineBreak text={strength.description} />
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
