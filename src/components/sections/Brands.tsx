"use client";

import { useState } from "react";
import { brands } from "@/lib/data";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Brands() {
  const [brandIndex, setBrandIndex] = useState(0);
  const maxIndex = Math.max(0, brands.length - 5);

  return (
    <section className="border-y border-[#1A1A1A] py-14 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-8">
        <p className="text-center text-xs font-bold tracking-[0.3em] text-[#D4AF37] uppercase mb-10">
          Marques de confiance
        </p>
        <div className="relative flex items-center gap-4">
          <button
            onClick={() => setBrandIndex(Math.max(0, brandIndex - 1))}
            className="w-9 h-9 rounded-full border border-[#333] flex items-center justify-center hover:border-[#D4AF37] transition-colors shrink-0"
          >
            <ChevronLeft className="w-4 h-4 text-white" />
          </button>
          <div className="flex-1 overflow-hidden">
            <div
              className="flex gap-4 transition-transform duration-300"
              style={{
                transform: `translateX(-${brandIndex * (100 / 8) }%)`,
              }}
            >
              {brands.map((brand) => (
                <div
                  key={brand.name}
                  className="flex-shrink-0 w-[calc(12.5%-14px)] bg-[#0A0A0A] border border-[#1A1A1A] rounded-2xl py-5 flex flex-col items-center gap-3 hover:border-[#D4AF37]/40 transition-colors cursor-pointer group"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={brand.img}
                    alt={brand.name}
                    className="w-10 h-10 object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                  />
                  <span className="text-[#555] group-hover:text-white text-[10px] font-bold tracking-widest uppercase transition-colors">
                    {brand.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={() => setBrandIndex(Math.min(maxIndex, brandIndex + 1))}
            className="w-9 h-9 rounded-full border border-[#333] flex items-center justify-center hover:border-[#D4AF37] transition-colors shrink-0"
          >
            <ChevronRight className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </section>
  );
}
