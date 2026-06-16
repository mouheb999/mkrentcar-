"use client";

import { supabase, isSupabaseConfigured } from "./supabase";
import type { CarRow } from "./database.types";
import { cars as staticCars, type Car } from "./data";

/**
 * Convert a static `Car` (from data.ts) into a `CarRow` shape so the public
 * site can render the fleet even when Supabase isn't configured yet.
 */
function staticToRow(car: Car): CarRow {
  return {
    id: car.id,
    name: car.name,
    brand: car.brand,
    image: car.image,
    price: car.price,
    available: true,
    fuel: car.fuel,
    transmission: car.transmission,
    seats: car.seats,
    horsepower: car.horsepower,
    year: car.year,
    category: car.category,
    tier: car.tier,
    services: car.services,
    description: car.description,
    gallery: car.gallery,
    created_at: new Date().toISOString(),
  };
}

const STATIC_ROWS: CarRow[] = staticCars.map(staticToRow);

export async function fetchCars(): Promise<CarRow[]> {
  if (!isSupabaseConfigured) return STATIC_ROWS;
  const { data, error } = await supabase
    .from("cars")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  // If the DB is reachable but empty, fall back to the bundled fleet.
  return data && data.length > 0 ? data : STATIC_ROWS;
}

export async function fetchCarById(id: string): Promise<CarRow | null> {
  if (!isSupabaseConfigured) {
    return STATIC_ROWS.find((c) => c.id === id) ?? null;
  }
  const { data, error } = await supabase
    .from("cars")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  if (data) return data;
  // Fall back to a bundled car if the id matches the static fleet.
  return STATIC_ROWS.find((c) => c.id === id) ?? null;
}

export async function insertCar(
  car: Omit<CarRow, "id" | "created_at">
): Promise<CarRow> {
  const { data, error } = await supabase
    .from("cars")
    .insert(car)
    .select("*")
    .single();
  if (error) throw error;
  return data;
}

export async function updateCar(
  id: string,
  patch: Partial<CarRow>
): Promise<CarRow> {
  const { data, error } = await supabase
    .from("cars")
    .update(patch)
    .eq("id", id)
    .select("*")
    .single();
  if (error) throw error;
  return data;
}

export async function deleteCar(id: string): Promise<void> {
  const { error } = await supabase.from("cars").delete().eq("id", id);
  if (error) throw error;
}
