import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

import { SectionHeading } from "@/components/shared/section-heading";

export function CTASection() {
  return (
    <section className="border-border border-t py-20 text-center">
      <SectionHeading
        title="お気軽にご相談ください"
        description="スキルシートのダウンロードやお問い合わせはこちらから。"
      />
      <div className="mt-8 flex justify-center gap-4">
        <Link href="/contact" className={buttonVariants({ size: "lg" })}>
          お問い合わせ
        </Link>
        <a
          href="/downloads/skill-sheet.pdf"
          download
          className={buttonVariants({ variant: "outline", size: "lg" })}
        >
          スキルシート PDF
        </a>
      </div>
    </section>
  );
}
