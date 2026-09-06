import type { Metadata } from "next";
import Link from "next/link";
import { calculators } from "@/lib/calculators/definitions";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Calculator, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Education Calculators - CGPA, GPA, MDCAT, Merit Calculators",
  description: "Free online education calculators for students. CGPA calculator, GPA calculator, MDCAT aggregate calculator, merit calculator, and more.",
};

const CATEGORIES = [
  { id: "academic", label: "Academic Calculators", description: "Calculate GPA, CGPA, percentages and marks" },
  { id: "admission", label: "Admission Calculators", description: "MDCAT, ECAT, NUMS, and merit aggregates" },
  { id: "student-tools", label: "Student Tools", description: "Attendance and other student utilities" },
];

export default function CalculatorsPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs items={[{ label: "Calculators" }]} />
          <h1 className="text-3xl font-bold text-slate-900 mt-4 mb-2">Education Calculators</h1>
          <p className="text-slate-500">Free tools to help students with academic calculations and admission planning</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {CATEGORIES.map((cat) => {
          const catCalculators = calculators.filter((c) => c.category === cat.id);
          if (catCalculators.length === 0) return null;
          return (
            <section key={cat.id}>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-slate-900 mb-1">{cat.label}</h2>
                <p className="text-sm text-slate-500">{cat.description}</p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {catCalculators.map((calc) => (
                  <Link
                    key={calc.slug}
                    href={`/calculators/${calc.slug}`}
                    className="group p-5 rounded-xl border border-slate-200 bg-white hover:border-emerald-200 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="h-10 w-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-100 transition-colors">
                        <Calculator className="h-5 w-5" />
                      </div>
                      <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-emerald-500 transition-colors" />
                    </div>
                    <h3 className="text-base font-semibold text-slate-900 mb-1.5">{calc.name}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{calc.description}</p>
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
