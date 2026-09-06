import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q") || "";
  const type = searchParams.get("type");
  const allResults = [
    { type: "university", name: "COMSATS University Islamabad", slug: "comsats-university-islamabad", subtitle: "Islamabad • Public" },
    { type: "university", name: "Fast NU", slug: "fast-nuces", subtitle: "Islamabad • Private" },
    { type: "university", name: "UET Lahore", slug: "uet-lahore", subtitle: "Lahore • Public" },
    { type: "university", name: "LUMS", slug: "lums", subtitle: "Lahore • Private" },
    { type: "program", name: "BS Computer Science", slug: "computer-science", subtitle: "50+ universities" },
    { type: "program", name: "BS Software Engineering", slug: "software-engineering", subtitle: "40+ universities" },
    { type: "calculator", name: "CGPA Calculator", slug: "cgpa", subtitle: "Academic" },
    { type: "calculator", name: "MDCAT Aggregate", slug: "mdcat-aggregate", subtitle: "Admission" },
    { type: "calculator", name: "Merit Calculator", slug: "merit", subtitle: "Admission" },
  ];

  let filtered = allResults;

  if (query) {
    const q = query.toLowerCase();
    filtered = filtered.filter(
      (r) => r.name.toLowerCase().includes(q) || r.subtitle.toLowerCase().includes(q)
    );
  }

  if (type) {
    filtered = filtered.filter((r) => r.type === type);
  }

  return NextResponse.json({
    data: filtered,
    total: filtered.length,
  });
}
