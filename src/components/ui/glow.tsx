import { cn } from "@/lib/utils/cn";

type GlowProps = {
  className?: string;
};

/**
 * 背景に敷く暖色グロー（装飾）。赤 → オレンジの放射状グラデーションをぼかす。
 * 親に relative を指定し、その背面に絶対配置する想定。支援技術からは隠す。
 */
export function Glow({ className }: GlowProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute -z-10 rounded-full opacity-30 blur-3xl",
        className,
      )}
      style={{
        backgroundImage:
          "radial-gradient(circle, var(--accent-from), var(--accent-to) 45%, transparent 70%)",
      }}
    />
  );
}
