import { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { intermediateBoards } from "@/lib/intermediate/boards";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: "Intermediate Date Sheets - Exam Schedules | PakEdu",
  description: "View intermediate date sheets for all boards in Pakistan. 11th and 12th class exam schedules and timetables.",
  keywords: ["intermediate date sheet", "11th date sheet", "12th date sheet", "HSSC date sheet", "exam schedule"],
  alternates: { canonical: `${SITE_CONFIG.url}/intermediate/date-sheets` },
  openGraph: {
    title: "Intermediate Date Sheets | PakEdu",
    description: "View intermediate date sheets for all boards in Pakistan.",
    url: `${SITE_CONFIG.url}/intermediate/date-sheets`,
    siteName: "PakEdu",
    locale: "en_PK",
    type: "website",
  },
};

export default function DateSheetsPage() {
  const provinces = Array.from(new Set(intermediateBoards.map((b) => b.province)));

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Intermediate", href: "/intermediate" }, { label: "Date Sheets" }]} />
          <h1 className="text-3xl font-bold text-slate-900 mt-4 mb-2">Intermediate Date Sheets</h1>
          <p className="text-slate-500 max-w-2xl">
            View exam date sheets and timetables for all intermediate boards. Stay updated with the latest examination schedules.
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
                  const dateSheetLink = board.officialResources.find(
                    (r) => r.label === "Date Sheets"
                  );
                  return (
                    <div key={board.slug} className="bg-white rounded-xl border border-slate-200 p-5">
                      <h3 className="font-semibold text-slate-900 mb-1">{board.shortName}</h3>
                      <p className="text-sm text-slate-500 mb-3">{board.province}</p>
                      <div className="flex flex-col gap-2">
                        {dateSheetLink ? (
                          <a
                            href={dateSheetLink.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg text-center hover:bg-indigo-700 transition-colors"
                          >
                            View Date Sheet
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
