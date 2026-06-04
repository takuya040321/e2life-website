import { cn } from "@/lib/utils/cn";

type GlowProps = {
  className?: string;
};

/**
 * 背景に敷く朱のグロー（装飾）。
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
        backgroundImage: "radial-gradient(circle, var(--accent), transparent 70%)",
      }}
    />
  );
}
