import { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { intermediateGroups } from "@/lib/intermediate/groups";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: "Career Guidance for Intermediate Students | PakEdu",
  description: "Explore career paths after intermediate in Pakistan. Find the right degree program, university, and career based on your intermediate group.",
  keywords: ["career after intermediate", "career guidance", "career paths", "after FSc", "after ICS", "after FA"],
  alternates: { canonical: `${SITE_CONFIG.url}/intermediate/careers` },
  openGraph: {
    title: "Career Guidance for Intermediate Students | PakEdu",
    description: "Explore career paths after intermediate in Pakistan.",
    url: `${SITE_CONFIG.url}/intermediate/careers`,
    siteName: "PakEdu",
    locale: "en_PK",
    type: "website",
  },
};

const CAREER_AREAS = [
  {
    title: "Medical & Health Sciences",
    description: "Careers in medicine, dentistry, pharmacy, nursing, and allied health",
    icon: "🏥",
    groups: ["fsc-pre-medical"],
    careers: [
      "Medicine (MBBS)",
      "Dentistry (BDS)",
      "Pharmacy (Pharm-D)",
      "Veterinary Sciences (DVM)",
      "Nursing",
      "Physiotherapy",
      "Medical Technology",
      "Biotechnology",
      "Public Health",
      "Nutrition & Dietetics",
    ],
  },
  {
    title: "Engineering & Technology",
    description: "Careers in engineering, architecture, computing, and technology",
    icon: "⚙️",
    groups: ["fsc-pre-engineering"],
    careers: [
      "Civil Engineering",
      "Mechanical Engineering",
      "Electrical Engineering",
      "Software Engineering",
      "Computer Science",
      "Architecture",
      "Robotics",
      "Telecommunications",
      "Data Science",
      "Artificial Intelligence",
    ],
  },
  {
    title: "Computer Science & IT",
    description: "Careers in software development, cybersecurity, cloud computing, and digital technologies",
    icon: "💻",
    groups: ["ics", "fsc-pre-engineering"],
    careers: [
      "Software Development",
      "Web Development",
      "Mobile App Development",
      "Data Science",
      "Cybersecurity",
      "Cloud Computing",
      "DevOps",
      "Game Development",
      "AI/ML Engineering",
      "IT Consulting",
    ],
  },
  {
    title: "Business & Commerce",
    description: "Careers in accounting, banking, finance, and business administration",
    icon: "📊",
    groups: ["icom"],
    careers: [
      "Chartered Accountancy (CA)",
      "ACCA",
      "Banking",
      "Finance",
      "Business Administration",
      "Marketing",
      "Human Resources",
      "Entrepreneurship",
      "Auditing",
      "Taxation",
    ],
  },
  {
    title: "Social Sciences & Humanities",
    description: "Careers in civil services, law, journalism, teaching, and social work",
    icon: "📚",
    groups: ["fa"],
    careers: [
      "Civil Services (CSS/PMS)",
      "Law (LLB)",
      "Journalism",
      "Teaching",
      "Psychology",
      "Social Work",
      "Public Administration",
      "Diplomacy",
      "Media & Communication",
      "Creative Arts",
    ],
  },
  {
    title: "Government & Public Sector",
    description: "Careers through competitive exams and government service",
    icon: "🏛️",
    groups: ["fsc-pre-medical", "fsc-pre-engineering", "ics", "fa", "icom"],
    careers: [
      "CSS (Central Superior Services)",
      "PMS (Provincial Management Service)",
      "FPSC (Federal Public Service Commission)",
      "PPSC (Punjab Public Service Commission)",
      "Banking Sector",
      "Pakistan Army / Navy / Air Force",
      "Police Service",
      "Postal Service",
      "Railways",
      "Revenue Service",
    ],
  },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Intermediate", href: "/intermediate" }, { label: "Careers" }]} />
          <h1 className="text-3xl font-bold text-slate-900 mt-4 mb-2">Career Guidance</h1>
          <p className="text-slate-500 max-w-2xl">
            Explore career paths after intermediate. Find the right degree program and university based on your interests and intermediate group.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Career Areas */}
        <div className="space-y-6">
          {CAREER_AREAS.map((area) => (
            <div key={area.title} className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
              <div className="flex items-start gap-4 mb-4">
                <span className="text-3xl">{area.icon}</span>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">{area.title}</h2>
                  <p className="text-slate-600 mt-1">{area.description}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {area.groups.map((groupSlug) => {
                  const group = intermediateGroups.find((g) => g.slug === groupSlug);
                  return group ? (
                    <Link
                      key={groupSlug}
                      href={`/intermediate/${groupSlug}`}
                      className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs font-medium hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                    >
                      {group.shortName}
                    </Link>
                  ) : null;
                })}
              </div>
              <div className="flex flex-wrap gap-2">
                {area.careers.map((career) => (
                  <span key={career} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-medium">
                    {career}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Group-wise Career Links */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Explore Careers by Group</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {intermediateGroups.map((group) => (
              <Link
                key={group.slug}
                href={`/intermediate/${group.slug}`}
                className="bg-white rounded-xl border border-slate-200 p-5 hover:border-indigo-300 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{group.icon}</span>
                  <h3 className="font-semibold text-slate-900">{group.name}</h3>
                </div>
                <p className="text-sm text-slate-500 mb-3">{group.description}</p>
                <p className="text-xs text-indigo-600 font-medium">{group.careerPaths.length}+ career paths →</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
