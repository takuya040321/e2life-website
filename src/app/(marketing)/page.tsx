import { AboutMeSection } from "@/components/sections/about-me-section";
import { CTASection } from "@/components/sections/cta-section";
import { ExploreSection } from "@/components/sections/explore-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ProcessSection } from "@/components/sections/process-section";
import { WhatIDoSection } from "@/components/sections/what-i-do-section";

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
