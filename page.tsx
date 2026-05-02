"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Users,
  Zap,
  Fuel,
  Settings,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Star,
  CheckCircle2,
  Calendar,
  Car,
} from "lucide-react";

// ── DATA ─────────────────────────────────────────────────────────────────────

const cars = [
  {
    name: "Seat Ibiza",
    image: "/carsMK/seat ibiza.png",
    category: "CITADINE",
    price: 140,
    seats: 5,
    fuel: "Essence",
    power: "95 ch",
    transmission: "Manuelle",
    available: true,
  },
  {
    name: "Renault Clio 5",
    image: "/carsMK/renault clio.png",
    category: "CITADINE",
    price: 130,
    seats: 5,
    fuel: "Diesel",
    power: "100 ch",
    transmission: "Manuelle",
    available: true,
  },
  {
    name: "Suzuki Swift",
    image: "/carsMK/suzuki swift.png",
    category: "CITADINE",
    price: 120,
    seats: 5,
    fuel: "Essence",
    power: "90 ch",
    transmission: "Manuelle",
    available: true,
  },
  {
    name: "Skoda Fabia",
    image: "/carsMK/skoda fabia.png",
    category: "COMPACTE",
    price: 135,
    seats: 5,
    fuel: "Essence",
    power: "95 ch",
    transmission: "Auto",
    available: true,
  },
  {
    name: "Hyundai i20",
    image: "/carsMK/hyundai i20.png",
    category: "CITADINE",
    price: 125,
    seats: 5,
    fuel: "Essence",
    power: "84 ch",
    transmission: "Manuelle",
    available: true,
  },
  {
    name: "Volkswagen Polo",
    image: "/carsMK/polo volkswagen.png",
    category: "COMPACTE",
    price: 150,
    seats: 5,
    fuel: "Essence",
    power: "110 ch",
    transmission: "Auto",
    available: true,
  },
];

const brands = [
  { name: "Volkswagen", logo: "VW" },
  { name: "Seat", logo: "SEAT" },
  { name: "Renault", logo: "RENAULT" },
  { name: "Skoda", logo: "ŠKODA" },
  { name: "Hyundai", logo: "HYUNDAI" },
  { name: "Suzuki", logo: "SUZUKI" },
  { name: "Peugeot", logo: "PEUGEOT" },
  { name: "Kia", logo: "KIA" },
];

const steps = [
  {
    number: "01",
    icon: Car,
    title: "Choisissez votre voiture",
    description:
      "Parcourez notre flotte et sélectionnez le véhicule adapté à vos besoins.",
  },
  {
    number: "02",
    icon: Calendar,
    title: "Sélectionnez vos dates",
    description:
      "Choisissez vos dates et votre lieu de prise en charge en toute flexibilité.",
  },
  {
    number: "03",
    icon: CheckCircle2,
    title: "Confirmez et roulez",
    description:
      "Finalisez votre réservation en quelques secondes et profitez de la route.",
  },
];

const testimonials = [
  {
    text: "Service très professionnel, voiture propre et livraison rapide à l'aéroport. Je recommande vivement MK Rent Car !",
    name: "Mohamed Ben Salah",
    city: "Tunis",
    initial: "M",
  },
  {
    text: "Réservation facile et sans complications. L'équipe est à l'écoute et la voiture était en parfait état.",
    name: "Amira Trabelsi",
    city: "Sousse",
    initial: "A",
  },
  {
    text: "Rapport qualité-prix imbattable en Tunisie. J'ai loué plusieurs fois, toujours la même satisfaction.",
    name: "Youssef Khelifi",
    city: "Sfax",
    initial: "Y",
  },
];

// ── COMPONENTS ───────────────────────────────────────────────────────────────

function CarCard({ car }: { car: (typeof cars)[0] }) {
  return (
    <div className="group relative bg-[#0A0A0A] border border-[#1A1A1A] rounded-2xl overflow-hidden hover:border-[#D4AF37] hover:shadow-[0_0_40px_rgba(212,175,55,0.15)] transition-all duration-400 flex flex-col">
      {/* Badges */}
      <div className="flex items-center justify-between px-4 pt-4">
        <span className="text-[10px] font-bold tracking-widest text-[#888] uppercase">
          {car.category}
        </span>
        {car.available && (
          <span className="text-[10px] font-bold bg-[#D4AF37] text-black px-2 py-0.5 rounded-full">
            Disponible
          </span>
        )}
      </div>

      {/* Car Image */}
      <div className="relative h-48 mx-4 mt-2 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0A0A0A]/40 z-10" />
        <Image
          src={car.image}
          alt={car.name}
          fill
          className="object-contain group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      {/* Info */}
      <div className="px-4 pb-4 flex flex-col flex-1">
        <h3 className="text-white font-bold text-lg mt-3 mb-3">{car.name}</h3>

        {/* Specs row */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="flex flex-col items-center gap-1 bg-[#111] rounded-lg py-2">
            <Users className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-[10px] text-[#666]">Places</span>
            <span className="text-[11px] text-white font-semibold">
              {car.seats}
            </span>
          </div>
          <div className="flex flex-col items-center gap-1 bg-[#111] rounded-lg py-2">
            <Fuel className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-[10px] text-[#666]">Carburant</span>
            <span className="text-[11px] text-white font-semibold">
              {car.fuel}
            </span>
          </div>
          <div className="flex flex-col items-center gap-1 bg-[#111] rounded-lg py-2">
            <Settings className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-[10px] text-[#666]">Boîte</span>
            <span className="text-[11px] text-white font-semibold">
              {car.transmission}
            </span>
          </div>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#1A1A1A]">
          <div>
            <p className="text-[10px] text-[#666]">À partir de</p>
            <p className="text-[#D4AF37] font-bold text-lg">
              {car.price}{" "}
              <span className="text-xs text-[#888] font-normal">TND / jour</span>
            </p>
          </div>
          <button className="flex items-center gap-1.5 text-sm font-semibold text-[#D4AF37] hover:text-white transition-colors group/btn">
            Réserver
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ── PAGE ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [brandIndex, setBrandIndex] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const visibleBrands = 5;

  return (
    <div className="bg-[#050505] text-white min-h-screen font-sans">
      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 bg-[#050505]/90 backdrop-blur-md border-b border-[#1A1A1A]">
        <div className="flex items-center gap-2">
          {/* Logo placeholder — swap with your SVG/Image */}
          <div className="w-10 h-10 rounded-full border-2 border-[#D4AF37] flex items-center justify-center">
            <span className="text-[#D4AF37] font-black text-xs">MK</span>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {["Accueil", "Voitures", "À propos", "Contact"].map((item, i) => (
            <a
              key={item}
              href="#"
              className={`text-sm font-medium transition-colors ${
                i === 0
                  ? "text-[#D4AF37] border-b border-[#D4AF37] pb-0.5"
                  : "text-[#888] hover:text-white"
              }`}
            >
              {item}
            </a>
          ))}
        </div>
        <button className="bg-[#D4AF37] text-black text-sm font-bold px-5 py-2.5 rounded-full hover:bg-[#C49B27] transition-colors flex items-center gap-2">
          Réserver maintenant
          <ArrowRight className="w-4 h-4" />
        </button>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="/carsMK/hero.png"
            alt="Hero car"
            fill
            className="object-cover object-center opacity-40"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-[#050505]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left text */}
          <div>
            <p className="text-[#D4AF37] text-xs font-bold tracking-[0.3em] uppercase mb-4">
              MK Rent Car — Tunisie
            </p>
            <h1 className="text-5xl lg:text-6xl font-black leading-tight mb-6">
              Votre voiture,
              <br />
              <span className="text-[#D4AF37]">partout en Tunisie.</span>
            </h1>
            <p className="text-[#888] text-lg mb-10 max-w-md leading-relaxed">
              Des véhicules premium, un service impeccable et des prix
              transparents. Réservez en quelques clics.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-[#D4AF37] text-black font-bold px-7 py-3.5 rounded-full hover:bg-[#C49B27] transition-all flex items-center gap-2 hover:scale-105">
                Voir les véhicules
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="border border-[#333] text-white font-semibold px-7 py-3.5 rounded-full hover:border-[#D4AF37] transition-all flex items-center gap-2">
                Nous contacter
              </button>
            </div>
          </div>

          {/* Right — large car image visible on desktop */}
          <div className="hidden lg:block relative h-[500px]">
            <Image
              src="/carsMK/hero.png"
              alt="Voiture premium MK Rent"
              fill
              className="object-contain object-center drop-shadow-[0_0_60px_rgba(212,175,55,0.3)]"
              priority
              sizes="50vw"
            />
          </div>
        </div>

        {/* Stats bar */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-[#1A1A1A] bg-[#050505]/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-8 py-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: "🚚", title: "Livraison partout", sub: "en Tunisie" },
              { icon: "💰", title: "Prix compétitifs", sub: "et transparents" },
              { icon: "⚡", title: "Service rapide", sub: "et disponible 24/7" },
              { icon: "✨", title: "Voitures propres", sub: "et récentes" },
            ].map((item) => (
              <div key={item.title} className="flex items-center gap-3">
                <span className="text-xl">{item.icon}</span>
                <div>
                  <p className="text-white text-sm font-semibold">
                    {item.title}
                  </p>
                  <p className="text-[#666] text-xs">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED CAR ── */}
      <section className="max-w-7xl mx-auto px-8 py-20">
        <div className="relative rounded-3xl overflow-hidden border border-[#D4AF37]/30 bg-gradient-to-r from-[#0D0B00] via-[#1A1400] to-[#0D0B00]">
          {/* Glow */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 p-10 items-center">
            {/* Left */}
            <div>
              <span className="inline-block bg-[#D4AF37] text-black text-xs font-black px-3 py-1 rounded-full mb-4 tracking-widest uppercase">
                ✦ Véhicule Premium
              </span>
              <p className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase mb-2">
                Meilleur Choix
              </p>
              <h2 className="text-4xl font-black text-white mb-3">
                Renault Clio 5
              </h2>
              <p className="text-[#888] mb-6 leading-relaxed">
                Économique, confortable et idéale pour vos trajets en ville
                comme sur route.
              </p>

              {/* Specs */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {[
                  { icon: <Users className="w-4 h-4" />, label: "5 Places" },
                  { icon: <Zap className="w-4 h-4" />, label: "100 ch" },
                  { icon: <Fuel className="w-4 h-4" />, label: "Diesel" },
                  {
                    icon: <Settings className="w-4 h-4" />,
                    label: "Manuelle",
                  },
                ].map((spec) => (
                  <div
                    key={spec.label}
                    className="flex items-center gap-2 bg-black/40 rounded-xl px-4 py-3"
                  >
                    <span className="text-[#D4AF37]">{spec.icon}</span>
                    <span className="text-white text-sm font-medium">
                      {spec.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-6">
                <div>
                  <p className="text-[#666] text-xs">À partir de</p>
                  <p className="text-[#D4AF37] text-3xl font-black">
                    130{" "}
                    <span className="text-base text-[#888] font-normal">
                      TND / jour
                    </span>
                  </p>
                </div>
                <button className="bg-[#D4AF37] text-black font-bold px-6 py-3 rounded-full hover:bg-[#C49B27] transition-all flex items-center gap-2 hover:scale-105">
                  Réserver maintenant
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right — car image */}
            <div className="relative h-72 lg:h-80">
              <div className="absolute inset-0 bg-[#D4AF37]/5 rounded-2xl blur-2xl" />
              <Image
                src="/carsMK/featured.png"
                alt="Renault Clio 5 Premium"
                fill
                className="object-contain drop-shadow-[0_10px_60px_rgba(212,175,55,0.4)]"
                sizes="50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── CAR FLEET ── */}
      <section className="max-w-7xl mx-auto px-8 pb-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[#D4AF37] text-xs font-bold tracking-[0.3em] uppercase mb-2">
              Notre Flotte
            </p>
            <h2 className="text-4xl font-black">
              Des voitures pour
              <br />
              chaque trajet
            </h2>
          </div>
          <a
            href="#"
            className="text-[#D4AF37] text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all"
          >
            Voir tout <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <CarCard key={car.name} car={car} />
          ))}
        </div>
      </section>

      {/* ── BRANDS ── */}
      <section className="border-y border-[#1A1A1A] py-16">
        <div className="max-w-7xl mx-auto px-8">
          <p className="text-center text-xs font-bold tracking-[0.3em] text-[#D4AF37] uppercase mb-10">
            Marques de confiance
          </p>
          <div className="relative flex items-center gap-4">
            <button
              onClick={() => setBrandIndex(Math.max(0, brandIndex - 1))}
              className="w-9 h-9 rounded-full border border-[#333] flex items-center justify-center hover:border-[#D4AF37] transition-colors shrink-0"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex-1 overflow-hidden">
              <div
                className="flex gap-6 transition-transform duration-300"
                style={{
                  transform: `translateX(-${brandIndex * (100 / visibleBrands)}%)`,
                }}
              >
                {brands.map((brand) => (
                  <div
                    key={brand.name}
                    className="flex-shrink-0 w-1/5 bg-[#0A0A0A] border border-[#1A1A1A] rounded-2xl py-6 flex flex-col items-center gap-2 hover:border-[#D4AF37]/50 transition-colors cursor-pointer group"
                  >
                    <span className="text-[#555] group-hover:text-[#D4AF37] font-black text-sm tracking-wider transition-colors">
                      {brand.logo}
                    </span>
                    <span className="text-[#444] text-xs">{brand.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={() =>
                setBrandIndex(
                  Math.min(brands.length - visibleBrands, brandIndex + 1)
                )
              }
              className="w-9 h-9 rounded-full border border-[#333] flex items-center justify-center hover:border-[#D4AF37] transition-colors shrink-0"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="max-w-7xl mx-auto px-8 py-20">
        <p className="text-center text-xs font-bold tracking-[0.3em] text-[#D4AF37] uppercase mb-3">
          — Comment ça marche —
        </p>
        <h2 className="text-4xl font-black text-center mb-14">
          Comment ça marche&nbsp;?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <div key={step.number} className="flex items-start gap-4">
              <div className="relative bg-[#0A0A0A] border border-[#1A1A1A] rounded-2xl p-6 flex-1 hover:border-[#D4AF37]/40 transition-colors">
                {/* Number */}
                <span className="absolute top-4 right-5 text-5xl font-black text-[#D4AF37]/10 leading-none select-none">
                  {step.number}
                </span>
                <div className="w-10 h-10 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center mb-4">
                  <step.icon className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <h3 className="text-white font-bold mb-2">{step.title}</h3>
                <p className="text-[#666] text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
              {/* Arrow between steps */}
              {i < steps.length - 1 && (
                <div className="hidden md:flex items-center pt-10 -mx-3">
                  <ArrowRight className="w-5 h-5 text-[#D4AF37]/40" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="bg-[#080808] border-y border-[#1A1A1A] py-20">
        <div className="max-w-7xl mx-auto px-8">
          <p className="text-center text-xs font-bold tracking-[0.3em] text-[#D4AF37] uppercase mb-3">
            — Témoignages —
          </p>
          <h2 className="text-4xl font-black text-center mb-12">
            Ce que disent nos clients
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-[#0A0A0A] border border-[#1A1A1A] rounded-2xl p-6 hover:border-[#D4AF37]/30 transition-colors"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]"
                    />
                  ))}
                </div>
                <p className="text-[#888] text-sm leading-relaxed mb-6 italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/30 flex items-center justify-center">
                    <span className="text-[#D4AF37] text-sm font-bold">
                      {t.initial}
                    </span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">{t.name}</p>
                    <p className="text-[#555] text-xs">{t.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setTestimonialIndex(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === testimonialIndex
                    ? "bg-[#D4AF37] w-6"
                    : "bg-[#333]"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden py-24">
        {/* Background car image */}
        <div className="absolute inset-0">
          <Image
            src="/carsMK/cta.png"
            alt="CTA car"
            fill
            className="object-cover object-center opacity-20"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/60 to-[#050505]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: text */}
          <div>
            <p className="text-[#D4AF37] text-xs font-bold tracking-[0.3em] uppercase mb-4">
              C'est parti
            </p>
            <h2 className="text-5xl font-black leading-tight mb-4">
              Votre prochain trajet
              <br />
              <span className="text-[#D4AF37]">commence ici.</span>
            </h2>
            <p className="text-[#666] mb-8">
              Réservez dès maintenant et profitez d'une expérience premium.
            </p>
            <button className="bg-[#D4AF37] text-black font-bold px-8 py-4 rounded-full hover:bg-[#C49B27] transition-all flex items-center gap-2 hover:scale-105 text-base">
              Réserver une voiture
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Right: large car */}
          <div className="relative h-72 lg:h-96 hidden lg:block">
            <Image
              src="/carsMK/cta.png"
              alt="Voiture CTA"
              fill
              className="object-contain drop-shadow-[0_0_80px_rgba(212,175,55,0.3)]"
              sizes="50vw"
            />
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-[#1A1A1A] bg-[#050505] pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full border-2 border-[#D4AF37] flex items-center justify-center">
                  <span className="text-[#D4AF37] font-black text-xs">MK</span>
                </div>
              </div>
              <p className="text-[#555] text-sm leading-relaxed mb-4">
                Votre voiture, partout en Tunisie. Des véhicules premium, un
                service impeccable et des prix transparents.
              </p>
              <div className="flex gap-3">
                {["f", "ig", "wa"].map((s) => (
                  <a
                    key={s}
                    href="#"
                    className="w-8 h-8 border border-[#222] rounded-lg flex items-center justify-center text-[#555] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors text-xs font-bold"
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            {[
              {
                title: "Société",
                links: ["À propos", "Carrières", "Presse"],
              },
              {
                title: "Support",
                links: ["Centre d'aide", "Contact", "FAQ"],
              },
              {
                title: "Mentions",
                links: ["Confidentialité", "Conditions", "Cookies"],
              },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="text-white font-bold text-sm mb-4 tracking-wider uppercase">
                  {col.title}
                </h4>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-[#555] text-sm hover:text-[#D4AF37] transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-[#1A1A1A] pt-6 flex flex-col md:flex-row items-center justify-between gap-2">
            <p className="text-[#444] text-xs">
              © 2026 MK Rent Car. Tous droits réservés.
            </p>
            <p className="text-[#444] text-xs">Premium Car Rental</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
