import { Download, Compass, FileText } from "lucide-react";
import Layout from "@/components/Layout";
import { getIcon } from "@/lib/sanity";
import { company, sectorExperience } from "@/data/company";

const Credentials = () => (
  <Layout>
    <section className="pt-40 pb-16 px-6 sm:px-8 lg:px-16 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="relative container-narrow">
        <div className="eyebrow mb-6 animate-fade-in-up">Technical credentials</div>
        <h1 className="display-heading text-5xl md:text-7xl lg:text-8xl max-w-4xl animate-fade-in-up animation-delay-100">
          Proven across<br />
          <span className="text-primary">every sector.</span>
        </h1>
        <p className="mt-8 text-muted-foreground max-w-2xl text-lg animate-fade-in-up animation-delay-200">
          Highways, bridges, railways, solar installations, institutional buildings and structural
          retrofitting - each credential below is evidenced by executed Bridge Craft assignments.
        </p>
        <div className="mt-10 flex flex-wrap gap-4 animate-fade-in-up animation-delay-300">
          <a href={company.profileUrl} download="Bridge-Craft-Company-Profile-2026.pdf" className="btn-primary">
            Download Company Profile <Download size={16} />
          </a>
        </div>
      </div>
    </section>

    <section className="px-6 sm:px-8 lg:px-16 pb-24 reveal">
      <div className="container-narrow grid md:grid-cols-2 gap-6">
        {sectorExperience.map((s) => {
          const Icon = getIcon(s.icon, Compass);
          return (
            <article
              key={s.sector}
              className="group border border-border rounded-3xl overflow-hidden bg-card/40 hover:border-primary/40 transition-colors"
            >
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src={s.image}
                  alt={`${s.sector} - Bridge Craft project photograph`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl border border-border flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-primary" />
                  </div>
                  <h2 className="display-heading text-xl md:text-2xl">{s.sector}</h2>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.summary}</p>
                <ul className="mt-6 space-y-3">
                  {s.evidence.map((e, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-foreground/80">
                      <span className="font-mono text-[10px] text-primary mt-1 shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{e}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>
    </section>

    <section className="px-6 sm:px-8 lg:px-16 pb-32 reveal">
      <div className="container-narrow border border-border rounded-3xl p-8 md:p-12 bg-card/40">
        <div className="eyebrow mb-5">Documents</div>
        <h2 className="display-heading text-3xl md:text-4xl">
          Download our <span className="text-primary">credentials.</span>
        </h2>
        <div className="mt-8 flex flex-wrap gap-4">
          <a href={company.profileUrl} download="Bridge-Craft-Company-Profile-2026.pdf" className="btn-primary">
            Company Profile 2026 (PDF) <Download size={16} />
          </a>
          <span className="inline-flex items-center gap-2 rounded-full border border-dashed border-border px-5 py-3 text-sm text-muted-foreground">
            <FileText size={16} /> Project Experience list - available on request
          </span>
        </div>
      </div>
    </section>
  </Layout>
);

export default Credentials;
