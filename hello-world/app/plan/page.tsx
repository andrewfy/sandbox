"use client";

import { useState } from "react";

export default function PlanPage() {
  const [prompt, setPrompt] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult("");
    setError("");

    try {
      const response = await fetch("/api/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, startDate, endDate }),
      });

      if (!response.ok) {
        throw new Error("Failed to get travel plan");
      }

      const reader = response.body!.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        setResult((prev) => prev + decoder.decode(value, { stream: true }));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Trip Planner
        </h1>
        <p className="text-gray-500 mb-8">
          Tell us about your dream trip and we&apos;ll build a plan for you.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              What are you looking for?
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              required
              rows={5}
              placeholder="Tell me about your ideal trip — where you want to go, what you enjoy, your budget, travel style, must-see experiences..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2.5 rounded-lg transition-colors"
          >
            {loading ? "Planning your trip..." : "Plan my trip"}
          </button>
        </form>

        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {loading && !result && (
          <div className="mt-8 text-center text-gray-500">
            <div className="inline-block w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mb-3" />
            <p>Thinking about your perfect trip&hellip;</p>
          </div>
        )}

        {result && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Your travel plan
            </h2>
            <div className="bg-white border border-gray-200 rounded-lg p-6 whitespace-pre-wrap text-gray-800 leading-relaxed">
              {result}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
