import type { Metadata } from "next";

import { SectionHeading } from "@/components/shared/section-heading";
import { SkillGrid } from "@/components/shared/skill-grid";

import { skills } from "@/lib/data/skills";

export const metadata: Metadata = {
  title: "SE スキル",
  description: "技術スタック・経験年数の一覧",
};

export default function SkillsPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <SectionHeading
        title="SE スキル"
        description="技術スタックと経験年数の一覧です。"
        align="left"
      />
      <div className="mt-12">
        <SkillGrid skills={skills} />
      </div>
    </div>
  );
}
