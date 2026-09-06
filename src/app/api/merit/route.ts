import { NextRequest, NextResponse } from "next/server";

const MOCK_MERIT_DATA = [
  { university: "COMSATS", campus: "Islamabad", program: "BS CS", year: "2025", closing_merit: 78.5 },
  { university: "FAST", campus: "Islamabad", program: "BS CS", year: "2025", closing_merit: 82.0 },
  { university: "UET", campus: "Lahore", program: "BS CE", year: "2025", closing_merit: 75.3 },
  { university: "LUMS", campus: "Lahore", program: "BS CS", year: "2025", closing_merit: 85.0 },
  { university: "NUST", campus: "Islamabad", program: "BS CS", year: "2025", closing_merit: 80.0 },
];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const university = searchParams.get("university");
  const year = searchParams.get("year");
  const program = searchParams.get("program");

  let data = MOCK_MERIT_DATA;

  if (university) data = data.filter((m) => m.university.toLowerCase().includes(university.toLowerCase()));
  if (year) data = data.filter((m) => m.year === year);
  if (program) data = data.filter((m) => m.program.toLowerCase().includes(program.toLowerCase()));

  return NextResponse.json({ data, total: data.length });
}
