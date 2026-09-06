import { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { scholarships } from "@/lib/intermediate/scholarships";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: "Intermediate Scholarships - Financial Aid for Students | PakEdu",
  description: "Find scholarships for intermediate students in Pakistan. PEEF, HEC, Ehsaas, and other merit-based and need-based scholarships.",
  keywords: ["intermediate scholarships", "PEEF scholarship", "HEC scholarship", "Ehsaas scholarship", "financial aid"],
  alternates: { canonical: `${SITE_CONFIG.url}/intermediate/scholarships` },
  openGraph: {
    title: "Intermediate Scholarships | PakEdu",
    description: "Find scholarships for intermediate students in Pakistan.",
    url: `${SITE_CONFIG.url}/intermediate/scholarships`,
    siteName: "PakEdu",
    locale: "en_PK",
    type: "website",
  },
};

const statusConfig: Record<string, { label: string; className: string }> = {
  open: { label: "Open", className: "bg-emerald-50 text-emerald-700" },
  closing_soon: { label: "Closing Soon", className: "bg-amber-50 text-amber-700" },
  closed: { label: "Closed", className: "bg-red-50 text-red-700" },
  upcoming: { label: "Upcoming", className: "bg-blue-50 text-blue-700" },
};

export default function ScholarshipsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Intermediate", href: "/intermediate" }, { label: "Scholarships" }]} />
          <h1 className="text-3xl font-bold text-slate-900 mt-4 mb-2">Intermediate Scholarships</h1>
          <p className="text-slate-500 max-w-2xl">
            Find merit-based and need-based scholarships for intermediate students in Pakistan. Apply for financial aid to support your education.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-6">
        {scholarships.map((scholarship) => {
          const status = statusConfig[scholarship.status] ?? { label: scholarship.status, className: "bg-slate-100 text-slate-600" };
          return (
            <div key={scholarship.slug} className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-xl font-bold text-slate-900">{scholarship.name}</h2>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${status.className}`}>
                      {status.label}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 mb-3">{scholarship.provider} &middot; {scholarship.academicYear}</p>

                  <div className="grid sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-slate-700 mb-1">Eligibility</p>
                      <p className="text-slate-600">{scholarship.eligibility}</p>
                    </div>
                    <div>
                      <p className="font-medium text-slate-700 mb-1">Marks Requirement</p>
                      <p className="text-slate-600">{scholarship.marksRequirement}</p>
                    </div>
                    <div>
                      <p className="font-medium text-slate-700 mb-1">Amount</p>
                      <p className="text-slate-600">{scholarship.amount}</p>
                    </div>
                    <div>
                      <p className="font-medium text-slate-700 mb-1">Deadline</p>
                      <p className="text-slate-600">{scholarship.deadline}</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-sm font-medium text-slate-700 mb-1">Required Documents</p>
                    <div className="flex flex-wrap gap-1">
                      {scholarship.documents.map((doc) => (
                        <span key={doc} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs">
                          {doc}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-3">
                    <p className="text-sm font-medium text-slate-700 mb-1">Application Method</p>
                    <p className="text-sm text-slate-600">{scholarship.applicationMethod}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 md:min-w-[160px]">
                  <a
                    href={scholarship.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg text-center hover:bg-indigo-700 transition-colors"
                  >
                    Apply Now
                  </a>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {scholarship.forGroups.map((group) => (
                      <span key={group} className="px-2 py-0.5 bg-slate-50 text-slate-500 rounded text-xs">
                        {group.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
