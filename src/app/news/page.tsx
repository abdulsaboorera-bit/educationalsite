import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { Calendar, Clock, ArrowRight, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Education News & Admission Updates",
  description: "Latest education news, university admission updates, merit list announcements, and scholarship opportunities for students.",
};

const NEWS_ARTICLES = [
  {
    id: 1,
    slug: "mdcat-2026-registration-announced",
    title: "MDCAT 2026 Registration Announced by PMC",
    excerpt: "Pakistan Medical Commission has announced the registration schedule for MDCAT 2026. The test is expected to be held in September. Students can register through the PMC website.",
    category: "Admission",
    date: "2026-08-20",
    read_time: "3 min read",
    featured: true,
  },
  {
    id: 2,
    slug: "comsats-merit-list-2026",
    title: "COMSATS University Announces 1st Merit List for Fall 2026",
    excerpt: "COMSATS University Islamabad has released its first merit list for Fall 2026 admissions. BS Computer Science closing merit is 78.5%.",
    category: "Merit List",
    date: "2026-08-18",
    read_time: "2 min read",
    featured: true,
  },
  {
    id: 3,
    slug: "hec-scholarship-2026",
    title: "HEC Announces 5000+ Scholarships",
    excerpt: "Higher Education Commission has announced over 5000 scholarships for undergraduate and graduate students across Pakistan.",
    category: "Scholarship",
    date: "2026-08-15",
    read_time: "4 min read",
    featured: false,
  },
  {
    id: 4,
    slug: "uet-admission-2026",
    title: "UET Lahore Opens Admissions for Engineering Programs",
    excerpt: "University of Engineering and Technology Lahore has opened admissions for BS Engineering programs. ECAT test dates announced.",
    category: "Admission",
    date: "2026-08-12",
    read_time: "3 min read",
    featured: false,
  },
  {
    id: 5,
    slug: "nust-merit-2026",
    title: "NUST Announces Merit Criteria Changes for 2026",
    excerpt: "National University of Sciences and Technology has updated its merit calculation formula for the upcoming admission session.",
    category: "Merit List",
    date: "2026-08-10",
    read_time: "3 min read",
    featured: false,
  },
  {
    id: 6,
    slug: "fast-admission-test-2026",
    title: "FAST-NUCES Admission Test Pattern Updated",
    excerpt: "FAST National University has updated its admission test pattern for 2026. New sections include Data Structures and Programming.",
    category: "Admission",
    date: "2026-08-08",
    read_time: "2 min read",
    featured: false,
  },
  {
    id: 7,
    slug: "lums-fee-structure-2026",
    title: "LUMS Updates Fee Structure for 2026-27",
    excerpt: "Lahore University of Management Sciences has announced updated fee structure with 8% increase across all programs.",
    category: "Fee Update",
    date: "2026-08-05",
    read_time: "2 min read",
    featured: false,
  },
  {
    id: 8,
    slug: "scholarship-guide-pakistani-students",
    title: "Complete Scholarship Guide for Students 2026",
    excerpt: "A comprehensive guide to merit-based and need-based scholarships available for students in local and international universities.",
    category: "Guide",
    date: "2026-08-01",
    read_time: "8 min read",
    featured: false,
  },
];

const CATEGORIES = ["All", "Admission", "Merit List", "Scholarship", "Fee Update", "Guide", "Result"];

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs items={[{ label: "News" }]} />
          <h1 className="text-3xl font-bold text-slate-900 mt-4 mb-2">Education News & Updates</h1>
          <p className="text-slate-500">Stay informed about admissions, merit lists, scholarships, and education news</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap border border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:text-emerald-700 hover:bg-emerald-50 transition-all"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Articles */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {NEWS_ARTICLES.filter((a) => a.featured).map((article) => (
            <article key={article.id} className="group rounded-xl border border-slate-200 bg-white overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="h-48 bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center p-6">
                <div className="text-center text-white">
                  <Badge className="bg-white/20 text-white border-0 mb-3">{article.category}</Badge>
                  <h3 className="text-xl font-bold leading-snug">{article.title}</h3>
                </div>
              </div>
              <div className="p-5">
                <p className="text-sm text-slate-600 leading-relaxed mb-4">{article.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{article.date}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{article.read_time}</span>
                  </div>
                  <span className="flex items-center gap-1 text-emerald-600 font-medium group-hover:gap-2 transition-all">
                    Read More <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* All Articles */}
        <h2 className="text-xl font-bold text-slate-900 mb-6">All Articles</h2>
        <div className="space-y-4">
          {NEWS_ARTICLES.filter((a) => !a.featured).map((article) => (
            <article key={article.id} className="group flex gap-4 p-5 rounded-xl border border-slate-200 bg-white hover:border-emerald-200 hover:shadow-md transition-all duration-200">
              <div className="h-20 w-20 rounded-lg bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center shrink-0">
                <TrendingUp className="h-8 w-8 text-emerald-500" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <Badge variant="default" className="text-[10px]">{article.category}</Badge>
                  <span className="text-xs text-slate-400">{article.date}</span>
                </div>
                <h3 className="text-base font-semibold text-slate-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1">
                  {article.title}
                </h3>
                <p className="text-sm text-slate-500 line-clamp-2">{article.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
