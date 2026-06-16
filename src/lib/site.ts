// Central brand + contact configuration for Saoudy Rent Car.
// Edit values here and they propagate across the whole site.

export const site = {
  name: "Saoudy Rent Car",
  shortName: "Saoudy",
  tagline: "Luxury Car Rental & VIP Transfers",
  taglineFr: "Location de luxe & transferts VIP",
  description:
    "Premium car rental, chauffeur service, airport transfers, and executive transportation across Tunisia.",
  country: "Tunisie",
  phones: ["+216 54 900 900", "+216 25 900 034"],
  // Primary number used for WhatsApp deep links (digits only, intl format).
  whatsapp: "21654900900",
} as const;

export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${site.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function telLink(index = 0): string {
  return `tel:${site.phones[index].replace(/\s+/g, "")}`;
}
