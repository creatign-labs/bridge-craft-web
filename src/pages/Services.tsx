import { Compass, HardHat, FileText, Settings, Plus, Minus } from "lucide-react";
import { useState } from "react";
import Layout from "@/components/Layout";

const services = [
  {
    num: "01",
    icon: Compass,
    title: "Detailed Design Engineering",
    tagline: "Precision structural design from concept to construction.",
    items: [
      "Structural design for bridges, flyovers, and elevated corridors",
      "Highway geometric design as per IRC/MoRTH standards",
      "Pavement design using mechanistic-empirical approach",
      "Drainage and hydrology analysis",
      "3D modeling and BIM integration",
      "Construction stage analysis and methodology planning",
    ],
  },
  {
    num: "02",
    icon: HardHat,
    title: "Geotechnical Investigations",
    tagline: "Subsurface intelligence for confident foundations.",
    items: [
      "Subsurface exploration and borehole logging",
      "In-situ and laboratory soil testing",
      "Foundation type recommendation and design",
      "Slope stability analysis",
      "Ground improvement design (stone columns, PVD, etc.)",
      "Liquefaction potential assessment",
    ],
  },
  {
    num: "03",
    icon: FileText,
    title: "Detailed Project Reports (DPR)",
    tagline: "Compliance-ready reports that get projects funded.",
    items: [
      "Feasibility studies and route alignment optimization",
      "Traffic surveys and demand forecasting",
      "Cost estimation and financial viability analysis",
      "Environmental impact assessment coordination",
      "Land acquisition plans and utility shifting",
      "Compliance with NHAI / State PWD / IRC guidelines",
    ],
  },
  {
    num: "04",
    icon: Settings,
    title: "Support Services",
    tagline: "End-to-end oversight through delivery.",
    items: [
      "Quality assurance and quality control (QA/QC)",
      "Construction supervision and monitoring",
      "Project management consultancy (PMC)",
      "Third-party review and vetting of designs",
      "As-built drawing preparation",
      "Contract documentation and BOQ preparation",
    ],
  },
];

const Services = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-40 pb-24 px-6 sm:px-8 lg:px-16 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
        <div className="relative container-narrow">
          <div className="eyebrow mb-6 animate-fade-in-up">Our capabilities</div>
          <h1 className="display-heading text-5xl md:text-7xl lg:text-8xl max-w-4xl animate-fade-in-up animation-delay-100">
            Our core<br /><span className="text-primary">competencies.</span>
          </h1>
          <p className="mt-8 text-muted-foreground max-w-2xl text-lg animate-fade-in-up animation-delay-200">
            Four interconnected disciplines that cover every phase of infrastructure development — from initial survey to construction supervision.
          </p>
        </div>
      </section>

      {/* Accordion */}
      <section className="px-6 sm:px-8 lg:px-16 pb-24 reveal">
        <div className="container-narrow">
          <div className="border-t border-border">
            {services.map((s, i) => {
              const isOpen = openIdx === i;
              return (
                <div key={i} className="border-b border-border">
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : i)}
                    className="w-full flex items-center gap-6 md:gap-10 py-8 md:py-10 text-left group"
                  >
                    <span className="font-mono text-sm text-muted-foreground w-8 shrink-0">{s.num}</span>
                    <div className="hidden md:flex w-12 h-12 rounded-xl border border-border items-center justify-center shrink-0 group-hover:border-primary/40 transition-colors">
                      <s.icon size={20} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <h2 className="display-heading text-2xl md:text-4xl lg:text-5xl group-hover:text-primary transition-colors">
                        {s.title}
                      </h2>
                      {!isOpen && <p className="mt-2 text-muted-foreground text-sm md:text-base">{s.tagline}</p>}
                    </div>
                    <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center shrink-0 group-hover:border-primary group-hover:bg-primary/10 transition-all">
                      {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                    </div>
                  </button>
                  <div className={`grid transition-all duration-500 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100 pb-10" : "grid-rows-[0fr] opacity-0"}`}>
                    <div className="overflow-hidden">
                      <div className="pl-0 md:pl-24 pr-4 md:pr-16 max-w-4xl">
                        <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8">{s.tagline}</p>
                        <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
                          {s.items.map((item, j) => (
                            <li key={j} className="flex items-start gap-3 text-foreground/80 text-sm md:text-base">
                              <span className="font-mono text-xs text-primary mt-1 shrink-0">
                                {String(j + 1).padStart(2, "0")}
                              </span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
