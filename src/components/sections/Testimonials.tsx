"use client";

import { useState } from "react";
import { testimonials } from "@/lib/data";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="bg-[#050505] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <p className="text-center text-xs font-bold tracking-[0.3em] text-[#D4AF37] uppercase mb-10">
          Ce que disent nos clients
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-[#0A0A0A] border border-[#1A1A1A] rounded-2xl p-6"
            >
              {/* Quote mark */}
              <span className="text-[#D4AF37] text-3xl font-serif leading-none select-none">&ldquo;&ldquo;</span>
              <p className="text-[#888] text-sm leading-relaxed mt-2 mb-6">
                {t.text}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/30 flex items-center justify-center">
                  <span className="text-[#D4AF37] text-sm font-bold">
                    {t.name[0]}
                  </span>
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{t.name}</p>
                  <p className="text-[#555] text-xs">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === activeIndex
                  ? "bg-[#D4AF37] w-6"
                  : "bg-[#333]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
