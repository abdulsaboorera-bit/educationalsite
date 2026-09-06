import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { getBoardBySlug } from "@/lib/matric/boards";
import { getSubjectBySlug, subjects } from "@/lib/matric/subjects";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ board: string; classLevel: string; subject: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { board, classLevel, subject } = await params;
  const boardData = getBoardBySlug(board);
  const subjectData = getSubjectBySlug(subject);
  if (!boardData || !subjectData) return {};
  return {
    title: `${boardData.short_name} Class ${classLevel} ${subjectData.name} Past Papers | PakEdu`,
    description: `Download ${boardData.short_name} Class ${classLevel} ${subjectData.name} past papers. Previous years exam papers with solutions.`,
    alternates: { canonical: `https://pakedu.pk/matric/past-papers/${board}/${classLevel}/${subject}` },
  };
}

const YEARS = ["2024", "2023", "2022", "2021", "2020", "2019"];

export default async function SubjectPastPapersPage({ params }: Props) {
  const { board, classLevel, subject } = await params;
  const boardData = getBoardBySlug(board);
  const subjectData = getSubjectBySlug(subject);
  if (!boardData || !subjectData) notFound();

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <Breadcrumbs
            items={[
              { label: "Matric", href: "/matric" },
              { label: "Past Papers", href: "/matric/past-papers" },
              { label: boardData.short_name, href: `/matric/past-papers/${board}` },
              { label: `Class ${classLevel}`, href: `/matric/past-papers/${board}/${classLevel}` },
              { label: subjectData.name },
            ]}
          />
          <h1 className="text-3xl md:text-4xl font-bold mt-4">
            {boardData.short_name} - Class {classLevel} {subjectData.name}
          </h1>
          <p className="text-blue-100 mt-2">
            Past papers with marking schemes from {YEARS[0]} to {YEARS[YEARS.length - 1]}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Past Papers by Year</h2>
            <div className="space-y-3">
              {YEARS.map((year) => (
                <div
                  key={year}
                  className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between"
                >
                  <div>
                    <p className="font-semibold text-slate-900">{year} Past Paper</p>
                    <p className="text-sm text-slate-500">
                      {boardData.short_name} - Class {classLevel} - {subjectData.name}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium cursor-pointer hover:bg-blue-100">
                      View Paper
                    </span>
                    <span className="px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-medium cursor-pointer hover:bg-emerald-100">
                      Marking Scheme
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Model Papers</h2>
              <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-900">Model Paper {new Date().getFullYear()}</p>
                  <p className="text-sm text-slate-500">
                    Official model paper by {boardData.short_name}
                  </p>
                </div>
                <span className="px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg text-xs font-medium cursor-pointer hover:bg-purple-100">
                  View Model Paper
                </span>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white border border-slate-200 rounded-xl p-6 sticky top-24">
              <h3 className="font-bold text-slate-900 mb-4">Subject Info</h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-slate-500">Subject</dt>
                  <dd className="font-medium text-slate-900">{subjectData.name}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-500">Total Marks</dt>
                  <dd className="font-medium text-slate-900">{subjectData.marks.total}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-500">Chapters</dt>
                  <dd className="font-medium text-slate-900">{subjectData.chapters}</dd>
                </div>
              </dl>

              <div className="mt-6 pt-4 border-t border-slate-200">
                <h4 className="font-semibold text-slate-900 mb-2">Other Subjects</h4>
                <div className="space-y-1">
                  {subjects
                    .filter((s) => s.slug !== subject)
                    .slice(0, 8)
                    .map((s) => (
                      <Link
                        key={s.slug}
                        href={`/matric/past-papers/${board}/${classLevel}/${s.slug}`}
                        className="block text-sm text-blue-600 hover:underline"
                      >
                        {s.name}
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
