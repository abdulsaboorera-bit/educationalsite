import { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { intermediateGroups } from "@/lib/intermediate/groups";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: "Intermediate Calculators - Percentage, Aggregate & Grade | PakEdu",
  description: "Use intermediate calculators for percentage calculation, aggregate calculation, and grade estimation. Tools for 11th and 12th class students.",
  keywords: ["intermediate calculator", "percentage calculator", "aggregate calculator", "grade calculator", "11th calculator", "12th calculator"],
  alternates: { canonical: `${SITE_CONFIG.url}/intermediate/calculators` },
  openGraph: {
    title: "Intermediate Calculators | PakEdu",
    description: "Use intermediate calculators for percentage, aggregate, and grade calculation.",
    url: `${SITE_CONFIG.url}/intermediate/calculators`,
    siteName: "PakEdu",
    locale: "en_PK",
    type: "website",
  },
};

const GENERAL_CALCULATORS = [
  { name: "Percentage Calculator", description: "Calculate your percentage from obtained and total marks", href: "/calculators/percentage", icon: "📊" },
  { name: "Grade Calculator", description: "Determine your grade based on marks and grading system", href: "/calculators/grade", icon: "🅰️" },
  { name: "MDCAT Aggregate Calculator", description: "Calculate your MDCAT aggregate for medical admissions", href: "/calculators/mdcat-aggregate", icon: "🧬" },
  { name: "ECAT Aggregate Calculator", description: "Calculate your ECAT aggregate for engineering admissions", href: "/calculators/ecat-aggregate", icon: "⚙️" },
];

export default function CalculatorsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Intermediate", href: "/intermediate" }, { label: "Calculators" }]} />
          <h1 className="text-3xl font-bold text-slate-900 mt-4 mb-2">Intermediate Calculators</h1>
          <p className="text-slate-500 max-w-2xl">
            Useful calculators for intermediate students. Calculate percentages, grades, and aggregates for your exams and university admissions.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* General Calculators */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">General Calculators</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {GENERAL_CALCULATORS.map((calc) => (
              <Link
                key={calc.href}
                href={calc.href}
                className="bg-white rounded-xl border border-slate-200 p-5 hover:border-indigo-300 hover:shadow-md transition-all text-center"
              >
                <span className="text-3xl">{calc.icon}</span>
                <h3 className="font-semibold text-slate-900 mt-2">{calc.name}</h3>
                <p className="text-sm text-slate-500 mt-1">{calc.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Group-wise Percentage Calculators */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Group-wise Percentage Calculators</h2>
          <p className="text-slate-500 mb-6">Calculate your percentage based on your group&apos;s specific marking scheme.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {intermediateGroups.map((group) => (
              <Link
                key={group.slug}
                href={`/calculators/percentage?group=${group.slug}`}
                className="bg-white rounded-xl border border-slate-200 p-5 hover:border-indigo-300 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{group.icon}</span>
                  <h3 className="font-semibold text-slate-900">{group.name}</h3>
                </div>
                <p className="text-sm text-slate-500">Calculate percentage for {group.shortName} subjects</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
