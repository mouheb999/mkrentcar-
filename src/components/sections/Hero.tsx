"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Truck, DollarSign, Zap, Sparkles, ExternalLink } from "lucide-react";

const HERO_IMG = "/carsMK/bmmW.png";

const stats = [
  { icon: Truck, title: "Livraison partout", sub: "en Tunisie" },
  { icon: DollarSign, title: "Prix compétitifs", sub: "et transparents" },
  { icon: Zap, title: "Service rapide", sub: "et disponible 24/7" },
  { icon: Sparkles, title: "Voitures propres", sub: "et récentes" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20 bg-[#050505]">
      {/* Full background — clear on right, fades to dark/blurry on left */}
      <div className="absolute inset-0">
        <Image
          src={HERO_IMG}
          alt="MK Rent Car"
          fill
          priority
          sizes="100vw"
          className="object-cover object-right"
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
      <div className="relative z-10 max-w-7xl mx-auto px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl"
        >
          <p className="text-[#D4AF37] text-xs font-bold tracking-[0.3em] uppercase mb-4">
            MK Rent Car — Tunisie
          </p>
          <h1 className="text-5xl lg:text-6xl font-black leading-tight mb-6 text-white">
            Votre voiture,
            <br />
            <span className="text-[#D4AF37]">partout en Tunisie.</span>
          </h1>
          <p className="text-[#888] text-base mb-10 max-w-md leading-relaxed">
            Des véhicules premium, un service impeccable
            et des prix transparents.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/cars">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="bg-[#D4AF37] text-black font-bold px-7 py-3.5 rounded-full hover:bg-[#C49B27] transition-all flex items-center gap-2 text-sm"
              >
                Voir les véhicules
                <ArrowRight size={16} />
              </motion.button>
            </Link>
            <Link
              href="/booking"
              className="border border-[#333] text-white font-semibold px-7 py-3.5 rounded-full hover:border-[#D4AF37] transition-all flex items-center gap-2 text-sm"
            >
              Nous contacter
              <ExternalLink size={14} />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Stats bar at bottom */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-[#1A1A1A] bg-[#0A0A0A]/90 backdrop-blur-sm z-10">
        <div className="max-w-7xl mx-auto px-8 py-5 grid grid-cols-2 md:grid-cols-4 gap-6">
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
  );
}
