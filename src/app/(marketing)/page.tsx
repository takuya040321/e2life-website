import type { Metadata } from "next";

import { AboutMeSection } from "@/components/sections/about-me-section";
import { CTASection } from "@/components/sections/cta-section";
import { ExploreSection } from "@/components/sections/explore-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ProcessSection } from "@/components/sections/process-section";
import { WhatIDoSection } from "@/components/sections/what-i-do-section";

const description =
  "個人事業主・小規模事業・開発組織の判断負荷を、役割を分けた AI と記録基盤の組み合わせで下げます。AI ネイティブな開発プロセス設計エンジニアのポートフォリオサイト。";

export const metadata: Metadata = {
  title: "AI を、ひとつの組織のように経営するエンジニア",
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title: "AI を、ひとつの組織のように経営するエンジニア",
    description,
    url: "/",
  },
  twitter: {
    title: "AI を、ひとつの組織のように経営するエンジニア",
    description,
  },
};

export default function HomePage() {
  return (
    <div>
      <div className="mx-auto max-w-5xl px-6">
        <HeroSection />
      </div>
      <div className="mx-auto max-w-5xl px-6">
        <AboutMeSection />
        <WhatIDoSection />
        <ProcessSection />
        <ExploreSection />
      </div>
      <div className="border-border border-t">
        <div className="mx-auto max-w-5xl px-6">
          <CTASection />
        </div>
      </div>
    </div>
  );
}
