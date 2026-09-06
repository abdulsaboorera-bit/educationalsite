import { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { getProvincesWithBoards } from "@/lib/matric/boards";

export const metadata: Metadata = {
  title: "Matric Date Sheets 2025 - All Boards | PakEdu",
  description:
    "Check Matric date sheets 2025 for all Pakistani boards. Download exam date sheets for Class 9 and Class 10. BISE Lahore, Rawalpindi, FBISE and all boards.",
  alternates: { canonical: "https://pakedu.pk/matric/date-sheets" },
  openGraph: {
    title: "Matric Date Sheets 2025 - All Boards | PakEdu",
    description: "Check Matric date sheets 2025 for all Pakistani boards.",
    url: "https://pakedu.pk/matric/date-sheets",
    siteName: "PakEdu",
    locale: "en_PK",
    type: "website",
  },
};

export default function DateSheetsPage() {
  const provinces = getProvincesWithBoards();

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-violet-600 via-violet-700 to-purple-800 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <Breadcrumbs
            items={[
              { label: "Matric", href: "/matric" },
              { label: "Date Sheets" },
            ]}
          />
          <h1 className="text-3xl md:text-4xl font-bold mt-4">
            Matric Date Sheets 2025
          </h1>
          <p className="text-violet-100 mt-2 max-w-2xl text-lg">
            Check and download date sheets for all Matric examinations.
            Stay updated with exam schedules across all boards.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-10">
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            Exam Schedule Information
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-sm text-slate-600">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <div>
                <p className="font-semibold text-slate-900">Date Sheet Released</p>
                <p>Boards release date sheets 2-4 weeks before exams.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <div>
                <p className="font-semibold text-slate-900">Check Your Schedule</p>
                <p>Find your subjects, dates, and exam timings.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <div>
                <p className="font-semibold text-slate-900">Download PDF</p>
                <p>Download the official date sheet for your reference.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-200 rounded-2xl p-6 mb-10">
          <h2 className="text-lg font-bold text-violet-900 mb-2">
            When are Matric Exams?
          </h2>
          <p className="text-violet-700 text-sm">
            Matric examinations in Pakistan are typically held between <strong>March and May</strong>.
            Date sheets are usually announced 2-4 weeks before the examination start date.
            Each board announces its own schedule independently.
          </p>
        </div>

        {provinces.map((province) => (
          <div key={province.slug} className="mb-10">
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              {province.name} Boards
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {province.boards.map((board) => (
                <Link
                  key={board.slug}
                  href={`/matric/date-sheets/${board.slug}`}
                  className="bg-white border border-slate-200 rounded-xl p-5 hover:border-violet-300 hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-slate-900">{board.short_name}</h3>
                      <p className="text-sm text-slate-500 mt-1">{board.name}</p>
                    </div>
                    <span className="px-3 py-1 bg-violet-50 text-violet-700 rounded-lg text-xs font-medium">
                      View Schedule
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}

        <div className="bg-white rounded-2xl border border-slate-200 p-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4 text-sm text-slate-600">
            <div>
              <p className="font-semibold text-slate-900">When are Matric date sheets released?</p>
              <p>Date sheets are typically released 2-4 weeks before the examination start date, usually in February or March.</p>
            </div>
            <div>
              <p className="font-semibold text-slate-900">How can I download my date sheet?</p>
              <p>Visit your board&apos;s page on PakEdu or the official board website. You can download the date sheet as a PDF file.</p>
            </div>
            <div>
              <p className="font-semibold text-slate-900">Can the date sheet change?</p>
              <p>Yes, boards may revise date sheets due to unexpected circumstances. Always check for the latest version before exams.</p>
            </div>
            <div>
              <p className="font-semibold text-slate-900">What if two exams clash?</p>
              <p>Contact your board immediately if you have a date clash. Boards usually provide a separate schedule for clashing subjects.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
