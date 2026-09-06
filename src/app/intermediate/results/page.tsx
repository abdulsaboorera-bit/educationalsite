import { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { intermediateBoards } from "@/lib/intermediate/boards";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: "Intermediate Results - Check 11th & 12th Class Results | PakEdu",
  description: "Check intermediate results for all boards in Pakistan. 11th class and 12th class HSSC results for Punjab, KPK, Sindh, Balochistan, and Federal boards.",
  keywords: ["intermediate result", "11th result", "12th result", "HSSC result", "board result"],
  alternates: { canonical: `${SITE_CONFIG.url}/intermediate/results` },
  openGraph: {
    title: "Intermediate Results | PakEdu",
    description: "Check intermediate results for all boards in Pakistan.",
    url: `${SITE_CONFIG.url}/intermediate/results`,
    siteName: "PakEdu",
    locale: "en_PK",
    type: "website",
  },
};

export default function ResultsPage() {
  const provinces = Array.from(new Set(intermediateBoards.map((b) => b.province)));

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Intermediate", href: "/intermediate" }, { label: "Results" }]} />
          <h1 className="text-3xl font-bold text-slate-900 mt-4 mb-2">Intermediate Results</h1>
          <p className="text-slate-500 max-w-2xl">
            Check your 11th and 12th class results for all educational boards in Pakistan. Select your board to view results.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {provinces.map((province) => {
          const boards = intermediateBoards.filter((b) => b.province === province);
          return (
            <section key={province}>
              <h2 className="text-xl font-bold text-slate-900 mb-4">{province}</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {boards.map((board) => {
                  const resultLink = board.officialResources.find((r) => r.label === "Results");
                  return (
                    <div key={board.slug} className="bg-white rounded-xl border border-slate-200 p-5">
                      <h3 className="font-semibold text-slate-900 mb-1">{board.shortName}</h3>
                      <p className="text-sm text-slate-500 mb-3">{board.province}</p>
                      <div className="flex flex-col gap-2">
                        {resultLink ? (
                          <a
                            href={resultLink.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg text-center hover:bg-indigo-700 transition-colors"
                          >
                            Check Result
                          </a>
                        ) : (
                          <a
                            href={board.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-slate-100 text-slate-700 text-sm font-medium rounded-lg text-center hover:bg-slate-200 transition-colors"
                          >
                            Visit Board Website
                          </a>
                        )}
                        <Link
                          href={`/intermediate/boards/${board.slug}`}
                          className="px-4 py-2 bg-slate-50 text-slate-600 text-sm font-medium rounded-lg text-center hover:bg-slate-100 transition-colors"
                        >
                          Board Details
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
