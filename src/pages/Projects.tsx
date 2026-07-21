import { useState } from "react";
import { X, ArrowUpRight } from "lucide-react";
import Layout from "@/components/Layout";
import projectHighway from "@/assets/project-highway.jpg";
import projectBridge from "@/assets/project-bridge.jpg";
import projectSmartcity from "@/assets/project-smartcity.jpg";
import projectIndustrial from "@/assets/project-industrial.jpg";
import projectGeotech from "@/assets/project-geotech.jpg";
import projectRailway from "@/assets/project-railway.jpg";
import projectUrban from "@/assets/project-urban.jpg";

const projects = [
  {
    img: projectHighway,
    title: "National Highway NH-48 Widening",
    tag: "Highways",
    year: "2024",
    brief: "6-lane highway expansion project with grade-separated interchanges.",
    details: "Comprehensive detailed design for a 120 km stretch of NH-48 including geometric design, drainage, pavement design, and bridge approaches. Delivered on time with full IRC compliance.",
    metrics: { span: "120 km", duration: "18 months", value: "₹2,400 Cr" },
  },
  {
    img: projectBridge,
    title: "Cable-Stayed Bridge — Adyar River",
    tag: "Bridges",
    year: "2024",
    brief: "Iconic cable-stayed bridge design with 280m main span.",
    details: "Structural analysis and detailed design of a 4-lane cable-stayed bridge using advanced FEM modeling. Included seismic analysis, wind tunnel study recommendations, and construction stage analysis.",
    metrics: { span: "280 m", duration: "24 months", value: "₹580 Cr" },
  },
  {
    img: projectSmartcity,
    title: "Chennai Smart City Roads",
    tag: "Smart Cities",
    year: "2023",
    brief: "Integrated smart road network with IoT-enabled infrastructure.",
    details: "Design of 45 km urban smart road network with embedded sensors, smart lighting, stormwater management, and complete utility corridor planning.",
    metrics: { span: "45 km", duration: "12 months", value: "₹1,200 Cr" },
  },
  {
    img: projectIndustrial,
    title: "SIPCOT Industrial Corridor",
    tag: "Industrial",
    year: "2023",
    brief: "Industrial corridor connectivity with logistics infrastructure.",
    details: "Detailed project report and design for a 60 km industrial corridor connecting SIPCOT zones with logistics hubs, including interchange designs and utility networks.",
    metrics: { span: "60 km", duration: "14 months", value: "₹800 Cr" },
  },
  {
    img: projectGeotech,
    title: "Port Area Geotechnical Study",
    tag: "Geotechnical",
    year: "2022",
    brief: "Comprehensive subsurface investigation for port expansion.",
    details: "Geotechnical investigation involving 200+ boreholes, laboratory testing, and foundation recommendations for a major port expansion. Included liquefaction analysis and ground improvement designs.",
    metrics: { span: "200+ boreholes", duration: "8 months", value: "₹12 Cr" },
  },
  {
    img: projectRailway,
    title: "Railway Over-Bridge Network",
    tag: "Railways",
    year: "2022",
    brief: "Multiple ROB designs eliminating level crossings.",
    details: "Design of 12 railway over-bridges across Tamil Nadu to eliminate dangerous level crossings. Used precast segmental construction methodology for minimal disruption to rail traffic.",
    metrics: { span: "12 ROBs", duration: "20 months", value: "₹450 Cr" },
  },
  {
    img: projectUrban,
    title: "Stormwater Drainage Master Plan",
    tag: "Urban",
    year: "2021",
    brief: "City-wide drainage redesign for flood mitigation.",
    details: "Hydrological analysis and detailed design of stormwater drainage network for Chennai's T. Nagar and surrounding areas. Included micro-tunnel design and retention pond planning.",
    metrics: { span: "85 km network", duration: "10 months", value: "₹650 Cr" },
  },
];

const categories = ["All", "Highways", "Bridges", "Smart Cities", "Industrial", "Geotechnical", "Railways", "Urban"];

const Projects = () => {
  const [selected, setSelected] = useState<typeof projects[0] | null>(null);
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All" ? projects : projects.filter((p) => p.tag === filter);

  return (
    <Layout>
      {/* Page header */}
      <section className="pt-40 pb-16 px-6 sm:px-8 lg:px-16">
        <div className="container-narrow">
          <div className="eyebrow mb-6 animate-fade-in-up">Portfolio · 2010–2024</div>
          <h1 className="display-heading text-5xl md:text-7xl lg:text-8xl animate-fade-in-up animation-delay-100">
            Selected<br /><span className="text-ghost">projects.</span>
          </h1>
          <p className="mt-8 text-muted-foreground max-w-xl text-lg animate-fade-in-up animation-delay-200">
            A portfolio of engineering achievements — from national highways and cable-stayed bridges to smart city networks.
          </p>
        </div>
      </section>

      {/* Filter */}
      <section className="px-6 sm:px-8 lg:px-16 mb-12">
        <div className="container-narrow flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider border transition-all ${
                filter === c
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="px-6 sm:px-8 lg:px-16 pb-24">
        <div className="container-narrow grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <button
              key={i}
              onClick={() => setSelected(p)}
              className="group text-left rounded-2xl overflow-hidden border border-border bg-card/30 hover-lift hover:border-primary/40"
            >
              <div className="relative overflow-hidden aspect-[4/3]">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-widest text-primary px-3 py-1 rounded-full border border-primary/40 bg-background/50 backdrop-blur">
                  {p.tag}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs text-muted-foreground">{p.year}</span>
                  <ArrowUpRight size={16} className="text-muted-foreground group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                </div>
                <h3 className="font-heading font-bold text-lg leading-tight mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{p.brief}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-background/80 backdrop-blur-md animate-fade-in" onClick={() => setSelected(null)}>
          <div className="bg-card border border-border rounded-t-3xl sm:rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
            <div className="relative">
              <img src={selected.img} alt={selected.title} className="w-full aspect-video object-cover rounded-t-3xl" />
              <button onClick={() => setSelected(null)} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/80 backdrop-blur border border-border flex items-center justify-center hover:bg-background">
                <X size={18} />
              </button>
            </div>
            <div className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-[10px] uppercase tracking-widest text-primary px-3 py-1 rounded-full border border-primary/40">{selected.tag}</span>
                <span className="font-mono text-xs text-muted-foreground">{selected.year}</span>
              </div>
              <h2 className="display-heading text-3xl md:text-4xl mb-4">{selected.title}</h2>
              <p className="text-muted-foreground leading-relaxed mb-8">{selected.details}</p>
              <div className="grid grid-cols-3 gap-3 pt-6 border-t border-border">
                {Object.entries(selected.metrics).map(([key, val]) => (
                  <div key={key}>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">{key}</div>
                    <div className="font-heading font-bold text-primary text-xl">{val}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Projects;
