"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, MessageCircle, MapPin } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { site, whatsappLink, telLink } from "@/lib/site";

const footerLinks = {
  Navigation: [
    { label: "Accueil", href: "/" },
    { label: "Notre flotte", href: "/cars" },
    { label: "Services", href: "/services" },
    { label: "Réserver", href: "/reserve" },
  ],
  Services: [
    { label: "Location de luxe", href: "/services/location" },
    { label: "Transferts aéroport", href: "/services/transferts-aeroport" },
    { label: "Service chauffeur", href: "/services/chauffeur" },
    { label: "Transport corporate", href: "/services/corporate" },
    { label: "Mariages & événements", href: "/services/mariage" },
  ],
};

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer className="bg-navy-950 text-cream border-t border-accent/10">
      <div className="max-w-7xl mx-auto section-padding py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <div className="mb-6">
              <Logo
                className="w-[90px] h-[90px] md:w-[110px] md:h-[110px]"
                useStyle={false}
              />
            </div>
            <p className="text-muted text-sm leading-relaxed max-w-sm mb-6">
              {site.tagline}. Location de voitures de luxe, transferts VIP et
              services de chauffeur professionnel à travers la Tunisie.
            </p>

            <div className="flex flex-col gap-3">
              {site.phones.map((phone, i) => (
                <a
                  key={phone}
                  href={telLink(i)}
                  className="flex items-center gap-3 text-sm text-cream/80 hover:text-accent transition-colors"
                >
                  <Phone size={15} className="text-accent" />
                  {phone}
                </a>
              ))}
              <a
                href={whatsappLink("Bonjour Saoudy Rent Car, je souhaite des informations.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-cream/80 hover:text-accent transition-colors"
              >
                <MessageCircle size={15} className="text-accent" />
                WhatsApp
              </a>
              <span className="flex items-center gap-3 text-sm text-muted">
                <MapPin size={15} className="text-accent" />
                Tunisie
              </span>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-5">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted hover:text-accent transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted/60">
            &copy; {new Date().getFullYear()} {site.name}. Tous droits réservés.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-sm text-accent/60 font-medium">
              {site.tagline}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
