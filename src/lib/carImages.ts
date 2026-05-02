/**
 * Maps car names (lowercased) to local image paths in /public/carsMK/.
 * Used as the primary image source — overrides any external URLs from the DB.
 */
const CAR_IMAGE_MAP: Record<string, string> = {
  "seat ibiza": "/carsMK/seat ibiza.png",
  "renault clio 5": "/carsMK/renault clio.png",
  "renault clio": "/carsMK/renault clio.png",
  "suzuki swift": "/carsMK/suzuki swift.png",
  "hyundai i20": "/carsMK/hyundai i20.png",
  "skoda fabia": "/carsMK/skoda fabia.png",
  "volkswagen polo": "/carsMK/polo volkswagen.png",
  "polo volkswagen": "/carsMK/polo volkswagen.png",
};

/**
 * Resolves the best local image for a car.
 * Falls back to the original image URL if no local match found.
 */
export function resolveCarImage(
  carName: string,
  fallbackImage?: string | null
): string {
  const key = carName.toLowerCase().trim();

  // Exact match
  if (CAR_IMAGE_MAP[key]) return CAR_IMAGE_MAP[key];

  // Partial match — check if any key is contained in the car name
  for (const [mapKey, path] of Object.entries(CAR_IMAGE_MAP)) {
    if (key.includes(mapKey) || mapKey.includes(key)) return path;
  }

  // Fallback to DB image or placeholder
  return fallbackImage ?? "/carsMK/featured.png";
}
