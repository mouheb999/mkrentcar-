"use client";

import { brands } from "@/lib/data";

export default function Brands() {
  return (
    <section className="border-y border-[#1A1A1A] py-14 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <p className="text-center text-xs font-bold tracking-[0.3em] text-[#D4AF37] uppercase mb-10">
          Des marques prestigieuses
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="bg-[#0A0A0A] border border-[#1A1A1A] rounded-2xl py-8 flex flex-col items-center gap-3 hover:border-[#D4AF37]/40 transition-colors group"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={brand.img}
                alt={brand.name}
                className="w-12 h-12 object-contain opacity-80 group-hover:opacity-100 transition-opacity"
              />
              <span className="text-[#777] group-hover:text-white text-[11px] font-bold tracking-widest uppercase transition-colors">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
