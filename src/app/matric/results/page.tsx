import { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { getProvincesWithBoards } from "@/lib/matric/boards";

export const metadata: Metadata = {
  title: "Matric Results 2025 - All Boards | PakEdu",
  description:
    "Check Matric results 2025 for all Pakistani boards. BISE Lahore, BISE Rawalpindi, FBISE and all other board results. Check by roll number.",
  alternates: { canonical: "https://pakedu.pk/matric/results" },
  openGraph: {
    title: "Matric Results 2025 - All Boards | PakEdu",
    description: "Check Matric results 2025 for all Pakistani boards.",
    url: "https://pakedu.pk/matric/results",
    siteName: "PakEdu",
    locale: "en_PK",
    type: "website",
  },
};

export default function ResultsPage() {
  const provinces = getProvincesWithBoards();

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <Breadcrumbs
            items={[
              { label: "Matric", href: "/matric" },
              { label: "Results" },
            ]}
          />
          <h1 className="text-3xl md:text-4xl font-bold mt-4">
            Matric Results 2025
          </h1>
          <p className="text-emerald-100 mt-2 max-w-2xl text-lg">
            Check your Matriculation results for all education boards in Pakistan.
            Enter your roll number to see your result.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-10">
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            How to Check Result
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-sm text-slate-600">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <div>
                <p className="font-semibold text-slate-900">Select Board</p>
                <p>Choose your education board from the list below.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <div>
                <p className="font-semibold text-slate-900">Enter Roll Number</p>
                <p>Enter your roll number as mentioned on your roll number slip.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <div>
                <p className="font-semibold text-slate-900">View Result</p>
                <p>See your marks, grade, position, and detailed subject-wise result.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-6 mb-10">
          <h2 className="text-lg font-bold text-emerald-900 mb-2">
            Result Date Announcement
          </h2>
          <p className="text-emerald-700 text-sm">
            Matric results are typically announced between <strong>July and September</strong> each year.
            Individual boards announce their specific result dates on their official websites.
            Check your board page below for the latest updates.
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
                  href={`/matric/results/${board.slug}`}
                  className="bg-white border border-slate-200 rounded-xl p-5 hover:border-emerald-300 hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-slate-900">{board.short_name}</h3>
                      <p className="text-sm text-slate-500 mt-1">{board.name}</p>
                    </div>
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-medium">
                      Check Result
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
              <p className="font-semibold text-slate-900">When are Matric results announced?</p>
              <p>Matric results are typically announced between July and September. Each board announces its own specific date.</p>
            </div>
            <div>
              <p className="font-semibold text-slate-900">How can I check my result?</p>
              <p>You can check your result by entering your roll number on your board&apos;s result page. You can also check via SMS by sending your roll number to the board&apos;s designated code.</p>
            </div>
            <div>
              <p className="font-semibold text-slate-900">What if I forget my roll number?</p>
              <p>Contact your school/institution. They can provide your roll number. You can also check using your name and father&apos;s name on some board websites.</p>
            </div>
            <div>
              <p className="font-semibold text-slate-900">Can I apply for rechecking?</p>
              <p>Yes, most boards allow you to apply for paper rechecking within 15-30 days of result announcement. There is a nominal fee for this service.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
