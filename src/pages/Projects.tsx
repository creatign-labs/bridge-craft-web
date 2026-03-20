import { useState } from "react";
import { X } from "lucide-react";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
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
    brief: "6-lane highway expansion project with grade-separated interchanges.",
    details: "Comprehensive detailed design for a 120 km stretch of NH-48 including geometric design, drainage, pavement design, and bridge approaches. Delivered on time with full IRC compliance.",
    metrics: { span: "120 km", duration: "18 months", value: "₹2,400 Cr" },
  },
  {
    img: projectBridge,
    title: "Cable-Stayed Bridge — Adyar River",
    tag: "Bridges",
    brief: "Iconic cable-stayed bridge design with 280m main span.",
    details: "Structural analysis and detailed design of a 4-lane cable-stayed bridge using advanced FEM modeling. Included seismic analysis, wind tunnel study recommendations, and construction stage analysis.",
    metrics: { span: "280 m", duration: "24 months", value: "₹580 Cr" },
  },
  {
    img: projectSmartcity,
    title: "Chennai Smart City Roads",
    tag: "Smart Cities",
    brief: "Integrated smart road network with IoT-enabled infrastructure.",
    details: "Design of 45 km urban smart road network with embedded sensors, smart lighting, stormwater management, and complete utility corridor planning.",
    metrics: { span: "45 km", duration: "12 months", value: "₹1,200 Cr" },
  },
  {
    img: projectIndustrial,
    title: "SIPCOT Industrial Corridor",
    tag: "Industrial Corridors",
    brief: "Industrial corridor connectivity with logistics infrastructure.",
    details: "Detailed project report and design for a 60 km industrial corridor connecting SIPCOT zones with logistics hubs, including interchange designs and utility networks.",
    metrics: { span: "60 km", duration: "14 months", value: "₹800 Cr" },
  },
  {
    img: projectGeotech,
    title: "Port Area Geotechnical Study",
    tag: "Geotechnical",
    brief: "Comprehensive subsurface investigation for port expansion.",
    details: "Geotechnical investigation involving 200+ boreholes, laboratory testing, and foundation recommendations for a major port expansion. Included liquefaction analysis and ground improvement designs.",
    metrics: { span: "200+ boreholes", duration: "8 months", value: "₹12 Cr" },
  },
  {
    img: projectRailway,
    title: "Railway Over-Bridge Network",
    tag: "Railways",
    brief: "Multiple ROB designs eliminating level crossings.",
    details: "Design of 12 railway over-bridges across Tamil Nadu to eliminate dangerous level crossings. Used precast segmental construction methodology for minimal disruption to rail traffic.",
    metrics: { span: "12 ROBs", duration: "20 months", value: "₹450 Cr" },
  },
  {
    img: projectUrban,
    title: "Stormwater Drainage Master Plan",
    tag: "Urban Infrastructure",
    brief: "City-wide drainage redesign for flood mitigation.",
    details: "Hydrological analysis and detailed design of stormwater drainage network for Chennai's T. Nagar and surrounding areas. Included micro-tunnel design and retention pond planning.",
    metrics: { span: "85 km network", duration: "10 months", value: "₹650 Cr" },
  },
];

const Projects = () => {
  const [selected, setSelected] = useState<typeof projects[0] | null>(null);

  return (
    <Layout>
      <section className="section-padding">
        <div className="container-narrow">
          <SectionHeading title="Our Projects" subtitle="Explore our portfolio of infrastructure achievements across India." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <button
                key={i}
                onClick={() => setSelected(p)}
                className="group text-left rounded-lg overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300"
              >
                <div className="overflow-hidden">
                  <img src={p.img} alt={p.title} className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <span className="text-xs font-semibold text-accent uppercase tracking-wider">{p.tag}</span>
                  <h3 className="font-heading font-bold mt-1 mb-2">{p.title}</h3>
                  <p className="text-sm text-muted-foreground">{p.brief}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/50 backdrop-blur-sm animate-fade-in" onClick={() => setSelected(null)}>
          <div className="bg-card rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
            <img src={selected.img} alt={selected.title} className="w-full aspect-video object-cover rounded-t-lg" />
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="text-xs font-semibold text-accent uppercase tracking-wider">{selected.tag}</span>
                  <h2 className="font-heading font-bold text-2xl mt-1">{selected.title}</h2>
                </div>
                <button onClick={() => setSelected(null)} className="text-muted-foreground hover:text-foreground">
                  <X size={24} />
                </button>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6">{selected.details}</p>
              <div className="grid grid-cols-3 gap-4">
                {Object.entries(selected.metrics).map(([key, val]) => (
                  <div key={key} className="text-center p-3 bg-muted rounded-lg">
                    <div className="font-heading font-bold text-primary-dark text-lg">{val}</div>
                    <div className="text-xs text-muted-foreground capitalize">{key}</div>
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
