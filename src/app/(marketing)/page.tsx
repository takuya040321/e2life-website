import Link from "next/link";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-6">
      <section className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          AI で開発プロセス自体を設計する
          <br />
          エンジニア
        </h1>
        <p className="text-foreground/70 mt-4 max-w-2xl text-lg">
          マルチエージェント構成による品質管理と、自己改善する開発プロセスで、
          プロジェクトの生産性を根本から変えます。
        </p>
        <div className="mt-8 flex gap-4">
          <Link
            href="/contact"
            className="bg-foreground text-background rounded-lg px-6 py-3 text-sm font-medium transition-opacity hover:opacity-90"
          >
            お問い合わせ
          </Link>
          <Link
            href="/skills"
            className="border-foreground/20 hover:bg-foreground/5 rounded-lg border px-6 py-3 text-sm font-medium transition-colors"
          >
            スキルを見る
          </Link>
        </div>
      </section>

      <section className="py-20">
        <h2 className="text-center text-2xl font-bold">3 つの強み</h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          <div className="border-foreground/10 rounded-lg border p-6">
            <h3 className="text-lg font-semibold">AI ネイティブな開発設計</h3>
            <p className="text-foreground/70 mt-2 text-sm">
              AI を補助ツールではなく、開発プロセスの中核に据えた設計を行います。
            </p>
          </div>
          <div className="border-foreground/10 rounded-lg border p-6">
            <h3 className="text-lg font-semibold">マルチエージェント品質管理</h3>
            <p className="text-foreground/70 mt-2 text-sm">
              複数の AI エージェントによるレビュー・テスト・監視で、品質を多層的に担保します。
            </p>
          </div>
          <div className="border-foreground/10 rounded-lg border p-6">
            <h3 className="text-lg font-semibold">自己改善する仕組み</h3>
            <p className="text-foreground/70 mt-2 text-sm">
              開発プロセスそのものが学習・改善を繰り返し、継続的に最適化されます。
            </p>
          </div>
        </div>
      </section>

      <section className="border-foreground/10 border-t py-20 text-center">
        <h2 className="text-2xl font-bold">お気軽にご相談ください</h2>
        <p className="text-foreground/70 mt-4">
          スキルシートのダウンロードやお問い合わせはこちらから。
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/contact"
            className="bg-foreground text-background rounded-lg px-6 py-3 text-sm font-medium transition-opacity hover:opacity-90"
          >
            お問い合わせ
          </Link>
        </div>
      </section>
    </div>
  );
}
