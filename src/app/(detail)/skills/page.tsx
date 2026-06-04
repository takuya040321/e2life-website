import type { Metadata } from "next";

import { SkillGrid } from "@/components/shared/skill-grid";

import { skills } from "@/lib/data/skills";

export const metadata: Metadata = {
  title: "SE スキル",
  description: "技術スタック・経験年数の一覧",
  alternates: { canonical: "/skills" },
  openGraph: {
    title: "SE スキル",
    description: "技術スタック・経験年数の一覧",
    url: "/skills",
  },
};

export default function SkillsPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <div>
        <h2 className="text-foreground font-serif text-3xl font-bold tracking-normal">SE スキル</h2>
        <p className="text-muted-foreground mt-3">技術スタックと経験年数の一覧です。</p>
      </div>
      <div className="mt-12">
        <SkillGrid skills={skills} />
      </div>
    </div>
  );
}
