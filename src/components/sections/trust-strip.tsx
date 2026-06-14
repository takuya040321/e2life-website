import { JapaneseLineBreak } from "@/components/shared/japanese-line-break";

const items = [
  {
    figure: "6",
    label: "部門運営",
    body: "6 つの部門を専任 AI と共に並行運営",
  },
  {
    figure: "Multi-Agent",
    label: "構成",
    body: "役割ごとに専門 AI を分業させる構成",
  },
  {
    figure: "Central",
    label: "記録管理",
    body: "判断・知見・対話を 1 か所に集中管理",
  },
] as const;

export function TrustStrip() {
  return (
    <section className="border-border bg-card/30 border-y py-10">
      <div className="grid gap-6 sm:grid-cols-3 sm:gap-10">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex flex-col items-center text-center sm:items-start sm:text-left"
          >
            <p className="text-accent font-serif text-3xl font-bold tracking-tight sm:text-4xl">
              {item.figure}
            </p>
            <p className="text-foreground mt-1 font-mono text-xs font-bold tracking-[0.2em] uppercase">
              {item.label}
            </p>
            <p className="text-muted-foreground mt-3 text-sm leading-6">
              <JapaneseLineBreak text={item.body} />
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
