"use client";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils/cn";

import type { SkillCategory } from "@/lib/data/skills";
import { skillCategoryLabels } from "@/lib/data/skills";

type CategoryFilterProps = {
  categories: readonly SkillCategory[];
  selected: SkillCategory | null;
  onSelect: (category: SkillCategory | null) => void;
};

const filterButtonClassName =
  "relative -mb-px h-10 rounded-none border-x-0 border-t-0 border-b-2 border-transparent bg-transparent px-0 font-serif text-foreground hover:bg-transparent hover:text-accent focus-visible:border-b-accent focus-visible:ring-ring/30";

export function CategoryFilter({ categories, selected, onSelect }: CategoryFilterProps) {
  return (
    <div className="border-border flex flex-wrap gap-x-6 gap-y-2 border-b">
      <Button
        variant="ghost"
        size="sm"
        aria-pressed={selected === null}
        onClick={() => onSelect(null)}
        className={cn(filterButtonClassName, selected === null && "border-b-accent text-accent")}
      >
        すべて
      </Button>
      {categories.map((category) => {
        const active = selected === category;
        return (
          <Button
            key={category}
            variant="ghost"
            size="sm"
            aria-pressed={active}
            onClick={() => onSelect(category)}
            className={cn(filterButtonClassName, active && "border-b-accent text-accent")}
          >
            {skillCategoryLabels[category]}
          </Button>
        );
      })}
    </div>
  );
}
