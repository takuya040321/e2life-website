import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

import { JapaneseLineBreak } from "@/components/shared/japanese-line-break";

import { cn } from "@/lib/utils/cn";

export function CTASection() {
  return (
    <section className="relative overflow-hidden py-24 text-center">
      <div
        className="border-accent/40 absolute top-1/2 left-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed"
        aria-hidden="true"
      />
      <div
        className="border-gold/30 absolute top-1/2 left-1/2 size-96 -translate-x-1/2 -translate-y-1/2 rounded-full border"
        aria-hidden="true"
      />
      <div className="relative z-10">
        <p className="text-accent font-mono text-xs font-bold tracking-[0.28em] uppercase">
          Let&apos;s talk
        </p>
        <h2 className="mt-4 font-serif text-2xl font-bold tracking-normal sm:text-3xl">
          <JapaneseLineBreak text="AI を組織のように動かすご相談を受け付けています" />
        </h2>
        <p className="text-muted-foreground mx-auto mt-5 max-w-xl text-sm leading-7">
          <JapaneseLineBreak text="開発プロセスの自走化、マルチエージェント設計、記録基盤の構築まで。まずはお気軽にご相談ください。" />
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-accent text-accent-foreground hover:bg-accent/90 border-accent rounded-sm px-8",
            )}
          >
            お問い合わせ
          </Link>
          <Link
            href="/about"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "border-primary/70 hover:border-accent hover:text-accent rounded-sm px-6",
            )}
          >
            自分について
          </Link>
        </div>
      </div>
    </section>
  );
}
