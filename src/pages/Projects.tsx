import { useMemo, useState } from "react";
import { X, ArrowUpRight } from "lucide-react";
import Layout from "@/components/Layout";
import { useSanity } from "@/hooks/use-sanity";
import { imageUrl, projectsPageQuery } from "@/lib/sanity";
import { projects as companyProjects, type ProjectRecord } from "@/data/company";

type SanityProject = {
  _id: string;
  title: string;
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
  projects?: SanityProject[];
};

const Projects = () => {
  const { data } = useSanity<Data>("projectsPage", projectsPageQuery);
  const [selected, setSelected] = useState<ProjectRecord | null>(null);
  const [filter, setFilter] = useState("All");

  // Sanity content overrides the profile-sourced record where it exists.
  const projects: ProjectRecord[] = useMemo(() => {
    const remote = data?.projects ?? [];
    if (!remote.length) return companyProjects;
    return remote.map((p, i) => {
      const base = companyProjects[i] ?? companyProjects[0];
      return {
        ...base,
        _id: p._id,
        title: p.title || base.title,
        tag: p.tag || base.tag,
        client: p.client || base.client,
        location: p.location || base.location,
        summary: p.summary || base.summary,
        image: imageUrl(p.image, base.image),
      };
    });
  }, [data]);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((p) => p.tag).filter(Boolean)))],
    [projects],
  );
  const filtered = filter === "All" ? projects : projects.filter((p) => p.tag === filter);

  return (
    <Layout>
      <section className="pt-40 pb-16 px-6 sm:px-8 lg:px-16">
        <div className="container-narrow">
          <div className="eyebrow mb-6 animate-fade-in-up">Projects executed</div>
          <h1 className="display-heading text-5xl md:text-7xl lg:text-8xl animate-fade-in-up animation-delay-100">
            Selected<br /><span className="text-primary">projects.</span>
          </h1>
          <p className="mt-8 text-muted-foreground max-w-xl text-lg animate-fade-in-up animation-delay-200">
            Marine bridges, national highway corridors, railway structures and utility-scale
            investigations — delivered for NHIDCL, NHAI, South Central Railway and CPWD assignments.
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
          {filtered.map((p) => (
            <button
              key={p._id}
              onClick={() => setSelected(p)}
              className="group text-left rounded-2xl overflow-hidden border border-border bg-card/30 hover-lift hover:border-primary/40"
            >
              <div className="relative overflow-hidden aspect-[4/3]">
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-widest text-primary px-3 py-1 rounded-full border border-primary/40 bg-background/50 backdrop-blur">
                  {p.tag}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs text-muted-foreground">
                    {p.value || p.location.split(",").slice(-1)[0].trim()}
                  </span>
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
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-background/80 backdrop-blur-md animate-fade-in"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-card border border-border rounded-t-3xl sm:rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img src={selected.image} alt={selected.title} className="w-full aspect-video object-cover rounded-t-3xl" />
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/80 backdrop-blur border border-border flex items-center justify-center hover:bg-background"
                aria-label="Close project details"
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="font-mono text-[10px] uppercase tracking-widest text-primary px-3 py-1 rounded-full border border-primary/40">
                  {selected.tag}
                </span>
                {selected.value && <span className="font-mono text-xs text-muted-foreground">{selected.value}</span>}
              </div>
              <h2 className="display-heading text-3xl md:text-4xl mb-3">{selected.title}</h2>
              <p className="text-sm text-muted-foreground mb-8">{selected.heading}</p>

              <dl className="grid sm:grid-cols-3 gap-6 pb-8 border-b border-border">
                {[
                  { label: "Client", value: selected.client },
                  { label: "Authority", value: selected.authority },
                  { label: "Location", value: selected.location },
                ]
                  .filter((d) => d.value)
                  .map((d) => (
                    <div key={d.label}>
                      <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">{d.label}</dt>
                      <dd className="text-sm text-foreground/90 leading-relaxed">{d.value}</dd>
                    </div>
                  ))}
              </dl>

              <div className="grid md:grid-cols-2 gap-8 py-8 border-b border-border">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3">Scope of services</div>
                  <p className="text-sm text-foreground/80 leading-relaxed">{selected.scope}</p>
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3">Project description</div>
                  <p className="text-sm text-foreground/80 leading-relaxed">{selected.summary}</p>
                </div>
              </div>

              <div className="pt-8">
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-4">Key highlights</div>
                <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                  {selected.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-foreground/80">
                      <span className="font-mono text-xs text-primary mt-0.5 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {selected.gallery && selected.gallery.length > 1 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-8">
                  {selected.gallery.map((g) => (
                    <img key={g} src={g} alt={selected.title} loading="lazy" className="rounded-xl border border-border object-cover aspect-[4/3] w-full" />
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
