import type { Metadata } from "next";
import { getPeaks } from "@/lib/db/peaks";

export const metadata: Metadata = {
  title: "Seven Summits — Highest Peak per Continent",
};

export default async function PeaksPage() {
  const peaks = await getPeaks();

  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-50 py-16 px-4">
      <div className="w-full max-w-3xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Seven Summits</h1>
        <p className="text-gray-500 mb-8">Highest peak on each continent</p>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wide">
              <tr>
                <th className="px-6 py-3 text-left">Peak</th>
                <th className="px-6 py-3 text-left">Continent</th>
                <th className="px-6 py-3 text-left">Country</th>
                <th className="px-6 py-3 text-right">Elevation (m)</th>
                <th className="px-6 py-3 text-right">First Ascent</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {peaks.map((peak) => (
                <tr key={peak.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{peak.name}</td>
                  <td className="px-6 py-4 text-gray-600">{peak.continent}</td>
                  <td className="px-6 py-4 text-gray-600">{peak.country}</td>
                  <td className="px-6 py-4 text-right text-gray-900">{peak.elevation_m.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right text-gray-600">{peak.first_ascent_year ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
