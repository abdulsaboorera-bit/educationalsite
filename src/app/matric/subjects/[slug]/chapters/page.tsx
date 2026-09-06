import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { getSubjectBySlug, getAllSubjectSlugs } from "@/lib/matric/subjects";
import { getChaptersBySubjectAndClass } from "@/lib/matric/chapters";

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ class?: string }>;
}

export async function generateStaticParams() {
  return getAllSubjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const subject = getSubjectBySlug(slug);
  if (!subject) return {};
  return {
    title: `${subject.name} Chapters - Class 9 & 10 | PakEdu`,
    description: `Complete chapter list for Matric ${subject.name}. View all chapters, topics, and syllabus for Class 9 and Class 10.`,
    alternates: { canonical: `https://pakedu.pk/matric/subjects/${slug}/chapters` },
    openGraph: { title: `${subject.name} Chapters`, description: `Matric ${subject.name} chapter breakdown` },
  };
}

export default async function SubjectChaptersPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { class: classFilter } = await searchParams;
  const subject = getSubjectBySlug(slug);
  if (!subject) notFound();

  const classLevel = classFilter === "9" || classFilter === "10" ? classFilter : undefined;
  const chapters = classLevel
    ? getChaptersBySubjectAndClass(slug, classLevel)
    : getChaptersBySubjectAndClass(slug, "9").concat(getChaptersBySubjectAndClass(slug, "10"));

  const class9Chapters = getChaptersBySubjectAndClass(slug, "9");
  const class10Chapters = getChaptersBySubjectAndClass(slug, "10");
  const hasClass9 = class9Chapters.length > 0;
  const hasClass10 = class10Chapters.length > 0;
  const showBoth = !classLevel && hasClass9 && hasClass10;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Matric", href: "/matric" },
          { label: "Subjects", href: "/matric/subjects" },
          { label: subject.name, href: `/matric/subjects/${slug}` },
          { label: "Chapters" },
        ]}
      />

      <div className="mt-6">
        <h1 className="text-3xl font-bold text-slate-900">
          {subject.name} <span className="text-emerald-600">Chapters</span>
        </h1>
        <p className="mt-2 text-lg text-slate-600">
          Complete chapter breakdown for Matric {subject.name} — Punjab Textbook Board (PTB) curriculum
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Link
          href={`/matric/subjects/${slug}/chapters`}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            !classLevel ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          All Classes
        </Link>
        {hasClass9 && (
          <Link
            href={`/matric/subjects/${slug}/chapters?class=9`}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              classLevel === "9" ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            Class 9
          </Link>
        )}
        {hasClass10 && (
          <Link
            href={`/matric/subjects/${slug}/chapters?class=10`}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              classLevel === "10" ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            Class 10
          </Link>
        )}
      </div>

      {showBoth ? (
        <div className="mt-8 space-y-12">
          <ChapterSection title="Class 9" chapters={class9Chapters} />
          <ChapterSection title="Class 10" chapters={class10Chapters} />
        </div>
      ) : chapters.length > 0 ? (
        <div className="mt-8">
          <ChapterSection
            title={classLevel ? `Class ${classLevel}` : "Chapters"}
            chapters={chapters}
          />
        </div>
      ) : (
        <div className="mt-12 text-center">
          <p className="text-slate-500">No chapters available for this subject.</p>
        </div>
      )}

      <div className="mt-12 rounded-xl bg-slate-50 p-6">
        <h2 className="text-lg font-semibold text-slate-900">Subject Information</h2>
        <div className="mt-3 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
          <div>
            <span className="text-slate-500">Total Marks</span>
            <p className="font-semibold text-slate-900">{subject.marks.total}</p>
          </div>
          <div>
            <span className="text-slate-500">Passing Marks</span>
            <p className="font-semibold text-slate-900">{subject.marks.passing}</p>
          </div>
          <div>
            <span className="text-slate-500">Theory</span>
            <p className="font-semibold text-slate-900">{subject.marks.theory}</p>
          </div>
          <div>
            <span className="text-slate-500">Practical</span>
            <p className="font-semibold text-slate-900">{subject.marks.practical}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChapterSection({
  title,
  chapters,
}: {
  title: string;
  chapters: { id: string; number: number; title: string; topics: string[]; pageEstimate?: number }[];
}) {
  return (
    <section>
      <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
      <div className="mt-4 space-y-3">
        {chapters.map((ch) => (
          <div
            key={ch.id}
            className="rounded-xl border border-slate-200 bg-white p-4 transition-shadow hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-sm font-bold text-emerald-700">
                    {ch.number}
                  </span>
                  <h3 className="font-semibold text-slate-900">{ch.title}</h3>
                </div>
                {ch.topics.length > 0 && (
                  <div className="mt-2 ml-11">
                    <div className="flex flex-wrap gap-1.5">
                      {ch.topics.map((topic) => (
                        <span
                          key={topic}
                          className="rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-600"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {ch.pageEstimate && (
                <span className="text-xs text-slate-400">~{ch.pageEstimate} pages</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
