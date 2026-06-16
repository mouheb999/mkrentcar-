/**
 * Maps car names (lowercased) to local image paths in /public/cars/.
 * Used as the primary image source — overrides any external URLs from the DB.
 */
const CAR_IMAGE_MAP: Record<string, string> = {
  "bmw 5 series": "/cars/bmw-5-series-front.png",
  "bmw serie 5": "/cars/bmw-5-series-front.png",
  "bmw série 5": "/cars/bmw-5-series-front.png",
  "mercedes e-class": "/cars/mercedes-e-class-front.png",
  "mercedes classe e": "/cars/mercedes-e-class-front.png",
  "mercedes c-class 2017": "/cars/mercedes-c-class-front.png",
  "mercedes c-class": "/cars/mercedes-c-class-front.png",
  "mercedes classe c": "/cars/mercedes-c-class-front.png",
  "volkswagen golf 8": "/cars/vw-golf-8-front.png",
  "golf 8": "/cars/vw-golf-8-front.png",
  "volkswagen multivan t6": "/cars/vw-multivan-front.png",
  "multivan t6": "/cars/vw-multivan-front.png",
  "multivan": "/cars/vw-multivan-front.png",
  "fiat scudo": "/cars/fiat-scudo-front.png",
  "scudo": "/cars/fiat-scudo-front.png",
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
  return fallbackImage ?? "/cars/bmw-5-series-front.png";
}
