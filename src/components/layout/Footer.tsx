"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/ui/Logo";

const footerLinks = {
  Société: [
    { label: "À propos", href: "#" },
    { label: "Carrières", href: "#" },
    { label: "Presse", href: "#" },
  ],
  Support: [
    { label: "Centre d'aide", href: "#" },
    { label: "Contact", href: "#" },
    { label: "FAQ", href: "#" },
  ],
  Mentions: [
    { label: "Confidentialité", href: "#" },
    { label: "Conditions", href: "#" },
    { label: "Cookies", href: "#" },
  ],
};

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer className="bg-navy-950 text-cream border-t border-accent/10">
      <div className="max-w-7xl mx-auto section-padding py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="mb-6">
              <Logo
                className="w-[80px] h-[80px] md:w-[100px] md:h-[100px]"
                useStyle={false}
              />
            </div>
            <p className="text-muted text-sm leading-relaxed">
              Votre voiture, partout en Tunisie.
              Des véhicules premium, un service
              impeccable et des prix transparents.
            </p>
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
            &copy; {new Date().getFullYear()} MK Rent Car. Tous droits réservés.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-sm text-accent/60 font-medium">
              Premium Car Rental
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
