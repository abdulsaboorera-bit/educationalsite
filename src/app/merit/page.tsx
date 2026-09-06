import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Merit Lists Database - University Closing Merits",
  description: "Browse historical merit lists and closing aggregates for universities. Find merit data for COMSATS, FAST, UET, LUMS, NUST and more.",
};

const MOCK_MERIT_DATA = [
  {
    university: "COMSATS University Islamabad",
    slug: "comsats-university-islamabad",
    campus: "Islamabad",
    program: "BS Computer Science",
    year: "2025",
    closing_merit: 78.5,
    opening_merit: 85.2,
    category: "Open Merit",
  },
  {
    university: "FAST-NUCES",
    slug: "fast-nuces",
    campus: "Islamabad",
    program: "BS Computer Science",
    year: "2025",
    closing_merit: 82.0,
    opening_merit: 90.0,
    category: "Open Merit",
  },
  {
    university: "UET Lahore",
    slug: "uet-lahore",
    campus: "Lahore",
    program: "BS Computer Engineering",
    year: "2025",
    closing_merit: 75.3,
    opening_merit: 82.0,
    category: "Open Merit",
  },
  {
    university: "LUMS",
    slug: "lums",
    campus: "Lahore",
    program: "BS Computer Science",
    year: "2025",
    closing_merit: 85.0,
    opening_merit: 92.0,
    category: "Open Merit",
  },
  {
    university: "NUST",
    slug: "nust",
    campus: "Islamabad",
    program: "BS Computer Science",
    year: "2025",
    closing_merit: 80.0,
    opening_merit: 88.0,
    category: "Open Merit",
  },
  {
    university: "COMSATS University Islamabad",
    slug: "comsats-university-islamabad",
    campus: "Lahore",
    program: "BS Software Engineering",
    year: "2025",
    closing_merit: 74.0,
    opening_merit: 80.0,
    category: "Open Merit",
  },
  {
    university: "UET Lahore",
    slug: "uet-lahore",
    campus: "Lahore",
    program: "BS Electrical Engineering",
    year: "2025",
    closing_merit: 72.0,
    opening_merit: 78.0,
    category: "Open Merit",
  },
  {
    university: "FAST-NUCES",
    slug: "fast-nuces",
    campus: "Lahore",
    program: "BS Software Engineering",
    year: "2025",
    closing_merit: 79.0,
    opening_merit: 86.0,
    category: "Open Merit",
  },
];

export default function MeritPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs items={[{ label: "Merit" }]} />
          <h1 className="text-3xl font-bold text-slate-900 mt-4 mb-2">Merit Lists Database</h1>
          <p className="text-slate-500">Browse closing merit and admission data for universities</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            placeholder="Search university or program..."
            className="flex-1 h-10 px-4 rounded-lg border border-slate-200 bg-white text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <select className="h-10 px-3 rounded-lg border border-slate-200 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500">
            <option>All Years</option>
            <option>2025</option>
            <option>2024</option>
            <option>2023</option>
          </select>
          <select className="h-10 px-3 rounded-lg border border-slate-200 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500">
            <option>All Programs</option>
            <option>Computer Science</option>
            <option>Engineering</option>
            <option>Business</option>
          </select>
        </div>

        {/* Merit Table */}
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="text-left p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">University</th>
                  <th className="text-left p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Program</th>
                  <th className="text-left p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Year</th>
                  <th className="text-left p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Closing Merit</th>
                  <th className="text-left p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Opening Merit</th>
                  <th className="text-left p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_MERIT_DATA.map((item, i) => (
                  <tr key={i} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors">
                    <td className="p-4">
                      <Link href={`/universities/${item.slug}`} className="text-sm font-medium text-slate-900 hover:text-emerald-600">
                        {item.university}
                      </Link>
                      <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {item.campus}
                      </div>
                    </td>
                    <td className="p-4 text-sm text-slate-700">{item.program}</td>
                    <td className="p-4">
                      <Badge variant="outline">{item.year}</Badge>
                    </td>
                    <td className="p-4">
                      <span className="text-sm font-semibold text-slate-900">{item.closing_merit}%</span>
                    </td>
                    <td className="p-4 text-sm text-slate-600">{item.opening_merit}%</td>
                    <td className="p-4">
                      <Badge variant="success">{item.category}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Disclaimer */}
        <div className="mt-6 p-4 rounded-lg bg-amber-50 border border-amber-200">
          <p className="text-sm text-amber-800">
            <strong>Disclaimer:</strong> Merit data shown is based on publicly available information from official university sources. 
            Always verify from the official university website. Merit can vary significantly based on applicant pool each year.
          </p>
        </div>
      </div>
    </div>
  );
}
