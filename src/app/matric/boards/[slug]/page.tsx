import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { getBoardBySlug, getAllBoardSlugs } from "@/lib/matric/boards";
import { getClassInfo, getMatricTotalMarks } from "@/lib/matric/classes";
import { generateBreadcrumbSchema, generateFAQSchema } from "@/lib/matric/seo";
import { SITE_CONFIG } from "@/config/site";
import { MapPin, ExternalLink, BookOpen, GraduationCap, FileText, Clock, Calculator } from "lucide-react";

interface BoardPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllBoardSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BoardPageProps): Promise<Metadata> {
  const { slug } = await params;
  const board = getBoardBySlug(slug);
  if (!board) return { title: "Board Not Found" };

  return {
    title: board.meta_title,
    description: board.meta_description,
    openGraph: {
      title: board.meta_title,
      description: board.meta_description,
      url: `${SITE_CONFIG.url}/matric/boards/${slug}`,
    },
  };
}

const BOARD_FAQS = [
  { question: "When are matric results announced?", answer: "Matric results are typically announced 2-3 months after the examinations. Results for Class 9 and Class 10 are usually announced separately." },
  { question: "How can I check my matric result?", answer: "You can check your result on the official board website, via SMS, or through gazette. Visit your board's official website for the most accurate information." },
  { question: "What is the grading system for matric?", answer: "Most boards use a standard grading system: A+ (80%+), A (70-79%), B (60-69%), C (50-59%), D (40-49%), F (below 40%)." },
];

export default async function BoardPage({ params }: BoardPageProps) {
  const { slug } = await params;
  const board = getBoardBySlug(slug);
  if (!board) notFound();

  const class9 = getClassInfo("9");
  const class10 = getClassInfo("10");
  const class9Total = getMatricTotalMarks("science");
  const breadcrumbSchema = generateBreadcrumbSchema([
    { label: "Home", href: "/" },
    { label: "Matric", href: "/matric" },
    { label: "Boards", href: "/matric/boards" },
    { label: board.short_name, href: `/matric/boards/${slug}` },
  ]);
  const faqSchema = generateFAQSchema(BOARD_FAQS);

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

      {/* Board Header */}
      <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Matric", href: "/matric" },
              { label: "Boards", href: "/matric/boards" },
              { label: board.short_name },
            ]}
            className="text-emerald-100/80 [&_a]:text-white/80 [&_a]:hover:text-white"
          />
          <div className="mt-6 flex items-start gap-4">
            <div className="h-14 w-14 rounded-xl bg-white/20 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
              {board.province.abbreviation}
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">{board.name}</h1>
              <p className="text-emerald-100/80 mb-3">{board.description}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-emerald-100/70">
                <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{board.city}</span>
                <span>Est. {board.established}</span>
                <a href={board.official_website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-white transition-colors">
                  Official Website <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* Quick Info Grid */}
        <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Marks (Matric)", value: `${class9Total}`, icon: Calculator },
            { label: "Passing Marks", value: `${board.total_marks.passing} (${board.total_marks.passing_percentage}%)`, icon: FileText },
            { label: "Classes", value: "Class 9 & Class 10", icon: BookOpen },
            { label: "Grading", value: board.grading_system.name, icon: GraduationCap },
          ].map((item) => (
            <div key={item.label} className="bg-white rounded-xl border border-slate-200 p-4">
              <item.icon className="h-5 w-5 text-emerald-600 mb-2" />
              <div className="text-sm font-medium text-slate-500 mb-1">{item.label}</div>
              <div className="text-lg font-bold text-slate-900">{item.value}</div>
            </div>
          ))}
        </section>

        {/* Jurisdiction */}
        <section className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-3">Jurisdiction / Areas</h2>
          <div className="flex flex-wrap gap-2">
            {board.jurisdiction.map((area) => (
              <span key={area} className="px-3 py-1.5 rounded-lg bg-emerald-50 text-sm font-medium text-emerald-700">
                {area}
              </span>
            ))}
          </div>
        </section>

        {/* Grading System */}
        <section className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Grading System</h2>
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
                {board.grading_system.grades.map((grade) => (
                  <tr key={grade.grade} className="border-b border-slate-100 last:border-0">
                    <td className="py-2 px-3 font-bold text-slate-900">{grade.grade}</td>
                    <td className="py-2 px-3 text-slate-600">{grade.label}</td>
                    <td className="py-2 px-3 text-slate-600">{grade.min_percentage}% - {grade.max_percentage}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Class Information */}
        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-4">Class Information</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[class9, class10].filter(Boolean).map((cls) => (
              <div key={cls!.level} className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="text-base font-bold text-slate-900 mb-2">{cls!.name}</h3>
                <p className="text-sm text-slate-500 mb-4">{cls!.description}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Exam Structure</span>
                    <span className="font-medium text-slate-900">{cls!.exam_structure}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Passing Criteria</span>
                    <span className="font-medium text-slate-900">{cls!.passing_criteria}</span>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {cls!.groups.map((group) => (
                    <Link
                      key={group}
                      href={`/matric/class-${cls!.level}`}
                      className="px-3 py-1.5 rounded-lg bg-emerald-50 text-xs font-medium text-emerald-700 hover:bg-emerald-100 transition-colors"
                    >
                      {group === "science" ? "Science" : group === "computer_science" ? "Computer Science" : "Arts"} Group
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: FileText, title: "Past Papers", description: "View past papers for this board", href: `/matric/boards/${slug}#past-papers` },
              { icon: Clock, title: "Date Sheet", description: "Exam schedule and timetable", href: `/matric/boards/${slug}#date-sheet` },
              { icon: Calculator, title: "Percentage Calculator", description: "Calculate your percentage", href: "/calculators/percentage" },
              { icon: GraduationCap, title: "Results", description: "Check your examination results", href: `/matric/boards/${slug}#results` },
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

        {/* FAQ */}
        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {BOARD_FAQS.map((faq, i) => (
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
