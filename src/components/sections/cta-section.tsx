import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

import { SectionHeading } from "@/components/shared/section-heading";

import { cn } from "@/lib/utils/cn";

export function CTASection() {
  return (
    <section className="border-border border-t py-20 text-center">
      <SectionHeading
        title="お気軽にご相談ください"
        description="スキルシートのダウンロードやお問い合わせはこちらから。"
      />
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
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
            "border-primary/70 hover:border-accent hover:text-accent rounded-sm px-5",
          )}
        >
          スキルを見る
        </Link>
        <a
          href="/downloads/skill-sheet.pdf"
          download
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "border-border rounded-sm px-5",
          )}
        >
          スキルシート PDF
        </a>
      </div>
    </section>
  );
}
