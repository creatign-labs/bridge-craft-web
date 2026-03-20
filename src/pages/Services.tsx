import { Compass, HardHat, FileText, Settings } from "lucide-react";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const services = [
  {
    icon: Compass,
    title: "Detailed Design Engineering",
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
    icon: HardHat,
    title: "Geotechnical Investigations",
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
    icon: FileText,
    title: "Detailed Project Reports (DPR)",
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
    icon: Settings,
    title: "Support Services",
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

const Services = () => (
  <Layout>
    {/* Hero */}
    <section className="bg-gradient-dark section-padding !py-20">
      <div className="container-narrow text-center">
        <h1 className="font-heading font-bold text-4xl md:text-5xl text-primary mb-4">Our Core Competencies</h1>
        <p className="text-primary/60 max-w-xl mx-auto">Comprehensive engineering services that cover every phase of infrastructure development.</p>
      </div>
    </section>

    <section className="section-padding">
      <div className="container-narrow max-w-3xl">
        <Accordion type="single" collapsible className="space-y-4">
          {services.map((s, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border rounded-lg px-6 shadow-card">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center shrink-0">
                    <s.icon size={20} className="text-primary-foreground" />
                  </div>
                  <span className="font-heading font-bold text-lg text-left">{s.title}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2 pl-14">
                  {s.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  </Layout>
);

export default Services;
