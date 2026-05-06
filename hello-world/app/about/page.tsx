import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Hello World",
  description: "About this sandbox project",
};

export default function About() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">About</h1>
        <p className="text-lg text-gray-500">
          A Claude Code sandbox exploring Next.js · Vercel · Supabase
        </p>
      </div>
    </main>
  );
}
