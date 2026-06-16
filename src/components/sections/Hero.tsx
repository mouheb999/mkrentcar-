"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Crown, UserCheck, Clock, Plane, MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/site";

const HERO_IMG = "/cars/bmw-5-series-front.png";
const HERO_IMG_MOBILE = "/cars/hero-mobile.png";

const stats = [
  { icon: Crown, title: "Flotte premium", sub: "BMW · Mercedes · VW" },
  { icon: UserCheck, title: "Chauffeurs pro", sub: "discrets & ponctuels" },
  { icon: Clock, title: "Disponible 24/7", sub: "réservation rapide" },
  { icon: Plane, title: "Transferts VIP", sub: "aéroport & événements" },
];

const ctaButtons = (
  <div className="flex flex-wrap gap-4">
    <Link href="/reserve">
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="bg-[#D4AF37] text-black font-bold px-7 py-3.5 rounded-full hover:bg-[#C49B27] transition-all flex items-center gap-2 text-sm"
      >
        Réserver maintenant
        <ArrowRight size={16} />
      </motion.button>
    </Link>
    <a
      href={whatsappLink("Bonjour Saoudy Rent Car, je souhaite réserver un véhicule.")}
      target="_blank"
      rel="noopener noreferrer"
      className="border border-[#333] text-white font-semibold px-7 py-3.5 rounded-full hover:border-[#D4AF37] transition-all flex items-center gap-2 text-sm"
    >
      <MessageCircle size={15} />
      Contact WhatsApp
    </a>
  </div>
);

export default function Hero() {
  return (
    <>
      {/* ===================== MOBILE HERO ===================== */}
      <section className="md:hidden relative min-h-[100svh] flex flex-col overflow-hidden pt-24 bg-[#050505]">
        {/* Full-bleed front-facing car */}
        <div className="absolute inset-0">
          <Image
            src={HERO_IMG_MOBILE}
            alt="Saoudy Rent Car — BMW 5 Series"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_60%]"
          />
          {/* Darken top (for the headline) and bottom (for the stats bar), keep the car glowing in the middle */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505]/35 to-[#050505]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/70 via-transparent to-[#050505]/90" />
        </div>

        {/* Headline + CTAs at the top */}
        <div className="relative z-10 px-5">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[#D4AF37] text-[11px] font-bold tracking-[0.3em] uppercase mb-3">
              Saoudy Rent Car — Tunisie
            </p>
            <h1 className="text-4xl font-black leading-[1.05] mb-4 text-white">
              Le luxe en mouvement,
              <br />
              <span className="text-[#D4AF37]">partout en Tunisie.</span>
            </h1>
            <p className="text-[#bdbdbd] text-sm mb-6 leading-relaxed max-w-sm">
              Location premium, transferts VIP et services de chauffeur avec une
              flotte moderne BMW, Mercedes, Volkswagen et Fiat.
            </p>
            {ctaButtons}
          </motion.div>
        </div>

        {/* Spacer lets the car show between the text and the stats bar */}
        <div className="flex-1 min-h-[40px]" />

        {/* Compact 4-up stats bar at the bottom */}
        <div className="relative z-10 border-t border-[#1A1A1A] bg-[#0A0A0A]/80 backdrop-blur-sm">
          <div className="px-3 py-3.5 grid grid-cols-4 gap-2">
            {stats.map((item) => (
              <div key={item.title} className="flex flex-col items-start gap-1.5">
                <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center">
                  <item.icon size={14} className="text-[#D4AF37]" />
                </div>
                <div>
                  <p className="text-white text-[11px] font-semibold leading-tight">
                    {item.title}
                  </p>
                  <p className="text-[#666] text-[9px] leading-tight">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== DESKTOP HERO ===================== */}
      <section className="hidden md:flex relative min-h-[100svh] md:flex-col overflow-hidden pt-20 bg-[#050505]">
        {/* Full background — clear on right, fades to dark on left */}
        <div className="absolute inset-0">
          <Image
            src={HERO_IMG}
            alt="Saoudy Rent Car — BMW 5 Series"
            fill
            priority
            sizes="100vw"
            className="object-cover object-right scale-x-[-1]"
          />
          {/* Left-to-right fade: solid black left → transparent right (reveals car) */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/85 to-transparent" />
          {/* Extra blur layer on the left half only */}
          <div className="absolute inset-0 backdrop-blur-sm [mask-image:linear-gradient(to_right,black_30%,transparent_60%)]" />
          {/* Bottom fade for stats bar */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
          {/* Top vignette */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/60 via-transparent to-transparent" />
        </div>

        {/* Content — text on left, car shows through bg on right */}
        <div className="relative z-10 flex-1 flex items-center w-full py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <p className="text-[#D4AF37] text-xs font-bold tracking-[0.3em] uppercase mb-4">
                Saoudy Rent Car — Tunisie
              </p>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6 text-white">
                Le luxe en mouvement,
                <br />
                <span className="text-[#D4AF37]">partout en Tunisie.</span>
              </h1>
              <p className="text-[#9a9a9a] text-base mb-10 max-w-lg leading-relaxed">
                Location premium, transferts VIP et services de chauffeur avec une
                flotte moderne BMW, Mercedes, Volkswagen et Fiat.
              </p>
              {ctaButtons}
            </motion.div>
          </div>
        </div>

        {/* Stats bar at bottom — in normal flow so it never overlaps content on short screens */}
        <div className="relative left-0 right-0 border-t border-[#1A1A1A] bg-[#0A0A0A]/90 backdrop-blur-sm z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 sm:py-5 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((item) => (
              <div key={item.title} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center">
                  <item.icon size={16} className="text-[#D4AF37]" />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{item.title}</p>
                  <p className="text-[#666] text-xs">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
