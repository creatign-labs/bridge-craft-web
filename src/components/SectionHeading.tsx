interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  centered?: boolean;
}

const SectionHeading = ({ eyebrow, title, subtitle, centered = false }: SectionHeadingProps) => (
  <div className={`mb-16 ${centered ? "text-center mx-auto" : ""}`}>
    {eyebrow && <div className={`eyebrow mb-6 ${centered ? "justify-center" : ""}`}>{eyebrow}</div>}
    <h2 className="display-heading text-4xl md:text-5xl lg:text-6xl text-foreground max-w-4xl">
      {title}
    </h2>
    {subtitle && (
      <p className={`text-muted-foreground mt-6 max-w-2xl text-base md:text-lg leading-relaxed ${centered ? "mx-auto" : ""}`}>
        {subtitle}
      </p>
    )}
  </div>
);

export default SectionHeading;
