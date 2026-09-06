import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { MapPin, ArrowRight } from "lucide-react";

const CATEGORIES: Record<string, { title: string; description: string; icon: string; color: string }> = {
  "medical": { title: "Medical Universities", description: "Top medical and dental colleges in Pakistan for MBBS and BDS admissions", icon: "🏥", color: "from-red-600 to-rose-700" },
  "engineering": { title: "Engineering Universities", description: "Leading engineering universities offering BS Engineering programs", icon: "⚙️", color: "from-orange-600 to-amber-700" },
  "cs-it": { title: "Computer Science & IT", description: "Best universities for Computer Science, Software Engineering, AI, and IT", icon: "💻", color: "from-violet-600 to-purple-700" },
  "business": { title: "Business Universities", description: "Top business schools and MBA programs in Pakistan", icon: "📊", color: "from-emerald-600 to-indigo-700" },
  "general": { title: "General Universities", description: "Comprehensive universities offering diverse academic programs", icon: "🏛️", color: "from-slate-600 to-slate-700" },
};

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const cat = CATEGORIES[category];
  if (!cat) return { title: "Category Not Found" };
  return {
    title: `${cat.title} in Pakistan - Top Universities & Programs`,
    description: cat.description,
  };
}

const MOCK_DATA: Record<string, { name: string; slug: string; short: string; city: string; programs: number; type: string; highlights: string[] }[]> = {
  medical: [
    { name: "Aga Khan University", slug: "aga-khan-university", short: "AKU", city: "Karachi", programs: 15, type: "Private", highlights: ["MBBS", "BDS", "Nursing", "Research"] },
    { name: "King Edward Medical University", slug: "kemu", short: "KE", city: "Lahore", programs: 12, type: "Public", highlights: ["MBBS", "BDS", "Nursing", "Allied Health"] },
    { name: "Dow University of Health Sciences", slug: "duhs", short: "DUHS", city: "Karachi", programs: 20, type: "Public", highlights: ["MBBS", "BDS", "Pharmacy", "Public Health"] },
    { name: "Services Institute of Medical Sciences", slug: "sims", short: "SIMS", city: "Lahore", programs: 8, type: "Public", highlights: ["MBBS", "Nursing"] },
    { name: "Peshawar Medical College", slug: "pmc", short: "PMC", city: "Peshawar", programs: 6, type: "Private", highlights: ["MBBS", "BDS"] },
    { name: "Bolton Medical College", slug: "bolton", short: "BMC", city: "Rawalpindi", programs: 4, type: "Private", highlights: ["MBBS"] },
  ],
  engineering: [
    { name: "University of Engineering & Technology Lahore", slug: "uet-lahore", short: "UET", city: "Lahore", programs: 35, type: "Public", highlights: ["Civil", "Electrical", "Mechanical", "CS"] },
    { name: "NED University of Engineering & Technology", slug: "ned-university", short: "NED", city: "Karachi", programs: 40, type: "Public", highlights: ["Civil", "Chemical", "Electrical", "IT"] },
    { name: "Mehran University of Engineering & Technology", slug: "muet", short: "MUET", city: "Jamshoro", programs: 25, type: "Public", highlights: ["Civil", "Mechanical", "Electrical", "Architecture"] },
    { name: "University of Engineering & Technology Taxila", slug: "uet-taxila", short: "UET-T", city: "Taxila", programs: 20, type: "Public", highlights: ["Civil", "Electrical", "Mechanical", "CS"] },
    { name: "PIEAS", slug: "pieas", short: "PIEAS", city: "Islamabad", programs: 10, type: "Public", highlights: ["Nuclear Engineering", "EE", "Mechanical"] },
  ],
  "cs-it": [
    { name: "COMSATS University Islamabad", slug: "comsats-university-islamabad", short: "CUI", city: "Islamabad", programs: 45, type: "Public", highlights: ["CS", "SE", "AI", "Data Science"] },
    { name: "Fast National University", slug: "fast-nuces", short: "FAST", city: "Islamabad", programs: 30, type: "Private", highlights: ["CS", "AI", "Data Science", "Cyber Security"] },
    { name: "National University of Sciences & Technology", slug: "nust", short: "NUST", city: "Islamabad", programs: 50, type: "Public", highlights: ["CS", "AI", "Cyber Security", "Data Science"] },
    { name: "Air University", slug: "air-university", short: "AU", city: "Islamabad", programs: 25, type: "Public", highlights: ["CS", "SE", "AI", "EE"] },
    { name: "University of.Management & Technology", slug: "umt", short: "UMT", city: "Lahore", programs: 20, type: "Private", highlights: ["CS", "SE", "Data Science"] },
    { name: "Lahore College for Women University", slug: "lcwu", short: "LCWU", city: "Lahore", programs: 15, type: "Public", highlights: ["CS", "IT", "SE"] },
  ],
  business: [
    { name: "Lahore University of Management Sciences", slug: "lums", short: "LUMS", city: "Lahore", programs: 25, type: "Private", highlights: ["MBA", "BBA", "Economics", "Finance"] },
    { name: "Institute of Business Administration", slug: "iba", short: "IBA", city: "Karachi", programs: 20, type: "Public", highlights: ["BBA", "MBA", "Finance", "Marketing"] },
    { name: "SZABIST", slug: "szabist", short: "SZABIST", city: "Karachi", programs: 18, type: "Private", highlights: ["BBA", "MBA", "CS", "Media"] },
    { name: "IoBM", slug: "iobm", short: "IoBM", city: "Karachi", programs: 15, type: "Private", highlights: ["BBA", "MBA", "Supply Chain"] },
  ],
  general: [
    { name: "University of the Punjab", slug: "punjab-university", short: "PU", city: "Lahore", programs: 120, type: "Public", highlights: ["Arts", "Science", "Law", "Commerce"] },
    { name: "University of Peshawar", slug: "university-of-peshawar", short: "UoP", city: "Peshawar", programs: 60, type: "Public", highlights: ["Arts", "Science", "Law", "Education"] },
    { name: "University of Sindh", slug: "university-of-sindh", short: "USindh", city: "Jamshoro", programs: 80, type: "Public", highlights: ["Arts", "Science", "Commerce", "Law"] },
    { name: "Bahauddin Zakariya University", slug: "bzu", short: "BZU", city: "Multan", programs: 70, type: "Public", highlights: ["Arts", "Science", "Commerce", "Engineering"] },
  ],
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const cat = CATEGORIES[category];
  if (!cat) notFound();

  const universities = MOCK_DATA[category] || [];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className={`bg-gradient-to-r ${cat.color} text-white`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <Breadcrumbs items={[{ label: "Universities", href: "/universities" }, { label: cat.title }]} />
          <div className="flex items-center gap-4 mt-4">
            <span className="text-5xl">{cat.icon}</span>
            <div>
              <h1 className="text-3xl font-bold">{cat.title}</h1>
              <p className="text-white/80 mt-1 max-w-2xl">{cat.description}</p>
            </div>
          </div>
          <div className="flex gap-4 mt-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 text-sm">
              <span className="font-bold">{universities.length}</span> Universities
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 text-sm">
              <span className="font-bold">{universities.reduce((a, u) => a + u.programs, 0)}</span> Programs
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {universities.map((uni) => (
            <Link
              key={uni.slug}
              href={`/universities/${uni.slug}`}
              className="group p-6 rounded-xl border border-slate-200 bg-white hover:border-emerald-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="h-14 w-14 rounded-xl bg-slate-100 flex items-center justify-center text-lg font-bold text-slate-600 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                  {uni.short}
                </div>
                <Badge variant={uni.type === "public" ? "info" : "outline"}>{uni.type}</Badge>
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-1 group-hover:text-emerald-600 transition-colors">
                {uni.name}
              </h3>
              <div className="flex items-center gap-1 text-xs text-slate-500 mb-3">
                <MapPin className="h-3 w-3" />
                {uni.city}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {uni.highlights.map((h) => (
                  <span key={h} className="px-2 py-0.5 rounded-full bg-slate-100 text-[11px] font-medium text-slate-600">
                    {h}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-1 text-sm font-medium text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity">
                View Details <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
