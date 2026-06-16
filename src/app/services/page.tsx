import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { services } from "@/lib/services";
import { whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Nos Services | Saoudy Rent Car",
  description:
    "Location de luxe, transferts aéroport, service chauffeur, transport corporate et mariages. Découvrez les services premium de Saoudy Rent Car en Tunisie.",
};

export default function ServicesPage() {
  return (
    <main className="bg-[#050505] min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="max-w-2xl mb-14">
          <p className="text-[#D4AF37] text-xs font-bold tracking-[0.3em] uppercase mb-3">
            Saoudy Rent Car
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-5">
            Nos Services
          </h1>
          <p className="text-[#999] text-base leading-relaxed">
            Une gamme complète de solutions de mobilité haut de gamme à travers
            la Tunisie — de la location premium aux transferts VIP avec chauffeur.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="block group h-full"
            >
              <div className="h-full bg-[#0A0A0A] border border-[#1A1A1A] rounded-2xl p-7 hover:border-[#D4AF37]/50 transition-all duration-300 flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center mb-5">
                  <service.icon className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <h2 className="text-white font-bold text-lg mb-2">
                  {service.title}
                </h2>
                <p className="text-[#888] text-sm leading-relaxed flex-1">
                  {service.short}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#D4AF37] group-hover:gap-2.5 transition-all">
                  En savoir plus
                  <ArrowRight size={15} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap gap-4">
          <Link
            href="/reserve"
            className="bg-[#D4AF37] text-black font-bold px-7 py-3.5 rounded-full hover:bg-[#C49B27] transition-all flex items-center gap-2 text-sm"
          >
            Réserver un véhicule
            <ArrowRight size={16} />
          </Link>
          <a
            href={whatsappLink("Bonjour Saoudy Rent Car, je souhaite des informations sur vos services.")}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[#333] text-white font-semibold px-7 py-3.5 rounded-full hover:border-[#D4AF37] transition-all flex items-center gap-2 text-sm"
          >
            <MessageCircle size={15} />
            Contact WhatsApp
          </a>
        </div>
      </div>
    </main>
  );
}
