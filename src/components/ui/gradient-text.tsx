import type { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

type GradientTextProps = {
  children: ReactNode;
  className?: string;
};

/**
 * 赤 → オレンジのグラデーションを文字に適用する。
 * ダーク AI モダンのアクセント表現（Hero 見出しの一部など）に使う。
 */
export function GradientText({ children, className }: GradientTextProps) {
  return <span className={cn("text-gradient", className)}>{children}</span>;
}
