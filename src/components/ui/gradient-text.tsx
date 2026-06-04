import type { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

type GradientTextProps = {
  children: ReactNode;
  className?: string;
};

/**
 * 朱のアクセント色を文字に適用する。
 */
export function GradientText({ children, className }: GradientTextProps) {
  return <span className={cn("text-accent", className)}>{children}</span>;
}
