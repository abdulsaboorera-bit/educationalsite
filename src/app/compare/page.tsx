"use client";

import { useState } from "react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Plus, X, Search } from "lucide-react";

const MOCK_UNIVERSITIES = [
  { name: "COMSATS University Islamabad", slug: "comsats-university-islamabad", short: "CUI", city: "Islamabad", type: "public" },
  { name: "Fast NU", slug: "fast-nuces", short: "FAST", city: "Islamabad", type: "private" },
  { name: "UET Lahore", slug: "uet-lahore", short: "UET", city: "Lahore", type: "public" },
  { name: "LUMS", slug: "lums", short: "LUMS", city: "Lahore", type: "private" },
  { name: "NUST", slug: "nust", short: "NUST", city: "Islamabad", type: "public" },
  { name: "Punjab University", slug: "punjab-university", short: "PU", city: "Lahore", type: "public" },
  { name: "Aga Khan University", slug: "aga-khan-university", short: "AKU", city: "Karachi", type: "private" },
  { name: "NED University", slug: "ned-university", short: "NED", city: "Karachi", type: "public" },
];

const COMPARISON_DATA: Record<string, Record<string, string | number>> = {
  "comsats-university-islamabad": {
    type: "Public",
    city: "Islamabad",
    programs: 45,
    "cs_fee": "PKR 150,000/yr",
    "closing_merit_cs": "78%",
    "hostel": "Yes",
    "hec_recognized": "Yes",
    "ranking": "Top 5",
  },
  "fast-nuces": {
    type: "Private",
    city: "Islamabad",
    programs: 30,
    "cs_fee": "PKR 250,000/yr",
    "closing_merit_cs": "82%",
    "hostel": "Yes",
    "hec_recognized": "Yes",
    "ranking": "Top 3",
  },
  "uet-lahore": {
    type: "Public",
    city: "Lahore",
    programs: 35,
    "cs_fee": "PKR 120,000/yr",
    "closing_merit_cs": "75%",
    "hostel": "Yes",
    "hec_recognized": "Yes",
    "ranking": "Top 10",
  },
  "lums": {
    type: "Private",
    city: "Lahore",
    programs: 25,
    "cs_fee": "PKR 500,000/yr",
    "closing_merit_cs": "85%",
    "hostel": "Yes",
    "hec_recognized": "Yes",
    "ranking": "Top 1",
  },
};

export default function ComparePage() {
  const [selected, setSelected] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  const filtered = MOCK_UNIVERSITIES.filter(
    (u) => !selected.includes(u.slug) && u.name.toLowerCase().includes(search.toLowerCase())
  );

  const addUniversity = (slug: string) => {
    if (selected.length < 4) {
      setSelected([...selected, slug]);
      setSearch("");
    }
  };

  const removeUniversity = (slug: string) => {
    setSelected(selected.filter((s) => s !== slug));
  };

  const selectedUnis = selected.map((slug) =>
    MOCK_UNIVERSITIES.find((u) => u.slug === slug)
  ).filter(Boolean);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs items={[{ label: "Compare" }]} />
          <h1 className="text-3xl font-bold text-slate-900 mt-4 mb-2">Compare Universities</h1>
          <p className="text-slate-500">Select 2 to 4 universities to compare side by side</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Selection */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Select Universities ({selected.length}/4)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-4">
              {selected.map((slug) => {
                const uni = MOCK_UNIVERSITIES.find((u) => u.slug === slug);
                return (
                  <Badge key={slug} variant="info" className="flex items-center gap-1.5 pr-1.5">
                    {uni?.name}
                    <button onClick={() => removeUniversity(slug)} className="ml-1 hover:text-red-600">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                );
              })}
              {selected.length < 4 && (
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search to add..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="h-8 pl-8 pr-3 rounded-lg border border-slate-200 bg-white text-sm w-48 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  {search && (
                    <div className="absolute top-full left-0 mt-1 w-full bg-white border border-slate-200 rounded-lg shadow-lg z-10 max-h-48 overflow-auto">
                      {filtered.slice(0, 5).map((uni) => (
                        <button
                          key={uni.slug}
                          onClick={() => addUniversity(uni.slug)}
                          className="w-full text-left px-3 py-2 text-sm hover:bg-slate-50 flex items-center justify-between"
                        >
                          <span>{uni.name}</span>
                          <Plus className="h-3.5 w-3.5 text-slate-400" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
            {selected.length >= 2 && (
              <p className="text-sm text-slate-500">
                Comparing {selected.length} universities. Scroll down to see the comparison.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Comparison Table */}
        {selected.length >= 2 && (
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left p-4 text-sm font-medium text-slate-500 w-48">Feature</th>
                    {selectedUnis.map((uni) => (
                      <th key={uni!.slug} className="text-left p-4">
                        <div>
                          <div className="text-sm font-semibold text-slate-900">{uni!.name}</div>
                          <div className="text-xs text-slate-500">{uni!.city}</div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {["type", "city", "programs", "cs_fee", "closing_merit_cs", "hostel", "hec_recognized", "ranking"].map((key) => (
                    <tr key={key} className="border-b border-slate-100 last:border-0">
                      <td className="p-4 text-sm font-medium text-slate-700 capitalize">
                        {key.replace(/_/g, " ")}
                      </td>
                      {selected.map((slug) => (
                        <td key={slug} className="p-4 text-sm text-slate-600">
                          {COMPARISON_DATA[slug]?.[key] || "—"}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {selected.length < 2 && (
          <div className="text-center py-16">
            <p className="text-slate-500">Select at least 2 universities to see the comparison.</p>
          </div>
        )}
      </div>
    </div>
  );
}
