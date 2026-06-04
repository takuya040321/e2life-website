import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

import { cn } from "@/lib/utils/cn";

import { EnsoAnimation, HeroAnimation } from "./hero-animation";

export function HeroSection() {
  return (
    <section className="relative min-h-[78vh] overflow-hidden py-20 sm:py-28">
      <EnsoAnimation />
      <HeroAnimation>
        <div className="relative z-10 grid min-h-[56vh] items-center gap-10 sm:grid-cols-[minmax(4rem,0.55fr)_minmax(0,1fr)]">
          <div className="hidden h-full items-center sm:flex">
            <div
              aria-label="AI と開発プロセス設計"
              className="text-accent border-accent/70 flex h-72 items-center gap-5 border-l pl-5 font-serif text-sm tracking-[0.28em] [writing-mode:vertical-rl]"
            >
              AI x Development Process
            </div>
          </div>
          <div className="max-w-3xl text-center sm:text-left">
            <p className="text-muted-foreground mb-5 font-mono text-sm">
              AI x Development Process Engineering
            </p>
            <h1 className="font-serif text-4xl leading-tight font-bold tracking-normal sm:text-6xl lg:text-7xl">
              AI で開発プロセス自体を
              <br className="hidden sm:block" />
              <span className="text-accent">設計する</span>エンジニア
            </h1>
            <div className="bg-accent mt-6 h-px w-full origin-left sm:w-4/5" />
            <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-lg sm:mx-0">
              マルチエージェント構成による品質管理と、自己改善する開発プロセスで、
              <br className="hidden sm:block" />
              プロジェクトの生産性を根本から変えます。
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:justify-start">
              <Link
                href="/contact"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "bg-accent text-accent-foreground hover:bg-accent/90 border-accent rounded-sm px-5",
                )}
              >
                お問い合わせ
              </Link>
              <Link
                href="/skills"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "border-primary/70 bg-background/70 hover:border-accent hover:text-accent rounded-sm px-5 font-medium backdrop-blur-sm",
                )}
              >
                スキルを見る
              </Link>
            </div>
          </div>
        </div>
      </HeroAnimation>
    </section>
  );
}
