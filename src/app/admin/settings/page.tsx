"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-slate-900">Settings</h1>

      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Platform Name</label>
            <input
              type="text"
              defaultValue="PakEdu"
              className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Platform URL</label>
            <input
              type="text"
              defaultValue="https://pakedu.pk"
              className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Contact Email</label>
            <input
              type="email"
              defaultValue="hello@pakedu.pk"
              className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <Button>Save Settings</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>User Roles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { role: "Super Admin", count: 1, desc: "Full platform access" },
              { role: "Admin", count: 2, desc: "Manage all content" },
              { role: "University Admin", count: 0, desc: "Manage own university" },
              { role: "Data Editor", count: 0, desc: "Edit data only" },
              { role: "Moderator", count: 0, desc: "Review reports" },
            ].map((item) => (
              <div key={item.role} className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                <div>
                  <div className="text-sm font-medium text-slate-900">{item.role}</div>
                  <div className="text-xs text-slate-500">{item.desc}</div>
                </div>
                <span className="text-sm text-slate-500">{item.count} users</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
