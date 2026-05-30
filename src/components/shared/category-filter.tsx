"use client";

import { Button } from "@/components/ui/button";

import type { SkillCategory } from "@/lib/data/skills";
import { skillCategoryLabels } from "@/lib/data/skills";

const accentGradient = "linear-gradient(to right, var(--accent-from), var(--accent-to))";

type CategoryFilterProps = {
  categories: readonly SkillCategory[];
  selected: SkillCategory | null;
  onSelect: (category: SkillCategory | null) => void;
};

function activeStyle(active: boolean) {
  return active ? { backgroundImage: accentGradient } : undefined;
}

export function CategoryFilter({ categories, selected, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant={selected === null ? "default" : "outline"}
        size="sm"
        onClick={() => onSelect(null)}
        className={selected === null ? "border-0 text-white" : ""}
        style={activeStyle(selected === null)}
      >
        すべて
      </Button>
      {categories.map((category) => {
        const active = selected === category;
        return (
          <Button
            key={category}
            variant={active ? "default" : "outline"}
            size="sm"
            onClick={() => onSelect(category)}
            className={active ? "border-0 text-white" : ""}
            style={activeStyle(active)}
          >
            {skillCategoryLabels[category]}
          </Button>
        );
      })}
    </div>
  );
}
