"use client";

import { motion } from "framer-motion";
import { useCars } from "@/lib/useCars";
import CarCard from "@/components/ui/CarCard";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Loader2, Users, Zap, Fuel, Settings } from "lucide-react";

export default function FeaturedCars() {
  const { cars, loading, error } = useCars();
  const featured = cars.filter((c) => c.available).slice(0, 6);

  return (
    <section className="bg-[#050505] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* ── Featured Car Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <div className="relative rounded-2xl overflow-hidden border border-[#1A1A1A] bg-[#0A0A0A]">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 lg:p-10 items-center">
              {/* Left content */}
              <div>
                <p className="text-[#D4AF37] text-xs font-bold tracking-[0.3em] uppercase mb-4">
                  Meilleur Choix
                </p>
                <h2 className="text-3xl lg:text-4xl font-black text-white mb-3">
                  Renault Clio 5
                </h2>
                <p className="text-[#777] text-sm mb-6 leading-relaxed max-w-sm">
                  Économique, confortable et idéale pour vos trajets en ville
                  comme sur route.
                </p>

                {/* Specs row */}
                <div className="flex flex-wrap gap-4 mb-8">
                  {[
                    { icon: <Users className="w-4 h-4" />, value: "5", label: "Places" },
                    { icon: <Zap className="w-4 h-4" />, value: "100 ch", label: "Puissance" },
                    { icon: <Fuel className="w-4 h-4" />, value: "Diesel", label: "Carburant" },
                    { icon: <Settings className="w-4 h-4" />, value: "Manuelle", label: "Transmission" },
                  ].map((spec) => (
                    <div
                      key={spec.label}
                      className="flex items-center gap-2"
                    >
                      <span className="text-[#D4AF37]">{spec.icon}</span>
                      <span className="text-white text-sm font-semibold">{spec.value}</span>
                      <span className="text-[#555] text-xs">{spec.label}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-6">
                  <div>
                    <p className="text-[#555] text-xs">À partir de</p>
                    <p className="text-[#D4AF37] text-3xl font-black">
                      130{" "}
                      <span className="text-sm text-[#888] font-normal">
                        TND / jour
                      </span>
                    </p>
                  </div>
                  <Link href="/cars">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="bg-[#D4AF37] text-black font-bold px-6 py-3 rounded-full hover:bg-[#C49B27] transition-all flex items-center gap-2 text-sm"
                    >
                      Réserver maintenant
                      <ArrowRight size={16} />
                    </motion.button>
                  </Link>
                </div>
              </div>

              {/* Right — car image */}
              <div className="relative h-64 lg:h-72">
                <Image
                  src="/carsMK/featured.png"
                  alt="Renault Clio 5"
                  fill
                  className="object-contain"
                  sizes="50vw"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Car Fleet Grid ── */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[#D4AF37] text-xs font-bold tracking-[0.3em] uppercase mb-2">
              Notre Flotte
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-white">
              Des voitures pour
              <br />
              chaque trajet
            </h2>
          </div>
          <Link
            href="/cars"
            className="hidden md:flex text-[#D4AF37] text-sm font-semibold items-center gap-1 hover:gap-2 transition-all"
          >
            Voir tout <ArrowRight size={16} />
          </Link>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20 text-[#888]">
            <Loader2 size={20} className="animate-spin mr-3 text-[#D4AF37]" />
            Chargement…
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-2xl p-6 text-sm">
            {error}
          </div>
        ) : featured.length === 0 ? (
          <p className="text-[#888] text-center py-16">
            Aucun véhicule disponible pour le moment.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((car, index) => (
              <CarCard key={car.id} car={car} index={index} />
            ))}
          </div>
        )}

        <div className="mt-12 text-center md:hidden">
          <Link
            href="/cars"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#D4AF37]"
          >
            Voir tous les véhicules
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
