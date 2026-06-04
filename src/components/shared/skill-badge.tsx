"use client";

import Image from "next/image";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";

import type { Skill } from "@/lib/data/skills";
import { formatMonths, skillLevelLabels } from "@/lib/data/skills";

type SkillBadgeProps = {
  skill: Skill;
  showYears?: boolean;
};

export function SkillBadge({ skill, showYears = true }: SkillBadgeProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="border-border bg-card text-card-foreground hover:border-accent flex items-center gap-3 rounded-lg border p-4 transition-colors">
      <div className="border-border bg-background flex size-10 shrink-0 items-center justify-center rounded-md border">
        {imgError ? (
          <span className="text-muted-foreground text-sm font-medium">
            {skill.name.slice(0, 2)}
          </span>
        ) : (
          <Image
            src={skill.logoPath}
            alt={skill.name}
            width={24}
            height={24}
            className="size-6"
            onError={() => setImgError(true)}
          />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <p className="truncate font-medium">{skill.name}</p>
          {skill.isStrong && (
            <span className="text-accent" aria-label="特に得意" title="特に得意">
              ★
            </span>
          )}
        </div>
        {showYears && (
          <div className="mt-1 flex flex-wrap items-center gap-1.5">
            <Badge variant="outline" className="border-accent/50 bg-accent/10 text-accent text-xs">
              {skillLevelLabels[skill.level]}
            </Badge>
            <span className="text-muted-foreground text-xs">
              業務 {formatMonths(skill.businessMonths)} / 累計 {formatMonths(skill.totalMonths)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
