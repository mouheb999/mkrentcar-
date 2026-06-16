"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Users,
  Gauge,
  Fuel,
  Zap,
  Calendar,
  ArrowRight,
  ArrowLeft,
  Star,
  Loader2,
} from "lucide-react";
import { useCar } from "@/lib/useCars";
import { resolveCarImage } from "@/lib/carImages";

function daysBetween(start: string, end: string): number {
  if (!start || !end) return 0;
  const a = new Date(start + "T00:00:00").getTime();
  const b = new Date(end + "T00:00:00").getTime();
  const diff = Math.round((b - a) / 86_400_000);
  return diff > 0 ? diff : 0;
}

function CarDetailInner() {
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();

  const { car, loading, error } = useCar(params?.id);

  const today = new Date().toISOString().split("T")[0];
  const urlStart = searchParams.get("start") ?? "";
  const urlEnd = searchParams.get("end") ?? "";
  const urlLocation = searchParams.get("location") ?? "";

  const [startDate, setStartDate] = useState(urlStart);
  const [endDate, setEndDate] = useState(urlEnd);
  const [pickupLocation, setPickupLocation] = useState(urlLocation);
  const [selectedImage, setSelectedImage] = useState(0);

  // Keep state in sync if URL changes
  useEffect(() => {
    if (urlStart) setStartDate(urlStart);
    if (urlEnd) setEndDate(urlEnd);
  }, [urlStart, urlEnd]);

  const gallery = useMemo(() => {
    if (!car) return [] as string[];
    const mainImage = resolveCarImage(car.name, car.image);
    if (car.gallery && car.gallery.length > 0) {
      return [mainImage, ...car.gallery.slice(1)];
    }
    return [mainImage];
  }, [car]);

  const days = useMemo(() => {
    const d = daysBetween(startDate, endDate);
    return d > 0 ? d : 3;
  }, [startDate, endDate]);

  const handleReserve = () => {
    if (!car) return;
    const qs = new URLSearchParams();
    qs.set("carId", car.id);
    if (startDate) qs.set("start", startDate);
    if (endDate) qs.set("end", endDate);
    if (pickupLocation) qs.set("location", pickupLocation);
    router.push(`/booking?${qs.toString()}`);
  };

  if (loading) {
    return (
      <div className="pt-40 pb-20 flex items-center justify-center text-cream/50">
        <Loader2 size={20} className="animate-spin mr-3 text-accent" />
        Chargement…
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-40 pb-20 max-w-xl mx-auto px-6 text-center">
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-2xl p-6 text-sm">
          {error}
        </div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="pt-40 pb-20 text-center">
        <h1 className="text-2xl font-bold text-cream">Véhicule introuvable</h1>
        <Link href="/cars" className="text-accent mt-4 inline-block">
          Retour aux voitures
        </Link>
      </div>
    );
  }

  const specs = [
    { icon: Users, label: "Places", value: `${car.seats ?? "—"}` },
    { icon: Gauge, label: "Puissance", value: `${car.horsepower ?? "—"} ch` },
    { icon: Fuel, label: "Carburant", value: car.fuel ?? "—" },
    { icon: Zap, label: "Transmission", value: car.transmission ?? "—" },
  ];

  const serviceFee = 25;
  const total = car.price * days + serviceFee;
  const isDataUrl = (gallery[selectedImage] ?? "").startsWith("data:");
  const datesValid = startDate && endDate && daysBetween(startDate, endDate) > 0;

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            href="/cars"
            className="inline-flex items-center gap-2 text-sm text-[#888] hover:text-[#D4AF37] transition-colors"
          >
            <ArrowLeft size={14} />
            Retour aux voitures
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Left: Image + Details */}
          <div className="lg:col-span-3 space-y-8">
            {/* Main image with gold border */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#111] border-2 border-[#D4AF37]/30"
            >
              {gallery.length > 0 ? (
                <Image
                  src={gallery[selectedImage]}
                  alt={car.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  unoptimized={isDataUrl}
                  className="object-cover transition-all duration-500"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-[#555] text-sm">
                  Aucune image
                </div>
              )}
            </motion.div>

            {gallery.length > 1 && (
              <div className="flex gap-3 flex-wrap">
                {gallery.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-24 h-16 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                      selectedImage === index
                        ? "border-[#D4AF37]"
                        : "border-[#1A1A1A] opacity-60 hover:opacity-100 hover:border-[#333]"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${car.name} ${index + 1}`}
                      fill
                      sizes="96px"
                      unoptimized={img.startsWith("data:")}
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Car info */}
            <div>
              {car.brand && (
                <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-bold mb-2">
                  {car.brand}
                </p>
              )}
              <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-3">
                {car.name}
              </h1>
              <div className="flex items-center gap-2 mb-5">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      size={14}
                      className="fill-[#D4AF37] text-[#D4AF37]"
                    />
                  ))}
                </div>
                <span className="text-xs text-[#666]">5,0 (48 avis)</span>
              </div>
              {car.description && (
                <p className="text-[#888] leading-relaxed text-sm">
                  {car.description}
                </p>
              )}
            </div>

            {/* Specs row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {specs.map((spec) => (
                <div
                  key={spec.label}
                  className="bg-[#0A0A0A] rounded-2xl p-5 text-center border border-[#1A1A1A]"
                >
                  <spec.icon
                    size={20}
                    className="text-[#D4AF37] mx-auto mb-2"
                  />
                  <p className="text-xs text-[#666] mb-1">{spec.label}</p>
                  <p className="text-sm font-bold text-white">
                    {spec.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Booking Panel */}
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-28">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-[#0A0A0A] rounded-2xl border border-[#1A1A1A] p-7"
              >
                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-4xl font-black text-white">
                    {car.price}
                  </span>
                  <span className="text-[#D4AF37] font-semibold text-sm">TND</span>
                  <span className="text-[#666] text-sm">/ jour</span>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-[#888] font-bold block mb-2">
                      Date de départ
                    </label>
                    <div className="flex items-center gap-3 bg-[#111] rounded-xl px-4 py-3 border border-[#1A1A1A] focus-within:border-[#D4AF37]/40 transition-colors">
                      <Calendar size={16} className="text-[#D4AF37]" />
                      <input
                        type="date"
                        min={today}
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="bg-transparent text-sm text-white outline-none w-full [color-scheme:dark]"
                        placeholder="jj/mm/aaaa"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-[#888] font-bold block mb-2">
                      Date de retour
                    </label>
                    <div className="flex items-center gap-3 bg-[#111] rounded-xl px-4 py-3 border border-[#1A1A1A] focus-within:border-[#D4AF37]/40 transition-colors">
                      <Calendar size={16} className="text-[#D4AF37]" />
                      <input
                        type="date"
                        min={startDate || today}
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="bg-transparent text-sm text-white outline-none w-full [color-scheme:dark]"
                        placeholder="jj/mm/aaaa"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-[#888] font-bold block mb-2">
                      Lieu de prise en charge
                    </label>
                    <div className="flex items-center gap-3 bg-[#111] rounded-xl px-4 py-3 border border-[#1A1A1A] focus-within:border-[#D4AF37]/40 transition-colors">
                      <input
                        type="text"
                        value={pickupLocation}
                        onChange={(e) => setPickupLocation(e.target.value)}
                        placeholder="Tunis, Sousse, Djerba…"
                        className="bg-transparent text-sm text-white outline-none w-full placeholder:text-[#555]"
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t border-[#1A1A1A] pt-5 mb-5">
                  <div className="flex justify-between text-sm mb-3">
                    <span className="text-[#888]">
                      {car.price} TND × {days} jours
                    </span>
                    <span className="text-white font-semibold">
                      {car.price * days} TND
                    </span>
                  </div>
                  <div className="flex justify-between text-sm mb-3">
                    <span className="text-[#888]">Frais de service</span>
                    <span className="text-white font-semibold">
                      {serviceFee} TND
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-black mt-4 pt-4 border-t border-[#1A1A1A]">
                    <span className="text-white">Total</span>
                    <span className="text-[#D4AF37]">{total} TND</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={!car.available}
                  onClick={handleReserve}
                  className={`w-full py-4 rounded-full font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                    car.available
                      ? "bg-[#D4AF37] hover:bg-[#C49B27] text-black"
                      : "bg-[#111] text-[#555] cursor-not-allowed"
                  }`}
                >
                  {car.available ? "Envoyer la demande" : "Indisponible"}
                  {car.available && <ArrowRight size={16} />}
                </motion.button>

                {!datesValid && car.available && (
                  <p className="text-[11px] text-[#666] text-center mt-3">
                    Sélectionnez vos dates pour continuer.
                  </p>
                )}

                <p className="text-xs text-[#666] text-center mt-4">
                  Annulation gratuite jusqu&rsquo;à 24h avant la prise en charge
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CarDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="pt-40 flex justify-center text-cream/40">
          <Loader2 size={20} className="animate-spin" />
        </div>
      }
    >
      <CarDetailInner />
    </Suspense>
  );
}
