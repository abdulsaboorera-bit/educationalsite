import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { boards, getProvincesWithBoards } from "@/lib/matric/boards";
import { getSubjectsByClass } from "@/lib/matric/subjects";
import { classes } from "@/lib/matric/classes";
import { generateBreadcrumbSchema, generateFAQSchema } from "@/lib/matric/seo";
import { SITE_CONFIG } from "@/config/site";
import { BookOpen, GraduationCap, Calculator, FileText, Clock, Trophy, ChevronRight, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Matric (Secondary Education) in Pakistan - Complete Guide",
  description: "Complete guide to Matriculation education in Pakistan. Class 9 & 10 subjects, boards, results, date sheets, past papers, syllabus, calculators, and career guidance.",
  keywords: [
    "matric", "matriculation", "class 9", "class 10", "secondary education",
    "board of intermediate and secondary education", "matric result", "matric subjects",
    "matric syllabus", "matric date sheet", "matric past papers", "matric percentage calculator",
  ],
  openGraph: {
    title: "Matric (Secondary Education) in Pakistan - Complete Guide",
    description: "Complete guide to Matriculation education in Pakistan. Class 9 & 10 subjects, boards, results, and preparation resources.",
    url: `${SITE_CONFIG.url}/matric`,
  },
};

const FAQS = [
  {
    question: "What is Matric in Pakistan?",
    answer: "Matric (Matriculation) is the secondary education system in Pakistan, consisting of Class 9 and Class 10. It is the first major educational milestone, and students receive a Secondary School Certificate (SSC) upon passing both classes.",
  },
  {
    question: "What are the passing marks for Matric?",
    answer: "The passing marks for Matric are 40% in each subject. For a subject with 100 total marks, you need at least 40 marks to pass. For subjects with 50 total marks, you need at least 20 marks.",
  },
  {
    question: "How many subjects are there in Matric?",
    answer: "In the Science group, there are 7-8 subjects including English, Urdu, Mathematics, Islamiat, Pakistan Studies, Physics, Chemistry, and Biology. The Arts group has 6-7 subjects with elective subjects instead of Science subjects.",
  },
  {
    question: "What is the total marks for Matric?",
    answer: "Total marks vary by group. Science group: approximately 1100 marks (Class 9 + Class 10 combined). Computer Science group: approximately 1000 marks. Arts group: approximately 900-1000 marks.",
  },
  {
    question: "Which board is best for Matric in Pakistan?",
    answer: "All boards follow the same curriculum set by the federal government. The quality of education depends more on the school and student effort than the board. However, FBISE and Lahore Board are among the most popular boards.",
  },
];

export default function MatricPage() {
  const provinces = getProvincesWithBoards();
  const class9Subjects = getSubjectsByClass("9");
  const class10Subjects = getSubjectsByClass("10");
  const breadcrumbSchema = generateBreadcrumbSchema([
    { label: "Home", href: "/" },
    { label: "Matric", href: "/matric" },
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

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-900 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Matric" }]}
            className="text-emerald-100/80 [&_a]:text-white/80 [&_a]:hover:text-white"
          />
          <h1 className="text-4xl md:text-5xl font-bold mt-6 mb-4">
            Matric (Secondary Education) in Pakistan
          </h1>
          <p className="text-lg text-emerald-100/90 max-w-3xl mb-8">
            Your complete guide to Matriculation education. Find information about Class 9 and Class 10,
            all educational boards, subjects, results, date sheets, past papers, and preparation resources.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/matric/boards"
              className="inline-flex items-center gap-2 bg-white text-emerald-700 px-6 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-colors"
            >
              <MapPin className="h-5 w-5" />
              Find Your Board
            </Link>
            <Link
              href="/matric/class-9"
              className="inline-flex items-center gap-2 bg-emerald-500/20 text-white border border-white/30 px-6 py-3 rounded-lg font-semibold hover:bg-emerald-500/30 transition-colors"
            >
              <BookOpen className="h-5 w-5" />
              Class 9
            </Link>
            <Link
              href="/matric/class-10"
              className="inline-flex items-center gap-2 bg-emerald-500/20 text-white border border-white/30 px-6 py-3 rounded-lg font-semibold hover:bg-emerald-500/30 transition-colors"
            >
              <GraduationCap className="h-5 w-5" />
              Class 10
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* What is Matric? */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">What is Matric?</h2>
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-600 leading-relaxed">
              Matric (Matriculation) is the secondary education system in Pakistan, comprising{" "}
              <strong>Class 9 (Ninth Grade)</strong> and <strong>Class 10 (Tenth Grade)</strong>.
              It is the first major educational milestone for students in Pakistan and is conducted
              by various educational boards across the country.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Upon successful completion of both Class 9 and Class 10 examinations, students receive
              the <strong>Secondary School Certificate (SSC)</strong>, which is essential for further
              education at the intermediate (FSc/ICS/FA) level.
            </p>
            <p className="text-slate-600 leading-relaxed">
              The Matric system is divided into three main groups: <strong>Science Group</strong> (Physics,
              Chemistry, Biology), <strong>Computer Science Group</strong> (Physics, Computer Science),
              and <strong>Arts/Humanities Group</strong> (various elective subjects).
            </p>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: MapPin, label: "Educational Boards", value: `${boards.length}+`, color: "emerald" },
            { icon: BookOpen, label: "Subjects", value: `${class9Subjects.length + class10Subjects.length}`, color: "blue" },
            { icon: GraduationCap, label: "Classes", value: "2", color: "purple" },
            { icon: Calculator, label: "Calculators", value: "10+", color: "orange" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl border border-slate-200 p-5 text-center">
              <stat.icon className="h-8 w-8 mx-auto mb-2 text-emerald-600" />
              <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
              <div className="text-sm text-slate-500">{stat.label}</div>
            </div>
          ))}
        </section>

        {/* Classes */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Classes</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {classes.map((cls) => (
              <Link
                key={cls.level}
                href={`/matric/class-${cls.level}`}
                className="group bg-white rounded-xl border border-slate-200 p-6 hover:border-emerald-200 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="h-12 w-12 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-100 transition-colors">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <ChevronRight className="h-5 w-5 text-slate-300 group-hover:text-emerald-500 transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{cls.name}</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-3">{cls.description}</p>
                <div className="flex flex-wrap gap-2">
                  {cls.groups.map((group) => (
                    <span key={group} className="px-2.5 py-1 rounded-md bg-slate-100 text-xs font-medium text-slate-600">
                      {group === "science" ? "Science" : group === "computer_science" ? "Computer Science" : "Arts"}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Boards by Province */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Educational Boards</h2>
            <Link href="/matric/boards" className="text-sm font-medium text-emerald-600 hover:text-emerald-700">
              View All →
            </Link>
          </div>
          <div className="space-y-6">
            {provinces.map((province) => (
              <div key={province.slug}>
                <h3 className="text-lg font-semibold text-slate-800 mb-3">{province.name}</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {province.boards.map((board) => (
                    <Link
                      key={board.slug}
                      href={`/matric/boards/${board.slug}`}
                      className="group flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:border-emerald-200 hover:bg-emerald-50/50 transition-all"
                    >
                      <div className="h-8 w-8 rounded-md bg-emerald-50 flex items-center justify-center text-emerald-600 text-xs font-bold flex-shrink-0 group-hover:bg-emerald-100">
                        {board.province.abbreviation}
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-slate-900 truncate">{board.short_name}</div>
                        <div className="text-xs text-slate-500">{board.city}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Links */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Quick Links</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: FileText, title: "Past Papers", description: "Board-wise past papers for all subjects", href: "/matric/boards" },
              { icon: Calculator, title: "Percentage Calculator", description: "Calculate your matric percentage", href: "/calculators/percentage" },
              { icon: Clock, title: "Date Sheets", description: "Exam schedules and timetables", href: "/matric/boards" },
              { icon: Trophy, title: "Results", description: "Check your matric results", href: "/matric/boards" },
              { icon: GraduationCap, title: "After Matric", description: "Career guidance and next steps", href: "/matric/about" },
              { icon: BookOpen, title: "Syllabus", description: "Complete syllabus for all subjects", href: "/matric/subjects" },
            ].map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="group p-4 rounded-xl border border-slate-200 bg-white hover:border-emerald-200 hover:shadow-md transition-all"
              >
                <link.icon className="h-6 w-6 text-emerald-600 mb-2" />
                <h3 className="text-sm font-semibold text-slate-900 mb-1">{link.title}</h3>
                <p className="text-xs text-slate-500">{link.description}</p>
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
