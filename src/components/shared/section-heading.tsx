type SectionHeadingProps = {
  title: string;
  description?: string;
  align?: "left" | "center";
  /** モノスペースのコメント風ラベル（例: "強み"）。表示時は `// ` を前置する */
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
      {label && <p className="text-muted-foreground mb-2 font-mono text-sm">{`// ${label}`}</p>}
      <h2 className="text-2xl font-bold">{title}</h2>
      {description && <p className="text-muted-foreground mt-2">{description}</p>}
    </div>
  );
}
