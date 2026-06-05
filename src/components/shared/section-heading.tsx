import { JapaneseLineBreak } from "./japanese-line-break";

type SectionHeadingProps = {
  title: string;
  description?: string;
  align?: "left" | "center";
  /** モノスペースの補助ラベル（例: "強み"）。 */
  label?: string;
};

export function SectionHeading({
  title,
  description,
  align = "center",
  label,
}: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      {label && <p className="text-muted-foreground mb-2 font-mono text-sm">{label}</p>}
      <h2 className="text-2xl font-bold">
        <JapaneseLineBreak text={title} />
      </h2>
      {description && (
        <p className="text-muted-foreground mt-2">
          <JapaneseLineBreak text={description} />
        </p>
      )}
    </div>
  );
}
