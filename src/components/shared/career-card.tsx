import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { JapaneseLineBreak } from "./japanese-line-break";

import type { CareerProject } from "@/lib/data/career";

type CareerCardProps = {
  project: CareerProject;
};

export function CareerCard({ project }: CareerCardProps) {
  return (
    <article className="relative">
      <span
        aria-hidden="true"
        className="bg-accent ring-background absolute top-6 -left-[31px] size-3 rounded-full ring-4 md:-left-[39px]"
      />
      <Card className="border-border bg-card/70 hover:ring-accent rounded-lg border shadow-sm transition-shadow">
        <CardHeader>
          <div className="flex flex-col items-start justify-between gap-2 sm:flex-row">
            <CardTitle className="min-w-0 flex-1 font-serif text-lg tracking-normal">
              <JapaneseLineBreak text={project.title} />
            </CardTitle>
            <span className="text-accent shrink-0 font-mono text-sm">
              {project.period.start} 〜 {project.period.end ?? "現在"}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            <JapaneseLineBreak text={project.description} />
          </p>
          <div className="text-muted-foreground mt-3 flex flex-wrap gap-4 text-sm">
            <span>役割: {project.role}</span>
            <span>チーム: {project.teamSize}</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>
          {project.highlights.length > 0 && (
            <ul className="mt-4 space-y-1">
              {project.highlights.map((highlight) => (
                <li key={highlight} className="text-muted-foreground text-sm">
                  <JapaneseLineBreak text={`・${highlight}`} />
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </article>
  );
}
