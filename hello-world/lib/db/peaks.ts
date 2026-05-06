import { supabase } from "@/lib/supabase";
import type { InsertPeak, Peak } from "@/lib/types/peaks";

export async function getPeaks(): Promise<Peak[]> {
  const { data, error } = await supabase
    .from("peaks")
    .select("*")
    .order("elevation_m", { ascending: false });
  if (error) throw error;
  return data;
}

export async function getPeakById(id: number): Promise<Peak> {
  const { data, error } = await supabase
    .from("peaks")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
}

export async function insertPeak(peak: InsertPeak): Promise<Peak> {
  const { data, error } = await supabase
    .from("peaks")
    .insert(peak)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updatePeak(id: number, peak: Partial<InsertPeak>): Promise<Peak> {
  const { data, error } = await supabase
    .from("peaks")
    .update(peak)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deletePeak(id: number): Promise<void> {
  const { error } = await supabase.from("peaks").delete().eq("id", id);
  if (error) throw error;
}
