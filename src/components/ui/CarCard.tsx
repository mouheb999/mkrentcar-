"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import type { CarRow } from "@/lib/database.types";
import { resolveCarImage } from "@/lib/carImages";
import { Users, Fuel, Settings, ArrowRight } from "lucide-react";

interface CarCardProps {
  car: CarRow;
  index?: number;
  queryString?: string;
}

export default function CarCard({ car, index = 0, queryString }: CarCardProps) {
  const href = queryString
    ? `/cars/${car.id}?${queryString}`
    : `/cars/${car.id}`;

  const resolvedImage = resolveCarImage(car.name, car.image);
  const isDataUrl = resolvedImage.startsWith("data:");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link href={href} className="block group">
        <div className="relative bg-[#0A0A0A] border border-[#1A1A1A] rounded-2xl overflow-hidden hover:border-[#D4AF37] hover:shadow-[0_0_25px_rgba(212,175,55,0.1)] transition-all duration-400 flex flex-col">
          {/* Badges */}
          <div className="flex items-center justify-between px-4 pt-4">
            <span className="text-[10px] font-bold tracking-widest text-[#888] uppercase">
              {car.category ?? "Véhicule"}
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
              src={resolvedImage}
              alt={car.name}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              unoptimized={isDataUrl}
              className="object-contain group-hover:scale-105 transition-transform duration-500"
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
                  {car.seats ?? 5}
                </span>
              </div>
              <div className="flex flex-col items-center gap-1 bg-[#111] rounded-lg py-2">
                <Fuel className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="text-[10px] text-[#666]">Carburant</span>
                <span className="text-[11px] text-white font-semibold">
                  {car.fuel ?? "—"}
                </span>
              </div>
              <div className="flex flex-col items-center gap-1 bg-[#111] rounded-lg py-2">
                <Settings className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="text-[10px] text-[#666]">Boîte</span>
                <span className="text-[11px] text-white font-semibold">
                  {car.transmission === "Automatique" ? "Auto" : "Manuelle"}
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
              <span className="flex items-center gap-1.5 text-sm font-semibold text-[#D4AF37] hover:text-white transition-colors group/btn">
                Réserver
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
