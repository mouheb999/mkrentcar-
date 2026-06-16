export interface Car {
  id: string;
  name: string;
  brand: string;
  image: string;
  price: number;
  seats: number;
  transmission: "Manuelle" | "Automatique";
  fuel: "Essence" | "Diesel" | "Hybride" | "Électrique";
  horsepower: number;
  year: number;
  category: string;
  /** Premium positioning label shown as a badge (e.g. "Berline de Luxe"). */
  tier: string;
  /** Services this vehicle is offered for (Location, Chauffeur, Transfert VIP…). */
  services: string[];
  description: string;
  gallery: string[];
}

const BMW_5 = "/cars/bmw-5-series-front.png";
const BMW_5_BACK = "/cars/bmw-5-series-back.png";
const E_CLASS = "/cars/mercedes-e-class-front.png";
const E_CLASS_BACK = "/cars/mercedes-e-class-back.png";
const C_CLASS = "/cars/mercedes-c-class-front.png";
const C_CLASS_BACK = "/cars/mercedes-c-class-back.png";
const GOLF = "/cars/vw-golf-8-front.png";
const GOLF_BACK = "/cars/vw-golf-8-back.png";
const MULTIVAN = "/cars/vw-multivan-front.png";
const MULTIVAN_BACK = "/cars/vw-multivan-back.png";
const SCUDO = "/cars/fiat-scudo-front.png";
const SCUDO_BACK = "/cars/fiat-scudo-back.png";

export const cars: Car[] = [
  {
    id: "bmw-5-series",
    name: "BMW 5 Series",
    brand: "BMW",
    image: BMW_5,
    price: 400,
    seats: 5,
    transmission: "Automatique",
    fuel: "Diesel",
    horsepower: 252,
    year: 2023,
    category: "Berline",
    tier: "Berline de Luxe",
    services: ["Location", "Chauffeur"],
    description:
      "L'alliance parfaite entre puissance et raffinement. La BMW Série 5 offre une expérience de conduite executive, idéale pour les déplacements d'affaires et les occasions prestigieuses.",
    gallery: [BMW_5, BMW_5_BACK],
  },
  {
    id: "mercedes-e-class",
    name: "Mercedes E-Class",
    brand: "Mercedes-Benz",
    image: E_CLASS,
    price: 450,
    seats: 5,
    transmission: "Automatique",
    fuel: "Diesel",
    horsepower: 245,
    year: 2022,
    category: "Berline",
    tier: "Berline Exécutive",
    services: ["Location", "Chauffeur"],
    description:
      "Le summum du confort allemand. La Mercedes Classe E incarne l'élégance executive avec un habitacle silencieux et une finition irréprochable pour vos transferts VIP.",
    gallery: [E_CLASS, E_CLASS_BACK],
  },
  {
    id: "mercedes-c-class",
    name: "Mercedes C-Class",
    brand: "Mercedes-Benz",
    image: C_CLASS,
    price: 280,
    seats: 5,
    transmission: "Automatique",
    fuel: "Diesel",
    horsepower: 184,
    year: 2017,
    category: "Berline",
    tier: "Berline Affaires",
    services: ["Location", "Chauffeur"],
    description:
      "Sportive et élégante, la Mercedes Classe C allie prestige et agilité. Un choix premium accessible pour vos trajets professionnels et personnels.",
    gallery: [C_CLASS, C_CLASS_BACK],
  },
  {
    id: "vw-golf-8",
    name: "Volkswagen Golf 8",
    brand: "Volkswagen",
    image: GOLF,
    price: 180,
    seats: 5,
    transmission: "Automatique",
    fuel: "Essence",
    horsepower: 150,
    year: 2022,
    category: "Compacte",
    tier: "Compacte Premium",
    services: ["Location"],
    description:
      "Compacte, moderne et technologique. La Golf 8 offre une conduite dynamique et un équipement de pointe dans un format idéal pour la ville comme pour la route.",
    gallery: [GOLF, GOLF_BACK],
  },
  {
    id: "vw-multivan-t6",
    name: "Volkswagen Multivan T6",
    brand: "Volkswagen",
    image: MULTIVAN,
    price: 500,
    seats: 7,
    transmission: "Automatique",
    fuel: "Diesel",
    horsepower: 204,
    year: 2021,
    category: "Van",
    tier: "Van VIP",
    services: ["Transfert VIP", "Transport de Groupe", "Chauffeur"],
    description:
      "Le transport de groupe sans compromis sur le luxe. Le Multivan T6 accueille jusqu'à 7 passagers dans un confort spacieux, parfait pour les transferts VIP et le tourisme.",
    gallery: [MULTIVAN, MULTIVAN_BACK],
  },
  {
    id: "fiat-scudo",
    name: "Fiat Scudo",
    brand: "Fiat",
    image: SCUDO,
    price: 350,
    seats: 8,
    transmission: "Manuelle",
    fuel: "Diesel",
    horsepower: 145,
    year: 2022,
    category: "Van",
    tier: "Van Transfert",
    services: ["Transfert Aéroport", "Transport de Groupe", "Chauffeur"],
    description:
      "Spacieux et fiable, le Fiat Scudo est la solution idéale pour les transferts aéroport et le transport de groupes jusqu'à 8 personnes avec bagages.",
    gallery: [SCUDO, SCUDO_BACK],
  },
];

export const brands = [
  { name: "BMW", logo: "BMW", img: "https://cdn.simpleicons.org/bmw/D4AF37" },
  { name: "Mercedes-Benz", logo: "MERCEDES", img: "/brands/mercedes.svg" },
  { name: "Volkswagen", logo: "VW", img: "https://cdn.simpleicons.org/volkswagen/D4AF37" },
  { name: "Fiat", logo: "FIAT", img: "https://cdn.simpleicons.org/fiat/D4AF37" },
];

export const testimonials = [
  {
    id: 1,
    name: "Karim Bouazizi",
    role: "Directeur Commercial, Tunis",
    text: "Service de chauffeur impeccable pour mes déplacements d'affaires. Ponctualité, discrétion et une Classe E toujours impeccable. Saoudy Rent Car est devenu mon partenaire de confiance.",
    rating: 5,
  },
  {
    id: 2,
    name: "Leïla Mansour",
    role: "Organisatrice d'événements, Sousse",
    text: "Nous avons réservé le Multivan VIP pour un mariage. Voiture luxueuse, chauffeur professionnel et un service haut de gamme du début à la fin. Je recommande vivement.",
    rating: 5,
  },
  {
    id: 3,
    name: "Mehdi Saïdi",
    role: "Client, Aéroport Tunis-Carthage",
    text: "Transfert aéroport parfaitement organisé. Accueil à l'arrivée, véhicule premium et tarif transparent. Une expérience VIP du premier au dernier instant.",
    rating: 5,
  },
];

export const categories = ["Tout", "Berline", "Compacte", "Van"];
