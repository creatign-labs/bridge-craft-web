import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useSanity } from "@/hooks/use-sanity";
import { navigationQuery, siteSettingsQuery } from "@/lib/sanity";
import { bcAssets } from "@/assets/bc";
import { company } from "@/data/company";

type NavItem = { label: string; href: string };
type NavData = { label?: string; items?: NavItem[]; ctaLabel?: string; ctaHref?: string };
type SiteData = { shortName?: string; tagline?: string; logoInitials?: string };

const fallbackNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Credentials", href: "/credentials" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];


const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const { data: nav } = useSanity<NavData>("navigation", navigationQuery);
  const { data: site } = useSanity<SiteData>("siteSettings", siteSettingsQuery);

  const items = nav?.items?.length ? nav.items : fallbackNav;
  const ctaLabel = nav?.ctaLabel || "Contact us";
  const ctaHref = nav?.ctaHref || "/contact";
  const shortName = site?.shortName || company.shortName;
  const tagline = site?.tagline || company.tagline;


  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="container-narrow flex items-center justify-between h-20 px-6 sm:px-8 lg:px-16">
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src={bcAssets.logoMark}
            alt={`${company.name} logo`}
            className="h-8 w-auto hidden dark:block transition-transform group-hover:scale-105"
          />
          <img
            src={bcAssets.logoMarkDark}
            alt=""
            aria-hidden="true"
            className="h-8 w-auto dark:hidden transition-transform group-hover:scale-105"
          />
          <div className="hidden sm:block leading-tight">
            <div className="font-heading font-bold text-foreground text-sm tracking-tight">{shortName}</div>
            <div className="font-mono text-[9px] text-muted-foreground uppercase tracking-[0.2em]">{tagline}</div>
            <div className="font-mono text-[9px] text-muted-foreground uppercase tracking-[0.2em] whitespace-nowrap">{company.descriptor}</div>
          </div>
        </Link>


        <div className="hidden lg:flex items-center gap-1">
          {items.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                location.pathname === link.href
                  ? "text-primary"
                  : "text-foreground/70 hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link to={ctaHref} className="hidden sm:inline-flex btn-primary">
            {ctaLabel} <ArrowUpRight size={16} />
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden w-10 h-10 rounded-full border border-border flex items-center justify-center"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-background/95 backdrop-blur-xl border-b border-border animate-fade-in">
          <div className="px-6 py-6 space-y-1">
            {items.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setOpen(false)}
                className={`block py-3 text-lg font-medium border-b border-border/60 ${
                  location.pathname === link.href ? "text-primary" : "text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to={ctaHref}
              onClick={() => setOpen(false)}
              className="btn-primary w-full justify-center mt-4"
            >
              {ctaLabel} <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
