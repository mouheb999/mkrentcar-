"use client";

import { motion } from "framer-motion";
import { Car, Calendar, CheckCircle2, ArrowRight } from "lucide-react";

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

export default function HowItWorks() {
  return (
    <section className="bg-[#050505] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <p className="text-center text-xs font-bold tracking-[0.3em] text-[#D4AF37] uppercase mb-10">
          Comment ça marche
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative bg-[#0A0A0A] border border-[#D4AF37]/20 rounded-2xl p-6 overflow-hidden"
            >
              {/* Large faded number */}
              <span className="absolute top-3 right-4 text-6xl font-black text-[#D4AF37]/10 leading-none select-none">
                {step.number}
              </span>
              <div className="w-10 h-10 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center mb-4">
                <step.icon className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <h3 className="text-white font-bold mb-2">{step.title}</h3>
              <p className="text-[#666] text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
