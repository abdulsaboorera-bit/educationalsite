import { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { intermediateGroups } from "@/lib/intermediate/groups";
import { intermediateBoards } from "@/lib/intermediate/boards";
import { entryTests } from "@/lib/intermediate/entry-tests";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: "Intermediate (HSSC) in Pakistan - FSc, ICS, FA, I.Com | PakEdu",
  description: "Complete guide to Intermediate education in Pakistan. FSc Pre-Medical, FSc Pre-Engineering, ICS, FA, I.Com. Subjects, past papers, results, calculators, career guidance.",
  keywords: ["intermediate", "HSSC", "FSc", "ICS", "FA", "I.Com", "11th class", "12th class", "intermediate result", "intermediate subjects"],
  alternates: { canonical: `${SITE_CONFIG.url}/intermediate` },
  openGraph: {
    title: "Intermediate (HSSC) in Pakistan | PakEdu",
    description: "Complete guide to Intermediate education in Pakistan.",
    url: `${SITE_CONFIG.url}/intermediate`,
    siteName: "PakEdu",
    locale: "en_PK",
    type: "website",
  },
};

const QUICK_LINKS = [
  { label: "Past Papers", href: "/intermediate/past-papers", icon: "📄", desc: "Board-wise past papers archive" },
  { label: "Results", href: "/intermediate/results", icon: "📊", desc: "Check 11th & 12th results" },
  { label: "Date Sheets", href: "/intermediate/date-sheets", icon: "📅", desc: "Exam schedules" },
  { label: "Calculators", href: "/intermediate/calculators", icon: "🧮", desc: "Percentage & aggregate calculators" },
  { label: "MCQs Practice", href: "/intermediate/mcqs", icon: "✍️", desc: "Chapter-wise MCQs" },
  { label: "Entry Tests", href: "/intermediate/entry-tests", icon: "🎯", desc: "MDCAT, ECAT, NET prep" },
  { label: "Scholarships", href: "/intermediate/scholarships", icon: "🎓", desc: "Financial aid opportunities" },
  { label: "Career Guide", href: "/intermediate/careers", icon: "🚀", desc: "Plan your future" },
];

export default function IntermediatePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Intermediate" }]} />
          <h1 className="text-4xl md:text-5xl font-bold mt-6">
            Intermediate (HSSC)
          </h1>
          <p className="text-indigo-100 mt-4 max-w-2xl text-lg">
            Your complete guide to Intermediate education in Pakistan. Choose your group, explore subjects, prepare for exams, and plan your university admission.
          </p>

          {/* Quick selector */}
          <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h2 className="text-lg font-semibold mb-4">What are you looking for?</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: "11th Class", href: "/intermediate/11" },
                { label: "12th Class", href: "/intermediate/12" },
                { label: "FSc Pre-Medical", href: "/intermediate/fsc-pre-medical" },
                { label: "FSc Pre-Engineering", href: "/intermediate/fsc-pre-engineering" },
                { label: "ICS", href: "/intermediate/ics" },
                { label: "FA", href: "/intermediate/fa" },
                { label: "I.Com", href: "/intermediate/icom" },
                { label: "All Boards", href: "/intermediate/boards" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-3 bg-white/20 hover:bg-white/30 rounded-xl text-sm font-medium transition-colors text-center"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Groups */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Choose Your Group</h2>
        <p className="text-slate-600 mb-8">Select the intermediate program that matches your career goals.</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {intermediateGroups.map((group) => (
            <Link
              key={group.slug}
              href={`/intermediate/${group.slug}`}
              className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg hover:border-indigo-300 transition-all"
            >
              <div className="text-4xl mb-4">{group.icon}</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{group.name}</h3>
              <p className="text-sm text-slate-600 mb-4">{group.description}</p>
              <div className="flex flex-wrap gap-1 mb-4">
                {group.electiveSubjects.slice(0, 3).map((s) => (
                  <span key={s} className="px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded text-xs font-medium">
                    {s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                  </span>
                ))}
              </div>
              <div className="text-sm text-indigo-600 font-medium">
                {group.careerPaths.length}+ career paths →
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick Links */}
      <section className="bg-white border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Resources & Tools</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {QUICK_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="bg-slate-50 border border-slate-200 rounded-xl p-5 hover:bg-indigo-50 hover:border-indigo-200 transition-all"
              >
                <span className="text-2xl">{link.icon}</span>
                <h3 className="font-semibold text-slate-900 mt-2">{link.label}</h3>
                <p className="text-sm text-slate-500 mt-1">{link.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Entry Tests */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Entry Tests</h2>
        <p className="text-slate-600 mb-8">Prepare for university admission tests.</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {entryTests.map((test) => (
            <Link
              key={test.slug}
              href={`/intermediate/entry-tests/${test.slug}`}
              className="bg-white border border-slate-200 rounded-xl p-5 hover:border-indigo-300 hover:shadow-md transition-all"
            >
              <h3 className="font-bold text-slate-900">{test.name}</h3>
              <p className="text-sm text-slate-500 mt-1">{test.conductingBody}</p>
              <p className="text-sm text-slate-600 mt-2">{test.eligibility}</p>
              <div className="mt-3 flex gap-2">
                <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs">{test.totalMarks} marks</span>
                <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs">{test.duration}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Boards */}
      <section className="bg-white border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Boards</h2>
          <p className="text-slate-600 mb-8">Find your education board.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {intermediateBoards.map((board) => (
              <Link
                key={board.slug}
                href={`/intermediate/boards/${board.slug}`}
                className="bg-slate-50 border border-slate-200 rounded-xl p-4 hover:border-indigo-200 transition-all"
              >
                <p className="font-semibold text-slate-900">{board.shortName}</p>
                <p className="text-xs text-slate-500">{board.province}</p>
              </Link>
            ))}
          </div>
          <Link href="/intermediate/boards" className="inline-block mt-4 text-sm text-indigo-600 hover:underline font-medium">
            View all boards →
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-slate-900 mb-8">Frequently Asked Questions</h2>
        <div className="space-y-6 text-sm text-slate-600">
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <h3 className="font-semibold text-slate-900 mb-2">What is Intermediate education in Pakistan?</h3>
            <p>Intermediate (also called HSSC - Higher Secondary School Certificate) is a two-year education program after Matriculation. It covers Class 11 (First Year) and Class 12 (Second Year) and prepares students for university education.</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <h3 className="font-semibold text-slate-900 mb-2">Which group should I choose after Matric?</h3>
            <p>Choose based on your interests and career goals. FSc Pre-Medical for medicine, FSc Pre-Engineering for engineering, ICS for computer science, FA for humanities, and I.Com for business/commerce.</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <h3 className="font-semibold text-slate-900 mb-2">What is the total marks for Intermediate?</h3>
            <p>Total marks vary by group. FSc Pre-Medical and Pre-Engineering: approximately 1100-1200 marks. ICS: approximately 1050-1150 marks. FA and I.Com: approximately 1000-1100 marks.</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <h3 className="font-semibold text-slate-900 mb-2">Can I change my group after 11th class?</h3>
            <p>Changing groups after starting is generally difficult. Some boards allow it with certain conditions. It is best to decide carefully before enrollment.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
