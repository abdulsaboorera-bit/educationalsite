import { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { entryTests } from "@/lib/intermediate/entry-tests";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: "Intermediate Entry Tests - MDCAT, ECAT, NET | PakEdu",
  description: "Complete guide to intermediate entry tests in Pakistan. MDCAT, ECAT, NET, NTS NAT, FAST-NU entry test details, preparation tips, and syllabus.",
  keywords: ["entry tests", "MDCAT", "ECAT", "NET", "NTS NAT", "university admission test"],
  alternates: { canonical: `${SITE_CONFIG.url}/intermediate/entry-tests` },
  openGraph: {
    title: "Intermediate Entry Tests | PakEdu",
    description: "Complete guide to intermediate entry tests in Pakistan.",
    url: `${SITE_CONFIG.url}/intermediate/entry-tests`,
    siteName: "PakEdu",
    locale: "en_PK",
    type: "website",
  },
};

export default function EntryTestsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Intermediate", href: "/intermediate" }, { label: "Entry Tests" }]} />
          <h1 className="text-3xl font-bold text-slate-900 mt-4 mb-2">Intermediate Entry Tests</h1>
          <p className="text-slate-500 max-w-2xl">
            Prepare for university admission tests. Find detailed information about MDCAT, ECAT, NET, and other entry tests conducted across Pakistan.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="space-y-6">
          {entryTests.map((test) => (
            <Link
              key={test.slug}
              href={`/intermediate/entry-tests/${test.slug}`}
              className="block bg-white rounded-2xl border border-slate-200 p-6 md:p-8 hover:border-indigo-300 hover:shadow-md transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-slate-900">{test.name}</h2>
                  <p className="text-sm text-slate-500 mt-1">{test.fullName}</p>
                  <p className="text-sm text-slate-600 mt-2">{test.conductingBody}</p>
                  <p className="text-sm text-slate-600 mt-1">{test.eligibility}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {test.subjects.map((subject) => (
                      <span key={subject} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs">
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 md:min-w-[140px]">
                  <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-medium">
                    {test.totalMarks} marks
                  </span>
                  <span className="text-sm text-slate-500">{test.duration}</span>
                  <span className="text-sm text-slate-500">{test.frequency}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
