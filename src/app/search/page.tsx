"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { Search, Calculator, BookOpen, Users, Building2 } from "lucide-react";

const MOCK_SEARCH_DATA = [
  { type: "university", name: "COMSATS University Islamabad", slug: "comsats-university-islamabad", subtitle: "Islamabad • Public" },
  { type: "university", name: "Fast National University", slug: "fast-nuces", subtitle: "Islamabad • Private" },
  { type: "university", name: "UET Lahore", slug: "uet-lahore", subtitle: "Lahore • Public" },
  { type: "university", name: "LUMS", slug: "lums", subtitle: "Lahore • Private" },
  { type: "university", name: "NUST", slug: "nust", subtitle: "Islamabad • Public" },
  { type: "program", name: "BS Computer Science", slug: "computer-science", subtitle: "Available at 50+ universities" },
  { type: "program", name: "BS Software Engineering", slug: "software-engineering", subtitle: "Available at 40+ universities" },
  { type: "program", name: "BS Electrical Engineering", slug: "electrical-engineering", subtitle: "Available at 30+ universities" },
  { type: "program", name: "BS Business Administration", slug: "business-administration", subtitle: "Available at 60+ universities" },
  { type: "calculator", name: "CGPA Calculator", slug: "cgpa", subtitle: "Academic Calculator" },
  { type: "calculator", name: "MDCAT Aggregate Calculator", slug: "mdcat-aggregate", subtitle: "Admission Calculator" },
  { type: "calculator", name: "Merit Calculator", slug: "merit", subtitle: "Admission Calculator" },
  { type: "calculator", name: "Attendance Calculator", slug: "attendance", subtitle: "Student Tool" },
];

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return MOCK_SEARCH_DATA.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q)
    );
  }, [query]);

  const grouped = useMemo(() => {
    const groups: Record<string, typeof results> = {};
    results.forEach((r) => {
      if (!groups[r.type]) groups[r.type] = [];
      groups[r.type].push(r);
    });
    return groups;
  }, [results]);

  const typeLabels: Record<string, string> = {
    university: "Universities",
    program: "Programs",
    calculator: "Calculators",
    teacher: "Teachers",
  };

  const typeIcons: Record<string, React.ReactNode> = {
    university: <Building2 className="h-4 w-4" />,
    program: <BookOpen className="h-4 w-4" />,
    calculator: <Calculator className="h-4 w-4" />,
    teacher: <Users className="h-4 w-4" />,
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs items={[{ label: "Search" }]} />
          <div className="relative mt-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search universities, programs, calculators..."
              className="w-full h-14 pl-12 pr-4 rounded-xl bg-white text-slate-900 placeholder:text-slate-400 border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-lg"
              autoFocus
            />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
        {query && results.length === 0 && (
          <div className="text-center py-16">
            <Search className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <h2 className="text-lg font-medium text-slate-900 mb-1">No results found</h2>
            <p className="text-sm text-slate-500">Try a different search term</p>
          </div>
        )}

        {!query && (
          <div className="text-center py-16">
            <Search className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <h2 className="text-lg font-medium text-slate-900 mb-1">Start typing to search</h2>
            <p className="text-sm text-slate-500">Search across universities, programs, teachers, and calculators</p>
          </div>
        )}

        <div className="space-y-8">
          {Object.entries(grouped).map(([type, items]) => (
            <div key={type}>
              <div className="flex items-center gap-2 mb-3">
                {typeIcons[type]}
                <h3 className="text-sm font-semibold text-slate-900">{typeLabels[type]}</h3>
                <Badge variant="default">{items.length}</Badge>
              </div>
              <div className="space-y-2">
                {items.map((item) => {
                  const href =
                    item.type === "university"
                      ? `/universities/${item.slug}`
                      : item.type === "calculator"
                      ? `/calculators/${item.slug}`
                      : "#";
                  return (
                    <Link
                      key={`${item.type}-${item.slug}`}
                      href={href}
                      className="flex items-center gap-3 p-3 rounded-lg bg-white border border-slate-200 hover:border-emerald-200 hover:shadow-sm transition-all"
                    >
                      <div className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                        {typeIcons[item.type]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-slate-900 truncate">{item.name}</div>
                        <div className="text-xs text-slate-500">{item.subtitle}</div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
