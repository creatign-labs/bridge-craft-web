import { Link } from "react-router-dom";
import { ArrowUpRight, Target, Flag } from "lucide-react";
import Layout from "@/components/Layout";
import { bcAssets } from "@/assets/bc";
import {
  company,
  introParagraphs,
  vision,
  mission,
  values,
  strategyPillars,
  whyChooseUs,
  teamStatement,
} from "@/data/company";
import { getIcon } from "@/lib/sanity";

const About = () => (
  <Layout>
    <section className="pt-40 pb-16 px-6 sm:px-8 lg:px-16">
      <div className="container-narrow">
        <div className="eyebrow mb-6 animate-fade-in-up">About us</div>
        <h1 className="display-heading text-5xl md:text-7xl lg:text-8xl animate-fade-in-up animation-delay-100">
          Engineered with<br />
          <span className="text-primary">responsibility.</span>
        </h1>
        <p className="mt-8 text-muted-foreground max-w-2xl text-lg animate-fade-in-up animation-delay-200">
          {company.strapline}
        </p>
      </div>
    </section>

    {/* INTRODUCTION */}
    <section className="section-padding reveal">
      <div className="container-narrow grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-7 space-y-6">
          <div className="eyebrow mb-2">Introduction</div>
          {introParagraphs.map((p) => (
            <p key={p.slice(0, 24)} className="text-muted-foreground leading-relaxed">
              {p}
            </p>
          ))}
          <p className="font-heading font-bold text-xl text-foreground pt-2">
            We believe that great structures are not just constructed, they are engineered with responsibility.
          </p>
        </div>
        <div className="lg:col-span-5 relative">
          <div className="absolute -inset-4 bg-gradient-primary opacity-10 blur-3xl rounded-full" />
          <div className="relative rounded-2xl overflow-hidden border border-border">
            <img
              src={bcAssets.marineGeotechTeam}
              alt="Bridge Craft geotechnical team on a barge-mounted rig in the Andaman Islands"
              className="w-full aspect-[4/5] object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>

    {/* VISION & MISSION */}
    <section className="section-padding bg-card/30 border-y border-border reveal">
      <div className="container-narrow grid md:grid-cols-2 gap-6">
        {[
          { icon: Target, label: "Our vision", body: vision },
          { icon: Flag, label: "Mission statement", body: mission },
        ].map(({ icon: Icon, label, body }) => (
          <div key={label} className="bg-background border border-border rounded-2xl p-8 md:p-10 hover-lift hover:border-primary/40">
            <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center mb-6">
              <Icon size={22} className="text-primary" />
            </div>
            <div className="eyebrow mb-4">{label}</div>
            <p className="text-foreground/85 text-lg leading-relaxed">{body}</p>
          </div>
        ))}
      </div>
    </section>

    {/* VALUES */}
    <section className="section-padding reveal">
      <div className="container-narrow">
        <div className="max-w-3xl mb-16">
          <div className="eyebrow mb-6">What guides us</div>
          <h2 className="display-heading text-4xl md:text-5xl lg:text-6xl">
            Five values.<br />
            <span className="text-primary">One standard.</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden border border-border">
          {values.map((v, i) => (
            <div key={v.title} className="bg-background p-8 min-h-[220px] flex flex-col">
              <span className="font-mono text-xs text-muted-foreground mb-8">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="font-heading font-bold text-lg mb-3 mt-auto">{v.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{v.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CORPORATE STRATEGY */}
    <section className="section-padding bg-card/30 border-y border-border relative overflow-hidden reveal">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="relative container-narrow">
        <div className="max-w-3xl mb-16">
          <div className="eyebrow mb-6">Corporate strategy</div>
          <h2 className="display-heading text-4xl md:text-5xl lg:text-6xl">
            Focused growth,<br />
            <span className="text-primary">built on technical depth.</span>
          </h2>
          <p className="mt-8 text-muted-foreground leading-relaxed">
            Bridge Craft Engineers &amp; Consultants adopts a focused and sustainable growth strategy
            built on technical excellence, regulatory compliance, and long-term client relationships.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {strategyPillars.map((p) => (
            <div key={p.number} className="bg-background border border-border rounded-2xl p-8 hover-lift hover:border-primary/40">
              <span className="font-mono text-xs text-primary">{p.number}</span>
              <h3 className="font-heading font-bold text-xl mt-4 mb-3">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">{p.description}</p>
              <ul className="space-y-2">
                {p.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-3 text-sm text-foreground/80">
                    <span className="text-primary mt-1 text-[10px]">◆</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* TEAM */}
    <section className="section-padding reveal">
      <div className="container-narrow grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 order-2 lg:order-1 rounded-2xl overflow-hidden border border-border">
          <img
            src={bcAssets.cpwdSiteTeam}
            alt="Bridge Craft engineers conducting a site soil investigation"
            className="w-full aspect-[4/3] object-cover"
            loading="lazy"
          />
        </div>
        <div className="lg:col-span-6 order-1 lg:order-2">
          <div className="eyebrow mb-6">Team</div>
          <h2 className="display-heading text-4xl md:text-5xl">
            Led by engineers,<br />
            <span className="text-primary">grounded in the field.</span>
          </h2>
          <div className="mt-8 space-y-5">
            {teamStatement.map((t) => (
              <p key={t.slice(0, 24)} className="text-muted-foreground leading-relaxed">
                {t}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* WHY CHOOSE US */}
    <section className="section-padding bg-card/30 border-y border-border reveal">
      <div className="container-narrow">
        <div className="max-w-3xl mb-16">
          <div className="eyebrow mb-6">Why choose us</div>
          <h2 className="display-heading text-4xl md:text-5xl lg:text-6xl">
            Rigor meets<br />
            <span className="text-primary">field reality.</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyChooseUs.map((s) => {
            const Icon = getIcon(s.icon);
            return (
              <div key={s.title} className="group bg-background border border-border rounded-2xl p-8 hover-lift hover:border-primary/40">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <Icon size={22} className="text-primary" />
                </div>
                <h3 className="font-heading font-bold text-lg mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
              </div>
            );
          })}
        </div>
        <div className="mt-12">
          <Link to="/contact" className="btn-primary">
            Talk to our engineers <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  </Layout>
);

export default About;
