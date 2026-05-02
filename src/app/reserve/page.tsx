"use client";

import { Suspense, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  MapPin,
  ArrowRight,
  ArrowLeft,
  Check,
  Users,
  Fuel,
  Settings,
  Loader2,
  Search,
} from "lucide-react";
import { useCars } from "@/lib/useCars";
import { resolveCarImage } from "@/lib/carImages";

type Transmission = "Manuelle" | "Automatique" | "any";
type Fuel = "Essence" | "Diesel" | "Hybride" | "any";

function ReserveInner() {
  const router = useRouter();
  const { cars, loading } = useCars();

  const today = new Date().toISOString().split("T")[0];

  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Step 1
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [location, setLocation] = useState("");

  // Step 2
  const [maxPrice, setMaxPrice] = useState(200);
  const [minSeats, setMinSeats] = useState(4);
  const [transmission, setTransmission] = useState<Transmission>("any");
  const [fuel, setFuel] = useState<Fuel>("any");

  const step1Valid = Boolean(startDate && endDate && startDate <= endDate);

  const matching = useMemo(() => {
    return cars.filter((c) => {
      if (!c.available) return false;
      if (c.price > maxPrice) return false;
      if ((c.seats ?? 5) < minSeats) return false;
      if (transmission !== "any" && c.transmission !== transmission)
        return false;
      if (fuel !== "any" && c.fuel !== fuel) return false;
      return true;
    });
  }, [cars, maxPrice, minSeats, transmission, fuel]);

  const goToBooking = (carId: string) => {
    const qs = new URLSearchParams();
    qs.set("carId", carId);
    if (startDate) qs.set("start", startDate);
    if (endDate) qs.set("end", endDate);
    if (location) qs.set("location", location);
    router.push(`/booking?${qs.toString()}`);
  };

  const steps = [
    { n: 1, label: "Dates" },
    { n: 2, label: "Critères" },
    { n: 3, label: "Voitures" },
  ];

  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-16 bg-[#050505]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 sm:mb-10"
        >
          <p className="text-[#D4AF37] text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase mb-2 sm:mb-3">
            Trouvez votre voiture
          </p>
          <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
            Réservation en{" "}
            <span className="text-[#D4AF37]">3 étapes</span>
          </h1>
        </motion.div>

        {/* Stepper */}
        <div className="flex items-center gap-2 sm:gap-4 mb-8 sm:mb-10 overflow-x-auto">
          {steps.map((s, i) => {
            const active = step === s.n;
            const done = step > s.n;
            return (
              <div key={s.n} className="flex items-center gap-2 sm:gap-4 shrink-0">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold border transition-colors ${
                      active
                        ? "bg-[#D4AF37] text-black border-[#D4AF37]"
                        : done
                        ? "bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/40"
                        : "bg-[#111] text-[#666] border-[#222]"
                    }`}
                  >
                    {done ? <Check size={14} /> : s.n}
                  </div>
                  <span
                    className={`text-xs sm:text-sm font-semibold uppercase tracking-wider ${
                      active ? "text-white" : "text-[#666]"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className="w-6 sm:w-10 h-px bg-[#222]" />
                )}
              </div>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-[#0A0A0A] border border-[#1A1A1A] rounded-2xl p-5 sm:p-8"
            >
              <h2 className="text-lg sm:text-xl font-bold text-white mb-5 sm:mb-6">
                Quand et où ?
              </h2>

              <div className="grid sm:grid-cols-2 gap-4 mb-5">
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-[#888] font-bold block mb-2">
                    Date de départ
                  </label>
                  <div className="flex items-center gap-3 bg-[#111] rounded-xl px-4 py-3 border border-[#1A1A1A] focus-within:border-[#D4AF37]/50">
                    <Calendar size={16} className="text-[#D4AF37]" />
                    <input
                      type="date"
                      min={today}
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="bg-transparent text-sm text-white outline-none w-full [color-scheme:dark]"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-[#888] font-bold block mb-2">
                    Date de retour
                  </label>
                  <div className="flex items-center gap-3 bg-[#111] rounded-xl px-4 py-3 border border-[#1A1A1A] focus-within:border-[#D4AF37]/50">
                    <Calendar size={16} className="text-[#D4AF37]" />
                    <input
                      type="date"
                      min={startDate || today}
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="bg-transparent text-sm text-white outline-none w-full [color-scheme:dark]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest text-[#888] font-bold block mb-2">
                  Lieu de prise en charge
                </label>
                <div className="flex items-center gap-3 bg-[#111] rounded-xl px-4 py-3 border border-[#1A1A1A] focus-within:border-[#D4AF37]/50">
                  <MapPin size={16} className="text-[#D4AF37]" />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Tunis, Sousse, Djerba…"
                    className="bg-transparent text-sm text-white outline-none w-full placeholder:text-[#555]"
                  />
                </div>
              </div>

              <div className="flex justify-end mt-6 sm:mt-8">
                <button
                  onClick={() => setStep(2)}
                  disabled={!step1Valid}
                  className={`px-6 py-3 rounded-full font-bold text-sm flex items-center gap-2 transition-all ${
                    step1Valid
                      ? "bg-[#D4AF37] text-black hover:bg-[#C49B27]"
                      : "bg-[#1A1A1A] text-[#555] cursor-not-allowed"
                  }`}
                >
                  Continuer
                  <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-[#0A0A0A] border border-[#1A1A1A] rounded-2xl p-5 sm:p-8"
            >
              <h2 className="text-lg sm:text-xl font-bold text-white mb-5 sm:mb-6">
                Vos préférences
              </h2>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs uppercase tracking-widest text-[#888] font-bold">
                    Budget max par jour
                  </label>
                  <span className="text-[#D4AF37] font-bold text-sm">
                    {maxPrice} TND
                  </span>
                </div>
                <input
                  type="range"
                  min={100}
                  max={200}
                  step={5}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#D4AF37]"
                />
                <div className="flex justify-between text-[10px] text-[#555] mt-1">
                  <span>100 TND</span>
                  <span>200 TND</span>
                </div>
              </div>

              {/* Seats */}
              <div className="mb-6">
                <label className="text-xs uppercase tracking-widest text-[#888] font-bold block mb-3">
                  Nombre de places min.
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[2, 4, 5, 7].map((n) => (
                    <button
                      key={n}
                      onClick={() => setMinSeats(n)}
                      className={`py-2.5 rounded-xl text-sm font-semibold transition-all ${
                        minSeats === n
                          ? "bg-[#D4AF37] text-black"
                          : "bg-[#111] text-[#888] hover:bg-[#1A1A1A]"
                      }`}
                    >
                      {n}+
                    </button>
                  ))}
                </div>
              </div>

              {/* Transmission */}
              <div className="mb-6">
                <label className="text-xs uppercase tracking-widest text-[#888] font-bold block mb-3">
                  Boîte de vitesses
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(
                    [
                      { v: "any", l: "Peu importe" },
                      { v: "Manuelle", l: "Manuelle" },
                      { v: "Automatique", l: "Auto" },
                    ] as const
                  ).map((o) => (
                    <button
                      key={o.v}
                      onClick={() => setTransmission(o.v)}
                      className={`py-2.5 rounded-xl text-sm font-semibold transition-all ${
                        transmission === o.v
                          ? "bg-[#D4AF37] text-black"
                          : "bg-[#111] text-[#888] hover:bg-[#1A1A1A]"
                      }`}
                    >
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fuel */}
              <div className="mb-6">
                <label className="text-xs uppercase tracking-widest text-[#888] font-bold block mb-3">
                  Carburant
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(
                    [
                      { v: "any", l: "Peu importe" },
                      { v: "Essence", l: "Essence" },
                      { v: "Diesel", l: "Diesel" },
                      { v: "Hybride", l: "Hybride" },
                    ] as const
                  ).map((o) => (
                    <button
                      key={o.v}
                      onClick={() => setFuel(o.v)}
                      className={`py-2.5 rounded-xl text-sm font-semibold transition-all ${
                        fuel === o.v
                          ? "bg-[#D4AF37] text-black"
                          : "bg-[#111] text-[#888] hover:bg-[#1A1A1A]"
                      }`}
                    >
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between mt-6 sm:mt-8 gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="px-5 py-3 rounded-full border border-[#222] text-white text-sm font-medium hover:border-[#D4AF37] transition-all flex items-center gap-2"
                >
                  <ArrowLeft size={16} />
                  Retour
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="px-6 py-3 bg-[#D4AF37] text-black rounded-full font-bold text-sm flex items-center gap-2 hover:bg-[#C49B27] transition-all"
                >
                  <Search size={16} />
                  Voir les voitures
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  {matching.length} voiture{matching.length > 1 ? "s" : ""}{" "}
                  correspondent
                </h2>
                <button
                  onClick={() => setStep(2)}
                  className="text-xs sm:text-sm text-[#D4AF37] hover:text-white transition-colors font-semibold flex items-center gap-1"
                >
                  <ArrowLeft size={14} />
                  Modifier les critères
                </button>
              </div>

              {loading ? (
                <div className="flex items-center justify-center py-16 text-[#666]">
                  <Loader2 size={20} className="animate-spin mr-3" />
                  Chargement…
                </div>
              ) : matching.length === 0 ? (
                <div className="bg-[#0A0A0A] border border-[#1A1A1A] rounded-2xl p-8 text-center">
                  <p className="text-[#888] mb-4">
                    Aucune voiture ne correspond à vos critères.
                  </p>
                  <button
                    onClick={() => setStep(2)}
                    className="text-[#D4AF37] text-sm font-bold hover:underline"
                  >
                    Modifier les critères
                  </button>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-4">
                  {matching.map((car, idx) => {
                    const img = resolveCarImage(car.name, car.image);
                    const isData = img.startsWith("data:");
                    return (
                      <motion.button
                        key={car.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        onClick={() => goToBooking(car.id)}
                        className="group text-left bg-[#0A0A0A] border border-[#1A1A1A] hover:border-[#D4AF37] rounded-2xl overflow-hidden transition-all"
                      >
                        <div className="relative h-40 sm:h-44 bg-[#0A0A0A]">
                          <Image
                            src={img}
                            alt={car.name}
                            fill
                            unoptimized={isData}
                            sizes="(max-width: 640px) 100vw, 50vw"
                            className="object-contain p-3 group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <div className="p-4">
                          <div className="flex items-start justify-between gap-2 mb-3">
                            <div>
                              <p className="text-[10px] text-[#666] uppercase tracking-widest font-bold">
                                {car.category ?? "Véhicule"}
                              </p>
                              <h3 className="text-white font-bold text-base">
                                {car.name}
                              </h3>
                            </div>
                            <div className="text-right">
                              <p className="text-[#D4AF37] font-bold text-lg">
                                {car.price}
                              </p>
                              <p className="text-[10px] text-[#666]">TND/j</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 text-[11px] text-[#888] mb-3">
                            <span className="inline-flex items-center gap-1">
                              <Users size={12} className="text-[#D4AF37]" />
                              {car.seats ?? 5}
                            </span>
                            <span className="inline-flex items-center gap-1">
                              <Fuel size={12} className="text-[#D4AF37]" />
                              {car.fuel ?? "—"}
                            </span>
                            <span className="inline-flex items-center gap-1">
                              <Settings size={12} className="text-[#D4AF37]" />
                              {car.transmission === "Automatique"
                                ? "Auto"
                                : "Man."}
                            </span>
                          </div>
                          <div className="flex items-center justify-end text-[#D4AF37] text-sm font-bold group-hover:text-white transition-colors">
                            Réserver
                            <ArrowRight
                              size={14}
                              className="ml-1 group-hover:translate-x-1 transition-transform"
                            />
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function ReservePage() {
  return (
    <Suspense
      fallback={
        <div className="pt-40 flex justify-center text-[#666]">
          <Loader2 size={20} className="animate-spin" />
        </div>
      }
    >
      <ReserveInner />
    </Suspense>
  );
}
