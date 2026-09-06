import Link from "next/link";
import { calculators } from "@/lib/calculators/definitions";
import { Carousel } from "@/components/ui/Carousel";
import { StatsCounter } from "@/components/ui/StatsCounter";
import { Badge } from "@/components/ui/Badge";
import {
  Calculator,
  ArrowRight,
  MapPin,
  Building2,
  Users,
  GitCompare,
  TrendingUp,
  BookOpen,
  Clock,
  Star,
  Search,
  ChevronRight,
  Award,
  Zap,
  Newspaper,
  Landmark,
  Stethoscope,
  Cpu,
  Briefcase,
} from "lucide-react";

const HERO_SLIDES = [
  {
    id: 1,
    title: "Everything Students Need, In One Place",
    subtitle: "The #1 Student Platform",
    description: "Discover 100+ universities, calculate your merit, compare programs, and access real admission data — all from a single platform.",
    cta_text: "Explore Universities",
    cta_link: "/universities",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=1920&q=80",
    overlay: "bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/30",
  },
  {
    id: 2,
    title: "Calculate Your MDCAT Aggregate in Seconds",
    subtitle: "Medical Admissions Calculator",
    description: "Use our accurate MDCAT aggregate calculator with the official PMDC formula. Predict your chances of getting into medical college.",
    cta_text: "Calculate MDCAT Aggregate",
    cta_link: "/calculators/mdcat-aggregate",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1920&q=80",
    overlay: "bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/30",
  },
  {
    id: 3,
    title: "Compare Universities Side by Side",
    subtitle: "Smart Comparison Tool",
    description: "Compare up to 4 universities on programs, fees, merit, facilities, and location. Make informed decisions about your future.",
    cta_text: "Start Comparing",
    cta_link: "/compare",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c8f1?w=1920&q=80",
    overlay: "bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/30",
  },
  {
    id: 4,
    title: "Admissions Open in Pakistan 2026",
    subtitle: "Complete Admission Guide",
    description: "Entry test dates, admission deadlines, merit formulas, and application guides for all major universities.",
    cta_text: "View Admission Guide",
    cta_link: "/admissions",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1920&q=80",
    overlay: "bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/30",
  },
];

const STATS = [
  { value: 120, suffix: "+", label: "Universities Listed" },
  { value: 2500, suffix: "+", label: "Programs Available" },
  { value: 50000, suffix: "+", label: "Students Helped" },
  { value: 10, suffix: "+", label: "Free Calculators" },
];

const UNIVERSITY_CATEGORIES = [
  {
    title: "Medical Universities",
    slug: "medical",
    icon: <Stethoscope className="h-6 w-6" />,
    description: "MBBS, BDS, Nursing, and allied health programs",
    count: 25,
    color: "from-red-500 to-rose-600",
    bg: "bg-red-50",
    text: "text-red-600",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&q=80",
  },
  {
    title: "Engineering Universities",
    slug: "engineering",
    icon: <Landmark className="h-6 w-6" />,
    description: "Civil, Electrical, Mechanical, and Chemical Engineering",
    count: 30,
    color: "from-amber-500 to-orange-600",
    bg: "bg-amber-50",
    text: "text-amber-600",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&q=80",
  },
  {
    title: "CS & IT Universities",
    slug: "cs-it",
    icon: <Cpu className="h-6 w-6" />,
    description: "Computer Science, Software Engineering, AI, Data Science",
    count: 40,
    color: "from-violet-500 to-purple-600",
    bg: "bg-violet-50",
    text: "text-violet-600",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&q=80",
  },
  {
    title: "Business Schools",
    slug: "business",
    icon: <Briefcase className="h-6 w-6" />,
    description: "BBA, MBA, Finance, Marketing, and Management",
    count: 35,
    color: "from-blue-500 to-indigo-600",
    bg: "bg-blue-50",
    text: "text-blue-600",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  },
  {
    title: "General Universities",
    slug: "general",
    icon: <BookOpen className="h-6 w-6" />,
    description: "Arts, Science, Law, Commerce, and Social Sciences",
    count: 50,
    color: "from-slate-500 to-slate-600",
    bg: "bg-slate-50",
    text: "text-slate-600",
    image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=400&q=80",
  },
];

const POPULAR_CALCULATORS = calculators.filter((c) =>
  ["mdcat-aggregate", "cgpa", "ecat-aggregate", "merit", "gpa", "nums-aggregate"].includes(c.slug)
);

const LATEST_NEWS = [
  { title: "MDCAT 2026 Registration Announced by PMC", category: "Admission", date: "Aug 20, 2026", slug: "mdcat-2026" },
  { title: "COMSATS 1st Merit List Released for Fall 2026", category: "Merit List", date: "Aug 18, 2026", slug: "comsats-merit" },
  { title: "HEC Announces 5000+ Scholarships", category: "Scholarship", date: "Aug 15, 2026", slug: "hec-scholarships" },
  { title: "UET Lahore Opens Admissions for Engineering", category: "Admission", date: "Aug 12, 2026", slug: "uet-admission" },
  { title: "FAST-NUCES Updates Admission Test Pattern", category: "Admission", date: "Aug 8, 2026", slug: "fast-test" },
];

const POPULAR_UNIVERSITIES = [
  { name: "COMSATS University Islamabad", slug: "comsats-university-islamabad", short: "CUI", logo_bg: "bg-blue-600", city: "Islamabad", type: "Public", programs: 45, tags: ["CS", "SE", "AI", "Data Science"] },
  { name: "Fast National University", slug: "fast-nuces", short: "FAST", logo_bg: "bg-red-600", city: "Islamabad", type: "Private", programs: 30, tags: ["CS", "AI", "Data Science", "Cyber Security"] },
  { name: "UET Lahore", slug: "uet-lahore", short: "UET", logo_bg: "bg-amber-600", city: "Lahore", type: "Public", programs: 35, tags: ["Civil", "EE", "ME", "CS"] },
  { name: "LUMS", slug: "lums", short: "LUMS", logo_bg: "bg-indigo-700", city: "Lahore", type: "Private", programs: 25, tags: ["Business", "CS", "Engineering"] },
  { name: "NUST", slug: "nust", short: "NUST", logo_bg: "bg-green-700", city: "Islamabad", type: "Public", programs: 50, tags: ["CS", "EE", "ME", "CE"] },
  { name: "Aga Khan University", slug: "aga-khan-university", short: "AKU", logo_bg: "bg-teal-700", city: "Karachi", type: "Private", programs: 15, tags: ["MBBS", "BDS", "Nursing"] },
  { name: "NED University", slug: "ned-university", short: "NED", logo_bg: "bg-orange-600", city: "Karachi", type: "Public", programs: 40, tags: ["Civil", "EE", "Chemical", "IT"] },
  { name: "Air University", slug: "air-university", short: "AU", logo_bg: "bg-sky-600", city: "Islamabad", type: "Public", programs: 25, tags: ["CS", "SE", "EE", "AI"] },
  { name: "Punjab University", slug: "punjab-university", short: "PU", logo_bg: "bg-rose-700", city: "Lahore", type: "Public", programs: 120, tags: ["Arts", "Science", "Law", "Commerce"] },
];

const TESTIMONIALS = [
  { name: "Ahmed Raza", university: "COMSATS", quote: "PakEdu helped me calculate my merit and choose the right university. The MDCAT calculator was spot on!", rating: 5 },
  { name: "Sara Malik", university: "FAST-NUCES", quote: "I compared 4 universities before choosing FAST. The comparison tool made my decision so much easier.", rating: 5 },
  { name: "Hassan Ali", university: "UET Lahore", quote: "The merit database showed me exactly what closing merit I needed. Got admitted to my first choice!", rating: 5 },
  { name: "Fatima Noor", university: "LUMS", quote: "Best platform for students. Everything from calculators to university data in one place.", rating: 4 },
];

const WHY_STUDENTS = [
  { icon: <Search className="h-6 w-6" />, title: "Smart Discovery", description: "Search and filter universities by city, province, type, field, and fee range." },
  { icon: <Calculator className="h-6 w-6" />, title: "10+ Calculators", description: "CGPA, MDCAT, ECAT, NUMS, merit calculators — all free, no login required." },
  { icon: <GitCompare className="h-6 w-6" />, title: "University Comparison", description: "Compare 2-4 universities side by side on fees, merit, programs, and facilities." },
  { icon: <TrendingUp className="h-6 w-6" />, title: "Merit Data", description: "Historical closing merits and admission data for informed decisions." },
  { icon: <Award className="h-6 w-6" />, title: "Trusted Data", description: "Every data point has a source. We never present unverified information as fact." },
  { icon: <Zap className="h-6 w-6" />, title: "Always Free", description: "Core tools are free forever. No forced registration. No spam." },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero Carousel */}
      <section className="relative">
        <Carousel slides={HERO_SLIDES} autoPlay interval={6000} className="h-[420px] md:h-[480px] lg:h-[520px]" />
      </section>

      {/* Search Bar */}
      <section className="relative -mt-8 z-10">
        <div className="mx-auto max-w-3xl px-4">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-2 flex items-center">
            <Search className="h-5 w-5 text-slate-400 ml-3" />
            <input
              type="text"
              placeholder="Search universities, programs, teachers, or calculators..."
              className="flex-1 h-12 px-3 bg-transparent text-slate-900 placeholder:text-slate-400 focus:outline-none text-sm"
            />
            <Link href="/search" className="h-10 px-5 rounded-xl bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition-colors flex items-center gap-2">
              Search
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Counter */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StatsCounter stats={STATS} />
        </div>
      </section>

      {/* University Categories */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 mb-3">Browse by Category</Badge>
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Find Your Perfect University</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Explore universities by field of study. Whether you are pursuing medicine, engineering, computer science, or business — we have got you covered.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {UNIVERSITY_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/universities/category/${cat.slug}`}
                className="group p-5 rounded-xl border border-slate-200 bg-white hover:shadow-lg hover:border-emerald-200 transition-all duration-300"
              >
                <div className={`h-12 w-12 rounded-xl ${cat.bg} flex items-center justify-center ${cat.text} mb-4 group-hover:scale-110 transition-transform`}>
                  {cat.icon}
                </div>
                <h3 className="text-base font-semibold text-slate-900 mb-1">{cat.title}</h3>
                <p className="text-xs text-slate-500 mb-3 leading-relaxed">{cat.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-emerald-600">{cat.count}+ universities</span>
                  <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Universities */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-1">Popular Universities</h2>
              <p className="text-sm text-slate-500">Most searched universities by students</p>
            </div>
            <Link href="/universities" className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-emerald-600 hover:text-emerald-700">
              View All <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {POPULAR_UNIVERSITIES.map((uni) => (
              <Link
                key={uni.slug}
                href={`/universities/${uni.slug}`}
                className="group p-5 rounded-xl border border-slate-200 bg-white hover:border-emerald-200 hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-start gap-4 mb-3">
                  <div className={`h-14 w-14 rounded-xl ${uni.logo_bg} flex items-center justify-center text-lg font-bold text-white shrink-0 shadow-md group-hover:scale-105 transition-transform`}>
                    {uni.short}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-1">
                      {uni.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{uni.city}</span>
                      <Badge variant={uni.type === "Public" ? "info" : "outline"} className="text-[10px]">{uni.type}</Badge>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-emerald-500 shrink-0 mt-1" />
                </div>
                <div className="flex flex-wrap gap-1.5 ml-[72px]">
                  {uni.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 rounded-full bg-slate-100 text-[10px] font-medium text-slate-600">{tag}</span>
                  ))}
                </div>
                <div className="text-xs text-slate-400 mt-2 ml-[72px]">{uni.programs}+ programs</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Calculators */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 mb-2">Free Tools</Badge>
              <h2 className="text-2xl font-bold text-slate-900 mb-1">Education Calculators</h2>
              <p className="text-sm text-slate-500">Accurate calculators for students — no login required</p>
            </div>
            <Link href="/calculators" className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-emerald-600 hover:text-emerald-700">
              All Calculators <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {POPULAR_CALCULATORS.map((calc) => (
              <Link
                key={calc.slug}
                href={`/calculators/${calc.slug}`}
                className="group p-5 rounded-xl border border-slate-200 hover:border-emerald-200 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="h-10 w-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-100 transition-colors">
                    <Calculator className="h-5 w-5" />
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-emerald-500 transition-colors" />
                </div>
                <h3 className="text-sm font-semibold text-slate-900 mb-1">{calc.name}</h3>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{calc.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Students Use PakEdu */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 mb-3">Why PakEdu</Badge>
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Why Students Trust PakEdu</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Built by understanding what students actually need
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_STUDENTS.map((item) => (
              <div key={item.title} className="p-6 rounded-xl border border-slate-200 bg-white hover:shadow-md transition-all">
                <div className="h-12 w-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-4">
                  {item.icon}
                </div>
                <h3 className="text-base font-semibold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Newspaper className="h-5 w-5 text-emerald-600" />
                <h2 className="text-2xl font-bold text-slate-900">Latest Updates</h2>
              </div>
              <p className="text-sm text-slate-500">Admission announcements, merit lists, and education news</p>
            </div>
            <Link href="/news" className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-emerald-600 hover:text-emerald-700">
              All News <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="space-y-3">
            {LATEST_NEWS.map((news) => (
              <Link
                key={news.slug}
                href={`/news`}
                className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 bg-white hover:border-emerald-200 hover:shadow-sm transition-all group"
              >
                <div className="h-12 w-12 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                  <Clock className="h-5 w-5 text-emerald-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-1">
                    {news.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
                    <Badge variant="default" className="text-[10px]">{news.category}</Badge>
                    <span>{news.date}</span>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-emerald-500 shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 mb-3">Student Voices</Badge>
            <h2 className="text-3xl font-bold text-slate-900 mb-3">What Students Say</h2>
            <p className="text-lg text-slate-500">Trusted by thousands of students</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="p-5 rounded-xl border border-slate-200 bg-white">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
                <div>
                  <div className="text-sm font-medium text-slate-900">{t.name}</div>
                  <div className="text-xs text-slate-500">{t.university}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links Grid */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Explore Everything</h2>
            <p className="text-slate-400">Quick access to all tools and resources</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "University Directory", href: "/universities", icon: <Building2 className="h-5 w-5" /> },
              { label: "All Calculators", href: "/calculators", icon: <Calculator className="h-5 w-5" /> },
              { label: "Merit Database", href: "/merit", icon: <TrendingUp className="h-5 w-5" /> },
              { label: "Compare Universities", href: "/compare", icon: <GitCompare className="h-5 w-5" /> },
              { label: "Faculty Directory", href: "/teachers", icon: <Users className="h-5 w-5" /> },
              { label: "Room Finder", href: "/room-finder", icon: <MapPin className="h-5 w-5" /> },
              { label: "Programs Directory", href: "/programs", icon: <BookOpen className="h-5 w-5" /> },
              { label: "News & Updates", href: "/news", icon: <Newspaper className="h-5 w-5" /> },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-emerald-500/30 transition-all"
              >
                <span className="text-emerald-400">{link.icon}</span>
                <span className="text-sm font-medium">{link.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-3">Ready to Plan Your Academic Future?</h2>
            <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
              Join 50,000+ students who use PakEdu to discover universities, calculate merit, and make informed decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/universities"
                className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-white text-emerald-700 font-medium hover:bg-white/90 transition-colors"
              >
                Explore Universities <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/calculators"
                className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-white/10 text-white font-medium border border-white/20 hover:bg-white/20 transition-colors"
              >
                Try Calculators
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
