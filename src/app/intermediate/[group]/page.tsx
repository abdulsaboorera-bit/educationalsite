import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { getGroupBySlug, getAllGroupSlugs } from "@/lib/intermediate/groups";
import { getSubjectsByGroup } from "@/lib/intermediate/subjects";
import { entryTests } from "@/lib/intermediate/entry-tests";
import { scholarships } from "@/lib/intermediate/scholarships";
import type { IntermediateGroupSlug } from "@/lib/intermediate/types";
import { SITE_CONFIG } from "@/config/site";

interface GroupPageProps {
  params: Promise<{ group: string }>;
}

export async function generateStaticParams() {
  return getAllGroupSlugs().map((slug) => ({ group: slug }));
}

export async function generateMetadata({ params }: GroupPageProps): Promise<Metadata> {
  const { group } = await params;
  const groupData = getGroupBySlug(group);
  if (!groupData) return { title: "Group Not Found" };

  return {
    title: groupData.metaTitle,
    description: groupData.metaDescription,
    alternates: { canonical: `${SITE_CONFIG.url}/intermediate/${group}` },
    openGraph: {
      title: groupData.metaTitle,
      description: groupData.metaDescription,
      url: `${SITE_CONFIG.url}/intermediate/${group}`,
      siteName: "PakEdu",
      locale: "en_PK",
      type: "website",
    },
  };
}

export default async function GroupPage({ params }: GroupPageProps) {
  const { group } = await params;
  const groupData = getGroupBySlug(group);
  if (!groupData) notFound();

  const groupSlug = group as IntermediateGroupSlug;
  const allSubjects = getSubjectsByGroup(groupSlug);
  const compulsorySubjects = allSubjects.filter((s) => s.isCompulsory);
  const electiveSubjects = allSubjects.filter((s) => !s.isCompulsory);
  const relatedEntryTests = entryTests.filter((t) => t.relatedGroups.includes(groupSlug));
  const relatedScholarships = scholarships.filter((s) => s.forGroups.includes(groupSlug));

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className={`bg-gradient-to-br from-${groupData.color}-600 via-${groupData.color}-700 to-${groupData.color}-800 text-white`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Intermediate", href: "/intermediate" },
              { label: groupData.name },
            ]}
            className="text-white/70 [&_a]:text-white/70 [&_a]:hover:text-white"
          />
          <div className="mt-6 flex items-start gap-4">
            <div className="text-5xl">{groupData.icon}</div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{groupData.name}</h1>
              <p className="text-white/80 max-w-2xl text-lg">{groupData.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {groupData.classLevel.map((cls) => (
                  <span key={cls} className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                    Class {cls}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* Full Description */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">About {groupData.name}</h2>
          <p className="text-slate-600 leading-relaxed">{groupData.fullDescription}</p>
        </section>

        {/* Subjects */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Subjects</h2>

          {/* Compulsory Subjects */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Compulsory Subjects</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {compulsorySubjects.map((subject) => (
                <Link
                  key={`${subject.slug}-${subject.classLevel}`}
                  href={`/intermediate/subjects/${subject.slug}`}
                  className="bg-white rounded-xl border border-slate-200 p-4 hover:border-indigo-300 hover:shadow-md transition-all"
                >
                  <h4 className="font-semibold text-slate-900">{subject.name}</h4>
                  <p className="text-xs text-slate-500 mt-1">Class {subject.classLevel}</p>
                  <p className="text-sm text-slate-600 mt-2">{subject.marks.total} marks</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Elective Subjects */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Elective Subjects</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {electiveSubjects.map((subject) => (
                <Link
                  key={`${subject.slug}-${subject.classLevel}`}
                  href={`/intermediate/subjects/${subject.slug}`}
                  className="bg-white rounded-xl border border-slate-200 p-5 hover:border-indigo-300 hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-slate-900">{subject.name}</h4>
                    {subject.hasPractical && (
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-xs rounded font-medium">
                        Practical
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mb-2">Class {subject.classLevel} &middot; Code: {subject.code}</p>
                  <p className="text-sm text-slate-600 mb-3">{subject.description}</p>
                  <div className="flex gap-3 text-xs text-slate-500">
                    <span>Theory: {subject.marks.theory}</span>
                    {subject.marks.practical > 0 && <span>Practical: {subject.marks.practical}</span>}
                    <span>Total: {subject.marks.total}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Resources</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Past Papers", href: "/intermediate/past-papers", icon: "📄" },
              { label: "Calculators", href: "/intermediate/calculators", icon: "🧮" },
              { label: "Entry Tests", href: "/intermediate/entry-tests", icon: "🎯" },
              { label: "Careers", href: "/intermediate/careers", icon: "🚀" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="bg-white rounded-xl border border-slate-200 p-5 text-center hover:border-indigo-300 hover:shadow-md transition-all"
              >
                <span className="text-3xl">{link.icon}</span>
                <h3 className="font-semibold text-slate-900 mt-2">{link.label}</h3>
              </Link>
            ))}
          </div>
        </section>

        {/* Career Paths */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Career Paths</h2>
          <div className="flex flex-wrap gap-2 mb-6">
            {groupData.careerPaths.map((career) => (
              <span key={career} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-medium">
                {career}
              </span>
            ))}
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-3">Eligible Degrees</h3>
          <div className="flex flex-wrap gap-2">
            {groupData.eligibleDegrees.map((degree) => (
              <span key={degree} className="px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-medium">
                {degree}
              </span>
            ))}
          </div>
        </section>

        {/* Entry Tests */}
        {relatedEntryTests.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Related Entry Tests</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {relatedEntryTests.map((test) => (
                <Link
                  key={test.slug}
                  href={`/intermediate/entry-tests/${test.slug}`}
                  className="bg-white rounded-xl border border-slate-200 p-5 hover:border-indigo-300 hover:shadow-md transition-all"
                >
                  <h3 className="font-bold text-slate-900">{test.name}</h3>
                  <p className="text-sm text-slate-500 mt-1">{test.conductingBody}</p>
                  <p className="text-sm text-slate-600 mt-2">{test.eligibility}</p>
                  <div className="mt-3 flex gap-2">
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs">{test.totalMarks} marks</span>
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs">{test.duration}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Scholarships */}
        {relatedScholarships.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Available Scholarships</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {relatedScholarships.map((scholarship) => (
                <div key={scholarship.slug} className="bg-white rounded-xl border border-slate-200 p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-slate-900">{scholarship.name}</h3>
                    <StatusBadge status={scholarship.status} />
                  </div>
                  <p className="text-sm text-slate-500">{scholarship.provider}</p>
                  <p className="text-sm text-slate-600 mt-2">{scholarship.amount}</p>
                  <p className="text-xs text-slate-500 mt-1">Deadline: {scholarship.deadline}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    open: "bg-emerald-50 text-emerald-700",
    closing_soon: "bg-amber-50 text-amber-700",
    closed: "bg-red-50 text-red-700",
    upcoming: "bg-blue-50 text-blue-700",
  };
  const labels: Record<string, string> = {
    open: "Open",
    closing_soon: "Closing Soon",
    closed: "Closed",
    upcoming: "Upcoming",
  };
  return (
    <span className={`px-2 py-0.5 rounded text-xs font-medium ${styles[status] ?? "bg-slate-100 text-slate-600"}`}>
      {labels[status] ?? status}
    </span>
  );
}
