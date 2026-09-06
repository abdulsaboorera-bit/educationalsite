import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { subjects, getSubjectBySlug, getAllSubjectSlugs } from "@/lib/matric/subjects";
import { generateBreadcrumbSchema, generateFAQSchema } from "@/lib/matric/seo";
import { SITE_CONFIG } from "@/config/site";
import { BookOpen, FileText, Calculator, Clock } from "lucide-react";

interface SubjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSubjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: SubjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const subject = getSubjectBySlug(slug);
  if (!subject) return { title: "Subject Not Found" };

  return {
    title: subject.meta_title,
    description: subject.meta_description,
    openGraph: {
      title: subject.meta_title,
      description: subject.meta_description,
      url: `${SITE_CONFIG.url}/matric/subjects/${slug}`,
    },
  };
}

const SUBJECT_FAQS = [
  { question: "How do I prepare for Matric exams?", answer: "Start with understanding the syllabus, then study chapter by chapter. Solve past papers, practice MCQs, and revise important questions regularly." },
  { question: "Are past papers important for Matric?", answer: "Yes, past papers are very important. They help you understand the exam pattern, important topics, and time management." },
  { question: "How many chapters are there in each subject?", answer: "The number of chapters varies by subject. Most subjects have 8-17 chapters in Matric." },
];

export default async function SubjectPage({ params }: SubjectPageProps) {
  const { slug } = await params;
  const subject = getSubjectBySlug(slug);
  if (!subject) notFound();

  const relatedSubjects = subjects
    .filter((s) => s.group === subject.group && s.slug !== subject.slug)
    .slice(0, 4);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { label: "Home", href: "/" },
    { label: "Matric", href: "/matric" },
    { label: "Subjects", href: "/matric/subjects" },
    { label: subject.name, href: `/matric/subjects/${slug}` },
  ]);
  const faqSchema = generateFAQSchema(SUBJECT_FAQS);

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Matric", href: "/matric" },
              { label: "Subjects", href: "/matric/subjects" },
              { label: subject.name },
            ]}
            className="text-emerald-100/80 [&_a]:text-white/80 [&_a]:hover:text-white"
          />
          <div className="mt-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="px-2.5 py-1 rounded-md bg-white/20 text-xs font-medium">
                {subject.group === "science" ? "Science Group" : subject.group === "computer_science" ? "Computer Science" : subject.group === "arts" ? "Arts Group" : "Compulsory"}
              </span>
              <span className="px-2.5 py-1 rounded-md bg-white/20 text-xs font-medium">
                Class {subject.class_level}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">{subject.name}</h1>
            <p className="text-lg text-emerald-100/80 max-w-2xl">{subject.description}</p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* Quick Info */}
        <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <div className="text-sm text-slate-500 mb-1">Total Marks</div>
            <div className="text-2xl font-bold text-slate-900">{subject.marks.total}</div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <div className="text-sm text-slate-500 mb-1">Theory Marks</div>
            <div className="text-2xl font-bold text-slate-900">{subject.marks.theory}</div>
          </div>
          {subject.has_practical && (
            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <div className="text-sm text-slate-500 mb-1">Practical Marks</div>
              <div className="text-2xl font-bold text-slate-900">{subject.marks.practical}</div>
            </div>
          )}
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <div className="text-sm text-slate-500 mb-1">Passing Marks</div>
            <div className="text-2xl font-bold text-slate-900">{subject.marks.passing}</div>
          </div>
        </section>

        {/* Marks Breakdown */}
        <section className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Marks Distribution</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Theory Paper</span>
              <div className="flex items-center gap-2">
                <div className="w-48 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${(subject.marks.theory / subject.marks.total) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-slate-900 w-16 text-right">{subject.marks.theory} marks</span>
              </div>
            </div>
            {subject.has_practical && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Practical</span>
                <div className="flex items-center gap-2">
                  <div className="w-48 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${(subject.marks.practical / subject.marks.total) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-slate-900 w-16 text-right">{subject.marks.practical} marks</span>
                </div>
              </div>
            )}
            <div className="flex items-center justify-between pt-2 border-t border-slate-200">
              <span className="text-sm font-semibold text-slate-900">Total</span>
              <span className="text-sm font-bold text-emerald-600">{subject.marks.total} marks</span>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-4">Resources</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: FileText, title: "Past Papers", description: "Solve past papers for better preparation", href: "/matric/boards" },
              { icon: BookOpen, title: "Syllabus", description: "View complete syllabus", href: `/matric/class-${subject.class_level}` },
              { icon: Calculator, title: "Percentage Calculator", description: "Calculate your percentage", href: "/calculators/percentage" },
              { icon: Clock, title: "Study Planner", description: "Plan your preparation", href: "/matric" },
            ].map((action) => (
              <Link
                key={action.title}
                href={action.href}
                className="group p-4 rounded-xl border border-slate-200 bg-white hover:border-emerald-200 hover:shadow-md transition-all"
              >
                <action.icon className="h-5 w-5 text-emerald-600 mb-2" />
                <h3 className="text-sm font-semibold text-slate-900 mb-1">{action.title}</h3>
                <p className="text-xs text-slate-500">{action.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Related Subjects */}
        {relatedSubjects.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-4">Related Subjects</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedSubjects.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/matric/subjects/${rel.slug}`}
                  className="group p-4 rounded-xl border border-slate-200 bg-white hover:border-emerald-200 hover:shadow-md transition-all"
                >
                  <h3 className="text-sm font-semibold text-slate-900 group-hover:text-emerald-600 transition-colors mb-1">{rel.name}</h3>
                  <p className="text-xs text-slate-500">{rel.marks.total} marks · Class {rel.class_level}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* FAQ */}
        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {SUBJECT_FAQS.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 p-5">
                <h3 className="font-semibold text-slate-900 mb-2">{faq.question}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
