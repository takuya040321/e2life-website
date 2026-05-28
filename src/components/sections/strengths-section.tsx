import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { SectionHeading } from "@/components/shared/section-heading";

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
      <SectionHeading title="3 つの強み" />
      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {strengths.map((strength) => (
          <Card key={strength.title}>
            <CardHeader>
              <CardTitle className="text-lg">{strength.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">{strength.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
