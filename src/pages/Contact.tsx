import { useState, FormEvent } from "react";
import { MapPin, Phone, Mail, ExternalLink, ArrowUpRight } from "lucide-react";
import Layout from "@/components/Layout";
import { toast } from "sonner";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    toast.success("Message sent — we'll be in touch shortly.");
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <Layout>
      <section className="pt-40 pb-16 px-6 sm:px-8 lg:px-16">
        <div className="container-narrow">
          <div className="eyebrow mb-6 animate-fade-in-up">Let's talk</div>
          <h1 className="display-heading text-5xl md:text-7xl lg:text-8xl animate-fade-in-up animation-delay-100">
            Start a<br /><span className="text-primary">conversation.</span>
          </h1>
          <p className="mt-8 text-muted-foreground max-w-xl text-lg animate-fade-in-up animation-delay-200">
            Tell us about your project. Our engineering team will get back within 24 hours.
          </p>
        </div>
      </section>

      <section className="px-6 sm:px-8 lg:px-16 pb-24 reveal">
        <div className="container-narrow grid lg:grid-cols-12 gap-10">
          {/* Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-6 bg-card/40 border border-border rounded-3xl p-8 md:p-10">
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { name: "name" as const, label: "Full name", type: "text", ph: "Jane Doe" },
                { name: "email" as const, label: "Email", type: "email", ph: "jane@company.com" },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">{field.label}</label>
                  <input
                    type={field.type}
                    required
                    placeholder={field.ph}
                    value={form[field.name]}
                    onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                    className="w-full bg-transparent border-b border-border py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              ))}
            </div>
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Phone</label>
              <input
                type="tel"
                required
                placeholder="+91 98765 43210"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full bg-transparent border-b border-border py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Project details</label>
              <textarea
                required
                rows={5}
                placeholder="Tell us about your project scope, timeline, and location…"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-transparent border-b border-border py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors resize-none"
              />
            </div>
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button type="submit" className="btn-primary">
                Send message <ArrowUpRight size={16} />
              </button>
              <a
                href="https://share.google/3kWr9VYD8IQz4PcD0"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Or use our Google Form <ExternalLink size={14} />
              </a>
            </div>
          </form>

          {/* Info + Map */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-card/40 border border-border rounded-3xl p-8 space-y-6">
              <div className="eyebrow">Head office · Chennai</div>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <MapPin size={18} className="text-primary mt-1 shrink-0" />
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Address</div>
                    <p className="text-sm leading-relaxed">124/1, 2nd Floor, Heera Panna Complex,<br />G N Chetty Road, T Nagar,<br />Chennai 600017, Tamil Nadu</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone size={18} className="text-primary mt-1 shrink-0" />
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Phone</div>
                    <a href="tel:+914449793337" className="text-sm hover:text-primary transition-colors">+91 44 49793337</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail size={18} className="text-primary mt-1 shrink-0" />
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Email</div>
                    <a href="mailto:info@bridgecraft.in" className="text-sm hover:text-primary transition-colors">info@bridgecraft.in</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden border border-border aspect-[4/3] bg-muted">
              <iframe
                src="https://www.google.com/maps?q=T+Nagar+Chennai&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(0.4) contrast(1.1) invert(0.9) hue-rotate(180deg)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Bridge Craft Location"
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
