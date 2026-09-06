import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { Search, MapPin, Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Universities in Pakistan - Complete Directory",
  description: "Browse all universities in Pakistan. Find public, private, engineering, medical, and business universities with programs, merit data, and admission information.",
  openGraph: {
    title: "Universities in Pakistan - Complete Directory | PakEdu",
    description: "Browse all universities in Pakistan with detailed profiles, programs, and admission data.",
  },
};

const MOCK_UNIVERSITIES = [
  {
    name: "COMSATS University Islamabad",
    slug: "comsats-university-islamabad",
    short_name: "CUI",
    city: "Islamabad",
    province: "Islamabad",
    type: "public" as const,
    category: ["cs_it", "engineering"],
    programs_count: 45,
    is_featured: true,
  },
  {
    name: "Fast National University of Computer & Emerging Sciences",
    slug: "fast-nuces",
    short_name: "FAST",
    city: "Islamabad",
    province: "Islamabad",
    type: "private" as const,
    category: ["cs_it", "engineering", "business"],
    programs_count: 30,
    is_featured: true,
  },
  {
    name: "University of Engineering & Technology Lahore",
    slug: "uet-lahore",
    short_name: "UET",
    city: "Lahore",
    province: "Punjab",
    type: "public" as const,
    category: ["engineering"],
    programs_count: 35,
    is_featured: true,
  },
  {
    name: "Lahore University of Management Sciences",
    slug: "lums",
    short_name: "LUMS",
    city: "Lahore",
    province: "Punjab",
    type: "private" as const,
    category: ["business", "cs_it", "arts"],
    programs_count: 25,
    is_featured: true,
  },
  {
    name: "University of the Punjab",
    slug: "punjab-university",
    short_name: "PU",
    city: "Lahore",
    province: "Punjab",
    type: "public" as const,
    category: ["general", "arts", "law"],
    programs_count: 120,
    is_featured: false,
  },
  {
    name: "Aga Khan University",
    slug: "aga-khan-university",
    short_name: "AKU",
    city: "Karachi",
    province: "Sindh",
    type: "private" as const,
    category: ["medical"],
    programs_count: 15,
    is_featured: true,
  },
  {
    name: "NED University of Engineering & Technology",
    slug: "ned-university",
    short_name: "NED",
    city: "Karachi",
    province: "Sindh",
    type: "public" as const,
    category: ["engineering"],
    programs_count: 40,
    is_featured: false,
  },
  {
    name: "University of Peshawar",
    slug: "university-of-peshawar",
    short_name: "UoP",
    city: "Peshawar",
    province: "Khyber Pakhtunkhwa",
    type: "public" as const,
    category: ["general"],
    programs_count: 60,
    is_featured: false,
  },
  {
    name: "Air University Islamabad",
    slug: "air-university",
    short_name: "AU",
    city: "Islamabad",
    province: "Islamabad",
    type: "public" as const,
    category: ["engineering", "cs_it"],
    programs_count: 25,
    is_featured: false,
  },
  {
    name: "Bahria University",
    slug: "bahria-university",
    short_name: "BU",
    city: "Islamabad",
    province: "Islamabad",
    type: "public" as const,
    category: ["engineering", "cs_it", "business"],
    programs_count: 30,
    is_featured: false,
  },
];

const PROVINCES = ["All", "Punjab", "Sindh", "Khyber Pakhtunkhwa", "Islamabad", "Balochistan"];
const TYPES = ["All", "Public", "Private"];
const FIELDS = ["All", "Engineering", "Computer Science", "Medical", "Business", "General"];

export default function UniversitiesPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs items={[{ label: "Universities" }]} />
          <h1 className="text-3xl font-bold text-slate-900 mt-4 mb-2">Universities in Pakistan</h1>
          <p className="text-slate-500">Browse and discover universities across all provinces</p>
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
                <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3">Province</h3>
                <div className="space-y-1">
                  {PROVINCES.map((p) => (
                    <button
                      key={p}
                      className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Type Filter */}
              <div>
                <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3">Type</h3>
                <div className="space-y-1">
                  {TYPES.map((t) => (
                    <button
                      key={t}
                      className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Field Filter */}
              <div>
                <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3">Field</h3>
                <div className="space-y-1">
                  {FIELDS.map((f) => (
                    <button
                      key={f}
                      className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* University Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-slate-500">Showing {MOCK_UNIVERSITIES.length} universities</p>
              <select className="h-9 px-3 rounded-lg border border-slate-200 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500">
                <option>Sort by Name</option>
                <option>Sort by Programs</option>
                <option>Sort by City</option>
              </select>
            </div>
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {MOCK_UNIVERSITIES.map((uni) => (
                <Link
                  key={uni.slug}
                  href={`/universities/${uni.slug}`}
                  className="group p-5 rounded-xl border border-slate-200 bg-white hover:border-emerald-200 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center text-sm font-bold text-slate-600">
                      {uni.short_name}
                    </div>
                    <Badge variant={uni.type === "public" ? "info" : "outline"}>
                      {uni.type === "public" ? "Public" : "Private"}
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
                      {uni.programs_count} programs
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {uni.category.slice(0, 3).map((cat) => (
                      <Badge key={cat} variant="default" className="text-[10px]">
                        {cat.replace("_", " ").toUpperCase()}
                      </Badge>
                    ))}
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
