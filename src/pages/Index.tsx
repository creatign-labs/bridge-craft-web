import { Link } from "react-router-dom";
import { ArrowRight, Shield, Target, Lightbulb, Zap, Compass, HardHat, Building2, Train } from "lucide-react";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import heroImg from "@/assets/hero-bridge.jpg";
import teamImg from "@/assets/team-office.jpg";
import projectHighway from "@/assets/project-highway.jpg";
import projectBridge from "@/assets/project-bridge.jpg";
import projectSmartcity from "@/assets/project-smartcity.jpg";
import projectRailway from "@/assets/project-railway.jpg";

const services = [
  { icon: Compass, title: "Detailed Design Engineering", desc: "Structural, highway, and bridge design with cutting-edge CAD/BIM tools." },
  { icon: HardHat, title: "Geotechnical Investigations", desc: "Comprehensive soil testing and foundation design recommendations." },
  { icon: Target, title: "Detailed Project Reports", desc: "Feasibility studies, cost estimation, and compliance-ready DPRs." },
  { icon: Zap, title: "Support Services", desc: "Quality assurance, project management, and construction supervision." },
];

const projects = [
  { img: projectHighway, title: "National Highway Expansion", tag: "Highways" },
  { img: projectBridge, title: "Cable-Stayed Bridge Design", tag: "Bridges" },
  { img: projectSmartcity, title: "Smart City Infrastructure", tag: "Smart Cities" },
  { img: projectRailway, title: "Railway Overpass Network", tag: "Railways" },
];

const strengths = [
  { icon: Shield, title: "Integrated Design Capability", desc: "End-to-end engineering solutions under one roof." },
  { icon: HardHat, title: "Field-Tested Practices", desc: "Proven methodologies refined through real-world execution." },
  { icon: Building2, title: "Institutional Expertise", desc: "Deep knowledge across government and private sector projects." },
  { icon: Zap, title: "Agile Execution", desc: "Rapid delivery without compromising on quality standards." },
];

const sectors = [
  { icon: Compass, label: "Highways" },
  { icon: Building2, label: "Bridges" },
  { icon: Lightbulb, label: "Smart Cities" },
  { icon: Train, label: "Industrial Corridors" },
];

const Index = () => (
  <Layout>
    {/* Hero */}
    <section className="relative h-[85vh] min-h-[600px] flex items-center">
      <img src={heroImg} alt="Infrastructure" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-hero-overlay" />
      <div className="relative z-10 container-narrow px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl animate-fade-in-up">
          <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-primary mb-4 leading-tight">
            Engineering Excellence, Built to Last.
          </h1>
          <p className="text-lg md:text-xl text-primary/70 mb-8">
            From design to delivery — we engineer infrastructure that defines tomorrow.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/services" className="bg-accent text-accent-foreground px-6 py-3 rounded-md font-semibold hover:opacity-90 transition-opacity">
              Explore Services
            </Link>
            <Link to="/projects" className="bg-accent-coral text-accent-coral-foreground px-6 py-3 rounded-md font-semibold hover:opacity-90 transition-opacity">
              View Projects
            </Link>
          </div>
        </div>
      </div>
    </section>

    {/* About */}
    <section className="section-padding">
      <div className="container-narrow grid md:grid-cols-2 gap-12 items-center">
        <div className="animate-fade-in-up">
          <SectionHeading title="About Bridge Craft" centered={false} />
          <p className="text-muted-foreground leading-relaxed mb-4">
            Bridge Craft Engineers & Consultants is a premier Civil & Infrastructure Design Consultancy headquartered in Chennai. We combine decades of engineering expertise with innovative design methodologies to deliver infrastructure that stands the test of time.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Our core values — <strong className="text-foreground">Integrity</strong>, <strong className="text-foreground">Precision</strong>, and <strong className="text-foreground">Innovation</strong> — guide every project we undertake, from national highways to urban smart city developments.
          </p>
          <Link to="/services" className="inline-flex items-center gap-2 text-primary-dark font-semibold hover:gap-3 transition-all">
            Learn More <ArrowRight size={16} />
          </Link>
        </div>
        <div className="animate-fade-in-up animation-delay-200">
          <img src={teamImg} alt="Our Team" className="rounded-lg shadow-card w-full object-cover aspect-[4/3]" />
        </div>
      </div>
    </section>

    {/* Services Preview */}
    <section className="section-padding bg-muted">
      <div className="container-narrow">
        <SectionHeading title="Core Services" subtitle="Comprehensive engineering solutions tailored to your infrastructure needs." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <div key={i} className={`bg-card p-6 rounded-lg shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 animate-fade-in-up animation-delay-${i * 200 > 600 ? 600 : i * 200}`}>
              <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4">
                <s.icon size={24} className="text-primary-foreground" />
              </div>
              <h3 className="font-heading font-bold text-lg mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Featured Projects */}
    <section className="section-padding">
      <div className="container-narrow">
        <SectionHeading title="Featured Projects" subtitle="A showcase of our engineering achievements across India." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((p, i) => (
            <Link to="/projects" key={i} className="group relative rounded-lg overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300">
              <img src={p.img} alt={p.title} className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-darker/90 to-transparent flex flex-col justify-end p-4">
                <span className="text-xs font-semibold text-accent mb-1">{p.tag}</span>
                <h4 className="font-heading font-bold text-primary text-sm">{p.title}</h4>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>

    {/* Why Bridge Craft */}
    <section className="section-padding bg-muted">
      <div className="container-narrow">
        <SectionHeading title="Why Bridge Craft?" subtitle="What sets us apart in the infrastructure consultancy landscape." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {strengths.map((s, i) => (
            <div key={i} className="text-center p-6">
              <div className="w-14 h-14 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-4">
                <s.icon size={26} className="text-primary-foreground" />
              </div>
              <h4 className="font-heading font-bold mb-2">{s.title}</h4>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Sectors */}
    <section className="section-padding">
      <div className="container-narrow">
        <SectionHeading title="Sectors We Serve" />
        <div className="flex flex-wrap justify-center gap-8">
          {sectors.map((s, i) => (
            <div key={i} className="flex flex-col items-center gap-2 p-6 rounded-lg hover:bg-muted transition-colors">
              <div className="w-16 h-16 rounded-full border-2 border-primary flex items-center justify-center">
                <s.icon size={28} className="text-primary-dark" />
              </div>
              <span className="font-heading font-semibold text-sm">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA Banner */}
    <section className="bg-gradient-dark section-padding !py-16">
      <div className="container-narrow text-center">
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-primary mb-4">
          Partner with us to shape the infrastructure of tomorrow.
        </h2>
        <Link to="/contact" className="inline-block mt-4 bg-accent text-accent-foreground px-8 py-3 rounded-md font-semibold hover:opacity-90 transition-opacity">
          Get in Touch
        </Link>
      </div>
    </section>
  </Layout>
);

export default Index;
