import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import {
  getUniversitiesByProvince,
  getProvinceBySlug,
  getAllProvinceSlugs,
} from "@/lib/universities";
import type { UniversityType } from "@/lib/universities";
import { MapPin, Building2 } from "lucide-react";

export const dynamic = "force-dynamic";

const TYPE_LABELS: Record<UniversityType, string> = {
  public: "Public",
  private: "Private",
  "semi-government": "Semi-Govt",
};

interface ProvincePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProvinceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProvincePageProps): Promise<Metadata> {
  const { slug } = await params;
  const province = getProvinceBySlug(slug);
  if (!province) return { title: "Province Not Found" };
  return {
    title: `Universities in ${province.name} - Complete List & Admission Info`,
    description: `Browse all ${province.universities} universities in ${province.name}. Find public, private, and engineering universities in ${province.majorCities.join(", ")} with programs and admission data.`,
    openGraph: {
      title: `Universities in ${province.name} | PakEdu`,
      description: `Browse ${province.universities} universities in ${province.name} with detailed profiles and admission data.`,
      type: "website",
    },
    alternates: {
      canonical: `https://pakedu.pk/universities/province/${province.slug}`,
    },
  };
}

export default async function ProvincePage({ params }: ProvincePageProps) {
  const { slug } = await params;
  const province = getProvinceBySlug(slug);
  if (!province) notFound();

  const universities = getUniversitiesByProvince(slug);

  const publicCount = universities.filter((u) => u.type === "public").length;
  const privateCount = universities.filter((u) => u.type === "private").length;
  const semiGovtCount = universities.filter(
    (u) => u.type === "semi-government"
  ).length;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <Breadcrumbs
            items={[
              { label: "Universities", href: "/universities" },
              { label: province.name },
            ]}
          />
          <div className="mt-4">
            <h1 className="text-3xl font-bold">
              Universities in {province.name}
            </h1>
            <p className="text-emerald-100 mt-1 max-w-2xl">
              Browse all universities located in {province.name}. Explore by
              city, type, and find the best university for your future.
            </p>
          </div>
          <div className="flex gap-4 mt-6 flex-wrap">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 text-sm">
              <span className="font-bold">{universities.length}</span>{" "}
              Universities
            </div>
            {publicCount > 0 && (
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 text-sm">
                <span className="font-bold">{publicCount}</span> Public
              </div>
            )}
            {privateCount > 0 && (
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 text-sm">
                <span className="font-bold">{privateCount}</span> Private
              </div>
            )}
            {semiGovtCount > 0 && (
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 text-sm">
                <span className="font-bold">{semiGovtCount}</span> Semi-Govt
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cities */}
      <div className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Major Cities:
            </span>
            {province.majorCities.map((city) => (
              <Badge key={city} variant="default">
                {city}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* University Grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-slate-500">
            Showing {universities.length} universities in {province.name}
          </p>
          <select className="h-9 px-3 rounded-lg border border-slate-200 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500">
            <option>Sort by Name</option>
            <option>Sort by Established Year</option>
            <option>Sort by City</option>
          </select>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {universities.map((uni) => (
            <Link
              key={uni.slug}
              href={`/universities/${uni.slug}`}
              className="group p-6 rounded-xl border border-slate-200 bg-white hover:border-emerald-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="h-14 w-14 rounded-xl bg-slate-100 flex items-center justify-center text-lg font-bold text-slate-600 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                  {uni.shortName}
                </div>
                <Badge
                  variant={uni.type === "public" ? "info" : "outline"}
                >
                  {TYPE_LABELS[uni.type]}
                </Badge>
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-1 group-hover:text-emerald-600 transition-colors">
                {uni.name}
              </h3>
              <div className="flex items-center gap-1 text-xs text-slate-500 mb-3">
                <MapPin className="h-3 w-3" />
                {uni.city}
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                <span className="flex items-center gap-1">
                  <Building2 className="h-3 w-3" />
                  {uni.campuses.length} campus
                  {uni.campuses.length !== 1 ? "es" : ""}
                </span>
                {uni.hecRecognized && (
                  <Badge variant="success" className="text-[10px]">
                    HEC Recognized
                  </Badge>
                )}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {uni.categories.slice(0, 3).map((cat) => (
                  <span
                    key={cat}
                    className="px-2 py-0.5 rounded-full bg-slate-100 text-[11px] font-medium text-slate-600"
                  >
                    {cat.replace(/_/g, " ")}
                  </span>
                ))}
                {uni.categories.length > 3 && (
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 text-[11px] font-medium text-slate-400">
                    +{uni.categories.length - 3}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>

        {universities.length === 0 && (
          <div className="text-center py-16">
            <Building2 className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              No universities found
            </h3>
            <p className="text-sm text-slate-500">
              No universities are currently listed for {province.name}.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
