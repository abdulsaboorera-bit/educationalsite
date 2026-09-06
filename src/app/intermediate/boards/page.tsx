import { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { intermediateBoards } from "@/lib/intermediate/boards";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: "All Intermediate Boards in Pakistan - BISE | PakEdu",
  description: "Complete list of all intermediate (HSSC) education boards in Pakistan. Punjab, KPK, Sindh, Balochistan, and Federal boards with details.",
  keywords: ["intermediate boards", "BISE", "HSSC boards", "education boards pakistan", "board list"],
  alternates: { canonical: `${SITE_CONFIG.url}/intermediate/boards` },
  openGraph: {
    title: "All Intermediate Boards in Pakistan | PakEdu",
    description: "Complete directory of all intermediate education boards in Pakistan.",
    url: `${SITE_CONFIG.url}/intermediate/boards`,
    siteName: "PakEdu",
    locale: "en_PK",
    type: "website",
  },
};

export default function BoardsPage() {
  const provinces = Array.from(new Set(intermediateBoards.map((b) => b.province)));

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Intermediate", href: "/intermediate" }, { label: "Boards" }]} />
          <h1 className="text-3xl font-bold text-slate-900 mt-4 mb-2">
            Intermediate Boards in Pakistan
          </h1>
          <p className="text-slate-500 max-w-2xl">
            Find your intermediate education board. Each board conducts HSSC examinations, announces results, and issues date sheets for its jurisdiction.
          </p>
          <p className="mt-2 text-sm text-slate-400">{intermediateBoards.length} boards across Pakistan</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {provinces.map((province) => {
          const boards = intermediateBoards.filter((b) => b.province === province);
          return (
            <section key={province}>
              <h2 className="text-xl font-bold text-slate-900 mb-4">{province}</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {boards.map((board) => (
                  <Link
                    key={board.slug}
                    href={`/intermediate/boards/${board.slug}`}
                    className="bg-white rounded-xl border border-slate-200 p-5 hover:border-indigo-300 hover:shadow-md transition-all"
                  >
                    <h3 className="text-base font-semibold text-slate-900 mb-1">{board.shortName}</h3>
                    <p className="text-sm text-slate-500 mb-3">{board.province}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400 capitalize">{board.examSystem} system</span>
                      <span className="text-xs text-indigo-600 font-medium">{board.groups.length} groups</span>
                    </div>
                    {board.officialResources.length > 0 && (
                      <a
                        href={board.officialResources[0].url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-3 text-xs text-slate-500 hover:text-indigo-600"
                      >
                        Official Website →
                      </a>
                    )}
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
