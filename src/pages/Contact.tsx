import { MapPin, Phone, Mail } from "lucide-react";
import Layout from "@/components/Layout";
import ContactForm from "@/components/ContactForm";
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

const Contact = () => {
  const { data } = useSanity<ContactData>("contactPage", contactPageQuery);
  const { data: site } = useSanity<SiteData>("siteSettings", siteSettingsQuery);

  const address = data?.address || site?.address || company.address;
  const phone = data?.phone || site?.primaryPhone || company.phone;
  const email = data?.email || site?.primaryEmail || company.email;
  const mapUrl = data?.mapEmbedUrl || company.mapUrl;

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
          <ContactForm
            className="lg:col-span-7"
            source="contact-page"
            submitLabel={data?.submitLabel || "Send message"}
          />

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
                title="Bridge Craft Engineers & Consultants - Chennai head office location"
              />
            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
