import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

import { JapaneseLineBreak } from "@/components/shared/japanese-line-break";

import { cn } from "@/lib/utils/cn";

import { EnsoAnimation, HeroAnimation } from "./hero-animation";

export function HeroSection() {
  return (
    <section className="relative min-h-[78vh] overflow-hidden py-20 sm:py-28">
      <EnsoAnimation />
      <HeroAnimation>
        <div className="relative z-10 mx-auto grid min-h-[56vh] max-w-4xl place-items-center text-center">
          <div>
            <p className="text-accent font-mono text-xs font-bold tracking-[0.28em] uppercase">
              AI x Development Process Engineering
            </p>
            <div className="bg-background/80 dark:bg-background/70 mt-6 inline-block rounded-sm px-4 py-3">
              <h1 className="font-serif text-3xl leading-tight font-bold tracking-normal sm:text-5xl lg:text-6xl">
                <span className="block">AI を、</span>
                <span className="block">
                  ひとりの<span className="text-accent">会社</span>のように
                </span>
                <span className="block">経営するエンジニア</span>
              </h1>
            </div>
            <div className="bg-accent mx-auto mt-8 h-px w-32 origin-center" />
            <p className="text-muted-foreground mx-auto mt-8 max-w-2xl text-base leading-8 sm:text-lg">
              <JapaneseLineBreak text="マルチエージェント構成 × 記録集中管理 × 独立レビューで、" />
              <br className="hidden sm:block" />
              <JapaneseLineBreak text="開発プロセスごと自走させる設計を行います。" />
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/contact"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "bg-accent text-accent-foreground hover:bg-accent/90 border-accent rounded-sm px-6",
                )}
              >
                お問い合わせ
              </Link>
              <Link
                href="/harness"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "border-primary/70 bg-background/70 hover:border-accent hover:text-accent rounded-sm px-6 font-medium backdrop-blur-sm",
                )}
              >
                ハーネス設計を見る
              </Link>
            </div>
          </div>
        </div>
      </HeroAnimation>
    </section>
  );
}
