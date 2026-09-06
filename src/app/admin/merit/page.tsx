"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Upload, Download } from "lucide-react";

const MOCK_MERIT = [
  { university: "COMSATS", campus: "Islamabad", program: "BS CS", year: "2025", closing: 78.5, opening: 85.2 },
  { university: "FAST", campus: "Islamabad", program: "BS CS", year: "2025", closing: 82.0, opening: 90.0 },
  { university: "UET", campus: "Lahore", program: "BS CE", year: "2025", closing: 75.3, opening: 82.0 },
  { university: "LUMS", campus: "Lahore", program: "BS CS", year: "2025", closing: 85.0, opening: 92.0 },
];

export default function AdminMeritPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-900">Merit Records</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-1.5" />
            Import CSV
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1.5" />
            Export
          </Button>
          <Button size="sm">Add Record</Button>
        </div>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="text-left p-4 text-xs font-semibold text-slate-500 uppercase">University</th>
                <th className="text-left p-4 text-xs font-semibold text-slate-500 uppercase">Program</th>
                <th className="text-left p-4 text-xs font-semibold text-slate-500 uppercase">Year</th>
                <th className="text-left p-4 text-xs font-semibold text-slate-500 uppercase">Closing</th>
                <th className="text-left p-4 text-xs font-semibold text-slate-500 uppercase">Opening</th>
                <th className="text-left p-4 text-xs font-semibold text-slate-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_MERIT.map((m, i) => (
                <tr key={i} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50">
                  <td className="p-4 text-sm font-medium text-slate-900">{m.university}</td>
                  <td className="p-4 text-sm text-slate-600">{m.program}</td>
                  <td className="p-4"><Badge variant="outline">{m.year}</Badge></td>
                  <td className="p-4 text-sm font-semibold text-slate-900">{m.closing}%</td>
                  <td className="p-4 text-sm text-slate-600">{m.opening}%</td>
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
