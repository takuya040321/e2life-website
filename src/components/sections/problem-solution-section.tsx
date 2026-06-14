import { SectionHeading } from "@/components/shared/section-heading";
import { JapaneseLineBreak } from "@/components/shared/japanese-line-break";

export function ProblemSolutionSection() {
  return (
    <section className="py-20">
      <SectionHeading
        title="なぜ、AI を組織のように束ねるのか"
        description="個別に AI を使うのと、ひとつの会社のように束ねるのは別物です。"
        align="left"
      />

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        <div className="border-border bg-card/40 rounded-lg border border-dashed p-6 sm:p-8">
          <p className="text-muted-foreground font-mono text-xs font-bold tracking-[0.22em] uppercase">
            Before
          </p>
          <h3 className="mt-3 font-serif text-lg font-bold tracking-normal">
            <JapaneseLineBreak text="AI を思いつきで個別に動かしていた頃" />
          </h3>
          <ul className="text-muted-foreground mt-4 space-y-3 text-sm leading-7">
            <li>
              ・どの AI に何を頼んだかが散らかり、経緯が消えていく
            </li>
            <li>
              ・同じつまずきを何度も繰り返す
            </li>
            <li>
              ・判断の理由が残らず、後から辿れない
            </li>
            <li>
              ・人間が逐一指示を出さないと動かない
            </li>
          </ul>
        </div>
        <div className="border-accent/40 bg-accent/5 rounded-lg border p-6 shadow-sm sm:p-8">
          <p className="text-accent font-mono text-xs font-bold tracking-[0.22em] uppercase">
            After
          </p>
          <h3 className="mt-3 font-serif text-lg font-bold tracking-normal">
            <JapaneseLineBreak text="組織のように束ねた今" />
          </h3>
          <ul className="text-foreground mt-4 space-y-3 text-sm leading-7">
            <li>
              ・窓口は秘書役の AI 1 人。やりたいことを伝えるだけ
            </li>
            <li>
              ・専門ハーネスが分業し、独立した目でレビュー
            </li>
            <li>
              ・判断・知見・対話を 1 か所に蓄積、振り返って次に活かす
            </li>
            <li>
              ・戻せる範囲は自走、戻せない手前で止まる
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
