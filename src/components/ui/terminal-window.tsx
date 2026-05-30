import type { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

type TerminalWindowProps = {
  /** タイトルバーに表示するパス / コマンド名（省略可） */
  title?: string;
  children: ReactNode;
  className?: string;
};

/**
 * 信号ボタン付きのターミナルウィンドウ枠。
 * 開発者ターミナル風デザインで Hero やアクセント表示に再利用する。
 * 中身（コード行など）は children で受け取り、表示の責務のみを持つ。
 */
export function TerminalWindow({ title, children, className }: TerminalWindowProps) {
  return (
    <div
      className={cn(
        "border-border bg-card overflow-hidden rounded-lg border font-mono text-sm shadow-sm",
        className,
      )}
    >
      <div className="border-border bg-muted/50 flex items-center gap-2 border-b px-3 py-2">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="bg-destructive/70 size-3 rounded-full" />
          <span className="size-3 rounded-full bg-amber-400/80" />
          <span className="bg-terminal/80 size-3 rounded-full" />
        </span>
        {title && <span className="text-muted-foreground ml-1 truncate text-xs">{title}</span>}
      </div>
      <div className="text-foreground/90 p-4 leading-relaxed">{children}</div>
    </div>
  );
}
