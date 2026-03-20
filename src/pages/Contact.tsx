import { useState, FormEvent } from "react";
import { MapPin, Phone, Mail, ExternalLink } from "lucide-react";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import { toast } from "sonner";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you shortly.");
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <Layout>
      <section className="section-padding">
        <div className="container-narrow">
          <SectionHeading title="Contact Us" subtitle="Let's discuss your next infrastructure project." />

          <div className="grid md:grid-cols-2 gap-10">
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {[
                { name: "name" as const, label: "Name", type: "text" },
                { name: "email" as const, label: "Email", type: "email" },
                { name: "phone" as const, label: "Phone", type: "tel" },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-semibold mb-1.5">{field.label}</label>
                  <input
                    type={field.type}
                    required
                    value={form[field.name]}
                    onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-semibold mb-1.5">Message</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                />
              </div>
              <button type="submit" className="w-full bg-accent-coral text-accent-coral-foreground py-3 rounded-md font-semibold hover:opacity-90 transition-opacity">
                Send Message
              </button>
              <a
                href="https://share.google/3kWr9VYD8IQz4PcD0"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-primary-dark hover:underline mt-2"
              >
                Or fill our Google Form <ExternalLink size={14} />
              </a>
            </form>

            {/* Map & Info */}
            <div className="space-y-6">
              <div className="rounded-lg overflow-hidden shadow-card aspect-video bg-muted">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.8!2d80.2337!3d13.0418!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDAyJzMwLjUiTiA4MMKwMTQnMDEuMyJF!5e0!3m2!1sen!2sin!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Bridge Craft Location"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-accent mt-0.5 shrink-0" />
                  <p className="text-sm text-muted-foreground">124/1, 2nd Floor, Heera Panna Complex, G N Chetty Road, T Nagar, Chennai 600017, Tamil Nadu</p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-accent shrink-0" />
                  <a href="tel:+914449793337" className="text-sm text-muted-foreground hover:text-foreground transition-colors">+91 44 49793337</a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-accent shrink-0" />
                  <a href="mailto:info@bridgecraft.in" className="text-sm text-muted-foreground hover:text-foreground transition-colors">info@bridgecraft.in</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
