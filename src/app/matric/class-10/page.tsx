import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { getSubjectsByClass, getCombination } from "@/lib/matric/subjects";
import { getClassInfo } from "@/lib/matric/classes";
import { generateBreadcrumbSchema, generateFAQSchema } from "@/lib/matric/seo";
import { SITE_CONFIG } from "@/config/site";
import { ChevronRight, Calculator, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Class 10 (Tenth Grade) - Subjects, Syllabus, Past Papers | PakEdu",
  description: "Complete guide for Class 10 students in Pakistan. All subjects, marks distribution, syllabus, past papers, and preparation resources for Science, Computer Science, and Arts groups.",
  keywords: [
    "class 10", "tenth grade", "class 10 subjects", "class 10 syllabus", "class 10 past papers",
    "class 10 result", "class 10 date sheet", "10th class", "matric class 10",
  ],
  openGraph: {
    title: "Class 10 (Tenth Grade) - Subjects, Syllabus, Past Papers | PakEdu",
    description: "Complete guide for Class 10 students in Pakistan. Subjects, syllabus, past papers, and preparation tips.",
    url: `${SITE_CONFIG.url}/matric/class-10`,
  },
};

const FAQS = [
  { question: "How many subjects are there in Class 10?", answer: "Class 10 has 7-8 subjects depending on the group. Science group has 8 subjects, Computer Science group has 7 subjects, and Arts group has 7 subjects." },
  { question: "What is the total marks for Class 10?", answer: "Total marks vary by group: Science group has 700 marks, Computer Science group has 650 marks, and Arts group has 550 marks." },
  { question: "Is Class 10 harder than Class 9?", answer: "Class 10 builds upon Class 9 concepts and may be slightly more advanced. However, with consistent preparation, students can perform well in both classes." },
  { question: "When is the Class 10 result announced?", answer: "Class 10 results are typically announced 2-3 months after the examinations, usually in June-July." },
];

export default function Class10Page() {
  const class10 = getClassInfo("10");
  const subjectsList = getSubjectsByClass("10");
  const scienceCombo = getCombination("10", "science");
  const csCombo = getCombination("10", "computer_science");
  const artsCombo = getCombination("10", "arts");
  const breadcrumbSchema = generateBreadcrumbSchema([
    { label: "Home", href: "/" },
    { label: "Matric", href: "/matric" },
    { label: "Class 10", href: "/matric/class-10" },
  ]);
  const faqSchema = generateFAQSchema(FAQS);

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
      <section className="bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Matric", href: "/matric" }, { label: "Class 10" }]}
            className="text-purple-100/80 [&_a]:text-white/80 [&_a]:hover:text-white"
          />
          <h1 className="text-3xl md:text-4xl font-bold mt-6 mb-4">Class 10 (Tenth Grade)</h1>
          <p className="text-lg text-purple-100/90 max-w-2xl mb-6">
            {class10?.description}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/matric/boards" className="inline-flex items-center gap-2 bg-white text-purple-700 px-5 py-2.5 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
              <FileText className="h-4 w-4" /> Past Papers
            </Link>
            <Link href="/calculators/percentage" className="inline-flex items-center gap-2 bg-purple-500/20 text-white border border-white/30 px-5 py-2.5 rounded-lg font-semibold hover:bg-purple-500/30 transition-colors">
              <Calculator className="h-4 w-4" /> Percentage Calculator
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* Exam Info */}
        <section className="grid sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="text-sm text-slate-500 mb-1">Exam Structure</div>
            <div className="text-sm font-medium text-slate-900">{class10?.exam_structure}</div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="text-sm text-slate-500 mb-1">Passing Criteria</div>
            <div className="text-sm font-medium text-slate-900">{class10?.passing_criteria}</div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="text-sm text-slate-500 mb-1">Total Compulsory Marks</div>
            <div className="text-sm font-medium text-slate-900">{class10?.total_compulsory_marks} marks</div>
          </div>
        </section>

        {/* Subject Groups */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Subject Groups</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Science Group */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Science Group</h3>
              <p className="text-sm text-slate-500 mb-4">{scienceCombo?.description}</p>
              <div className="text-sm font-semibold text-emerald-600 mb-3">Total Marks: {scienceCombo?.total_marks}</div>
              <div className="space-y-2">
                {scienceCombo?.subjects.map((slug) => {
                  const subject = subjectsList.find((s) => s.slug === slug);
                  if (!subject) return null;
                  return (
                    <div key={slug} className="flex items-center justify-between py-1.5 border-b border-slate-100 last:border-0">
                      <Link href={`/matric/subjects/${slug}`} className="text-sm text-slate-700 hover:text-emerald-600 transition-colors">
                        {subject.name}
                      </Link>
                      <span className="text-xs text-slate-400">{subject.marks.total} marks</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CS Group */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Computer Science Group</h3>
              <p className="text-sm text-slate-500 mb-4">{csCombo?.description}</p>
              <div className="text-sm font-semibold text-emerald-600 mb-3">Total Marks: {csCombo?.total_marks}</div>
              <div className="space-y-2">
                {csCombo?.subjects.map((slug) => {
                  const subject = subjectsList.find((s) => s.slug === slug);
                  if (!subject) return null;
                  return (
                    <div key={slug} className="flex items-center justify-between py-1.5 border-b border-slate-100 last:border-0">
                      <Link href={`/matric/subjects/${slug}`} className="text-sm text-slate-700 hover:text-emerald-600 transition-colors">
                        {subject.name}
                      </Link>
                      <span className="text-xs text-slate-400">{subject.marks.total} marks</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Arts Group */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Arts / Humanities Group</h3>
              <p className="text-sm text-slate-500 mb-4">{artsCombo?.description}</p>
              <div className="text-sm font-semibold text-emerald-600 mb-3">Total Marks: {artsCombo?.total_marks}</div>
              <div className="space-y-2">
                {artsCombo?.subjects.map((slug) => {
                  const subject = subjectsList.find((s) => s.slug === slug);
                  if (!subject) return null;
                  return (
                    <div key={slug} className="flex items-center justify-between py-1.5 border-b border-slate-100 last:border-0">
                      <Link href={`/matric/subjects/${slug}`} className="text-sm text-slate-700 hover:text-emerald-600 transition-colors">
                        {subject.name}
                      </Link>
                      <span className="text-xs text-slate-400">{subject.marks.total} marks</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* All Subjects */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">All Class 10 Subjects</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {subjectsList.map((subject) => (
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
                  <span>{subject.chapters} chapters</span>
                  {subject.has_practical && <span className="text-emerald-600">Has Practical</span>}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {FAQS.map((faq, i) => (
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
