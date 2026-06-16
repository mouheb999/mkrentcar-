import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, MessageCircle, ArrowLeft } from "lucide-react";
import { services, getService } from "@/lib/services";
import { whatsappLink } from "@/lib/site";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const service = getService(params.slug);
  if (!service) return { title: "Service introuvable | Saoudy Rent Car" };
  return {
    title: `${service.title} | Saoudy Rent Car`,
    description: service.short,
  };
}

export default function ServiceDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const service = getService(params.slug);
  if (!service) notFound();

  return (
    <main className="bg-[#050505] min-h-screen pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-sm text-[#888] hover:text-[#D4AF37] transition-colors mb-10"
        >
          <ArrowLeft size={15} />
          Tous les services
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center mb-6">
              <service.icon className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <p className="text-[#D4AF37] text-xs font-bold tracking-[0.3em] uppercase mb-3">
              Saoudy Rent Car
            </p>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-5">
              {service.title}
            </h1>
            <p className="text-[#999] text-base leading-relaxed mb-8">
              {service.description}
            </p>

            <ul className="space-y-3 mb-10">
              {service.points.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center shrink-0">
                    <Check size={12} className="text-[#D4AF37]" />
                  </span>
                  <span className="text-[#ccc] text-sm">{point}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/reserve"
                className="bg-[#D4AF37] text-black font-bold px-7 py-3.5 rounded-full hover:bg-[#C49B27] transition-all flex items-center gap-2 text-sm"
              >
                Réserver
                <ArrowRight size={16} />
              </Link>
              <a
                href={whatsappLink(`Bonjour Saoudy Rent Car, je suis intéressé par : ${service.title}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-[#333] text-white font-semibold px-7 py-3.5 rounded-full hover:border-[#D4AF37] transition-all flex items-center gap-2 text-sm"
              >
                <MessageCircle size={15} />
                Contact WhatsApp
              </a>
            </div>
          </div>

          <div className="relative h-72 lg:h-96 rounded-2xl overflow-hidden border border-[#1A1A1A] bg-[#0A0A0A]">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent z-10" />
            <Image
              src={service.image}
              alt={service.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain p-6"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
