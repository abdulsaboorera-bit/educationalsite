import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { subjects } from "@/lib/matric/subjects";
import { generateBreadcrumbSchema } from "@/lib/matric/seo";
import { SITE_CONFIG } from "@/config/site";
import { BookOpen, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Matric Subjects - All Subjects for Class 9 & Class 10 | PakEdu",
  description: "Complete list of all Matric subjects in Pakistan. Physics, Chemistry, Biology, Mathematics, English, Urdu, Computer Science, and more. Syllabus, notes, and past papers.",
  keywords: [
    "matric subjects", "class 9 subjects", "class 10 subjects", "physics", "chemistry",
    "biology", "mathematics", "english", "urdu", "computer science",
  ],
  openGraph: {
    title: "Matric Subjects - All Subjects for Class 9 & Class 10 | PakEdu",
    description: "Complete list of all Matric subjects with syllabus, notes, and past papers.",
    url: `${SITE_CONFIG.url}/matric/subjects`,
  },
};

export default function SubjectsPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { label: "Home", href: "/" },
    { label: "Matric", href: "/matric" },
    { label: "Subjects", href: "/matric/subjects" },
  ]);

  const compulsorySubjects = subjects.filter((s) => s.is_compulsory);
  const scienceSubjects = subjects.filter((s) => s.group === "science");
  const csSubjects = subjects.filter((s) => s.group === "computer_science");
  const artsSubjects = subjects.filter((s) => s.group === "arts");

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Matric", href: "/matric" }, { label: "Subjects" }]} />
          <h1 className="text-3xl font-bold text-slate-900 mt-4 mb-2">Matric Subjects</h1>
          <p className="text-slate-500 max-w-2xl">
            Complete list of all subjects for Class 9 and Class 10 in Pakistan. Find syllabus, notes, MCQs, and past papers for each subject.
          </p>
          <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
            <BookOpen className="h-4 w-4" />
            <span>{subjects.length} subjects available</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Compulsory Subjects */}
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">Compulsory Subjects</h2>
          <p className="text-sm text-slate-500 mb-4">These subjects are compulsory for all students in both Class 9 and Class 10.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {compulsorySubjects.map((subject) => (
              <Link
                key={subject.slug}
                href={`/matric/subjects/${subject.slug}`}
                className="group bg-white rounded-xl border border-slate-200 p-5 hover:border-emerald-200 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-base font-semibold text-slate-900 group-hover:text-emerald-600 transition-colors">{subject.name}</h3>
                  <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-emerald-500 transition-colors mt-0.5" />
                </div>
                <p className="text-sm text-slate-500 mb-3 line-clamp-2">{subject.description}</p>
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span>{subject.marks.total} marks</span>
                  <span>Class {subject.class_level}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Science Group */}
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">Science Group</h2>
          <p className="text-sm text-slate-500 mb-4">Elective subjects for Science group students (Physics, Chemistry, Biology).</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {scienceSubjects.map((subject) => (
              <Link
                key={subject.slug}
                href={`/matric/subjects/${subject.slug}`}
                className="group bg-white rounded-xl border border-slate-200 p-5 hover:border-emerald-200 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-base font-semibold text-slate-900 group-hover:text-emerald-600 transition-colors">{subject.name}</h3>
                  <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-emerald-500 transition-colors mt-0.5" />
                </div>
                <p className="text-sm text-slate-500 mb-3 line-clamp-2">{subject.description}</p>
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span>{subject.marks.total} marks</span>
                  <span>Class {subject.class_level}</span>
                  {subject.has_practical && <span className="text-emerald-600">{subject.marks.practical} practical</span>}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Computer Science Group */}
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">Computer Science Group</h2>
          <p className="text-sm text-slate-500 mb-4">Elective subjects for Computer Science group students.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {csSubjects.map((subject) => (
              <Link
                key={subject.slug}
                href={`/matric/subjects/${subject.slug}`}
                className="group bg-white rounded-xl border border-slate-200 p-5 hover:border-emerald-200 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-base font-semibold text-slate-900 group-hover:text-emerald-600 transition-colors">{subject.name}</h3>
                  <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-emerald-500 transition-colors mt-0.5" />
                </div>
                <p className="text-sm text-slate-500 mb-3 line-clamp-2">{subject.description}</p>
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span>{subject.marks.total} marks</span>
                  <span>Class {subject.class_level}</span>
                  {subject.has_practical && <span className="text-emerald-600">{subject.marks.practical} practical</span>}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Arts Group */}
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">Arts / Humanities Group</h2>
          <p className="text-sm text-slate-500 mb-4">Elective subjects for Arts/Humanities group students.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {artsSubjects.map((subject) => (
              <Link
                key={subject.slug}
                href={`/matric/subjects/${subject.slug}`}
                className="group bg-white rounded-xl border border-slate-200 p-5 hover:border-emerald-200 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-base font-semibold text-slate-900 group-hover:text-emerald-600 transition-colors">{subject.name}</h3>
                  <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-emerald-500 transition-colors mt-0.5" />
                </div>
                <p className="text-sm text-slate-500 mb-3 line-clamp-2">{subject.description}</p>
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span>{subject.marks.total} marks</span>
                  <span>Class {subject.class_level}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
