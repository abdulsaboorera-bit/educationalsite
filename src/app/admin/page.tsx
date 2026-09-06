"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const STATS = [
  { label: "Universities", value: "12", color: "bg-emerald-50 text-emerald-600", iconClass: "bg-emerald-100 text-emerald-600" },
  { label: "Programs", value: "148", color: "bg-emerald-50 text-emerald-600", iconClass: "bg-emerald-100 text-emerald-600" },
  { label: "Teachers", value: "342", color: "bg-purple-50 text-purple-600", iconClass: "bg-purple-100 text-purple-600" },
  { label: "Merit Records", value: "89", color: "bg-amber-50 text-amber-600", iconClass: "bg-amber-100 text-amber-600" },
];

const PENDING_REPORTS = [
  { id: "1", type: "Timetable", university: "COMSATS", description: "Room number changed for CS-301", status: "pending", date: "2026-08-25" },
  { id: "2", type: "Merit", university: "FAST", description: "Closing merit for BS CS seems incorrect", status: "pending", date: "2026-08-24" },
  { id: "3", type: "Fee", university: "UET", description: "Fee structure updated for 2026", status: "pending", date: "2026-08-23" },
];

const RECENT_UPDATES = [
  { entity: "COMSATS University", action: "Program list updated", time: "2 hours ago" },
  { entity: "FAST-NUCES", action: "Merit data added for 2025", time: "5 hours ago" },
  { entity: "UET Lahore", action: "New campus information", time: "1 day ago" },
  { entity: "LUMS", action: "Fee structure updated", time: "2 days ago" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
                </div>
                <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${stat.iconClass}`}>
                  <span className="text-lg font-bold">{stat.value[0]}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <span className="text-amber-500">&#9888;</span>
                Pending Reports
              </CardTitle>
              <Link href="/admin/reports" className="text-sm text-emerald-600 hover:text-emerald-700">
                View All
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {PENDING_REPORTS.map((report) => (
                <div key={report.id} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="warning" className="text-[10px]">{report.type}</Badge>
                      <span className="text-xs text-slate-500">{report.university}</span>
                    </div>
                    <p className="text-sm text-slate-700">{report.description}</p>
                    <p className="text-xs text-slate-400 mt-1">{report.date}</p>
                  </div>
                  <button className="text-xs text-emerald-600 hover:text-emerald-700 shrink-0">Review</button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-emerald-500">&#9201;</span>
              Recent Updates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {RECENT_UPDATES.map((update, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50">
                  <div className="h-8 w-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5">
                    <span className="text-xs font-bold">U</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">{update.entity}</p>
                    <p className="text-xs text-slate-500">{update.action}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{update.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { label: "Add University", href: "/admin/universities" },
              { label: "Import CSV", href: "/admin/import" },
              { label: "Add Merit Record", href: "/admin/merit" },
              { label: "View Reports", href: "/admin/reports" },
            ].map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:border-emerald-200 hover:bg-emerald-50 transition-all text-sm font-medium text-slate-700"
              >
                {action.label}
                <span className="text-slate-400">&rarr;</span>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
