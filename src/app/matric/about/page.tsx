import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { generateBreadcrumbSchema, generateFAQSchema } from "@/lib/matric/seo";
import { SITE_CONFIG } from "@/config/site";
import { GraduationCap, Calculator, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "What is Matric? Complete Guide to Matriculation in Pakistan",
  description: "Learn everything about Matric (Matriculation) in Pakistan. Education system, subjects, grading, examination process, and what to do after Matric.",
  keywords: [
    "what is matric", "matriculation pakistan", "matric education system",
    "after matric", "matric subjects", "matric grading",
  ],
  openGraph: {
    title: "What is Matric? Complete Guide to Matriculation in Pakistan",
    description: "Learn everything about Matric (Matriculation) in Pakistan.",
    url: `${SITE_CONFIG.url}/matric/about`,
  },
};

const FAQS = [
  { question: "What is Matriculation?", answer: "Matriculation (Matric) is the secondary education system in Pakistan, comprising Class 9 and Class 10. It is the first major educational milestone for students." },
  { question: "What is the difference between Matric and Intermediate?", answer: "Matric is secondary education (Class 9-10), while Intermediate is higher secondary education (Class 11-12). Students must complete Matric before enrolling in Intermediate." },
  { question: "What are the career options after Matric?", answer: "After Matric, students can pursue FSc (Pre-Medical or Pre-Engineering), ICS (Computer Science), I.Com (Commerce), FA (Arts), DAE (Diploma), or various vocational courses." },
  { question: "Is Matric necessary for university?", answer: "Yes, Matric is the minimum educational requirement for further education. After Matric, students complete Intermediate (FSc/ICS/FA), then apply to universities." },
  { question: "What is the grading system for Matric?", answer: "Most boards use: A+ (80%+), A (70-79%), B (60-69%), C (50-59%), D (40-49%), F (below 40%). The passing percentage is 40%." },
];

export default function AboutMatricPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { label: "Home", href: "/" },
    { label: "Matric", href: "/matric" },
    { label: "About", href: "/matric/about" },
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
      <section className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Matric", href: "/matric" }, { label: "About" }]}
            className="text-slate-300/80 [&_a]:text-white/80 [&_a]:hover:text-white"
          />
          <h1 className="text-3xl md:text-4xl font-bold mt-6 mb-4">What is Matric?</h1>
          <p className="text-lg text-slate-300/90 max-w-2xl">
            A comprehensive guide to understanding the Matriculation education system in Pakistan.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* What is Matric */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Understanding Matriculation</h2>
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-600 leading-relaxed">
              <strong>Matriculation (Matric)</strong> is the secondary education system in Pakistan,
              consisting of <strong>Class 9 (Ninth Grade)</strong> and <strong>Class 10 (Tenth Grade)</strong>.
              It is the first major educational milestone that every student in Pakistan must complete.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Upon successful completion of both Class 9 and Class 10 board examinations, students
              receive the <strong>Secondary School Certificate (SSC)</strong>. This certificate is
              essential for admission to intermediate (higher secondary) education.
            </p>
            <p className="text-slate-600 leading-relaxed">
              The Matric system is regulated by various educational boards across Pakistan, including
              provincial boards in Punjab, Sindh, KPK, and Balochistan, as well as the Federal Board
              (FBISE) for Islamabad and cantonment areas.
            </p>
          </div>
        </section>

        {/* Education Journey */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">The Student Journey</h2>
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              {[
                { level: "Matric", desc: "Class 9 & 10", color: "emerald" },
                { level: "Intermediate", desc: "FSc / ICS / FA", color: "blue" },
                { level: "University", desc: "Bachelor's Degree", color: "purple" },
                { level: "Career", desc: "Professional Life", color: "orange" },
              ].map((step, i) => (
                <div key={step.level} className="flex items-center gap-4 flex-1">
                  <div className="flex-1">
                    <div className={`h-12 w-12 rounded-xl bg-${step.color}-50 flex items-center justify-center text-${step.color}-600 mb-2`}>
                      <GraduationCap className="h-6 w-6" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900">{step.level}</h3>
                    <p className="text-xs text-slate-500">{step.desc}</p>
                  </div>
                  {i < 3 && <ArrowRight className="h-5 w-5 text-slate-300 flex-shrink-0 hidden md:block" />}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Information */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Key Information</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-3">Examination System</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• Annual examinations conducted by boards</li>
                <li>• Class 9 and Class 10 exams held separately</li>
                <li>• Theory papers for all subjects</li>
                <li>• Practical exams for Science group</li>
                <li>• Supplementary exams available</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-3">Subject Groups</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• <strong>Science Group:</strong> Physics, Chemistry, Biology</li>
                <li>• <strong>CS Group:</strong> Physics, Computer Science</li>
                <li>• <strong>Arts Group:</strong> Various electives</li>
                <li>• Compulsory: English, Urdu, Math, Islamiat, Pak Studies</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-3">Grading System</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• <strong>A+:</strong> 80% and above (Distinction)</li>
                <li>• <strong>A:</strong> 70-79% (First Division)</li>
                <li>• <strong>B:</strong> 60-69% (Second Division)</li>
                <li>• <strong>C:</strong> 50-59% (Third Division)</li>
                <li>• <strong>D:</strong> 40-49% (Pass)</li>
                <li>• <strong>F:</strong> Below 40% (Fail)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* After Matric */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">What After Matric?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "FSc Pre-Medical", desc: "For students who want to pursue medicine, pharmacy, or biological sciences.", color: "emerald" },
              { title: "FSc Pre-Engineering", desc: "For students who want to pursue engineering, technology, or architecture.", color: "blue" },
              { title: "ICS (Computer Science)", desc: "For students interested in computer science, IT, and software development.", color: "purple" },
              { title: "I.Com (Commerce)", desc: "For students interested in business, accounting, and commerce.", color: "orange" },
              { title: "FA (Arts/Humanities)", desc: "For students interested in arts, humanities, and social sciences.", color: "pink" },
              { title: "DAE (Diploma)", desc: "Technical and vocational diploma programs for practical skills.", color: "teal" },
            ].map((option) => (
              <div key={option.title} className="bg-white rounded-xl border border-slate-200 p-5">
                <h3 className="text-base font-bold text-slate-900 mb-2">{option.title}</h3>
                <p className="text-sm text-slate-500">{option.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-emerald-50 rounded-xl border border-emerald-200 p-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Ready to Start Your Matric Journey?</h2>
          <p className="text-slate-600 mb-6 max-w-xl mx-auto">
            Find your board, explore subjects, use calculators, and access past papers to prepare effectively.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/matric/boards" className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors">
              Find Your Board <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/calculators/percentage" className="inline-flex items-center gap-2 bg-white text-emerald-700 border border-emerald-300 px-6 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-colors">
              <Calculator className="h-4 w-4" /> Percentage Calculator
            </Link>
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
