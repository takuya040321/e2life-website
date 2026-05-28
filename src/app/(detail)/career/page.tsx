import type { Metadata } from "next";

import { projects } from "@/lib/data/career";

export const metadata: Metadata = {
  title: "職務経歴",
  description: "匿名化した案件実績の一覧",
};

export default function CareerPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <h1 className="text-3xl font-bold">職務経歴</h1>
      <p className="text-foreground/70 mt-4">
        匿名化した案件実績です。顧客名・契約金額は非公開です。
      </p>
      <div className="mt-12 space-y-8">
        {projects.map((project) => (
          <div key={project.id} className="border-foreground/10 rounded-lg border p-6">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <h2 className="text-lg font-semibold">{project.title}</h2>
              <span className="text-foreground/50 text-sm">
                {project.period.start} 〜 {project.period.end ?? "現在"}
              </span>
            </div>
            <p className="text-foreground/70 mt-2">{project.description}</p>
            <div className="text-foreground/60 mt-4 flex flex-wrap gap-4 text-sm">
              <span>役割: {project.role}</span>
              <span>チーム: {project.teamSize}</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="bg-foreground/5 rounded-full px-3 py-1 text-xs font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
            <ul className="mt-4 space-y-1">
              {project.highlights.map((highlight) => (
                <li key={highlight} className="text-foreground/70 text-sm">
                  ・{highlight}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
