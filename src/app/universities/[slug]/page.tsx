import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import {
  getAllUniversitySlugs,
  getUniversityBySlug,
  provinces,
} from "@/lib/universities";
import type { UniversityCampus, UniversityCategory } from "@/lib/universities";
import {
  MapPin,
  Globe,
  Calendar,
  Building2,
  GraduationCap,
  ExternalLink,
  Users,
  Shield,
  ChevronRight,
} from "lucide-react";

const CATEGORY_LABELS: Record<UniversityCategory, string> = {
  general: "General",
  engineering: "Engineering",
  medical: "Medical",
  business: "Business",
  cs_it: "CS & IT",
  agriculture: "Agriculture",
  arts: "Arts",
  law: "Law",
  military: "Military",
  women: "Women",
  technology: "Technology",
  science: "Science",
  management: "Management",
  "health-sciences": "Health Sciences",
  veterinary: "Veterinary",
  design: "Design",
  "marine-sciences": "Marine Sciences",
  pharmacy: "Pharmacy",
  nursing: "Nursing",
  education: "Education",
  architecture: "Architecture",
};

const CAMPUS_TYPE_LABELS: Record<string, string> = {
  main: "Main Campus",
  constituent: "Constituent",
  "sub-campus": "Sub-Campus",
  regional: "Regional",
  "study-center": "Study Center",
};

interface UniversityPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllUniversitySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: UniversityPageProps): Promise<Metadata> {
  const { slug } = await params;
  const uni = getUniversityBySlug(slug);
  if (!uni) return { title: "University Not Found" };
  return {
    title: `${uni.name} (${uni.shortName}) - Programs, Campus, Admission Info`,
    description: `Complete information about ${uni.name} (${uni.shortName}). Type: ${uni.type}, City: ${uni.city}, Established: ${uni.establishedYear}. ${uni.description.slice(0, 200)}`,
    openGraph: {
      title: `${uni.name} - PakEdu`,
      description: uni.description.slice(0, 300),
      type: "website",
    },
    alternates: {
      canonical: `https://pakedu.pk/universities/${uni.slug}`,
    },
  };
}

export default async function UniversityProfilePage({
  params,
}: UniversityPageProps) {
  const { slug } = await params;
  const uni = getUniversityBySlug(slug);

  if (!uni) notFound();

  const province = provinces.find((p) => p.slug === uni.provinceSlug);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs
            items={[
              { label: "Universities", href: "/universities" },
              { label: uni.name },
            ]}
          />
          <div className="flex items-start gap-6 mt-6">
            <div className="h-20 w-20 rounded-2xl bg-emerald-600 flex items-center justify-center text-2xl font-bold text-white shrink-0 shadow-lg">
              {uni.shortName}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl md:text-3xl font-bold">
                  {uni.name}
                </h1>
                <Badge
                  variant={uni.type === "public" ? "info" : "outline"}
                  className="bg-white/10 border-white/20 text-white"
                >
                  {uni.type === "public"
                    ? "Public"
                    : uni.type === "private"
                    ? "Private"
                    : "Semi-Government"}{" "}
                  University
                </Badge>
              </div>
              <div className="flex items-center gap-4 mt-3 text-sm text-slate-300 flex-wrap">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {uni.city}, {province?.name || uni.province}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  Est. {uni.establishedYear}
                </span>
                <span className="flex items-center gap-1">
                  <Building2 className="h-3.5 w-3.5" />
                  {uni.campuses.length} Campus
                  {uni.campuses.length !== 1 ? "es" : ""}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-3">
                {uni.categories.slice(0, 4).map((cat) => (
                  <Badge
                    key={cat}
                    variant="default"
                    className="bg-white/10 text-white border-white/20 text-[10px]"
                  >
                    {CATEGORY_LABELS[cat]}
                  </Badge>
                ))}
                {uni.categories.length > 4 && (
                  <Badge
                    variant="default"
                    className="bg-white/10 text-white border-white/20 text-[10px]"
                  >
                    +{uni.categories.length - 4}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Bar */}
      <div className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-200">
            <div className="py-4 px-4">
              <div className="flex items-center gap-2 mb-1">
                <Shield className="h-4 w-4 text-emerald-600" />
                <span className="text-xs text-slate-500">HEC Status</span>
              </div>
              <div className="text-sm font-semibold text-slate-900">
                {uni.hecRecognized ? "Recognized ✓" : "Not Recognized"}
              </div>
            </div>
            <div className="py-4 px-4">
              <div className="flex items-center gap-2 mb-1">
                <Building2 className="h-4 w-4 text-emerald-600" />
                <span className="text-xs text-slate-500">Campuses</span>
              </div>
              <div className="text-sm font-semibold text-slate-900">
                {uni.campuses.length} Location
                {uni.campuses.length !== 1 ? "s" : ""}
              </div>
            </div>
            <div className="py-4 px-4">
              <div className="flex items-center gap-2 mb-1">
                <GraduationCap className="h-4 w-4 text-emerald-600" />
                <span className="text-xs text-slate-500">Type</span>
              </div>
              <div className="text-sm font-semibold text-slate-900 capitalize">
                {uni.type}
              </div>
            </div>
            <div className="py-4 px-4">
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="h-4 w-4 text-emerald-600" />
                <span className="text-xs text-slate-500">Established</span>
              </div>
              <div className="text-sm font-semibold text-slate-900">
                {uni.establishedYear} (
                {new Date().getFullYear() - uni.establishedYear} Years)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">
                About {uni.shortName}
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {uni.description}
              </p>
            </div>

            {/* Campuses */}
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Building2 className="h-5 w-5 text-emerald-600" />
                Campuses ({uni.campuses.length})
              </h2>
              <div className="space-y-3">
                {uni.campuses.map((campus: UniversityCampus, i: number) => (
                  <div
                    key={i}
                    className="p-4 rounded-lg bg-slate-50 border border-slate-100 hover:border-emerald-200 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-slate-900">
                        {campus.name}
                      </span>
                      <Badge
                        variant={
                          campus.type === "main" ? "info" : "default"
                        }
                        className="text-[10px]"
                      >
                        {CAMPUS_TYPE_LABELS[campus.type] || campus.type}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {campus.city}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Categories / Faculties */}
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">
                Faculties & Categories
              </h2>
              <div className="flex flex-wrap gap-2">
                {uni.categories.map((cat) => (
                  <Badge key={cat} variant="default">
                    {CATEGORY_LABELS[cat]}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Highlights */}
            {uni.highlights.length > 0 && (
              <div className="rounded-xl border border-slate-200 bg-white p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">
                  Highlights
                </h2>
                <ul className="space-y-2">
                  {uni.highlights.map((h, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-slate-600"
                    >
                      <ChevronRight className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                Quick Info
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                    <Globe className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">Website</div>
                    <a
                      href={uni.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-emerald-600 hover:underline flex items-center gap-1"
                    >
                      {uni.website.replace("https://", "")}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">Location</div>
                    <span className="text-sm">
                      {uni.city}, {province?.name || uni.province}
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">Established</div>
                    <span className="text-sm">{uni.establishedYear}</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                    <Shield className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">
                      HEC Recognized
                    </div>
                    <span className="text-sm text-emerald-600 font-medium">
                      {uni.hecRecognized ? "Yes ✓" : "No"}
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                    <Users className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">
                      Campuses
                    </div>
                    <span className="text-sm">
                      {uni.campuses.length} location
                      {uni.campuses.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="rounded-xl bg-emerald-600 text-white p-6 text-center">
              <h3 className="text-lg font-bold mb-2">
                Explore Programs
              </h3>
              <p className="text-sm text-emerald-100 mb-4">
                Find programs offered by {uni.shortName}
              </p>
              <Link
                href={`/programs?university=${uni.slug}`}
                className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-50"
              >
                View Programs <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Province Link */}
            {province && (
              <div className="rounded-xl border border-slate-200 bg-white p-6">
                <h3 className="text-sm font-semibold text-slate-900 mb-2">
                  More in {province.name}
                </h3>
                <p className="text-xs text-slate-500 mb-3">
                  Explore {province.universities} universities in{" "}
                  {province.name}
                </p>
                <Link
                  href={`/universities/province/${province.slug}`}
                  className="text-sm font-medium text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                >
                  View All <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
