"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.05 } },
};
const rise = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const },
  },
};

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

/** Floating gold light particles — subtle cinematic atmosphere. */
function GoldParticles() {
  const dots = [
    { left: "12%", top: "30%", size: 4, delay: 0 },
    { left: "82%", top: "22%", size: 3, delay: 0.8 },
    { left: "68%", top: "48%", size: 5, delay: 1.6 },
    { left: "26%", top: "62%", size: 3, delay: 0.4 },
    { left: "92%", top: "58%", size: 4, delay: 2.1 },
    { left: "45%", top: "18%", size: 2, delay: 1.2 },
  ];
  return (
    <div className="pointer-events-none absolute inset-0 z-[5] overflow-hidden">
      {dots.map((d, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-[#D4AF37]"
          style={{
            left: d.left,
            top: d.top,
            width: d.size,
            height: d.size,
            boxShadow: "0 0 8px rgba(212,175,55,0.7)",
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0, 0.8, 0], scale: [0.5, 1.2, 0.5], y: [0, -18, 0] }}
          transition={{
            duration: 5,
            delay: d.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function MobileHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const carY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.2]);

  return (
    <section
      ref={ref}
      className="md:hidden relative flex min-h-[100svh] flex-col overflow-hidden bg-[#050505]"
    >
      {/* Ambient halo behind the headline */}
      <div className="pointer-events-none absolute -top-24 left-1/2 z-0 h-[360px] w-[150%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.08),transparent_60%)]" />

      <GoldParticles />

      {/* ── Title ── */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative z-10 px-6 pt-32"
      >
        <motion.p
          variants={rise}
          className="text-[11px] font-bold uppercase tracking-[0.42em] text-[#D4AF37]"
        >
          Saoudy Rent Car — Tunisie
        </motion.p>

        <motion.h1
          variants={rise}
          className="mt-5 font-display text-[3.25rem] font-bold leading-[0.98] tracking-tight text-white"
        >
          Le luxe en
          <br />
          <span className="text-[#D4AF37]">mouvement.</span>
        </motion.h1>

        {/* Gold divider */}
        <motion.div
          variants={rise}
          className="mt-6 h-px w-16 bg-gradient-to-r from-[#D4AF37] to-transparent"
        />

        <motion.p
          variants={rise}
          className="mt-6 max-w-[20rem] text-base leading-relaxed text-[#9a9a9a]"
        >
          Transferts VIP &amp; chauffeur privé.
        </motion.p>
      </motion.div>

      {/* ── BMW showcase — full-bleed, smoothly faded into the page ── */}
      <div className="relative flex flex-1 items-center justify-center">
        {/* Gold radial glow behind the vehicle */}
        <motion.div
          style={{ opacity: glowOpacity }}
          className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.22),rgba(212,175,55,0.05)_46%,transparent_72%)]"
        />
        <motion.div
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ y: carY }}
          className="relative z-[6] h-[34vh] w-full"
        >
          <Image
            src={HERO_IMG_MOBILE}
            alt="Saoudy Rent Car — BMW 5 Series"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center [mask-image:linear-gradient(to_bottom,transparent_0%,black_24%,black_76%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_24%,black_76%,transparent_100%)]"
          />
        </motion.div>
      </div>

      {/* ── CTAs at the bottom ── */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col gap-3 px-6 pb-12"
      >
        <Link href="/reserve">
          <motion.button
            variants={rise}
            whileTap={{ scale: 0.97 }}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-7 py-4 text-sm font-bold text-black shadow-[0_0_34px_rgba(212,175,55,0.28)] transition-colors hover:bg-[#C49B27]"
          >
            Réserver maintenant
            <ArrowRight size={16} />
          </motion.button>
        </Link>
        <motion.a
          variants={rise}
          href={whatsappLink(
            "Bonjour Saoudy Rent Car, je souhaite réserver un véhicule."
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-full border border-[#D4AF37]/40 bg-white/[0.02] px-7 py-4 text-sm font-semibold text-white transition-colors hover:border-[#D4AF37]"
        >
          <MessageCircle size={15} />
          Contact WhatsApp
        </motion.a>
      </motion.div>
    </section>
  );
}

export default function Hero() {
  return (
    <>
      {/* ===================== MOBILE HERO ===================== */}
      <MobileHero />

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
