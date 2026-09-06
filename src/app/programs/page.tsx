import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Card } from "@/components/ui/Card";
import { Building2, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Browse All University Programs",
  description: "Discover degree programs offered by universities. Find BS, MS, MBA, and other programs across engineering, CS, business, and more.",
};

const FIELDS = [
  "Computer Science",
  "Software Engineering",
  "Electrical Engineering",
  "Civil Engineering",
  "Mechanical Engineering",
  "Business Administration",
  "Medicine (MBBS)",
  "Dentistry (BDS)",
  "Law (LLB)",
  "Psychology",
  "Economics",
  "English Literature",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Media Studies",
];

const MOCK_PROGRAMS = [
  { name: "BS Computer Science", field: "Computer Science", universities_count: 50, duration: "4 years" },
  { name: "BS Software Engineering", field: "Software Engineering", universities_count: 40, duration: "4 years" },
  { name: "BS Electrical Engineering", field: "Electrical Engineering", universities_count: 30, duration: "4 years" },
  { name: "BS Civil Engineering", field: "Civil Engineering", universities_count: 25, duration: "4 years" },
  { name: "BS Mechanical Engineering", field: "Mechanical Engineering", universities_count: 20, duration: "4 years" },
  { name: "BBA", field: "Business Administration", universities_count: 60, duration: "4 years" },
  { name: "MBBS", field: "Medicine (MBBS)", universities_count: 15, duration: "5 years" },
  { name: "BDS", field: "Dentistry (BDS)", universities_count: 12, duration: "4 years" },
  { name: "LLB", field: "Law (LLB)", universities_count: 30, duration: "5 years" },
  { name: "BS Psychology", field: "Psychology", universities_count: 20, duration: "4 years" },
  { name: "BS Economics", field: "Economics", universities_count: 25, duration: "4 years" },
  { name: "BS Mathematics", field: "Mathematics", universities_count: 30, duration: "4 years" },
];

export default function ProgramsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs items={[{ label: "Programs" }]} />
          <h1 className="text-3xl font-bold text-slate-900 mt-4 mb-2">Degree Programs</h1>
          <p className="text-slate-500">Browse programs by field of study and find universities offering them</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Fields */}
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Browse by Field</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mb-12">
          {FIELDS.map((field) => (
            <button
              key={field}
              className="p-3 rounded-lg border border-slate-200 bg-white text-left text-sm font-medium text-slate-700 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 transition-all"
            >
              {field}
            </button>
          ))}
        </div>

        {/* Programs */}
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Popular Programs</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MOCK_PROGRAMS.map((prog) => (
            <Card key={prog.name} className="hover:border-emerald-200 hover:shadow-md transition-all cursor-pointer">
              <div className="p-5">
                <h3 className="text-base font-semibold text-slate-900 mb-2">{prog.name}</h3>
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Building2 className="h-3 w-3" />
                    {prog.universities_count}+ universities
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {prog.duration}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
