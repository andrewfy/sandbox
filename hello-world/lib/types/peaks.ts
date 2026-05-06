export type Peak = {
  id: number;
  name: string;
  continent: string;
  elevation_m: number;
  country: string;
  first_ascent_year: number | null;
  created_at: string;
};

export type InsertPeak = Omit<Peak, "id" | "created_at">;
