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
  description: string;
  gallery: string[];
}

const IBIZA = "/carsMK/seat ibiza.png";
const CLIO = "/carsMK/renault clio.png";
const SWIFT = "/carsMK/suzuki swift.png";
const FABIA = "/carsMK/skoda fabia.png";
const POLO = "/carsMK/polo volkswagen.png";
const I20 = "/carsMK/hyundai i20.png";

export const cars: Car[] = [
  {
    id: "seat-ibiza",
    name: "Seat Ibiza",
    brand: "Seat",
    image: IBIZA,
    price: 140,
    seats: 5,
    transmission: "Manuelle",
    fuel: "Essence",
    horsepower: 110,
    year: 2024,
    category: "Citadine",
    description:
      "Design affirmé et conduite agile. La Seat Ibiza est la compagne idéale pour la ville comme pour l'autoroute.",
    gallery: [IBIZA, POLO, FABIA],
  },
  {
    id: "renault-clio-5",
    name: "Renault Clio 5",
    brand: "Renault",
    image: CLIO,
    price: 130,
    seats: 5,
    transmission: "Manuelle",
    fuel: "Diesel",
    horsepower: 100,
    year: 2024,
    category: "Citadine",
    description:
      "Raffinée, économique et confortable. La Clio 5 allie le style français à une consommation maîtrisée.",
    gallery: [CLIO, IBIZA, SWIFT],
  },
  {
    id: "suzuki-swift",
    name: "Suzuki Swift",
    brand: "Suzuki",
    image: SWIFT,
    price: 120,
    seats: 5,
    transmission: "Manuelle",
    fuel: "Essence",
    horsepower: 83,
    year: 2024,
    category: "Citadine",
    description:
      "Maniable et économique. La Swift concentre du caractère dans un format idéal pour la ville.",
    gallery: [SWIFT, I20, IBIZA],
  },
  {
    id: "skoda-fabia",
    name: "Skoda Fabia",
    brand: "Skoda",
    image: FABIA,
    price: 135,
    seats: 5,
    transmission: "Automatique",
    fuel: "Essence",
    horsepower: 95,
    year: 2024,
    category: "Compacte",
    description:
      "Spacieuse, bien finie et surprenante. La Fabia offre un habitacle généreux et un comportement très sûr.",
    gallery: [FABIA, POLO, CLIO],
  },
  {
    id: "hyundai-i20",
    name: "Hyundai i20",
    brand: "Hyundai",
    image: I20,
    price: 125,
    seats: 5,
    transmission: "Manuelle",
    fuel: "Essence",
    horsepower: 100,
    year: 2024,
    category: "Citadine",
    description:
      "Technologique et facile à vivre. La i20 offre confort, sécurité et un look moderne dans un format compact.",
    gallery: [I20, SWIFT, CLIO],
  },
  {
    id: "volkswagen-polo",
    name: "Volkswagen Polo",
    brand: "Volkswagen",
    image: POLO,
    price: 150,
    seats: 5,
    transmission: "Automatique",
    fuel: "Essence",
    horsepower: 110,
    year: 2024,
    category: "Compacte",
    description:
      "Le savoir-faire allemand en format compact. La Polo propose une conduite sereine et une finition soignée.",
    gallery: [POLO, FABIA, IBIZA],
  },
];

export const brands = [
  { name: "Volkswagen", logo: "VW", img: "https://cdn.simpleicons.org/volkswagen/white" },
  { name: "Seat", logo: "SEAT", img: "https://cdn.simpleicons.org/seat/white" },
  { name: "Renault", logo: "RENAULT", img: "https://cdn.simpleicons.org/renault/white" },
  { name: "Skoda", logo: "ŠKODA", img: "https://cdn.simpleicons.org/skoda/white" },
  { name: "Hyundai", logo: "HYUNDAI", img: "https://cdn.simpleicons.org/hyundai/white" },
  { name: "Suzuki", logo: "SUZUKI", img: "https://cdn.simpleicons.org/suzuki/white" },
  { name: "Peugeot", logo: "PEUGEOT", img: "https://cdn.simpleicons.org/peugeot/white" },
  { name: "Kia", logo: "KIA", img: "https://cdn.simpleicons.org/kia/white" },
];

export const testimonials = [
  {
    id: 1,
    name: "Mohamed Ben Salah",
    role: "Client, Tunis",
    text: "Service très professionnel, voiture propre et livraison rapide à l'aéroport. Je recommande vivement MK Rent Car.",
    rating: 5,
  },
  {
    id: 2,
    name: "Amira Trabelsi",
    role: "Cliente, Sousse",
    text: "Réservation facile et sans complications. L'équipe est à l'écoute et la voiture était en parfait état.",
    rating: 5,
  },
  {
    id: 3,
    name: "Youssef Khelifi",
    role: "Client, Sfax",
    text: "Rapport qualité-prix imbattable en Tunisie. J'ai loué plusieurs fois, toujours la même satisfaction.",
    rating: 5,
  },
];

export const categories = ["Tout", "Citadine", "Compacte", "Berline", "SUV"];
