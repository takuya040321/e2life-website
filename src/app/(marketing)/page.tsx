import { CaseStudySection } from "@/components/sections/case-study-section";
import { CTASection } from "@/components/sections/cta-section";
import { HeroSection } from "@/components/sections/hero-section";
import { StrengthsSection } from "@/components/sections/strengths-section";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-6">
      <HeroSection />
      <StrengthsSection />
      <CaseStudySection />
      <CTASection />
    </div>
  );
}
