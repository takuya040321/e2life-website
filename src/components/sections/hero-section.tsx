import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

import { HeroAnimation } from "./hero-animation";

export function HeroSection() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <HeroAnimation>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          AI で開発プロセス自体を設計する
          <br />
          エンジニア
        </h1>
        <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
          マルチエージェント構成による品質管理と、自己改善する開発プロセスで、
          プロジェクトの生産性を根本から変えます。
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link href="/contact" className={buttonVariants({ size: "lg" })}>
            お問い合わせ
          </Link>
          <Link href="/skills" className={buttonVariants({ variant: "outline", size: "lg" })}>
            スキルを見る
          </Link>
        </div>
      </HeroAnimation>
    </section>
  );
}
