"use client";

import { Button } from "@/components/ui/button";

import type { SkillCategory } from "@/lib/data/skills";
import { skillCategoryLabels } from "@/lib/data/skills";

type CategoryFilterProps = {
  categories: readonly SkillCategory[];
  selected: SkillCategory | null;
  onSelect: (category: SkillCategory | null) => void;
};

export function CategoryFilter({ categories, selected, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant={selected === null ? "default" : "outline"}
        size="sm"
        onClick={() => onSelect(null)}
      >
        すべて
      </Button>
      {categories.map((category) => (
        <Button
          key={category}
          variant={selected === category ? "default" : "outline"}
          size="sm"
          onClick={() => onSelect(category)}
        >
          {skillCategoryLabels[category]}
        </Button>
      ))}
    </div>
  );
}
