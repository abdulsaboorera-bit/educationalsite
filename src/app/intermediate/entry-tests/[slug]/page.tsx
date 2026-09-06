import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { getEntryTestBySlug, getAllEntryTestSlugs } from "@/lib/intermediate/entry-tests";
import { getGroupBySlug } from "@/lib/intermediate/groups";
import { SITE_CONFIG } from "@/config/site";

interface EntryTestPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllEntryTestSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: EntryTestPageProps): Promise<Metadata> {
  const { slug } = await params;
  const test = getEntryTestBySlug(slug);
  if (!test) return { title: "Entry Test Not Found" };

  return {
    title: `${test.name} (${test.fullName}) - Preparation Guide | PakEdu`,
    description: `Complete guide for ${test.fullName}. Syllabus, preparation tips, test pattern, and eligibility for ${test.conductingBody}.`,
    alternates: { canonical: `${SITE_CONFIG.url}/intermediate/entry-tests/${slug}` },
    openGraph: {
      title: `${test.name} - Preparation Guide | PakEdu`,
      description: `Complete guide for ${test.fullName}.`,
      url: `${SITE_CONFIG.url}/intermediate/entry-tests/${slug}`,
      siteName: "PakEdu",
      locale: "en_PK",
      type: "website",
    },
  };
}

export default async function EntryTestDetailPage({ params }: EntryTestPageProps) {
  const { slug } = await params;
  const test = getEntryTestBySlug(slug);
  if (!test) notFound();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Intermediate", href: "/intermediate" },
              { label: "Entry Tests", href: "/intermediate/entry-tests" },
              { label: test.name },
            ]}
            className="text-indigo-100/80 [&_a]:text-white/80 [&_a]:hover:text-white"
          />
          <div className="mt-6">
            <h1 className="text-3xl font-bold mb-1">{test.name}</h1>
            <p className="text-indigo-100/80 text-lg">{test.fullName}</p>
            <p className="text-indigo-100/70 mt-2">{test.conductingBody}</p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Quick Info */}
        <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Marks", value: test.totalMarks },
            { label: "Duration", value: test.duration },
            { label: "Frequency", value: test.frequency },
            { label: "Pattern", value: test.testPattern },
          ].map((item) => (
            <div key={item.label} className="bg-white rounded-xl border border-slate-200 p-4">
              <p className="text-sm font-medium text-slate-500 mb-1">{item.label}</p>
              <p className="text-lg font-bold text-slate-900">{item.value}</p>
            </div>
          ))}
        </section>

        {/* Eligibility & Syllabus */}
        <div className="grid md:grid-cols-2 gap-6">
          <section className="bg-white rounded-2xl border border-slate-200 p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-3">Eligibility</h2>
            <p className="text-slate-600">{test.eligibility}</p>
          </section>
          <section className="bg-white rounded-2xl border border-slate-200 p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-3">Syllabus</h2>
            <p className="text-slate-600">{test.syllabus}</p>
          </section>
        </div>

        {/* Subjects */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Subjects Covered</h2>
          <div className="flex flex-wrap gap-2">
            {test.subjects.map((subject) => (
              <span key={subject} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-medium">
                {subject}
              </span>
            ))}
          </div>
        </section>

        {/* Preparation Tips */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Preparation Tips</h2>
          <ul className="space-y-3">
            {test.preparationTips.map((tip, i) => (
              <li key={i} className="flex items-start gap-3 text-slate-600">
                <span className="mt-1 h-2 w-2 rounded-full bg-indigo-500 flex-shrink-0" />
                {tip}
              </li>
            ))}
          </ul>
        </section>

        {/* Related Groups */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Related Groups</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {test.relatedGroups.map((groupSlug) => {
              const group = getGroupBySlug(groupSlug);
              if (!group) return null;
              return (
                <Link
                  key={groupSlug}
                  href={`/intermediate/${groupSlug}`}
                  className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl hover:bg-indigo-50 transition-colors"
                >
                  <span className="text-2xl">{group.icon}</span>
                  <div>
                    <h3 className="font-semibold text-slate-900">{group.name}</h3>
                    <p className="text-xs text-slate-500">{group.shortName}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Official Link */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Official Website</h2>
          <a
            href={test.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            Visit {test.conductingBody} Website →
          </a>
        </section>
      </div>
    </div>
  );
}
