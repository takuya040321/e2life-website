import { Fragment } from "react";

type Step = {
  title: string;
  note: string;
  /** 司令塔として強調表示するか */
  emphasis?: boolean;
  /** 分業を示す枝（部門の並び） */
  branches?: readonly string[];
};

const steps: readonly Step[] = [
  { title: "あなた（社長）", note: "やりたいことを伝える" },
  { title: "秘書役の AI（PA）", note: "窓口はここひとつ", emphasis: true },
  {
    title: "各部門の担当 AI（部長役）",
    note: "部門ごとに方針を検討",
    branches: ["部門A", "部門B", "部門C"],
  },
  { title: "実装エージェント", note: "「作って直す」を反復" },
  { title: "レビュー → 公開・成果", note: "独立した目で確認してから出す" },
];

const connectorLabels = ["話すだけ", "指示する", "実装を任せる", "独立レビュー"] as const;

function Connector({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="bg-border h-4 w-px" aria-hidden="true" />
      <span className="border-border bg-background text-muted-foreground rounded-full border px-3 py-0.5 font-mono text-xs">
        {label}
      </span>
      <span className="bg-border h-4 w-px" aria-hidden="true" />
      <span className="text-accent -mt-2 text-sm leading-none" aria-hidden="true">
        ▼
      </span>
    </div>
  );
}

function StepCard({ step }: { step: Step }) {
  return (
    <div
      className={`w-full max-w-md rounded-lg border p-4 text-center shadow-sm ${
        step.emphasis
          ? "border-accent bg-accent/5 ring-accent/30 ring-1"
          : "border-border bg-card/70"
      }`}
    >
      <div className="flex items-center justify-center gap-2">
        {step.emphasis && (
          <span className="bg-accent text-accent-foreground rounded-full px-2 py-0.5 font-mono text-[10px] font-bold tracking-wider">
            司令塔
          </span>
        )}
        <h4 className="font-serif text-base font-bold tracking-normal">{step.title}</h4>
      </div>
      <p className="text-muted-foreground mt-1 text-sm leading-6">{step.note}</p>
      {step.branches && (
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          {step.branches.map((branch) => (
            <span
              key={branch}
              className="border-border bg-background text-muted-foreground rounded-md border px-2.5 py-1 text-xs"
            >
              {branch}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export function HarnessDiagram() {
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,17rem)] lg:items-center">
      <div className="flex flex-col items-center">
        {steps.map((step, index) => {
          const connectorLabel = connectorLabels[index];
          return (
            <Fragment key={step.title}>
              <StepCard step={step} />
              {connectorLabel && <Connector label={connectorLabel} />}
            </Fragment>
          );
        })}
      </div>

      <aside className="border-accent/40 bg-card/40 rounded-lg border border-dashed p-5">
        <p className="text-accent font-mono text-xs font-bold tracking-[0.2em] uppercase">
          Records
        </p>
        <h4 className="mt-1 font-serif text-lg font-bold tracking-normal">記録層</h4>
        <p className="text-muted-foreground mt-2 text-sm leading-7">
          判断・知見・対話履歴を 1 か所に集約します。
        </p>
        <div className="mt-4 space-y-2">
          <div className="border-border bg-background flex items-center gap-2 rounded-md border px-3 py-2 text-xs">
            <span className="text-accent font-mono">▶</span>
            <span className="text-muted-foreground">各ステップのやり取りを記録する</span>
          </div>
          <div className="border-border bg-background flex items-center gap-2 rounded-md border px-3 py-2 text-xs">
            <span className="text-accent font-mono">◀</span>
            <span className="text-muted-foreground">次の判断で参照する</span>
          </div>
        </div>
        <p className="text-muted-foreground mt-4 text-xs leading-6">
          すべての工程と双方向につながり、使うほど判断の精度が上がります。
        </p>
      </aside>
    </div>
  );
}
