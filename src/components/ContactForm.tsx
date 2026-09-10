import { useState, useRef, FormEvent } from "react";
import { z } from "zod";
import { ArrowUpRight } from "lucide-react";
import { toast } from "sonner";

export const CONSENT_TEXT =
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

type Props = {
  /** Where the enquiry came from - shown in the leads dashboard. */
  source?: string;
  submitLabel?: string;
  className?: string;
};

const ContactForm = ({ source = "website", submitLabel = "Send message", className = "" }: Props) => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const mountedAt = useRef(Date.now());
  const fieldId = useRef(`bc-hp-${Math.random().toString(36).slice(2, 8)}`);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    // Spam traps: hidden field must stay empty, and bots submit almost instantly.
    if (honeypot.trim() !== "" || Date.now() - mountedAt.current < 3000) {
      toast.success("Message sent - we'll be in touch shortly.");
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
    const baseUrl = import.meta.env.VITE_SUPABASE_URL;
    const res = await fetch(`${baseUrl}/functions/v1/save-contact-to-sanity`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone || "",
        message: parsed.data.message,
        consent: true,
        source,
        honeypot,
        loadedAt: mountedAt.current,
      }),
    }).catch(() => null);
    setSubmitting(false);

    if (!res || !res.ok) {
      const body = await res?.json().catch(() => null);
      toast.error(body?.error || "Something went wrong. Please try again or email us directly.");
      return;
    }

    localStorage.setItem(COOLDOWN_KEY, String(Date.now()));
    toast.success("Message sent - we'll be in touch shortly.");
    setForm({ name: "", email: "", phone: "", message: "" });
    setConsent(false);
  };

  const inputClass =
    "w-full bg-transparent border-b border-border py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors";
  const labelClass = "block font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2";

  return (
    <form
      onSubmit={handleSubmit}
      className={`relative space-y-6 bg-card/40 border border-border rounded-3xl p-8 md:p-10 ${className}`}
    >
      <div className="grid sm:grid-cols-2 gap-6">
        {[
          { name: "name" as const, label: "Full name", type: "text", ph: "Jane Doe" },
          { name: "email" as const, label: "Email", type: "email", ph: "jane@company.com" },
        ].map((field) => (
          <div key={field.name}>
            <label className={labelClass}>{field.label}</label>
            <input
              type={field.type}
              required
              placeholder={field.ph}
              value={form[field.name]}
              onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
              className={inputClass}
            />
          </div>
        ))}
      </div>
      <div>
        <label className={labelClass}>Phone</label>
        <input
          type="tel"
          required
          placeholder="+91 98765 43210"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className={inputClass}
        />
      </div>
      <div>
        <label className={labelClass}>Project details</label>
        <textarea
          required
          rows={5}
          placeholder="Tell us about your project scope, timeline, and location..."
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className={`${inputClass} resize-none`}
        />
      </div>

      {/* Honeypot - hidden from humans, bots fill it in */}
      <div className="absolute -left-[9999px] top-auto w-px h-px overflow-hidden" aria-hidden="true">
        <label htmlFor={fieldId.current}>Company website</label>
        <input
          id={fieldId.current}
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <label className="flex items-start gap-3 pt-2 cursor-pointer">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 h-4 w-4 shrink-0 rounded border-border accent-[hsl(var(--primary))]"
        />
        <span className="text-xs leading-relaxed text-muted-foreground">{CONSENT_TEXT}</span>
      </label>

      <div className="flex flex-wrap items-center gap-4 pt-4">
        <button type="submit" className="btn-primary disabled:opacity-60" disabled={submitting || !consent}>
          {submitting ? "Sending..." : submitLabel} <ArrowUpRight size={16} />
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
