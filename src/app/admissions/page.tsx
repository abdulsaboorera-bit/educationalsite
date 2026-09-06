import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { CheckCircle, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "University Admissions 2026 - Complete Guide",
  description: "Complete guide to university admissions 2026. Entry tests (MDCAT, ECAT, NET, NAT), admission deadlines, merit formulas, required documents, and application steps.",
};

const ENTRY_TESTS = [
  { name: "MDCAT", full: "Medical & Dental College Admission Test", for: "MBBS / BDS", conducted_by: "PMDC", date: "August 16, 2026", marks: "180 MCQs", link: "https://pmdc.pk" },
  { name: "ECAT", full: "Engineering College Admission Test", for: "BS Engineering", conducted_by: "UET Lahore", date: "July-August 2026", marks: "400 MCQs", link: "https://uet.edu.pk" },
  { name: "NET", full: "NUST Evaluation Test", for: "All NUST Programs", conducted_by: "NUST", date: "Multiple Series (Jun-Sep)", marks: "200 MCQs", link: "https://nust.edu.pk" },
  { name: "NCAT", full: "FAST Admission Test", for: "CS / IT / Engineering", conducted_by: "FAST-NUCES", date: "July-August 2026", marks: "100 MCQs", link: "https://nu.edu.pk" },
  { name: "NAT", full: "NTS Admission Test", for: "Multiple Universities", conducted_by: "NTS", date: "Monthly", marks: "100 MCQs", link: "https://nts.org.pk" },
  { name: "NUMS", full: "NUMS Entry Test", for: "NUMS Medical Colleges", conducted_by: "NUMS", date: "September 2026", marks: "180 MCQs", link: "https://numspak.edu.pk" },
];

const ADMISSION_STEPS = [
  { step: 1, title: "Research Universities", description: "Explore universities, programs, fees, and merit requirements. Use our comparison tool to shortlist.", icon: "🔍" },
  { step: 2, title: "Check Eligibility", description: "Verify you meet minimum marks, subject requirements, and age limits for your target programs.", icon: "✅" },
  { step: 3, title: "Register for Entry Test", description: "Register for the required entry test (MDCAT, ECAT, NET, NCAT) before the deadline.", icon: "📝" },
  { step: 4, title: "Prepare Documents", description: "Gather academic transcripts, CNIC, domicile, photographs, and equivalence certificates.", icon: "📄" },
  { step: 5, title: "Apply Online", description: "Submit applications through university portals. Apply to multiple universities to maximize chances.", icon: "💻" },
  { step: 6, title: "Calculate Merit", description: "Use our calculators to predict your aggregate and estimate admission chances.", icon: "🧮" },
  { step: 7, title: "Track Merit Lists", description: "Monitor merit list announcements. Check our merit database for closing merits.", icon: "📊" },
  { step: 8, title: "Confirm Admission", description: "Pay fee, submit original documents, and confirm your seat before the deadline.", icon: "🎓" },
];

const DOCUMENTS = [
  "Matric Certificate & Marks Sheet",
  "FSc / Intermediate Certificate & Marks Sheet",
  "CNIC / B-Form",
  "Domicile Certificate",
  "Passport-size Photographs (6-8)",
  "Entry Test Result Card",
  "IBCC Equivalence (for O/A Level students)",
  "Character Certificate",
  "Migration Certificate (if applicable)",
  "Sports / Extracurricular Certificates (for quota)",
];

const TOP_UNIVERSITIES = [
  { name: "NUST", test: "NET", deadline: "August 2026", programs: "Engineering, CS, Business" },
  { name: "COMSATS", test: "NAT", deadline: "August 2026", programs: "CS, Engineering, Business" },
  { name: "FAST-NUCES", test: "NCAT", deadline: "July 2026", programs: "CS, AI, Engineering" },
  { name: "UET Lahore", test: "ECAT", deadline: "August 2026", programs: "All Engineering" },
  { name: "LUMS", test: "SAT / LUMS Test", deadline: "January 2026", programs: "Business, CS, Engineering" },
  { name: "IBA Karachi", test: "IBA Aptitude / SAT", deadline: "July 2026", programs: "Business, CS, Economics" },
];

export default function AdmissionsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <Breadcrumbs items={[{ label: "Admissions" }]} />
          <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-3">University Admissions 2026</h1>
          <p className="text-lg text-white/80 max-w-3xl">
            Complete guide to university admissions. Learn about entry tests, admission deadlines, merit formulas, required documents, and step-by-step application process for all major universities.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <Link href="/calculators/mdcat-aggregate" className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-emerald-700 hover:bg-white/90">
              MDCAT Calculator
            </Link>
            <Link href="/calculators" className="inline-flex items-center gap-2 rounded-lg bg-white/15 px-4 py-2 text-sm font-medium text-white border border-white/20 hover:bg-white/25">
              All Calculators
            </Link>
            <Link href="/universities" className="inline-flex items-center gap-2 rounded-lg bg-white/15 px-4 py-2 text-sm font-medium text-white border border-white/20 hover:bg-white/25">
              University Directory
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Step by Step */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Step-by-Step Admission Process</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {ADMISSION_STEPS.map((step) => (
              <div key={step.step} className="p-5 rounded-xl border border-slate-200 bg-white hover:border-emerald-200 hover:shadow-md transition-all">
                <div className="text-3xl mb-3">{step.icon}</div>
                <div className="text-xs font-semibold text-emerald-600 mb-1">Step {step.step}</div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">{step.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Entry Tests */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Major Entry Tests</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ENTRY_TESTS.map((test) => (
              <Card key={test.name}>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <Badge variant="info">{test.name}</Badge>
                    <span className="text-xs text-slate-400">{test.marks}</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mb-1">{test.full}</h3>
                  <p className="text-xs text-slate-500 mb-3">For: {test.for}</p>
                  <div className="space-y-1 text-xs text-slate-500">
                    <div className="flex justify-between"><span>Conducted by:</span><span className="font-medium">{test.conducted_by}</span></div>
                    <div className="flex justify-between"><span>Date:</span><span className="font-medium">{test.date}</span></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Top Universities Admission */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Top Universities — Admission Overview</h2>
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="text-left p-4 text-xs font-semibold text-slate-500 uppercase">University</th>
                    <th className="text-left p-4 text-xs font-semibold text-slate-500 uppercase">Required Test</th>
                    <th className="text-left p-4 text-xs font-semibold text-slate-500 uppercase">Deadline</th>
                    <th className="text-left p-4 text-xs font-semibold text-slate-500 uppercase">Programs</th>
                    <th className="text-left p-4 text-xs font-semibold text-slate-500 uppercase">Calculator</th>
                  </tr>
                </thead>
                <tbody>
                  {TOP_UNIVERSITIES.map((uni) => (
                    <tr key={uni.name} className="border-b border-slate-100 last:border-0">
                      <td className="p-4 text-sm font-medium text-slate-900">{uni.name}</td>
                      <td className="p-4"><Badge variant="outline">{uni.test}</Badge></td>
                      <td className="p-4 text-sm text-slate-600">{uni.deadline}</td>
                      <td className="p-4 text-xs text-slate-500">{uni.programs}</td>
                      <td className="p-4">
                        <Link href="/calculators/merit" className="text-xs text-emerald-600 hover:text-emerald-700 font-medium">
                          Merit Calculator →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </section>

        {/* Documents */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Required Documents</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {DOCUMENTS.map((doc, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-white border border-slate-200">
                <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                <span className="text-sm text-slate-700">{doc}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Important Tips */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Important Tips for Admission</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-emerald-50 border border-emerald-200">
              <h3 className="text-base font-semibold text-emerald-800 mb-2 flex items-center gap-2"><CheckCircle className="h-5 w-5" /> Do&apos;s</h3>
              <ul className="space-y-2 text-sm text-emerald-700">
                <li>• Apply to at least 5-6 universities</li>
                <li>• Start preparation for entry tests early</li>
                <li>• Keep checking merit lists regularly</li>
                <li>• Apply for scholarships separately</li>
                <li>• Calculate your aggregate before applying</li>
              </ul>
            </div>
            <div className="p-5 rounded-xl bg-red-50 border border-red-200">
              <h3 className="text-base font-semibold text-red-800 mb-2 flex items-center gap-2"><AlertTriangle className="h-5 w-5" /> Don&apos;ts</h3>
              <ul className="space-y-2 text-sm text-red-700">
                <li>• Don&apos;t wait for the last date to apply</li>
                <li>• Don&apos;t rely on a single university</li>
                <li>• Don&apos;t ignore eligibility criteria</li>
                <li>• Don&apos;t submit incomplete documents</li>
                <li>• Don&apos;t miss fee submission deadlines</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
