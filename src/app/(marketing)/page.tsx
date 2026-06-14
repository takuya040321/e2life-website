import { CaseStudySection } from "@/components/sections/case-study-section";
import { CTASection } from "@/components/sections/cta-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ProblemSolutionSection } from "@/components/sections/problem-solution-section";
import { ProcessSection } from "@/components/sections/process-section";
import { StrengthsSection } from "@/components/sections/strengths-section";
import { TrustStrip } from "@/components/sections/trust-strip";

export default function HomePage() {
  return (
    <div>
      <div className="mx-auto max-w-5xl px-6">
        <HeroSection />
      </div>
      <div className="mx-auto max-w-5xl px-6">
        <TrustStrip />
      </div>
      <div className="mx-auto max-w-5xl px-6">
        <ProblemSolutionSection />
        <StrengthsSection />
        <ProcessSection />
        <CaseStudySection />
      </div>
      <div className="border-border border-t">
        <div className="mx-auto max-w-5xl px-6">
          <CTASection />
        </div>
      </div>
    </div>
  );
}
