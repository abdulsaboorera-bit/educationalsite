import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { getIntermediateBoardBySlug, getAllIntermediateBoardSlugs } from "@/lib/intermediate/boards";
import { getGroupBySlug } from "@/lib/intermediate/groups";
import { SITE_CONFIG } from "@/config/site";

interface BoardPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllIntermediateBoardSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BoardPageProps): Promise<Metadata> {
  const { slug } = await params;
  const board = getIntermediateBoardBySlug(slug);
  if (!board) return { title: "Board Not Found" };

  return {
    title: `${board.name} - Intermediate | PakEdu`,
    description: `Complete information about ${board.name}. Groups, grading system, official links, and resources for intermediate students.`,
    alternates: { canonical: `${SITE_CONFIG.url}/intermediate/boards/${slug}` },
    openGraph: {
      title: `${board.name} - Intermediate | PakEdu`,
      description: `Complete information about ${board.name} for intermediate students.`,
      url: `${SITE_CONFIG.url}/intermediate/boards/${slug}`,
      siteName: "PakEdu",
      locale: "en_PK",
      type: "website",
    },
  };
}

export default async function BoardDetailPage({ params }: BoardPageProps) {
  const { slug } = await params;
  const board = getIntermediateBoardBySlug(slug);
  if (!board) notFound();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Board Header */}
      <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Intermediate", href: "/intermediate" },
              { label: "Boards", href: "/intermediate/boards" },
              { label: board.shortName },
            ]}
            className="text-indigo-100/80 [&_a]:text-white/80 [&_a]:hover:text-white"
          />
          <div className="mt-6">
            <h1 className="text-3xl font-bold mb-2">{board.name}</h1>
            <p className="text-indigo-100/80 mb-3">{board.province} Province</p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-indigo-100/70">
              <span>Exam System: {board.examSystem === "annual" ? "Annual" : "Semester"}</span>
              <span>&middot;</span>
              <a href={board.website} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                Official Website →
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Quick Info */}
        <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <p className="text-sm font-medium text-slate-500 mb-1">Province</p>
            <p className="text-lg font-bold text-slate-900">{board.province}</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <p className="text-sm font-medium text-slate-500 mb-1">Exam System</p>
            <p className="text-lg font-bold text-slate-900 capitalize">{board.examSystem}</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <p className="text-sm font-medium text-slate-500 mb-1">Passing Criteria</p>
            <p className="text-lg font-bold text-slate-900">{board.passingCriteria}</p>
          </div>
        </section>

        {/* Groups Available */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Groups Available</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {board.groups.map((groupSlug) => {
              const group = getGroupBySlug(groupSlug);
              if (!group) return null;
              return (
                <Link
                  key={groupSlug}
                  href={`/intermediate/${groupSlug}`}
                  className="bg-slate-50 rounded-xl border border-slate-200 p-4 hover:border-indigo-300 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{group.icon}</span>
                    <h3 className="font-semibold text-slate-900">{group.name}</h3>
                  </div>
                  {board.totalMarks[groupSlug] && (
                    <p className="text-sm text-slate-600">
                      Total Marks: <span className="font-medium">{board.totalMarks[groupSlug].total}</span>
                    </p>
                  )}
                </Link>
              );
            })}
          </div>
        </section>

        {/* Grading System */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Grading System</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-2 px-3 font-semibold text-slate-700">Grade</th>
                  <th className="text-left py-2 px-3 font-semibold text-slate-700">Label</th>
                  <th className="text-left py-2 px-3 font-semibold text-slate-700">Percentage Range</th>
                </tr>
              </thead>
              <tbody>
                {board.gradingSystem.map((g) => (
                  <tr key={g.grade} className="border-b border-slate-100 last:border-0">
                    <td className="py-2 px-3 font-bold text-slate-900">{g.grade}</td>
                    <td className="py-2 px-3 text-slate-600">{g.label}</td>
                    <td className="py-2 px-3 text-slate-600">{g.minPercentage}% - {g.maxPercentage}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Total Marks by Group */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Total Marks by Group</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-2 px-3 font-semibold text-slate-700">Group</th>
                  <th className="text-left py-2 px-3 font-semibold text-slate-700">Theory</th>
                  <th className="text-left py-2 px-3 font-semibold text-slate-700">Practical</th>
                  <th className="text-left py-2 px-3 font-semibold text-slate-700">Total</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(board.totalMarks).map(([groupSlug, marks]) => {
                  const group = getGroupBySlug(groupSlug);
                  return (
                    <tr key={groupSlug} className="border-b border-slate-100 last:border-0">
                      <td className="py-2 px-3 font-medium text-slate-900">{group?.name ?? groupSlug}</td>
                      <td className="py-2 px-3 text-slate-600">{marks.theory}</td>
                      <td className="py-2 px-3 text-slate-600">{marks.practical}</td>
                      <td className="py-2 px-3 font-bold text-slate-900">{marks.total}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Official Resources */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Official Resources</h2>
          <div className="space-y-3">
            {board.officialResources.map((resource) => (
              <a
                key={resource.url}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg hover:bg-indigo-50 transition-colors"
              >
                <span className="text-sm font-medium text-slate-900">{resource.label}</span>
                <span className="text-xs text-slate-500 truncate">{resource.url}</span>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
