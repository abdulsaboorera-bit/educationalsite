"use client";

import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Calculator, Plus, Edit } from "lucide-react";

const CALCULATORS = [
  { name: "CGPA Calculator", slug: "cgpa", category: "academic", status: "active" },
  { name: "GPA Calculator", slug: "gpa", category: "academic", status: "active" },
  { name: "MDCAT Aggregate", slug: "mdcat-aggregate", category: "admission", status: "active" },
  { name: "Merit Calculator", slug: "merit", category: "admission", status: "active" },
  { name: "Attendance Calculator", slug: "attendance", category: "student-tools", status: "active" },
];

export default function AdminCalculatorsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-900">Calculators</h1>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-1.5" />
          Add Calculator
        </Button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CALCULATORS.map((calc) => (
          <Card key={calc.slug}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="h-10 w-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <Calculator className="h-5 w-5" />
                </div>
                <Badge variant="success">Active</Badge>
              </div>
              <h3 className="text-sm font-semibold text-slate-900 mb-1">{calc.name}</h3>
              <p className="text-xs text-slate-500 mb-3 capitalize">{calc.category}</p>
              <Button variant="ghost" size="sm" className="w-full">
                <Edit className="h-3.5 w-3.5 mr-1.5" />
                Edit
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
