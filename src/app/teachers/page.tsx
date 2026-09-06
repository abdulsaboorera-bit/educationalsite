import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Search, User, BookOpen, Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: "University Teachers & Faculty Directory",
  description: "Browse faculty and teacher profiles across universities. Find professors, their departments, research interests, and more.",
};

const MOCK_TEACHERS = [
  { name: "Dr. Ahmed Khan", slug: "dr-ahmed-khan", designation: "Professor", department: "Computer Science", university: "COMSATS University Islamabad", university_slug: "comsats-university-islamabad", research: ["AI", "Machine Learning", "NLP"] },
  { name: "Dr. Fatima Ali", slug: "dr-fatima-ali", designation: "Associate Professor", department: "Electrical Engineering", university: "UET Lahore", university_slug: "uet-lahore", research: ["Signal Processing", "Communications"] },
  { name: "Dr. Hassan Raza", slug: "dr-hassan-raza", designation: "Assistant Professor", department: "Software Engineering", university: "FAST-NUCES", university_slug: "fast-nuces", research: ["Software Architecture", "DevOps"] },
  { name: "Dr. Ayesha Malik", slug: "dr-ayesha-malik", designation: "Professor", department: "Business Administration", university: "LUMS", university_slug: "lums", research: ["Finance", "Marketing"] },
  { name: "Dr. Muhammad Tariq", slug: "dr-muhammad-tariq", designation: "Associate Professor", department: "Computer Science", university: "NUST", university_slug: "nust", research: ["Cybersecurity", "Networks"] },
  { name: "Dr. Sara Shah", slug: "dr-sara-shah", designation: "Lecturer", department: "Mathematics", university: "Punjab University", university_slug: "punjab-university", research: ["Applied Mathematics", "Statistics"] },
];

export default function TeachersPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs items={[{ label: "Teachers" }]} />
          <h1 className="text-3xl font-bold text-slate-900 mt-4 mb-2">University Faculty Directory</h1>
          <p className="text-slate-500">Browse teacher profiles and find faculty members across universities</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, department, or university..."
              className="w-full h-10 pl-10 pr-4 rounded-lg border border-slate-200 bg-white text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <select className="h-10 px-3 rounded-lg border border-slate-200 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500">
            <option>All Universities</option>
            <option>COMSATS</option>
            <option>FAST</option>
            <option>UET</option>
            <option>LUMS</option>
            <option>NUST</option>
          </select>
        </div>

        {/* Teachers Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MOCK_TEACHERS.map((teacher) => (
            <Card key={teacher.slug} className="hover:border-emerald-200 hover:shadow-md transition-all">
              <div className="p-5">
                <div className="flex items-start gap-3 mb-3">
                  <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">{teacher.name}</h3>
                    <p className="text-xs text-slate-500">{teacher.designation}</p>
                  </div>
                </div>
                <div className="space-y-1.5 mb-3">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Building2 className="h-3 w-3" />
                    <Link href={`/universities/${teacher.university_slug}`} className="hover:text-emerald-600">
                      {teacher.university}
                    </Link>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <BookOpen className="h-3 w-3" />
                    {teacher.department}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {teacher.research.map((r) => (
                    <Badge key={r} variant="default" className="text-[10px]">{r}</Badge>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
