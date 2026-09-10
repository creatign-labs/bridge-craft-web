import { useState } from "react";
import { Plus, Minus, Compass } from "lucide-react";
import Layout from "@/components/Layout";
import { useSanity } from "@/hooks/use-sanity";
import { servicesPageQuery, getIcon } from "@/lib/sanity";
import { services as companyServices } from "@/data/company";


type ServiceDoc = {
  _id: string;
  number?: string;
  title: string;
  shortDescription?: string;
  icon?: string;
  bullets?: string[];
};

type Data = {
  eyebrow?: string;
  headline?: string;
  headlineAccent?: string;
  intro?: string;
  services?: ServiceDoc[];
};

const Services = () => {
  const { data } = useSanity<Data>("servicesPage", servicesPageQuery);
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const services: ServiceDoc[] = data?.services?.length ? data.services : companyServices;


  return (
    <Layout>
      <section className="pt-40 pb-24 px-6 sm:px-8 lg:px-16 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
        <div className="relative container-narrow">
          <div className="eyebrow mb-6 animate-fade-in-up">{data?.eyebrow || "Our capabilities"}</div>
          <h1 className="display-heading text-5xl md:text-7xl lg:text-8xl max-w-4xl animate-fade-in-up animation-delay-100">
            {data?.headline || "Our core"}<br />
            <span className="text-primary">{data?.headlineAccent || "competencies."}</span>
          </h1>
          <p className="mt-8 text-muted-foreground max-w-2xl text-lg animate-fade-in-up animation-delay-200">
            {data?.intro ||
              "Four interconnected disciplines - pre-construction advisory, structural, geotechnical and geophysical engineering - covering every phase from ground investigation to structural excellence."}
          </p>

        </div>
      </section>

      <section className="px-6 sm:px-8 lg:px-16 pb-24 reveal">
        <div className="container-narrow">
          <div className="border-t border-border">
            {services.map((s, i) => {
              const isOpen = openIdx === i;
              const Icon = getIcon(s.icon, Compass);
              return (
                <div key={s._id} className="border-b border-border">
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : i)}
                    className="w-full flex items-center gap-6 md:gap-10 py-8 md:py-10 text-left group"
                  >
                    <span className="font-mono text-sm text-muted-foreground w-8 shrink-0">{s.number || String(i + 1).padStart(2, "0")}</span>
                    <div className="hidden md:flex w-12 h-12 rounded-xl border border-border items-center justify-center shrink-0 group-hover:border-primary/40 transition-colors">
                      <Icon size={20} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <h2 className="display-heading text-2xl md:text-4xl lg:text-5xl group-hover:text-primary transition-colors">
                        {s.title}
                      </h2>
                      {!isOpen && s.shortDescription && <p className="mt-2 text-muted-foreground text-sm md:text-base">{s.shortDescription}</p>}
                    </div>
                    <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center shrink-0 group-hover:border-primary group-hover:bg-primary/10 transition-all">
                      {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                    </div>
                  </button>
                  <div className={`grid transition-all duration-500 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100 pb-10" : "grid-rows-[0fr] opacity-0"}`}>
                    <div className="overflow-hidden">
                      <div className="pl-0 md:pl-24 pr-4 md:pr-16 max-w-4xl">
                        {s.shortDescription && <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8">{s.shortDescription}</p>}
                        {s.bullets && s.bullets.length > 0 && (
                          <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
                            {s.bullets.map((item, j) => (
                              <li key={j} className="flex items-start gap-3 text-foreground/80 text-sm md:text-base">
                                <span className="font-mono text-xs text-primary mt-1 shrink-0">
                                  {String(j + 1).padStart(2, "0")}
                                </span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        )}
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
