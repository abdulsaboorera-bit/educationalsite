"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Plus, Upload, Download, Search } from "lucide-react";

const MOCK_UNIVERSITIES = [
  { name: "COMSATS University Islamabad", slug: "comsats-university-islamabad", type: "public", city: "Islamabad", programs: 45, status: "active" },
  { name: "Fast NU", slug: "fast-nuces", type: "private", city: "Islamabad", programs: 30, status: "active" },
  { name: "UET Lahore", slug: "uet-lahore", type: "public", city: "Lahore", programs: 35, status: "active" },
  { name: "LUMS", slug: "lums", type: "private", city: "Lahore", programs: 25, status: "active" },
];

export default function AdminUniversitiesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-900">Universities</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-1.5" />
            Import CSV
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1.5" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-1.5" />
            Add University
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search universities..."
            className="w-full h-9 pl-10 pr-4 rounded-lg border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <select className="h-9 px-3 rounded-lg border border-slate-200 bg-white text-sm">
          <option>All Types</option>
          <option>Public</option>
          <option>Private</option>
        </select>
      </div>

      {/* Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="text-left p-4 text-xs font-semibold text-slate-500 uppercase">University</th>
                <th className="text-left p-4 text-xs font-semibold text-slate-500 uppercase">Type</th>
                <th className="text-left p-4 text-xs font-semibold text-slate-500 uppercase">City</th>
                <th className="text-left p-4 text-xs font-semibold text-slate-500 uppercase">Programs</th>
                <th className="text-left p-4 text-xs font-semibold text-slate-500 uppercase">Status</th>
                <th className="text-left p-4 text-xs font-semibold text-slate-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_UNIVERSITIES.map((uni) => (
                <tr key={uni.slug} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">
                        {uni.slug.slice(0, 2).toUpperCase()}
                      </div>
                      <span className="text-sm font-medium text-slate-900">{uni.name}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge variant={uni.type === "public" ? "info" : "outline"}>{uni.type}</Badge>
                  </td>
                  <td className="p-4 text-sm text-slate-600">{uni.city}</td>
                  <td className="p-4 text-sm text-slate-600">{uni.programs}</td>
                  <td className="p-4"><Badge variant="success">Active</Badge></td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button className="text-xs text-emerald-600 hover:text-emerald-700">Edit</button>
                      <button className="text-xs text-slate-400 hover:text-red-600">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
