"use client";

import Image from "next/image";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";

import type { Skill } from "@/lib/data/skills";

type SkillBadgeProps = {
  skill: Skill;
  showYears?: boolean;
};

export function SkillBadge({ skill, showYears = true }: SkillBadgeProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="border-border flex items-center gap-3 rounded-lg border p-4">
      <div className="bg-muted flex size-10 shrink-0 items-center justify-center rounded-md">
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
        <p className="font-medium">{skill.name}</p>
        {showYears && (
          <Badge variant="secondary" className="mt-1 text-xs">
            {skill.yearsOfExperience}年
          </Badge>
        )}
      </div>
    </div>
  );
}
