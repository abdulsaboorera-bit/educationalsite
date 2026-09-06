"use client";

import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { User, Plus, Upload } from "lucide-react";

const MOCK_TEACHERS = [
  { name: "Dr. Ahmed Khan", university: "COMSATS", department: "CS", designation: "Professor" },
  { name: "Dr. Fatima Noor", university: "COMSATS", department: "SE", designation: "Assoc. Prof" },
  { name: "Dr. Hassan Raza", university: "FAST", department: "CS", designation: "Asst. Prof" },
  { name: "Dr. Muhammad Ali", university: "UET", department: "CE", designation: "Professor" },
];

export default function AdminTeachersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-900">Teachers</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-1.5" />
            Import CSV
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-1.5" />
            Add Teacher
          </Button>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {MOCK_TEACHERS.map((teacher, i) => (
          <Card key={i}>
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                  <User className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-slate-900">{teacher.name}</h3>
                  <p className="text-xs text-slate-500">{teacher.designation}</p>
                  <p className="text-xs text-slate-500">{teacher.university} - {teacher.department}</p>
                </div>
                <button className="text-xs text-emerald-600 hover:text-emerald-700">Edit</button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
