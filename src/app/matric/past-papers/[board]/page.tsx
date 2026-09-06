import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { getAllBoardSlugs, getBoardBySlug } from "@/lib/matric/boards";
import { getSubjectsByGroup } from "@/lib/matric/subjects";
import { classes } from "@/lib/matric/classes";

export function generateStaticParams() {
  return getAllBoardSlugs().map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const board = getBoardBySlug(slug);
  if (!board) return {};
  return {
    title: `${board.short_name} Past Papers - Class 9 & 10 | PakEdu`,
    description: `Download ${board.short_name} past papers for all Matric subjects. Class 9 and Class 10 past papers with marking schemes.`,
    alternates: { canonical: `https://pakedu.pk/matric/past-papers/${board.slug}` },
  };
}

export default async function BoardPastPapersPage({ params }: Props) {
  const { slug } = await params;
  const board = getBoardBySlug(slug);
  if (!board) notFound();

  const scienceSubjects = getSubjectsByGroup("science");
  const csSubjects = getSubjectsByGroup("computer_science");
  const artsSubjects = getSubjectsByGroup("arts");

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <Breadcrumbs
            items={[
              { label: "Matric", href: "/matric" },
              { label: "Past Papers", href: "/matric/past-papers" },
              { label: board.short_name },
            ]}
          />
          <h1 className="text-3xl md:text-4xl font-bold mt-4">
            {board.short_name} Past Papers
          </h1>
          <p className="text-blue-100 mt-2">{board.name} - All Subjects</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {classes.map((cls) => (
          <div key={cls.level} className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Class {cls.level} Past Papers
            </h2>

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-slate-800 mb-3">Science Group</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {scienceSubjects.map((subject) => (
                  <Link
                    key={subject.slug}
                    href={`/matric/past-papers/${board.slug}/${cls.level}/${subject.slug}`}
                    className="bg-white border border-slate-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-md transition-all"
                  >
                    <p className="font-semibold text-slate-900">{subject.name}</p>
                    <p className="text-sm text-slate-500 mt-1">
                      {subject.marks.total} marks total
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-slate-800 mb-3">Computer Science Group</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {csSubjects.map((subject) => (
                  <Link
                    key={subject.slug}
                    href={`/matric/past-papers/${board.slug}/${cls.level}/${subject.slug}`}
                    className="bg-white border border-slate-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-md transition-all"
                  >
                    <p className="font-semibold text-slate-900">{subject.name}</p>
                    <p className="text-sm text-slate-500 mt-1">
                      {subject.marks.total} marks total
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">Arts / Humanities Group</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {artsSubjects.map((subject) => (
                  <Link
                    key={subject.slug}
                    href={`/matric/past-papers/${board.slug}/${cls.level}/${subject.slug}`}
                    className="bg-white border border-slate-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-md transition-all"
                  >
                    <p className="font-semibold text-slate-900">{subject.name}</p>
                    <p className="text-sm text-slate-500 mt-1">
                      {subject.marks.total} marks total
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
