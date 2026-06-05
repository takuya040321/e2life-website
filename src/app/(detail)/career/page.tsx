import type { Metadata } from "next";

import { CareerCard } from "@/components/shared/career-card";
import { JapaneseLineBreak } from "@/components/shared/japanese-line-break";

import { projects } from "@/lib/data/career";

export const metadata: Metadata = {
  title: "職務経歴",
  description: "匿名化した案件実績の一覧",
  alternates: { canonical: "/career" },
  openGraph: {
    title: "職務経歴",
    description: "匿名化した案件実績の一覧",
    url: "/career",
  },
};

export default function CareerPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <div>
        <h2 className="text-foreground font-serif text-3xl font-bold tracking-normal">
          <JapaneseLineBreak text="職務経歴" />
        </h2>
        <p className="text-muted-foreground mt-3">
          <JapaneseLineBreak text="匿名化した案件実績です。顧客名・契約金額は非公開です。" />
        </p>
      </div>
      <div className="border-primary/80 mt-12 ml-2 space-y-6 border-l-2 pl-6 md:pl-8">
        {projects.map((project) => (
          <CareerCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
