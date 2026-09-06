import { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { getGroupsByClassLevel } from "@/lib/intermediate/groups";
import { getCompulsorySubjects, getElectiveSubjects } from "@/lib/intermediate/subjects";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: "11th Class Intermediate - Subjects, Groups, Syllabus | PakEdu",
  description: "Complete guide to 11th class (Intermediate Part 1) in Pakistan. All groups, subjects, syllabus, past papers, and preparation resources.",
  keywords: ["11th class", "intermediate part 1", "first year", "11th class subjects", "11th class syllabus"],
  alternates: { canonical: `${SITE_CONFIG.url}/intermediate/11` },
  openGraph: {
    title: "11th Class Intermediate | PakEdu",
    description: "Complete guide to 11th class Intermediate in Pakistan.",
    url: `${SITE_CONFIG.url}/intermediate/11`,
    siteName: "PakEdu",
    locale: "en_PK",
    type: "website",
  },
};

const colorMap: Record<string, string> = {
  emerald: "bg-emerald-50 text-emerald-700 border-emerald-200 hover:border-emerald-300",
  blue: "bg-blue-50 text-blue-700 border-blue-200 hover:border-blue-300",
  purple: "bg-purple-50 text-purple-700 border-purple-200 hover:border-purple-300",
  rose: "bg-rose-50 text-rose-700 border-rose-200 hover:border-rose-300",
  amber: "bg-amber-50 text-amber-700 border-amber-200 hover:border-amber-300",
  cyan: "bg-cyan-50 text-cyan-700 border-cyan-200 hover:border-cyan-300",
};

export default function Class11Page() {
  const groups = getGroupsByClassLevel("11");
  const compulsory = getCompulsorySubjects("11");

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Intermediate", href: "/intermediate" },
              { label: "11th Class" },
            ]}
            className="text-indigo-100/80 [&_a]:text-white/80 [&_a]:hover:text-white"
          />
          <h1 className="text-3xl md:text-4xl font-bold mt-6">11th Class (Intermediate Part 1)</h1>
          <p className="text-indigo-100 mt-4 max-w-2xl text-lg">
            Your first year of Intermediate education. Explore all available groups, subjects, and start building your academic foundation.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* Compulsory Subjects */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
          <h2 className="text-xl font-bold text-slate-900 mb-2">Compulsory Subjects (All Groups)</h2>
          <p className="text-slate-500 text-sm mb-6">These subjects are studied by all 11th class students regardless of their group.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {compulsory.map((subject) => (
              <Link
                key={subject.slug}
                href={`/intermediate/subjects/${subject.slug}`}
                className="bg-slate-50 rounded-xl border border-slate-200 p-4 hover:border-indigo-300 hover:shadow-md transition-all"
              >
                <h3 className="font-semibold text-slate-900">{subject.name}</h3>
                <p className="text-sm text-slate-600 mt-1">{subject.marks.total} marks</p>
                <p className="text-xs text-slate-500 mt-1">{subject.chapters} chapters</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Groups */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Groups Available for Class 11</h2>
          <p className="text-slate-500 mb-6">Choose a group that aligns with your interests and career goals.</p>
          <div className="space-y-6">
            {groups.map((group) => {
              const electives = getElectiveSubjects(group.slug, "11");
              return (
                <div key={group.slug} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                  <div className="p-6 md:p-8">
                    <div className="flex items-start gap-4 mb-4">
                      <span className="text-4xl">{group.icon}</span>
                      <div className="flex-1">
                        <Link href={`/intermediate/${group.slug}`} className="group/link">
                          <h3 className="text-xl font-bold text-slate-900 group-hover/link:text-indigo-600 transition-colors">
                            {group.name}
                          </h3>
                        </Link>
                        <p className="text-slate-600 mt-1">{group.description}</p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <h4 className="text-sm font-semibold text-slate-700 mb-2">Elective Subjects</h4>
                      <div className="flex flex-wrap gap-2">
                        {electives.map((subject) => (
                          <Link
                            key={subject.slug}
                            href={`/intermediate/subjects/${subject.slug}`}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${colorMap[group.color] ?? "bg-slate-50 text-slate-700 border-slate-200"}`}
                          >
                            {subject.name}
                          </Link>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-4 text-sm text-slate-500">
                      <span>{group.careerPaths.length}+ career paths</span>
                      <span>&middot;</span>
                      <span>{group.eligibleDegrees.length}+ degree programs</span>
                    </div>

                    <Link
                      href={`/intermediate/${group.slug}`}
                      className="inline-block mt-4 text-sm font-medium text-indigo-600 hover:text-indigo-700"
                    >
                      View full details →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
