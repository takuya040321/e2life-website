import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import type { CareerProject } from "@/lib/data/career";

type CareerCardProps = {
  project: CareerProject;
};

export function CareerCard({ project }: CareerCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap items-start justify-between gap-2">
          <CardTitle className="text-lg">{project.title}</CardTitle>
          <span className="text-muted-foreground text-sm">
            {project.period.start} 〜 {project.period.end ?? "現在"}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{project.description}</p>
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
                ・{highlight}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
