import { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "After Matric - Career Options, Programs & Guidance | PakEdu",
  description:
    "Complete guide for students after Matriculation. Explore career options, intermediate programs, diploma courses, and admission guidance in Pakistan.",
  alternates: { canonical: "https://pakedu.pk/matric/after-matric" },
  openGraph: {
    title: "After Matric - Career Options & Guidance | PakEdu",
    description: "Complete guide for students after Matriculation in Pakistan.",
    url: "https://pakedu.pk/matric/after-matric",
    siteName: "PakEdu",
    locale: "en_PK",
    type: "website",
  },
};

const PATHWAYS = [
  {
    title: "FSc (Pre-Medical)",
    slug: "fsc-pre-medical",
    description: "For students who want to pursue medicine, dentistry, pharmacy, or allied health sciences.",
    duration: "2 years (Class 11 & 12)",
    subjects: ["Physics", "Chemistry", "Biology"],
    careers: ["Doctor", "Dentist", "Pharmacist", "Veterinary", "Biotechnologist"],
    icon: "🧬",
    color: "emerald",
  },
  {
    title: "FSc (Pre-Engineering)",
    slug: "fsc-pre-engineering",
    description: "For students who want to become engineers, architects, or technical professionals.",
    duration: "2 years (Class 11 & 12)",
    subjects: ["Physics", "Chemistry", "Mathematics"],
    careers: ["Engineer", "Architect", "Software Developer", "Data Scientist", "Pilot"],
    icon: "⚙️",
    color: "blue",
  },
  {
    title: "ICS (Computer Science)",
    slug: "ics",
    description: "For students interested in computer science, IT, and software development.",
    duration: "2 years (Class 11 & 12)",
    subjects: ["Physics", "Computer Science", "Mathematics"],
    careers: ["Software Engineer", "Web Developer", "IT Manager", "Data Analyst", "Cybersecurity"],
    icon: "💻",
    color: "purple",
  },
  {
    title: "Commerce / I.Com",
    slug: "commerce",
    description: "For students interested in business, accounting, finance, and commerce.",
    duration: "2 years (Class 11 & 12)",
    subjects: ["Accounting", "Business Studies", "Economics"],
    careers: ["Accountant", "Banker", "Business Manager", "Entrepreneur", "Auditor"],
    icon: "📊",
    color: "amber",
  },
  {
    title: "Arts / Humanities",
    slug: "arts",
    description: "For students interested in social sciences, languages, literature, and arts.",
    duration: "2 years (Class 11 & 12)",
    subjects: ["English", "Urdu", "Political Science", "Sociology", "History"],
    careers: ["Civil Servant", "Journalist", "Teacher", "Lawyer", "Social Worker"],
    icon: "📚",
    color: "rose",
  },
  {
    title: "Technical / Vocational",
    slug: "technical",
    description: "For students who want practical skills for immediate employment.",
    duration: "6 months - 2 years",
    subjects: ["Practical Training", "Technical Skills"],
    careers: ["Technician", "Electrician", "Plumber", "Auto Mechanic", "Graphic Designer"],
    icon: "🔧",
    color: "slate",
  },
];

const DIPLOMA_PROGRAMS = [
  { name: "DAE (Diploma of Associate Engineering)", duration: "3 years", eligibility: "Matric with Science", careers: "Technician, Junior Engineer" },
  { name: "DIT (Diploma in Information Technology)", duration: "1 year", eligibility: "Matric", careers: "IT Support, Web Developer" },
  { name: "DBA (Diploma in Business Administration)", duration: "1 year", eligibility: "Matric", careers: "Office Assistant, Supervisor" },
  { name: "DCom (Diploma in Commerce)", duration: "1 year", eligibility: "Matric", careers: "Accountant, Bookkeeper" },
  { name: "Medical Technology", duration: "2 years", eligibility: "Matric with Science", careers: "Lab Technician, X-Ray Tech" },
];

export default function AfterMatricPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <Breadcrumbs
            items={[
              { label: "Matric", href: "/matric" },
              { label: "After Matric" },
            ]}
          />
          <h1 className="text-3xl md:text-4xl font-bold mt-4">
            After Matric - Your Next Steps
          </h1>
          <p className="text-orange-100 mt-2 max-w-2xl text-lg">
            Confused about what to do after Matric? Explore all your options - from
            intermediate programs to diploma courses and career paths.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Choose Your Path</h2>
          <p className="text-slate-600">Select a pathway that matches your interests and career goals.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {PATHWAYS.map((pathway) => (
            <div
              key={pathway.slug}
              className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-all"
            >
              <div className="text-4xl mb-4">{pathway.icon}</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{pathway.title}</h3>
              <p className="text-sm text-slate-600 mb-4">{pathway.description}</p>

              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-semibold text-slate-700">Duration</p>
                  <p className="text-slate-500">{pathway.duration}</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-700">Key Subjects</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {pathway.subjects.map((s) => (
                      <span key={s} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-slate-700">Career Options</p>
                  <p className="text-slate-500">{pathway.careers.join(", ")}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Diploma Programs</h2>
          <p className="text-slate-600 mb-6">Short-term programs for quick skill development and employment.</p>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-left">
                  <tr>
                    <th className="px-6 py-3 font-semibold text-slate-700">Program</th>
                    <th className="px-6 py-3 font-semibold text-slate-700">Duration</th>
                    <th className="px-6 py-3 font-semibold text-slate-700">Eligibility</th>
                    <th className="px-6 py-3 font-semibold text-slate-700">Career Prospects</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {DIPLOMA_PROGRAMS.map((prog) => (
                    <tr key={prog.name} className="hover:bg-slate-50">
                      <td className="px-6 py-3 font-medium text-slate-900">{prog.name}</td>
                      <td className="px-6 py-3 text-slate-600">{prog.duration}</td>
                      <td className="px-6 py-3 text-slate-600">{prog.eligibility}</td>
                      <td className="px-6 py-3 text-slate-600">{prog.careers}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Tips for Choosing Your Path</h2>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-slate-600">
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div>
                  <p className="font-semibold text-slate-900">Know Your Interests</p>
                  <p>Choose a field you are passionate about, not just what others suggest.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div>
                  <p className="font-semibold text-slate-900">Research Career Scope</p>
                  <p>Look at job market demand and future growth of your chosen field.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div>
                  <p className="font-semibold text-slate-900">Consider Your Marks</p>
                  <p>Some programs have high merit. Use our calculators to check your chances.</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold flex-shrink-0">4</div>
                <div>
                  <p className="font-semibold text-slate-900">Talk to Professionals</p>
                  <p>Connect with people working in your field of interest for real insights.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold flex-shrink-0">5</div>
                <div>
                  <p className="font-semibold text-slate-900">Explore Scholarships</p>
                  <p>Many organizations offer scholarships for deserving students.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold flex-shrink-0">6</div>
                <div>
                  <p className="font-semibold text-slate-900">Have a Backup Plan</p>
                  <p>Always have a secondary option in case your first choice doesn&apos;t work out.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-8 text-center">
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            Ready to Explore Universities?
          </h2>
          <p className="text-slate-600 mb-6 max-w-xl mx-auto">
            Once you decide your path, explore universities and programs that match your goals.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/universities"
              className="px-6 py-3 bg-amber-600 text-white rounded-xl font-semibold hover:bg-amber-700 transition-colors"
            >
              Browse Universities
            </Link>
            <Link
              href="/matric/calculators"
              className="px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-colors"
            >
              Use Calculators
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
