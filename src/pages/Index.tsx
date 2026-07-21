import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Shield, Compass, HardHat, Building2, Train, Lightbulb, FileText, Settings, ChevronDown } from "lucide-react";
import Layout from "@/components/Layout";
import heroImg from "@/assets/hero-bridge.jpg";
import teamImg from "@/assets/team-office.jpg";
import projectHighway from "@/assets/project-highway.jpg";
import projectBridge from "@/assets/project-bridge.jpg";
import projectSmartcity from "@/assets/project-smartcity.jpg";
import projectRailway from "@/assets/project-railway.jpg";

const services = [
  { num: "01", icon: Compass, title: "Detailed Design Engineering", desc: "Structural, highway, and bridge design with cutting-edge CAD/BIM tools." },
  { num: "02", icon: HardHat, title: "Geotechnical Investigations", desc: "Comprehensive soil testing and foundation design recommendations." },
  { num: "03", icon: FileText, title: "Detailed Project Reports", desc: "Feasibility studies, cost estimation, and compliance-ready DPRs." },
  { num: "04", icon: Settings, title: "Support Services", desc: "Quality assurance, project management, and construction supervision." },
];

const projects = [
  { img: projectHighway, title: "National Highway Expansion", tag: "Highways", year: "2024" },
  { img: projectBridge, title: "Cable-Stayed Bridge", tag: "Bridges", year: "2024" },
  { img: projectSmartcity, title: "Smart City Infrastructure", tag: "Urban", year: "2023" },
  { img: projectRailway, title: "Railway Overpass Network", tag: "Railways", year: "2023" },
];

const strengths = [
  { icon: Shield, title: "Integrated Design Capability", desc: "End-to-end engineering solutions under one roof — from concept to commissioning." },
  { icon: HardHat, title: "Field-Tested Practices", desc: "Proven methodologies refined through decades of real-world execution." },
  { icon: Building2, title: "Institutional Expertise", desc: "Deep knowledge across government and private sector infrastructure projects." },
  { icon: Lightbulb, title: "Agile Execution", desc: "Rapid delivery without compromising on the highest quality standards." },
];

const sectors = ["Highways", "Bridges", "Smart Cities", "Industrial Corridors", "Railways", "Urban Infrastructure", "Ports", "Metro Rail"];

const stats = [
  { value: "15+", label: "Years of expertise" },
  { value: "120+", label: "Projects delivered" },
  { value: "₹8,000Cr", label: "Assets designed" },
  { value: "50+", label: "Cities served" },
];

const Index = () => (
  <Layout>
    {/* HERO */}
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <img src={heroImg} alt="Infrastructure" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-hero-overlay" />
      <div className="absolute inset-0 bg-background/40" />

      <div className="relative z-10 container-narrow px-6 sm:px-8 lg:px-16 w-full pt-32 pb-24">
        <div className="animate-fade-in-up">
          <div className="eyebrow mb-8">
            <span>EST. 2010 · CHENNAI</span>
            <span className="mx-2 opacity-40">·</span>
            <span>CIVIL & INFRASTRUCTURE</span>
          </div>
          <h1 className="display-heading text-6xl md:text-8xl lg:text-9xl max-w-5xl">
            Engineering
            <br />
            <span className="text-primary">Excellence.</span>
          </h1>
          <p className="mt-8 text-lg md:text-xl text-foreground/70 max-w-xl leading-relaxed">
            From design to delivery — we engineer infrastructure that defines tomorrow. Precision, integrity, and innovation, built to last.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/services" className="btn-primary">
              Explore services <ArrowUpRight size={16} />
            </Link>
            <Link to="/projects" className="btn-ghost">
              View projects
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground animate-bounce-slow">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <ChevronDown size={16} />
      </div>
    </section>

    {/* STATS STRIP */}
    <section className="border-y border-border bg-card/30 reveal">
      <div className="container-narrow px-6 sm:px-8 lg:px-16 grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
        {stats.map((s, i) => (
          <div key={i} className="py-10 px-4 md:px-8 first:pl-0">
            <div className="display-heading text-3xl md:text-5xl text-primary">{s.value}</div>
            <div className="mt-2 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>
    </section>

    {/* ABOUT */}
    <section className="section-padding reveal">
      <div className="container-narrow grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6">
          <div className="eyebrow mb-6">About Bridge Craft</div>
          <h2 className="display-heading text-4xl md:text-5xl lg:text-6xl">
            A consultancy built<br />on <span className="text-primary">precision.</span>
          </h2>
          <p className="text-muted-foreground mt-8 leading-relaxed max-w-lg">
            Bridge Craft Engineers & Consultants is a premier Civil & Infrastructure Design Consultancy headquartered in Chennai. We combine decades of engineering expertise with innovative design methodologies to deliver infrastructure that stands the test of time.
          </p>
          <div className="grid grid-cols-3 gap-6 mt-10 pt-10 border-t border-border">
            {["Integrity", "Precision", "Innovation"].map((v, i) => (
              <div key={i}>
                <div className="font-mono text-xs text-muted-foreground uppercase tracking-widest">0{i + 1}</div>
                <div className="font-heading font-bold mt-2 text-lg">{v}</div>
              </div>
            ))}
          </div>
          <Link to="/services" className="mt-10 inline-flex items-center gap-2 text-primary font-semibold group">
            Learn more about us <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="lg:col-span-6 relative">
          <div className="absolute -inset-4 bg-gradient-primary opacity-10 blur-3xl rounded-full" />
          <div className="relative rounded-2xl overflow-hidden border border-border">
            <img src={teamImg} alt="Our Team" className="w-full aspect-[4/5] object-cover" />
          </div>
        </div>
      </div>
    </section>

    {/* SERVICES */}
    <section className="section-padding bg-card/30 border-y border-border reveal">
      <div className="container-narrow">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <div className="eyebrow mb-6">Core capabilities</div>
            <h2 className="display-heading text-4xl md:text-5xl lg:text-6xl max-w-2xl">
              Four disciplines.<br /><span className="text-primary">One vision.</span>
            </h2>
          </div>
          <Link to="/services" className="btn-ghost self-start md:self-end">
            All services <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden border border-border">
          {services.map((s, i) => (
            <div key={i} className="group bg-background p-8 hover:bg-card transition-colors duration-500 min-h-[280px] flex flex-col">
              <div className="flex items-start justify-between mb-8">
                <span className="font-mono text-xs text-muted-foreground">{s.num}</span>
                <s.icon size={22} className="text-primary group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="font-heading font-bold text-lg mb-3 mt-auto">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* FEATURED PROJECTS */}
    <section className="section-padding reveal">
      <div className="container-narrow">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <div className="eyebrow mb-6">Selected work</div>
            <h2 className="display-heading text-4xl md:text-5xl lg:text-6xl max-w-2xl">
              Infrastructure<br />that <span className="text-primary">defines regions.</span>
            </h2>
          </div>
          <Link to="/projects" className="btn-ghost self-start md:self-end">
            All projects <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <Link
              to="/projects"
              key={i}
              className={`group relative rounded-2xl overflow-hidden border border-border ${i % 3 === 0 ? "md:aspect-[16/10]" : "md:aspect-[16/11]"}`}
            >
              <img src={p.img} alt={p.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
              <div className="relative h-full min-h-[320px] p-8 flex flex-col justify-end">
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-primary px-3 py-1 rounded-full border border-primary/40">{p.tag}</span>
                  <span className="font-mono text-[10px] text-muted-foreground">{p.year}</span>
                </div>
                <h3 className="font-heading font-bold text-2xl md:text-3xl flex items-center gap-3 group-hover:text-primary transition-colors">
                  {p.title}
                  <ArrowUpRight size={20} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>

    {/* WHY BRIDGE CRAFT */}
    <section className="section-padding bg-card/30 border-y border-border relative overflow-hidden reveal">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="relative container-narrow">
        <div className="max-w-3xl mb-16">
          <div className="eyebrow mb-6">Why Bridge Craft</div>
          <h2 className="display-heading text-4xl md:text-5xl lg:text-6xl">
            Rigor meets<br /><span className="text-primary">imagination.</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {strengths.map((s, i) => (
            <div key={i} className="group relative bg-background border border-border rounded-2xl p-8 hover-lift hover:border-primary/40">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <s.icon size={22} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-xl mb-2">{s.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* SECTORS MARQUEE */}
    <section className="py-16 overflow-hidden border-b border-border reveal">
      <div className="eyebrow justify-center mb-8">Sectors we serve</div>
      <div className="flex overflow-hidden">
        <div className="flex gap-16 animate-marquee whitespace-nowrap pr-16">
          {[...sectors, ...sectors].map((s, i) => (
            <div key={i} className="flex items-center gap-6 font-heading font-bold text-3xl md:text-5xl text-foreground/40 hover:text-primary transition-colors">
              {s}
              <span className="text-primary text-2xl">◆</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default Index;
