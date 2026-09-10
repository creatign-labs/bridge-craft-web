import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, ChevronDown, Download, Compass, Building2, HardHat, Waves } from "lucide-react";
import Layout from "@/components/Layout";
import ContactForm from "@/components/ContactForm";
import { useSanity } from "@/hooks/use-sanity";
import { homepageQuery, imageUrl, getIcon } from "@/lib/sanity";
import type { LucideIcon } from "lucide-react";
import { bcAssets } from "@/assets/bc";
import {
  company,
  introParagraphs,
  services as companyServices,
  projects as companyProjects,
  sectors as companySectors,
  whyChooseUs,
} from "@/data/company";

type Homepage = {
  heroEyebrow?: string;
  heroHeadline?: string;
  heroHeadlineAccent?: string;
  heroSubheadline?: string;
  heroImage?: unknown;
  heroPrimaryCta?: { label?: string; href?: string };
  heroSecondaryCta?: { label?: string; href?: string };
  stats?: { value: string; label: string }[];
  homeStats?: { intro?: string; stats?: { value: string; label: string }[] };
  aboutEyebrow?: string;
  aboutHeadline?: string;
  aboutHeadlineAccent?: string;
  aboutBody?: string;
  aboutValues?: string[];
  aboutImage?: unknown;
  aboutCtaLabel?: string;
  aboutCtaHref?: string;
  servicesEyebrow?: string;
  servicesHeadline?: string;
  servicesHeadlineAccent?: string;
  featuredServices?: { _id: string; number?: string; title: string; shortDescription?: string; icon?: string }[];
  projectsEyebrow?: string;
  projectsHeadline?: string;
  projectsHeadlineAccent?: string;
  featuredProjects?: { _id: string; title: string; tag?: string; year?: string; image?: unknown }[];
  whyEyebrow?: string;
  whyHeadline?: string;
  whyHeadlineAccent?: string;
  strengths?: { icon?: string; title: string; description: string }[];
  sectorsEyebrow?: string;
  sectors?: string[];
};

const fallbackServiceIcons: LucideIcon[] = [Compass, Building2, HardHat, Waves];
const featuredProjectFallback = companyProjects.slice(0, 4);

const Index = () => {
  const { data } = useSanity<Homepage>("homepage", homepageQuery);

  const services = data?.featuredServices?.length ? data.featuredServices : companyServices;
  const strengths = data?.strengths?.length ? data.strengths : whyChooseUs.slice(0, 4);
  const sectors = data?.sectors?.length ? data.sectors : companySectors;

  const projects = data?.featuredProjects?.length
    ? data.featuredProjects.map((p, i) => ({
        _id: p._id,
        title: p.title,
        tag: p.tag ?? featuredProjectFallback[i % 4].tag,
        meta: p.year ?? featuredProjectFallback[i % 4].value,
        image: imageUrl(p.image, featuredProjectFallback[i % 4].image),
      }))
    : featuredProjectFallback.map((p) => ({
        _id: p._id,
        title: p.title,
        tag: p.tag,
        meta: p.value,
        image: p.image,
      }));

  return (
    <Layout>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <img
          src={imageUrl(data?.heroImage, bcAssets.marineBridgeSite)}
          alt="Major marine bridge works over Middle Strait Creek, NH-04, Andaman & Nicobar Islands"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="absolute inset-0 bg-background/40" />

        <div className="relative z-10 container-narrow px-6 sm:px-8 lg:px-16 w-full pt-32 pb-24">
          <div className="animate-fade-in-up">
            <h1 className="display-heading text-6xl md:text-8xl lg:text-9xl max-w-5xl">
              {data?.heroHeadline || "Engineering"}
              <br />
              <span className="text-primary">{data?.heroHeadlineAccent || "Excellence."}</span>
            </h1>
            <p className="mt-8 text-lg md:text-xl text-foreground/70 max-w-xl leading-relaxed">
              {data?.heroSubheadline ||
                "From ground investigation to structural excellence - technically sound, economically optimized and execution-ready engineering solutions."}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to={data?.heroPrimaryCta?.href || "/services"} className="btn-primary">
                {data?.heroPrimaryCta?.label || "Explore services"} <ArrowUpRight size={16} />
              </Link>
              <a href={company.profileUrl} download className="btn-ghost">
                Download Company Profile <Download size={16} />
              </a>
              <Link to="/contact" className="btn-ghost">
                Contact us
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
      <section className="py-16 border-b border-border reveal">
        <div className="container-narrow text-center">
          <p className="text-muted-foreground text-sm md:text-base mb-10">
            {data?.homeStats?.intro ?? "Growing rapidly through proven project experience since 2024"}
          </p>
          <div className="grid sm:grid-cols-3 gap-8 md:gap-12">
            {(data?.homeStats?.stats?.length ? data.homeStats.stats : data?.stats ?? [
              { value: "15+", label: "Project Assignments" },
              { value: "200+", label: "Boreholes Investigated" },
              { value: "10+", label: "Project Locations Across India" },
            ]).map((stat, i) => (
              <div key={i} className="text-center">
                <div className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-sm md:text-base tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="section-padding reveal">
        <div className="container-narrow grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <div className="eyebrow mb-6">{data?.aboutEyebrow || "About Bridge Craft"}</div>
            <h2 className="display-heading text-4xl md:text-5xl lg:text-6xl">
              {data?.aboutHeadline || "A consultancy built on"}<br />
              <span className="text-primary">{data?.aboutHeadlineAccent || "precision."}</span>
            </h2>
            <p className="text-muted-foreground mt-8 leading-relaxed max-w-lg whitespace-pre-line">
              {data?.aboutBody || introParagraphs[0]}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Link to={data?.aboutCtaHref || "/about"} className="inline-flex items-center gap-2 text-primary font-semibold group">
                {data?.aboutCtaLabel || "Learn more about us"} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
          <div className="lg:col-span-6 relative">
            <div className="absolute -inset-4 bg-gradient-primary opacity-10 blur-3xl rounded-full" />
            <div className="relative rounded-2xl overflow-hidden border border-border">
              <img
                src={imageUrl(data?.aboutImage, bcAssets.marineGeotechTeam)}
                alt="Bridge Craft geotechnical crew operating a barge-mounted drilling rig"
                className="w-full aspect-[4/5] object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section-padding bg-card/30 border-y border-border reveal">
        <div className="container-narrow">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <div className="eyebrow mb-6">{data?.servicesEyebrow || "Core capabilities"}</div>
              <h2 className="display-heading text-4xl md:text-5xl lg:text-6xl max-w-2xl">
                {data?.servicesHeadline || "Four disciplines."}<br />
                <span className="text-primary">{data?.servicesHeadlineAccent || "One vision."}</span>
              </h2>
            </div>
            <Link to="/services" className="btn-ghost self-start md:self-end">
              All services <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden border border-border">
            {services.map((s, i) => {
              const Icon = getIcon(s.icon, fallbackServiceIcons[i % fallbackServiceIcons.length]);
              return (
                <div key={s._id} className="group bg-background p-8 hover:bg-card transition-colors duration-500 min-h-[280px] flex flex-col">
                  <div className="flex items-start justify-between mb-8">
                    <span className="font-mono text-xs text-muted-foreground">{s.number || String(i + 1).padStart(2, "0")}</span>
                    <Icon size={22} className="text-primary group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="font-heading font-bold text-lg mb-3 mt-auto">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.shortDescription}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="section-padding reveal">
        <div className="container-narrow">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <div className="eyebrow mb-6">{data?.projectsEyebrow || "Projects executed"}</div>
              <h2 className="display-heading text-4xl md:text-5xl lg:text-6xl max-w-2xl">
                {data?.projectsHeadline || "Infrastructure that"}<br />
                <span className="text-primary">{data?.projectsHeadlineAccent || "defines regions."}</span>
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
                key={p._id}
                className={`group relative rounded-2xl overflow-hidden border border-border ${i % 3 === 0 ? "md:aspect-[16/10]" : "md:aspect-[16/11]"}`}
              >
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                <div className="relative h-full min-h-[320px] p-8 flex flex-col justify-end">
                  <div className="flex items-center gap-3 mb-3">
                    {p.tag && <span className="font-mono text-[10px] uppercase tracking-widest text-primary px-3 py-1 rounded-full border border-primary/40">{p.tag}</span>}
                    {p.meta && <span className="font-mono text-[10px] text-muted-foreground">{p.meta}</span>}
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

      {/* WHY */}
      <section className="section-padding bg-card/30 border-y border-border relative overflow-hidden reveal">
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
        <div className="relative container-narrow">
          <div className="max-w-3xl mb-16">
            <div className="eyebrow mb-6">{data?.whyEyebrow || "Why Bridge Craft"}</div>
            <h2 className="display-heading text-4xl md:text-5xl lg:text-6xl">
              {data?.whyHeadline || "Rigor meets"}<br />
              <span className="text-primary">{data?.whyHeadlineAccent || "field reality."}</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {strengths.map((s, i) => {
              const Icon = getIcon(s.icon);
              return (
                <div key={i} className="group relative bg-background border border-border rounded-2xl p-8 hover-lift hover:border-primary/40">
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Icon size={22} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-xl mb-2">{s.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{s.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="section-padding border-b border-border reveal">
        <div className="container-narrow grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5">
            <div className="eyebrow mb-6">Enquiries</div>
            <h2 className="display-heading text-4xl md:text-5xl lg:text-6xl">
              Tell us about<br /><span className="text-primary">your project.</span>
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed max-w-md">
              Share a few details and our engineering team will get back to you within 24 hours.
            </p>
            <div className="mt-8 space-y-3 text-sm">
              <a href={`tel:${company.phone.replace(/\s/g, "")}`} className="block text-foreground/80 hover:text-primary transition-colors">
                {company.phone}
              </a>
              <a href={`mailto:${company.email}`} className="block text-foreground/80 hover:text-primary transition-colors">
                {company.email}
              </a>
            </div>
          </div>
          <ContactForm className="lg:col-span-7" source="homepage" />
        </div>
      </section>

      {/* SECTORS */}
      <section className="py-16 overflow-hidden border-b border-border reveal">
        <div className="eyebrow justify-center mb-8">{data?.sectorsEyebrow || "Sectors we serve"}</div>
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
};

export default Index;
