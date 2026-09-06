import { NextRequest, NextResponse } from "next/server";

const CALCULATORS_DATA = [
  { id: "cgpa", name: "CGPA Calculator", slug: "cgpa", category: "academic" },
  { id: "gpa", name: "GPA Calculator", slug: "gpa", category: "academic" },
  { id: "percentage", name: "Percentage Calculator", slug: "percentage", category: "academic" },
  { id: "marks", name: "Marks Calculator", slug: "marks", category: "academic" },
  { id: "attendance", name: "Attendance Calculator", slug: "attendance", category: "student-tools" },
  { id: "mdcat-aggregate", name: "MDCAT Aggregate Calculator", slug: "mdcat-aggregate", category: "admission" },
  { id: "ecat-aggregate", name: "ECAT Aggregate Calculator", slug: "ecat-aggregate", category: "admission" },
  { id: "nums-aggregate", name: "NUMS Aggregate Calculator", slug: "nums-aggregate", category: "admission" },
  { id: "merit", name: "University Merit Calculator", slug: "merit", category: "admission" },
  { id: "entry-test-aggregate", name: "Entry Test Aggregate Calculator", slug: "entry-test-aggregate", category: "admission" },
];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get("category");

  let data = CALCULATORS_DATA;

  if (category) {
    data = data.filter((c) => c.category === category);
  }

  return NextResponse.json({ data, total: data.length });
}
