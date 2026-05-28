import type { Metadata } from "next";

import { skills } from "@/lib/data/skills";

export const metadata: Metadata = {
  title: "SE スキル",
  description: "技術スタック・経験年数の一覧",
};

export default function SkillsPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <h1 className="text-3xl font-bold">SE スキル</h1>
      <p className="text-foreground/70 mt-4">技術スタックと経験年数の一覧です。</p>
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="border-foreground/10 flex items-center gap-4 rounded-lg border p-4"
          >
            <div>
              <p className="font-medium">{skill.name}</p>
              <p className="text-foreground/50 text-sm">
                {skill.category} &middot; {skill.yearsOfExperience}年
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
