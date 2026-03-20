interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

const SectionHeading = ({ title, subtitle, centered = true }: SectionHeadingProps) => (
  <div className={`mb-12 ${centered ? "text-center" : ""}`}>
    <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-3">{title}</h2>
    {subtitle && <p className="text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>}
    <div className={`mt-4 h-1 w-16 bg-gradient-primary rounded-full ${centered ? "mx-auto" : ""}`} />
  </div>
);

export default SectionHeading;
