import { useMemo, useState } from "react";
import { X, ArrowUpRight } from "lucide-react";
import Layout from "@/components/Layout";
import projectHighway from "@/assets/project-highway.jpg";
import projectBridge from "@/assets/project-bridge.jpg";
import projectSmartcity from "@/assets/project-smartcity.jpg";
import projectIndustrial from "@/assets/project-industrial.jpg";
import projectGeotech from "@/assets/project-geotech.jpg";
import projectRailway from "@/assets/project-railway.jpg";
import projectUrban from "@/assets/project-urban.jpg";
import { useSanity } from "@/hooks/use-sanity";
import { imageUrl, projectsPageQuery } from "@/lib/sanity";

type ProjectDoc = {
  _id: string;
  title: string;
  slug?: string;
  tag?: string;
  year?: string;
  client?: string;
  location?: string;
  summary?: string;
  image?: unknown;
  metrics?: { value: string; label: string }[];
};

type Data = {
  seo?: { title?: string; description?: string };
  projects?: ProjectDoc[];
};

const fallbackImgs = [projectHighway, projectBridge, projectSmartcity, projectIndustrial, projectGeotech, projectRailway, projectUrban];

const Projects = () => {
  const { data } = useSanity<Data>("projectsPage", projectsPageQuery);
  const [selected, setSelected] = useState<ProjectDoc | null>(null);
  const [filter, setFilter] = useState("All");

  const projects = data?.projects?.length ? data.projects : [];

  const categories = useMemo(() => ["All", ...Array.from(new Set(projects.map((p) => p.tag).filter(Boolean) as string[]))], [projects]);
  const filtered = filter === "All" ? projects : projects.filter((p) => p.tag === filter);

  return (
    <Layout>
      <section className="pt-40 pb-16 px-6 sm:px-8 lg:px-16">
        <div className="container-narrow">
          <div className="eyebrow mb-6 animate-fade-in-up">Portfolio · 2010–2024</div>
          <h1 className="display-heading text-5xl md:text-7xl lg:text-8xl animate-fade-in-up animation-delay-100">
            Selected<br /><span className="text-primary">projects.</span>
          </h1>
          <p className="mt-8 text-muted-foreground max-w-xl text-lg animate-fade-in-up animation-delay-200">
            A portfolio of engineering achievements — from national highways and cable-stayed bridges to smart city networks.
          </p>
        </div>
      </section>

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

      <section className="px-6 sm:px-8 lg:px-16 pb-24 reveal">
        <div className="container-narrow grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <button
              key={p._id}
              onClick={() => setSelected(p)}
              className="group text-left rounded-2xl overflow-hidden border border-border bg-card/30 hover-lift hover:border-primary/40"
            >
              <div className="relative overflow-hidden aspect-[4/3]">
                <img src={imageUrl(p.image, fallbackImgs[i % fallbackImgs.length])} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                {p.tag && (
                  <div className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-widest text-primary px-3 py-1 rounded-full border border-primary/40 bg-background/50 backdrop-blur">
                    {p.tag}
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs text-muted-foreground">{p.year}</span>
                  <ArrowUpRight size={16} className="text-muted-foreground group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                </div>
                <h3 className="font-heading font-bold text-lg leading-tight mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{p.summary}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-background/80 backdrop-blur-md animate-fade-in" onClick={() => setSelected(null)}>
          <div className="bg-card border border-border rounded-t-3xl sm:rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
            <div className="relative">
              <img src={imageUrl(selected.image, fallbackImgs[0])} alt={selected.title} className="w-full aspect-video object-cover rounded-t-3xl" />
              <button onClick={() => setSelected(null)} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/80 backdrop-blur border border-border flex items-center justify-center hover:bg-background">
                <X size={18} />
              </button>
            </div>
            <div className="p-8">
              <div className="flex items-center gap-3 mb-4">
                {selected.tag && <span className="font-mono text-[10px] uppercase tracking-widest text-primary px-3 py-1 rounded-full border border-primary/40">{selected.tag}</span>}
                {selected.year && <span className="font-mono text-xs text-muted-foreground">{selected.year}</span>}
              </div>
              <h2 className="display-heading text-3xl md:text-4xl mb-4">{selected.title}</h2>
              <p className="text-muted-foreground leading-relaxed mb-8">{selected.summary}</p>
              {selected.metrics && selected.metrics.length > 0 && (
                <div className="grid grid-cols-3 gap-3 pt-6 border-t border-border">
                  {selected.metrics.map((m, i) => (
                    <div key={i}>
                      <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">{m.label}</div>
                      <div className="font-heading font-bold text-primary text-xl">{m.value}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Projects;
