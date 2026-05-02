"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden border-y border-[#1A1A1A]">
      {/* Background car image — fades from left, clear on left side */}
      <div className="absolute inset-0">
        <Image
          src="/carsMK/cta.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-left"
        />
        {/* Fade: transparent on far left → dark toward center/right */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0A0A0A]/70 to-[#0A0A0A]" />
        {/* Full dark overlay to tone down */}
        <div className="absolute inset-0 bg-[#0A0A0A]/50" />
        {/* Gold light streak */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-[#D4AF37]/40 via-[#D4AF37]/10 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 py-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-8"
        >
          {/* Text — pushed right of the car */}
          <div className="md:ml-[30%]">
            <p className="text-[#D4AF37] text-xs font-bold tracking-[0.3em] uppercase mb-3">
              Prêt à prendre la route ?
            </p>
            <h2 className="text-2xl md:text-3xl font-black text-white leading-tight">
              Votre prochain trajet{" "}
              <span className="text-[#D4AF37]">commence ici.</span>
            </h2>
            <p className="text-[#666] text-sm mt-2">
              Réservez dès maintenant et profitez d&apos;une expérience premium.
            </p>
          </div>

          {/* Button */}
          <Link href="/booking" className="shrink-0">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-[#D4AF37] text-black font-bold px-8 py-4 rounded-lg hover:bg-[#C49B27] transition-all flex items-center gap-2 text-sm whitespace-nowrap"
            >
              Réserver maintenant
              <ArrowRight size={16} />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
