import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, ArrowUpRight, Download } from "lucide-react";
import { useSanity } from "@/hooks/use-sanity";
import { footerQuery, siteSettingsQuery } from "@/lib/sanity";
import { bcAssets } from "@/assets/bc";
import { company } from "@/data/company";


type FooterData = {
  ctaEyebrow?: string;
  ctaHeadline?: string;
  ctaHeadlineAccent?: string;
  primaryCta?: { label?: string; href?: string };
  secondaryCta?: { label?: string; href?: string };
  blurb?: string;
  navLinks?: { label: string; href: string }[];
  legalLinks?: { label: string; href: string }[];
  copyright?: string;
};
type SiteData = {
  shortName?: string;
  tagline?: string;
  logoInitials?: string;
  address?: string;
  primaryPhone?: string;
  primaryEmail?: string;
};

const Footer = () => {
  const { data: footer } = useSanity<FooterData>("footer", footerQuery);
  const { data: site } = useSanity<SiteData>("siteSettings", siteSettingsQuery);

  const navLinks = footer?.navLinks?.length
    ? footer.navLinks
    : [
        { label: "Home", href: "/" },
        { label: "Services", href: "/services" },
        { label: "Projects", href: "/projects" },
        { label: "Gallery", href: "/gallery" },
        { label: "Contact", href: "/contact" },
      ];
  const legal = footer?.legalLinks?.length
    ? footer.legalLinks
    : [
        { label: "Terms", href: "/terms" },
        { label: "Privacy", href: "/privacy" },
      ];

  const copyright = (footer?.copyright || "© {year} BRIDGE CRAFT ENGINEERS & CONSULTANTS — ALL RIGHTS RESERVED")
    .replace("{year}", String(new Date().getFullYear()));

  return (
    <footer className="relative bg-background border-t border-border overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="relative container-narrow px-6 sm:px-8 lg:px-16 pt-24 pb-10">
        <div className="mb-24">
          <div className="eyebrow mb-6">{footer?.ctaEyebrow || "Let's build together"}</div>
          <h2 className="display-heading text-5xl md:text-7xl lg:text-8xl max-w-4xl">
            {footer?.ctaHeadline || "Ready to engineer"}<br />
            <span className="text-ghost">{footer?.ctaHeadlineAccent || "what's next?"}</span>
          </h2>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to={footer?.primaryCta?.href || "/contact"} className="btn-primary">
              {footer?.primaryCta?.label || "Start a project"} <ArrowUpRight size={16} />
            </Link>
            <a href={footer?.secondaryCta?.href || "tel:+914449793337"} className="btn-ghost">
              {footer?.secondaryCta?.label || site?.primaryPhone || "+91 44 49793337"}
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pt-16 border-t border-border">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full border border-primary/60 flex items-center justify-center">
                <span className="font-heading font-black text-primary text-sm">{site?.logoInitials || "BC"}</span>
              </div>
              <div>
                <div className="font-heading font-bold text-sm">{site?.shortName || "BRIDGE CRAFT"}</div>
                <div className="font-mono text-[9px] text-muted-foreground uppercase tracking-[0.2em]">
                  {site?.tagline || "Engineers & Consultants"}
                </div>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
              {footer?.blurb || "A Chennai-based Civil & Infrastructure Design Consultancy delivering precision-engineered solutions for highways, bridges, and urban infrastructure."}
            </p>
          </div>

          <div className="md:col-span-3">
            <div className="eyebrow mb-5">Navigation</div>
            <div className="space-y-3">
              {navLinks.map((link) => (
                <Link key={link.href} to={link.href} className="block text-sm text-foreground/80 hover:text-primary transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="md:col-span-4">
            <div className="eyebrow mb-5">Get in touch</div>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3 text-foreground/80">
                <MapPin size={16} className="mt-0.5 shrink-0 text-primary" />
                <span>{site?.address || "124/1, 2nd Floor, Heera Panna Complex, G N Chetty Road, T Nagar, Chennai 600017"}</span>
              </div>
              <a href={`tel:${(site?.primaryPhone || "+914449793337").replace(/\s/g, "")}`} className="flex items-center gap-3 text-foreground/80 hover:text-primary transition-colors">
                <Phone size={16} className="shrink-0 text-primary" />
                {site?.primaryPhone || "+91 44 49793337"}
              </a>
              <a href={`mailto:${site?.primaryEmail || "info@bridgecraft.in"}`} className="flex items-center gap-3 text-foreground/80 hover:text-primary transition-colors">
                <Mail size={16} className="shrink-0 text-primary" />
                {site?.primaryEmail || "info@bridgecraft.in"}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="font-mono text-xs text-muted-foreground">{copyright}</div>
          <div className="flex gap-6 text-xs font-mono">
            {legal.map((l) => (
              <Link key={l.href} to={l.href} className="text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
