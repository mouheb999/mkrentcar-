"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/services";

export default function Services() {
  return (
    <section className="bg-[#080808] py-20 border-y border-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-14">
          <p className="text-[#D4AF37] text-xs font-bold tracking-[0.3em] uppercase mb-3">
            Nos Services
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-white">
            Une mobilité de luxe,
            <br />
            sur tous vos trajets
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, index) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <Link href={`/services/${service.slug}`} className="block group h-full">
                <div className="h-full bg-[#0A0A0A] border border-[#1A1A1A] rounded-2xl p-7 hover:border-[#D4AF37]/50 hover:shadow-[0_0_25px_rgba(212,175,55,0.08)] transition-all duration-300 flex flex-col">
                  <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center mb-5">
                    <service.icon className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">
                    {service.title}
                  </h3>
                  <p className="text-[#888] text-sm leading-relaxed flex-1">
                    {service.short}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#D4AF37] group-hover:gap-2.5 transition-all">
                    En savoir plus
                    <ArrowRight size={15} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
