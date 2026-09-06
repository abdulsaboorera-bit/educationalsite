import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import {
  getAllUniversitySlugs,
  getUniversityBySlug,
} from "@/lib/universities";
import { getProgramsByUniversity } from "@/lib/universities/programs";
import type { FacultyArea, Program } from "@/lib/universities";
import {
  ArrowLeft,
  Clock,
  GraduationCap,
  IndianRupee,
  BookOpen,
  ChevronRight,
  Star,
} from "lucide-react";

const FACULTY_LABELS: Record<FacultyArea, string> = {
  engineering: "Engineering & Technology",
  technology: "Technology",
  "computer-science": "Computer Science & IT",
  "information-technology": "Information Technology",
  business: "Business & Management",
  management: "Management",
  commerce: "Commerce & Finance",
  law: "Law & Legal Studies",
  medicine: "Medicine",
  dentistry: "Dentistry",
  pharmacy: "Pharmacy",
  nursing: "Nursing",
  "allied-health": "Allied Health Sciences",
  sciences: "Sciences",
  mathematics: "Mathematics & Statistics",
  physics: "Physics",
  chemistry: "Chemistry",
  biology: "Biological Sciences",
  agriculture: "Agriculture",
  veterinary: "Veterinary Sciences",
  arts: "Arts & Humanities",
  humanities: "Humanities",
  "social-sciences": "Social Sciences",
  education: "Education",
  architecture: "Architecture & Planning",
  design: "Design",
  media: "Media & Communication",
  linguistics: "Linguistics",
  "islamic-studies": "Islamic Studies",
  "general-studies": "General Studies",
};

interface ProgramsPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllUniversitySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProgramsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const uni = getUniversityBySlug(slug);
  if (!uni) return { title: "University Not Found" };
  const programs = getProgramsByUniversity(slug);
  return {
    title: `Programs at ${uni.name} (${uni.shortName}) - ${programs.length} Programs Listed`,
    description: `Explore ${programs.length} programs offered by ${uni.name} (${uni.shortName}) in ${uni.city}. Find BS, MBBS, BBA, LLB and other degree programs with fee details and eligibility.`,
    openGraph: {
      title: `Programs at ${uni.name} - PakEdu`,
      description: `Browse ${programs.length} programs at ${uni.name} including engineering, CS, business, and medical programs.`,
      type: "website",
    },
    alternates: {
      canonical: `https://pakedu.pk/universities/${uni.slug}/programs`,
    },
  };
}

function groupByFaculty(programs: Program[]): Record<string, Program[]> {
  const groups: Record<string, Program[]> = {};
  for (const program of programs) {
    const key = FACULTY_LABELS[program.faculty] || program.faculty;
    if (!groups[key]) groups[key] = [];
    groups[key].push(program);
  }
  return groups;
}

function formatFee(fee: number): string {
  return `PKR ${(fee / 1000).toFixed(0)}K`;
}

const DEGREE_BADGE_VARIANT: Record<string, string> = {
  bachelors: "info",
  masters: "default",
  mphil: "default",
  phd: "default",
};

export default async function UniversityProgramsPage({
  params,
}: ProgramsPageProps) {
  const { slug } = await params;
  const uni = getUniversityBySlug(slug);
  if (!uni) notFound();

  const programs = getProgramsByUniversity(slug);
  const grouped = groupByFaculty(programs);
  const facultyNames = Object.keys(grouped).sort();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs
            items={[
              { label: "Universities", href: "/universities" },
              { label: uni.name, href: `/universities/${uni.slug}` },
              { label: "Programs" },
            ]}
          />
          <div className="flex items-start gap-6 mt-6">
            <div className="h-20 w-20 rounded-2xl bg-emerald-600 flex items-center justify-center text-2xl font-bold text-white shrink-0 shadow-lg">
              {uni.shortName}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold">
                Programs at {uni.shortName}
              </h1>
              <p className="text-slate-300 mt-2 text-sm">
                {programs.length} program{programs.length !== 1 ? "s" : ""} available across{" "}
                {facultyNames.length} department{facultyNames.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href={`/universities/${uni.slug}`}
          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-emerald-600 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to {uni.shortName}
        </Link>

        {programs.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white p-12 text-center">
            <GraduationCap className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-slate-900 mb-2">
              No programs listed yet
            </h2>
            <p className="text-sm text-slate-500 mb-6 max-w-md mx-auto">
              We haven&apos;t added program data for {uni.shortName} yet.
              Check back soon or visit the university&apos;s official website.
            </p>
            <a
              href={uni.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-colors"
            >
              Visit Official Website
              <ChevronRight className="h-4 w-4" />
            </a>
          </div>
        ) : (
          <div className="space-y-8">
            {facultyNames.map((facultyName) => {
              const facultyPrograms = grouped[facultyName];
              return (
                <div key={facultyName}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-8 w-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                      <BookOpen className="h-4 w-4 text-emerald-600" />
                    </div>
                    <h2 className="text-lg font-semibold text-slate-900">
                      {facultyName}
                    </h2>
                    <Badge variant="outline" className="text-[10px]">
                      {facultyPrograms.length} program{facultyPrograms.length !== 1 ? "s" : ""}
                    </Badge>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {facultyPrograms.map((program) => (
                      <div
                        key={program.id}
                        className="rounded-xl border border-slate-200 bg-white p-5 hover:border-emerald-200 hover:shadow-sm transition-all"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-sm font-semibold text-slate-900 leading-snug">
                            {program.name}
                          </h3>
                          {program.isFeatured && (
                            <Star className="h-4 w-4 text-amber-500 shrink-0 ml-2" fill="currentColor" />
                          )}
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-4 text-xs text-slate-500">
                            <span className="flex items-center gap-1">
                              <GraduationCap className="h-3 w-3" />
                              <Badge
                                variant={(DEGREE_BADGE_VARIANT[program.degreeLevel] as "info" | "default") || "default"}
                                className="text-[9px] px-1.5 py-0"
                              >
                                {program.degreeLevel.charAt(0).toUpperCase() + program.degreeLevel.slice(1)}
                              </Badge>
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {program.durationYears} Year{program.durationYears !== 1 ? "s" : ""}
                            </span>
                          </div>

                          {program.feePerYear && (
                            <div className="flex items-center gap-1 text-xs text-slate-600">
                              <IndianRupee className="h-3 w-3 text-emerald-600" />
                              <span className="font-medium text-emerald-700">
                                {formatFee(program.feePerYear)}/year
                              </span>
                              {program.totalFee && (
                                <span className="text-slate-400 ml-1">
                                  (Total: {formatFee(program.totalFee)})
                                </span>
                              )}
                            </div>
                          )}

                          {program.eligibility.length > 0 && (
                            <div className="text-[11px] text-slate-500 leading-relaxed">
                              {program.eligibility.join(" • ")}
                            </div>
                          )}
                        </div>

                        <p className="text-xs text-slate-500 mt-3 leading-relaxed line-clamp-2">
                          {program.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
