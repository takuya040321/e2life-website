import type { Metadata } from "next";

import { CareerCard } from "@/components/shared/career-card";
import { SectionHeading } from "@/components/shared/section-heading";

import { projects } from "@/lib/data/career";

export const metadata: Metadata = {
  title: "職務経歴",
  description: "匿名化した案件実績の一覧",
};

export default function CareerPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <SectionHeading
        title="職務経歴"
        description="匿名化した案件実績です。顧客名・契約金額は非公開です。"
        align="left"
      />
      <div className="mt-12 space-y-6">
        {projects.map((project) => (
          <CareerCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
