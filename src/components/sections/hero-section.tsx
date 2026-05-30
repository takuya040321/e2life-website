import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { Glow } from "@/components/ui/glow";
import { GradientText } from "@/components/ui/gradient-text";

import { cn } from "@/lib/utils/cn";

import { HeroAnimation } from "./hero-animation";

const accentGradient = "linear-gradient(to right, var(--accent-from), var(--accent-to))";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden text-center">
      <Glow className="top-1/3 left-1/2 size-[40rem] -translate-x-1/2 -translate-y-1/2" />
      <HeroAnimation>
        <p className="text-muted-foreground mb-4 font-mono text-sm">
          AI × Development Process Engineering
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-6xl">
          AI で開発プロセス自体を
          <br className="hidden sm:block" />
          <GradientText>設計する</GradientText>エンジニア
        </h1>
        <p className="text-muted-foreground mx-auto mt-6 max-w-xl text-lg text-pretty">
          マルチエージェント構成による品質管理と、自己改善する開発プロセスで、
          <br className="hidden sm:block" />
          プロジェクトの生産性を根本から変えます。
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/contact"
            className={cn(buttonVariants({ size: "lg" }), "border-0 text-white")}
            style={{ backgroundImage: accentGradient }}
          >
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
