import { createClient } from "@supabase/supabase-js";
import { type Vehicle, type VehicleStatus, featuredVehicles } from "./vehicles";

type VehicleRow = {
  id: string;
  name: string;
  brand: string;
  model: string;
  version: string | null;
  year: number;
  price: number | string;
  mileage: number;
  images: string[];
  status: VehicleStatus;
};

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

const supabase = url && key ? createClient(url, key, { auth: { persistSession: false } }) : null;

/** Anúncios da tabela elitecar_vehicles; cai nos dados de demonstração se o banco não responder. */
export async function getVehicles(): Promise<Vehicle[]> {
  if (!supabase) return featuredVehicles;

  const { data, error } = await supabase
    .from("elitecar_vehicles")
    .select("id, name, brand, model, version, year, price, mileage, images, status")
    .order("sort_order", { ascending: true })
    .returns<VehicleRow[]>();

  if (error || !data?.length) {
    if (error) console.error("Falha ao carregar elitecar_vehicles:", error.message);
    return featuredVehicles;
  }

  return data.map((row) => ({ ...row, version: row.version ?? "", price: Number(row.price) }));
}
