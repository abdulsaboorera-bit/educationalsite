import { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { intermediateBoards } from "@/lib/intermediate/boards";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: "Intermediate Past Papers - Board-wise Past Papers | PakEdu",
  description: "Access past papers for all intermediate boards in Pakistan. 11th and 12th class past papers for FSc, ICS, FA, and I.Com subjects.",
  keywords: ["intermediate past papers", "11th past papers", "12th past papers", "HSSC past papers", "board past papers"],
  alternates: { canonical: `${SITE_CONFIG.url}/intermediate/past-papers` },
  openGraph: {
    title: "Intermediate Past Papers | PakEdu",
    description: "Access past papers for all intermediate boards in Pakistan.",
    url: `${SITE_CONFIG.url}/intermediate/past-papers`,
    siteName: "PakEdu",
    locale: "en_PK",
    type: "website",
  },
};

export default function PastPapersPage() {
  const provinces = Array.from(new Set(intermediateBoards.map((b) => b.province)));

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Intermediate", href: "/intermediate" }, { label: "Past Papers" }]} />
          <h1 className="text-3xl font-bold text-slate-900 mt-4 mb-2">Intermediate Past Papers</h1>
          <p className="text-slate-500 max-w-2xl">
            Access past papers for all intermediate boards. Browse by board to find 11th and 12th class past papers for your subjects.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Classes */}
        <section className="grid sm:grid-cols-2 gap-4">
          <Link
            href="/intermediate/past-papers?class=11"
            className="bg-white rounded-xl border border-slate-200 p-6 hover:border-indigo-300 hover:shadow-md transition-all text-center"
          >
            <span className="text-3xl">📘</span>
            <h2 className="text-xl font-bold text-slate-900 mt-2">11th Class Papers</h2>
            <p className="text-sm text-slate-500 mt-1">Intermediate Part 1 past papers</p>
          </Link>
          <Link
            href="/intermediate/past-papers?class=12"
            className="bg-white rounded-xl border border-slate-200 p-6 hover:border-indigo-300 hover:shadow-md transition-all text-center"
          >
            <span className="text-3xl">📗</span>
            <h2 className="text-xl font-bold text-slate-900 mt-2">12th Class Papers</h2>
            <p className="text-sm text-slate-500 mt-1">Intermediate Part 2 past papers</p>
          </Link>
        </section>

        {/* Boards by Province */}
        {provinces.map((province) => {
          const boards = intermediateBoards.filter((b) => b.province === province);
          return (
            <section key={province}>
              <h2 className="text-xl font-bold text-slate-900 mb-4">{province}</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {boards.map((board) => (
                  <Link
                    key={board.slug}
                    href={`/intermediate/past-papers/${board.slug}`}
                    className="bg-white rounded-xl border border-slate-200 p-5 hover:border-indigo-300 hover:shadow-md transition-all"
                  >
                    <h3 className="font-semibold text-slate-900">{board.shortName}</h3>
                    <p className="text-sm text-slate-500 mt-1">{board.province}</p>
                    <p className="text-xs text-indigo-600 mt-2 font-medium">Browse past papers →</p>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
