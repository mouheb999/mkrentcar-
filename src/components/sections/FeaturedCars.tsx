"use client";

import { motion } from "framer-motion";
import { useCars } from "@/lib/useCars";
import CarCard from "@/components/ui/CarCard";
import { resolveCarImage } from "@/lib/carImages";
import type { CarRow } from "@/lib/database.types";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Loader2, Users, Zap, Fuel, Settings, Star } from "lucide-react";

/** Hero "VÉHICULE PHARE" card — glassmorphism, full-width product image. */
function FeaturedMobileCard({ car }: { car: CarRow }) {
  const img = resolveCarImage(car.name, car.image);
  const isDataUrl = img.startsWith("data:");

  return (
    <motion.div
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
    >
      <Link href={`/cars/${car.id}`} className="group block">
        <div className="relative overflow-hidden rounded-[32px] border border-[#1A1A1A] bg-[#0A0A0A] p-5 shadow-[0_10px_40px_rgba(0,0,0,0.5)] transition-all duration-500 group-hover:border-[#D4AF37] group-hover:shadow-[0_0_45px_rgba(212,175,55,0.20)] group-active:border-[#D4AF37] group-active:shadow-[0_0_45px_rgba(212,175,55,0.20)]">
          {/* top gold hairline — reveals on touch */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-active:opacity-100" />

          {/* Badge */}
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#D4AF37]">
            <Star size={11} className="fill-[#D4AF37] text-[#D4AF37]" />
            Véhicule phare
          </span>

          {/* Large product image */}
          <div className="relative mt-4 h-52 w-full">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.14),transparent_62%)]" />
            <Image
              src={img}
              alt={car.name}
              fill
              unoptimized={isDataUrl}
              sizes="100vw"
              className="object-contain transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Info */}
          <div className="mt-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#D4AF37]">
              {car.tier ?? car.category ?? "Véhicule"}
            </p>
            <h3 className="mt-1.5 font-display text-2xl font-bold leading-tight text-white">
              {car.name}
            </h3>

            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-[#888]">
              <span className="inline-flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5 text-[#D4AF37]" />
                {car.seats ?? 5} places
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Fuel className="h-3.5 w-3.5 text-[#D4AF37]" />
                {car.fuel ?? "—"}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Settings className="h-3.5 w-3.5 text-[#D4AF37]" />
                {car.transmission === "Automatique" ? "Auto" : "Manuelle"}
              </span>
            </div>

            <div className="mt-5 flex items-end justify-between border-t border-white/[0.06] pt-4">
              <div>
                <p className="text-[10px] text-[#666]">À partir de</p>
                <p className="font-display text-2xl font-black text-[#D4AF37]">
                  {car.price}
                  <span className="ml-1 text-xs font-normal text-[#888]">
                    TND/j
                  </span>
                </p>
              </div>
              <span className="flex items-center gap-2 rounded-full bg-[#D4AF37] px-5 py-2.5 text-sm font-bold text-black shadow-[0_0_20px_rgba(212,175,55,0.25)]">
                Réserver
                <ArrowRight size={15} />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/** Premium one-per-row glass product card — mobile fleet. */
function MobileFleetCard({ car, index }: { car: CarRow; index: number }) {
  const img = resolveCarImage(car.name, car.image);
  const isDataUrl = img.startsWith("data:");

  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      whileHover={{ y: -5 }}
    >
      <Link href={`/cars/${car.id}`} className="group block">
        <div className="relative flex gap-4 overflow-hidden rounded-[28px] border border-[#1A1A1A] bg-[#0A0A0A] p-4 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-500 group-hover:border-[#D4AF37] group-hover:shadow-[0_0_42px_rgba(212,175,55,0.16)] group-active:border-[#D4AF37] group-active:shadow-[0_0_42px_rgba(212,175,55,0.16)]">
          {/* top gold hairline — reveals on touch */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-active:opacity-100" />

          {/* Large product image */}
          <div className="relative aspect-[5/4] w-[46%] shrink-0 self-center">
            <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.10),transparent_65%)]" />
            <Image
              src={img}
              alt={car.name}
              fill
              unoptimized={isDataUrl}
              sizes="50vw"
              className="object-contain transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Metadata */}
          <div className="flex min-w-0 flex-1 flex-col py-1">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#D4AF37]">
              {car.tier ?? car.category ?? "Véhicule"}
            </p>
            <h3 className="mt-1.5 font-display text-lg font-bold leading-tight text-white">
              {car.name}
            </h3>

            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-[#888]">
              <span className="inline-flex items-center gap-1">
                <Users className="h-3 w-3 text-[#D4AF37]" />
                {car.seats ?? 5}
              </span>
              <span className="inline-flex items-center gap-1">
                <Fuel className="h-3 w-3 text-[#D4AF37]" />
                {car.fuel ?? "—"}
              </span>
              <span className="inline-flex items-center gap-1">
                <Settings className="h-3 w-3 text-[#D4AF37]" />
                {car.transmission === "Automatique" ? "Auto" : "Man."}
              </span>
            </div>

            <div className="mt-auto flex items-end justify-between pt-3">
              <div>
                <p className="text-[10px] text-[#666]">À partir de</p>
                <p className="font-display text-lg font-black text-[#D4AF37]">
                  {car.price}
                  <span className="ml-1 text-[11px] font-normal text-[#888]">
                    TND/j
                  </span>
                </p>
              </div>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#D4AF37] text-black shadow-[0_0_20px_rgba(212,175,55,0.25)] transition-transform duration-300 group-hover:translate-x-0.5">
                <ArrowRight size={16} />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function FeaturedCars() {
  const { cars, loading, error } = useCars();
  const featured = cars.filter((c) => c.available).slice(0, 6);
  const [featuredCar, ...rest] = featured;

  return (
    <section className="bg-[#050505] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* ===================== MOBILE FLEET ===================== */}
        <div className="md:hidden">
          <div className="mb-9">
            <p className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.32em] text-[#D4AF37]">
              Notre Flotte
            </p>
            <h2 className="font-display text-[2rem] font-bold leading-tight text-white">
              Des véhicules d&apos;exception.
            </h2>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-16 text-[#888]">
              <Loader2 size={20} className="mr-3 animate-spin text-[#D4AF37]" />
              Chargement…
            </div>
          ) : error ? (
            <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-sm text-red-400">
              {error}
            </div>
          ) : featured.length === 0 ? (
            <p className="py-16 text-center text-[#888]">
              Aucun véhicule disponible pour le moment.
            </p>
          ) : (
            <div className="flex flex-col gap-5">
              {featuredCar && <FeaturedMobileCard car={featuredCar} />}
              {rest.map((car, index) => (
                <MobileFleetCard key={car.id} car={car} index={index} />
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <Link
              href="/cars"
              className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 px-7 py-3.5 text-sm font-semibold text-[#D4AF37]"
            >
              Voir tous les véhicules
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>

        {/* ===================== DESKTOP FLEET ===================== */}
        <div className="hidden md:block">
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
                  BMW 5 Series
                </h2>
                <p className="text-[#777] text-sm mb-6 leading-relaxed max-w-sm">
                  Puissance et raffinement réunis. La berline executive idéale
                  pour vos déplacements d&apos;affaires et transferts VIP.
                </p>

                {/* Specs row */}
                <div className="flex flex-wrap gap-4 mb-8">
                  {[
                    { icon: <Users className="w-4 h-4" />, value: "5", label: "Places" },
                    { icon: <Zap className="w-4 h-4" />, value: "252 ch", label: "Puissance" },
                    { icon: <Fuel className="w-4 h-4" />, value: "Diesel", label: "Carburant" },
                    { icon: <Settings className="w-4 h-4" />, value: "Automatique", label: "Transmission" },
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
                      400{" "}
                      <span className="text-sm text-[#888] font-normal">
                        TND / jour
                      </span>
                    </p>
                  </div>
                  <Link href="/cars/bmw-5-series">
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
                  src="/cars/bmw-5-series-front.png"
                  alt="BMW 5 Series"
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
        </div>
      </div>
    </section>
  );
}
