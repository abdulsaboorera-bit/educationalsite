"use client";

import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Check, X, Search } from "lucide-react";

const MOCK_REPORTS = [
  { id: "1", type: "Timetable", university: "COMSATS", description: "Room number changed for CS-301 from B-201 to A-105", status: "pending", date: "2026-08-25", reporter: "student@email.com" },
  { id: "2", type: "Merit", university: "FAST", description: "Closing merit for BS CS 2025 was 82.5%, not 80%", status: "pending", date: "2026-08-24", reporter: "student2@email.com" },
  { id: "3", type: "Fee", university: "UET", description: "Fee structure has been updated for 2026", status: "pending", date: "2026-08-23", reporter: "student3@email.com" },
  { id: "4", type: "Teacher", university: "LUMS", description: "Dr. Ali has moved to a different department", status: "approved", date: "2026-08-20", reporter: "student4@email.com" },
];

export default function AdminReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-900">Community Reports</h1>
        <div className="flex gap-2">
          <Badge variant="warning">3 Pending</Badge>
        </div>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search reports..."
            className="w-full h-9 pl-10 pr-4 rounded-lg border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <select className="h-9 px-3 rounded-lg border border-slate-200 bg-white text-sm">
          <option>All Status</option>
          <option>Pending</option>
          <option>Approved</option>
          <option>Rejected</option>
        </select>
      </div>

      <div className="space-y-3">
        {MOCK_REPORTS.map((report) => (
          <Card key={report.id}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={report.type === "Timetable" ? "info" : report.type === "Merit" ? "warning" : "default"}>
                      {report.type}
                    </Badge>
                    <span className="text-xs text-slate-500">{report.university}</span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs text-slate-400">{report.date}</span>
                  </div>
                  <p className="text-sm text-slate-700 mb-2">{report.description}</p>
                  <p className="text-xs text-slate-400">Reported by: {report.reporter}</p>
                </div>
                <div className="flex gap-2">
                  {report.status === "pending" ? (
                    <>
                      <Button variant="ghost" size="sm" className="text-emerald-600 hover:text-emerald-700">
                        <Check className="h-4 w-4 mr-1" /> Approve
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                        <X className="h-4 w-4 mr-1" /> Reject
                      </Button>
                    </>
                  ) : (
                    <Badge variant={report.status === "approved" ? "success" : "danger"}>
                      {report.status}
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
