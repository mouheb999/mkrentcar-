import type { LucideIcon } from "lucide-react";
import { Crown, Plane, UserCheck, Briefcase, Heart } from "lucide-react";

export interface Service {
  slug: string;
  icon: LucideIcon;
  title: string;
  short: string;
  description: string;
  points: string[];
  image: string;
}

export const services: Service[] = [
  {
    slug: "location",
    icon: Crown,
    title: "Location de Luxe",
    short: "Véhicules premium pour la location quotidienne et longue durée.",
    description:
      "Profitez de notre flotte de véhicules haut de gamme — BMW, Mercedes et Volkswagen — disponibles à la location pour vos besoins quotidiens, professionnels ou touristiques. Des conditions flexibles et des tarifs transparents.",
    points: [
      "Location à la journée, à la semaine ou au mois",
      "Flotte récente et parfaitement entretenue",
      "Kilométrage flexible et assurance incluse",
      "Livraison du véhicule où vous le souhaitez",
    ],
    image: "/cars/bmw-5-series-front.png",
  },
  {
    slug: "transferts-aeroport",
    icon: Plane,
    title: "Transferts Aéroport",
    short: "Transport privé depuis et vers les aéroports tunisiens.",
    description:
      "Un accueil VIP à l'aéroport et un transfert confortable vers votre destination. Nos chauffeurs suivent votre vol et vous attendent à l'arrivée, pour une expérience sans stress.",
    points: [
      "Suivi des vols en temps réel",
      "Accueil personnalisé à l'arrivée",
      "Véhicules berlines et vans VIP",
      "Tarif fixe et transparent",
    ],
    image: "/cars/fiat-scudo-front.png",
  },
  {
    slug: "chauffeur",
    icon: UserCheck,
    title: "Service Chauffeur",
    short: "Chauffeurs professionnels pour vos déplacements.",
    description:
      "Confiez vos déplacements à nos chauffeurs expérimentés, discrets et ponctuels. Idéal pour les déplacements d'affaires, les événements ou simplement pour voyager l'esprit tranquille.",
    points: [
      "Chauffeurs expérimentés et discrets",
      "Mise à disposition à l'heure ou à la journée",
      "Déplacements professionnels et personnels",
      "Confidentialité et ponctualité garanties",
    ],
    image: "/cars/mercedes-e-class-front.png",
  },
  {
    slug: "corporate",
    icon: Briefcase,
    title: "Transport Corporate",
    short: "Solutions de transport executive pour les entreprises.",
    description:
      "Des solutions de mobilité sur mesure pour les entreprises : transport de cadres, délégations et clients VIP. Facturation simplifiée et service à la hauteur de vos exigences.",
    points: [
      "Comptes entreprise et facturation mensuelle",
      "Flotte executive dédiée",
      "Transport de délégations et séminaires",
      "Service prioritaire et disponibilité 24/7",
    ],
    image: "/cars/mercedes-c-class-front.png",
  },
  {
    slug: "mariage",
    icon: Heart,
    title: "Mariages & Événements",
    short: "Véhicules de luxe pour vos mariages et événements.",
    description:
      "Sublimez votre journée avec un véhicule d'exception. Nos voitures de luxe et vans VIP accompagnent vos mariages, cérémonies et événements avec élégance.",
    points: [
      "Voitures de luxe pour les mariés",
      "Vans VIP pour les invités",
      "Décoration et présentation soignées",
      "Chauffeur en tenue à votre service",
    ],
    image: "/cars/vw-multivan-front.png",
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
