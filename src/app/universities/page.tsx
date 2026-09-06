import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { getAllUniversities, provinces } from "@/lib/universities";
import type { UniversityType, UniversityCategory } from "@/lib/universities";
import { Search, MapPin, Building2 } from "lucide-react";

export const dynamic = "force-dynamic";

const TYPE_LABELS: Record<UniversityType, string> = {
  public: "Public",
  private: "Private",
  "semi-government": "Semi-Govt",
};

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

export const metadata: Metadata = {
  title: "Universities in Pakistan - Complete Directory of 270+ Universities",
  description:
    "Browse all universities in Pakistan. Find public, private, engineering, medical, and business universities by province, type, and category with programs, merit data, and admission information.",
  openGraph: {
    title: "Universities in Pakistan - Complete Directory | PakEdu",
    description:
      "Browse 270+ universities in Pakistan with detailed profiles, programs, and admission data.",
    type: "website",
  },
  alternates: {
    canonical: "https://pakedu.pk/universities",
  },
};

const UNIQUE_CATEGORIES = Array.from(
  new Set(getAllUniversities().flatMap((u) => u.categories))
).sort();

export default function UniversitiesPage() {
  const allUniversities = getAllUniversities();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs items={[{ label: "Universities" }]} />
          <h1 className="text-3xl font-bold text-slate-900 mt-4 mb-2">
            Universities in Pakistan
          </h1>
          <p className="text-slate-500">
            Browse and discover {allUniversities.length} universities across all
            provinces
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-64 shrink-0">
            <div className="sticky top-24 space-y-6">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search universities..."
                  className="w-full h-10 pl-10 pr-4 rounded-lg border border-slate-200 bg-white text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Province Filter */}
              <div>
                <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3">
                  Province
                </h3>
                <div className="space-y-1">
                  <Link
                    href="/universities"
                    className="block w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-emerald-600 bg-emerald-50 transition-colors"
                  >
                    All ({allUniversities.length})
                  </Link>
                  {provinces.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/universities/province/${p.slug}`}
                      className="block w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                    >
                      {p.name} ({p.universities})
                    </Link>
                  ))}
                </div>
              </div>

              {/* Type Filter */}
              <div>
                <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3">
                  Type
                </h3>
                <div className="space-y-1">
                  {(["public", "private", "semi-government"] as UniversityType[]).map(
                    (t) => (
                      <span
                        key={t}
                        className="block w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors cursor-default"
                      >
                        {TYPE_LABELS[t]} (
                        {allUniversities.filter((u) => u.type === t).length})
                      </span>
                    )
                  )}
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3">
                  Category
                </h3>
                <div className="space-y-1">
                  {UNIQUE_CATEGORIES.map((cat) => (
                    <span
                      key={cat}
                      className="block w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors cursor-default"
                    >
                      {CATEGORY_LABELS[cat]} (
                      {allUniversities.filter((u) =>
                        u.categories.includes(cat)
                      ).length}
                    )
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* University Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-slate-500">
                Showing {allUniversities.length} universities
              </p>
              <select className="h-9 px-3 rounded-lg border border-slate-200 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500">
                <option>Sort by Name</option>
                <option>Sort by Established Year</option>
                <option>Sort by City</option>
              </select>
            </div>
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {allUniversities.map((uni) => (
                <Link
                  key={uni.slug}
                  href={`/universities/${uni.slug}`}
                  className="group p-5 rounded-xl border border-slate-200 bg-white hover:border-emerald-200 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center text-sm font-bold text-slate-600">
                      {uni.shortName}
                    </div>
                    <Badge
                      variant={uni.type === "public" ? "info" : "outline"}
                    >
                      {TYPE_LABELS[uni.type]}
                    </Badge>
                  </div>
                  <h3 className="text-sm font-semibold text-slate-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                    {uni.name}
                  </h3>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {uni.city}
                    </span>
                    <span className="flex items-center gap-1">
                      <Building2 className="h-3 w-3" />
                      {uni.campuses.length} campus
                      {uni.campuses.length !== 1 ? "es" : ""}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {uni.categories.slice(0, 3).map((cat) => (
                      <Badge
                        key={cat}
                        variant="default"
                        className="text-[10px]"
                      >
                        {CATEGORY_LABELS[cat]}
                      </Badge>
                    ))}
                    {uni.categories.length > 3 && (
                      <Badge variant="default" className="text-[10px]">
                        +{uni.categories.length - 3}
                      </Badge>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
