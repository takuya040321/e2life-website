type SectionHeadingProps = {
  title: string;
  description?: string;
  align?: "left" | "center";
  /** コードコメント風ラベル（例: "01 - skills"）。表示時は `// ` を前置する */
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
      {label && <p className="text-terminal mb-2 font-mono text-sm">{`// ${label}`}</p>}
      <h2 className="text-2xl font-bold">{title}</h2>
      {description && <p className="text-muted-foreground mt-2">{description}</p>}
    </div>
  );
}
