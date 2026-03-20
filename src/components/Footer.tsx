import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary-darker text-primary/80">
      <div className="container-narrow section-padding !py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="font-heading font-bold text-lg text-primary mb-3">Bridge Craft Engineers</h3>
            <p className="text-sm leading-relaxed opacity-80">
              A leading Civil & Infrastructure Design Consultancy based in Chennai, delivering precision-engineered solutions for highways, bridges, and urban infrastructure.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-primary mb-4">Quick Links</h4>
            <div className="space-y-2">
              {[
                { label: "Home", to: "/" },
                { label: "Projects", to: "/projects" },
                { label: "Services", to: "/services" },
                { label: "Gallery", to: "/gallery" },
                { label: "Contact", to: "/contact" },
                { label: "Terms & Conditions", to: "/terms" },
                { label: "Privacy Policy", to: "/privacy" },
              ].map((link) => (
                <Link key={link.to} to={link.to} className="block text-sm hover:text-primary transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-primary mb-4">Contact Info</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0 text-accent" />
                <span>124/1, 2nd Floor, Heera Panna Complex, G N Chetty Road, T Nagar, Chennai 600017</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="shrink-0 text-accent" />
                <a href="tel:+914449793337" className="hover:text-primary transition-colors">+91 44 49793337</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="shrink-0 text-accent" />
                <a href="mailto:info@bridgecraft.in" className="hover:text-primary transition-colors">info@bridgecraft.in</a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary/20 mt-10 pt-6 text-center text-xs opacity-60">
          © {new Date().getFullYear()} Bridge Craft Engineers & Consultants. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
