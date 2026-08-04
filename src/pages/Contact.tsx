import { useState, useRef, FormEvent } from "react";
import { z } from "zod";
import { MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";
import Layout from "@/components/Layout";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useSanity } from "@/hooks/use-sanity";
import { contactPageQuery, siteSettingsQuery } from "@/lib/sanity";
import { company } from "@/data/company";


type ContactData = {
  eyebrow?: string;
  headline?: string;
  headlineAccent?: string;
  intro?: string;
  formHeading?: string;
  formSubheading?: string;
  submitLabel?: string;
  externalFormUrl?: string;
  externalFormLabel?: string;
  address?: string;
  phone?: string;
  email?: string;
  hours?: string;
  mapEmbedUrl?: string;
};
type SiteData = { address?: string; primaryPhone?: string; primaryEmail?: string };

const CONSENT_TEXT =
  "I consent to Bridge Craft Engineers & Consultants storing the details I have submitted and contacting me about my enquiry. My details will not be sold or shared with third parties.";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100, "Name is too long"),
  email: z.string().trim().email("Please enter a valid email address").max(255),
  phone: z.string().trim().max(30, "Phone number is too long").optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Please tell us a little more about your project")
    .max(2000, "Message is too long"),
});

const COOLDOWN_MS = 60_000;
const COOLDOWN_KEY = "bc_contact_last_submit";

const Contact = () => {
  const { data } = useSanity<ContactData>("contactPage", contactPageQuery);
  const { data: site } = useSanity<SiteData>("siteSettings", siteSettingsQuery);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const mountedAt = useRef(Date.now());

  const address = data?.address || site?.address || company.address;
  const phone = data?.phone || site?.primaryPhone || company.phone;
  const email = data?.email || site?.primaryEmail || company.email;
  const mapUrl = data?.mapEmbedUrl || company.mapUrl;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    // Spam traps: hidden field must stay empty, and bots submit almost instantly.
    if (honeypot.trim() !== "" || Date.now() - mountedAt.current < 3000) {
      toast.success("Message sent — we'll be in touch shortly.");
      return;
    }

    if (!consent) {
      toast.error("Please accept the data consent notice before sending.");
      return;
    }

    const last = Number(localStorage.getItem(COOLDOWN_KEY) || 0);
    if (Date.now() - last < COOLDOWN_MS) {
      toast.error("Please wait a minute before sending another enquiry.");
      return;
    }

    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.from("contact_submissions").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone || null,
      message: parsed.data.message,
      consent_given: true,
      consent_text: CONSENT_TEXT,
    });
    setSubmitting(false);

    if (error) {
      toast.error(
        error.message.includes("rate_limited")
          ? "Please wait a minute before sending another enquiry."
          : "Something went wrong. Please try again or email us directly.",
      );
      return;
    }

    localStorage.setItem(COOLDOWN_KEY, String(Date.now()));
    toast.success("Message sent — we'll be in touch shortly.");
    setForm({ name: "", email: "", phone: "", message: "" });
    setConsent(false);
  };

  return (
    <Layout>
      <section className="pt-40 pb-16 px-6 sm:px-8 lg:px-16">
        <div className="container-narrow">
          <div className="eyebrow mb-6 animate-fade-in-up">{data?.eyebrow || "Let's talk"}</div>
          <h1 className="display-heading text-5xl md:text-7xl lg:text-8xl animate-fade-in-up animation-delay-100">
            {data?.headline || "Start a"}<br /><span className="text-primary">{data?.headlineAccent || "conversation."}</span>
          </h1>
          <p className="mt-8 text-muted-foreground max-w-xl text-lg animate-fade-in-up animation-delay-200">
            {data?.intro || "Tell us about your project. Our engineering team will get back within 24 hours."}
          </p>
        </div>
      </section>

      <section className="px-6 sm:px-8 lg:px-16 pb-24 reveal">
        <div className="container-narrow grid lg:grid-cols-12 gap-10">
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
                {data?.submitLabel || "Send message"} <ArrowUpRight size={16} />
              </button>
            </div>
          </form>

          <div className="lg:col-span-5 space-y-6">
            <div className="bg-card/40 border border-border rounded-3xl p-8 space-y-6">
              <div className="eyebrow">Head office · Chennai</div>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <MapPin size={18} className="text-primary mt-1 shrink-0" />
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Address</div>
                    <p className="text-sm leading-relaxed whitespace-pre-line">{address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone size={18} className="text-primary mt-1 shrink-0" />
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Phone</div>
                    <a href={`tel:${phone.replace(/\s/g, "")}`} className="text-sm hover:text-primary transition-colors">{phone}</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail size={18} className="text-primary mt-1 shrink-0" />
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Email</div>
                    <a href={`mailto:${email}`} className="text-sm hover:text-primary transition-colors">{email}</a>
                  </div>
                </div>
              </div>
            </div>


            <div className="rounded-3xl overflow-hidden border border-border aspect-[4/3] bg-muted">
              <iframe
                src={mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                className="dark:[filter:grayscale(0.4)_contrast(1.1)_invert(0.9)_hue-rotate(180deg)]"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Bridge Craft Engineers & Consultants — Chennai head office location"
              />
            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
