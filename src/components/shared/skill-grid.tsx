"use client";

import { useState } from "react";

import { CategoryFilter } from "@/components/shared/category-filter";
import { SkillBadge } from "@/components/shared/skill-badge";

import type { Skill, SkillCategory } from "@/lib/data/skills";
import { skillCategories } from "@/lib/data/skills";

type SkillGridProps = {
  skills: Skill[];
};

export function SkillGrid({ skills }: SkillGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory | null>(null);

  const presentCategories = skillCategories.filter((cat) =>
    skills.some((s) => s.category === cat),
  );

  const filtered = selectedCategory
    ? skills.filter((s) => s.category === selectedCategory)
    : skills;

  return (
    <div>
      <CategoryFilter
        categories={presentCategories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((skill) => (
          <SkillBadge key={skill.id} skill={skill} />
        ))}
      </div>
    </div>
  );
}
