"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MessageCircle } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { whatsappLink } from "@/lib/site";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/cars", label: "Voitures" },
  { href: "/services", label: "Services" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hide public navbar on admin routes
  if (pathname?.startsWith("/admin")) return null;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-navy-950/95 backdrop-blur-xl py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link href="/" className="flex items-center group shrink-0">
          <Logo
            className="w-[50px] h-[50px] md:w-[60px] md:h-[60px]"
            useStyle={false}
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-medium tracking-wide transition-colors duration-300 ${
                  active
                    ? "text-accent"
                    : "text-cream/70 hover:text-accent"
                }`}
              >
                {link.label}
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-0 -bottom-1 h-[2px] bg-accent rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
          <a
            href={whatsappLink("Bonjour Saoudy Rent Car, je souhaite des informations.")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 border border-accent/30 text-accent text-sm font-semibold rounded-xl hover:bg-accent/10 transition-all duration-300"
          >
            <MessageCircle size={16} />
            WhatsApp
          </a>
          <Link
            href="/reserve"
            className="px-6 py-2.5 bg-accent text-navy-950 text-sm font-semibold rounded-xl hover:brightness-110 transition-all duration-300 hover:shadow-glow"
          >
            Réserver
          </Link>
        </nav>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-cream"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-navy-950/98 backdrop-blur-xl border-t border-accent/10"
          >
            <div className="px-6 py-6 flex flex-col gap-2">
              {navLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`font-medium py-3 px-2 border-b border-white/5 transition-colors ${
                      active ? "text-accent" : "text-cream/80 hover:text-accent"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <a
                href={whatsappLink("Bonjour Saoudy Rent Car, je souhaite des informations.")}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="mt-3 px-5 py-3 border border-accent/30 text-accent text-center text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition-all"
              >
                <MessageCircle size={16} />
                WhatsApp
              </a>
              <Link
                href="/reserve"
                onClick={() => setMobileOpen(false)}
                className="mt-2 px-5 py-3 bg-accent text-navy-950 text-center text-sm font-semibold rounded-xl hover:shadow-glow transition-all"
              >
                Réserver
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
