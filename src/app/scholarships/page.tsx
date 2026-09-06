import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ExternalLink, Calendar, DollarSign, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Scholarships 2026 - Complete Directory",
  description: "Find scholarships for students. Merit-based, need-based, HEC scholarships, university scholarships, and international scholarship opportunities.",
};

const SCHOLARSHIPS = [
  { name: "HEC Need-Based Scholarship", type: "Need-Based", amount: "Full Tuition + Stipend", deadline: "Varies by University", eligibility: "FSc / Matric marks + financial need", province: "All Pakistan", link: "https://hec.gov.pk" },
  { name: "HEC Merit Scholarship", type: "Merit-Based", amount: "PKR 30,000/month", deadline: "Varies", eligibility: "CGPA 3.5+ in university", province: "All Pakistan", link: "https://hec.gov.pk" },
  { name: "Punjab Educational Endowment Fund (PEEF)", type: "Merit + Need", amount: "Full Tuition", deadline: "November 2026", eligibility: "Matric/FSc 60%+ marks, Punjab domicile", province: "Punjab", link: "https://peef.edu.pk" },
  { name: "Ehsaas Undergraduate Scholarship", type: "Need-Based", amount: "PKR 40,000/year", deadline: "Varies", eligibility: "Family income < PKR 45,000/month", province: "All Pakistan", link: "https://hecpakistan.gov.pk" },
  { name: "NUST Merit Scholarship", type: "Merit-Based", amount: "100% Tuition Waiver", deadline: "With Admission", eligibility: "Top NUST merit positions", province: "All Pakistan", link: "https://nust.edu.pk" },
  { name: "LUMS Financial Aid", type: "Need-Based", amount: "Full Tuition + Living", deadline: "With Application", eligibility: "Demonstrated financial need", province: "All Pakistan", link: "https://lums.edu.pk" },
  { name: "COMSATS Merit Scholarship", type: "Merit-Based", amount: "Up to 100% Tuition", deadline: "With Admission", eligibility: "Top aggregate in entry test", province: "All Pakistan", link: "https://comsats.edu.pk" },
  { name: "FAST Merit Scholarship", type: "Merit-Based", amount: "Partial Tuition", deadline: "With Admission", eligibility: "Outstanding NCAT performance", province: "All Pakistan", link: "https://nu.edu.pk" },
  { name: "Punjab Governments Laptop Scheme", type: "Merit-Based", amount: "Laptop + Stipend", deadline: "Announced yearly", eligibility: "Top position holders", province: "Punjab", link: "#" },
  { name: "Sindh Government Scholarship", type: "Need-Based", amount: "Full Tuition", deadline: "Varies", eligibility: "Sindh domicile, financial need", province: "Sindh", link: "#" },
];

const TYPES = ["All", "Merit-Based", "Need-Based", "Merit + Need", "International"];

export default function ScholarshipsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <Breadcrumbs items={[{ label: "Scholarships" }]} />
          <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-3">Scholarships 2026</h1>
          <p className="text-lg text-white/80 max-w-3xl">
            Complete directory of scholarships for students. Find merit-based, need-based, HEC, university, and government scholarships.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
          {TYPES.map((t) => (
            <button key={t} className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap border border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:text-emerald-700 hover:bg-emerald-50 transition-all">
              {t}
            </button>
          ))}
        </div>

        {/* Scholarship Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {SCHOLARSHIPS.map((s, i) => (
            <Card key={i} className="hover:border-emerald-200 hover:shadow-md transition-all">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <Badge variant={s.type.includes("Merit") ? "info" : s.type.includes("Need") ? "warning" : "default"}>
                    {s.type}
                  </Badge>
                  <Badge variant="success">{s.province}</Badge>
                </div>
                <h3 className="text-base font-semibold text-slate-900 mb-2">{s.name}</h3>
                <div className="space-y-1.5 text-xs text-slate-500">
                  <div className="flex items-center gap-2"><DollarSign className="h-3 w-3" />{s.amount}</div>
                  <div className="flex items-center gap-2"><Calendar className="h-3 w-3" />Deadline: {s.deadline}</div>
                  <div className="flex items-center gap-2"><CheckCircle className="h-3 w-3" />{s.eligibility}</div>
                </div>
                {s.link !== "#" && (
                  <a href={s.link} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-emerald-600 hover:text-emerald-700">
                    Official Website <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tips */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-3">Tips for Scholarship Applications</h2>
            <div className="grid sm:grid-cols-2 gap-4 text-sm text-slate-600">
              <div className="space-y-2">
                <p>• Start researching scholarships at least 6 months before deadline</p>
                <p>• Apply to multiple scholarships simultaneously</p>
                <p>• Keep all original documents ready</p>
                <p>• Write a strong personal statement</p>
              </div>
              <div className="space-y-2">
                <p>• Maintain strong academic record</p>
                <p>• Get recommendation letters early</p>
                <p>• Follow up on application status</p>
                <p>• Apply for HEC attestation of degrees</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
