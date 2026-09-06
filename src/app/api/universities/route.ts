import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q") || "";
  const type = searchParams.get("type");
  const city = searchParams.get("city");
  const province = searchParams.get("province");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");

  // Mock data - replace with MongoDB queries
  const universities = [
    { name: "COMSATS University Islamabad", slug: "comsats-university-islamabad", short_name: "CUI", city: "Islamabad", province: "Islamabad", type: "public", programs_count: 45 },
    { name: "Fast NU", slug: "fast-nuces", short_name: "FAST", city: "Islamabad", province: "Islamabad", type: "private", programs_count: 30 },
    { name: "UET Lahore", slug: "uet-lahore", short_name: "UET", city: "Lahore", province: "Punjab", type: "public", programs_count: 35 },
    { name: "LUMS", slug: "lums", short_name: "LUMS", city: "Lahore", province: "Punjab", type: "private", programs_count: 25 },
    { name: "NUST", slug: "nust", short_name: "NUST", city: "Islamabad", province: "Islamabad", type: "public", programs_count: 50 },
    { name: "Punjab University", slug: "punjab-university", short_name: "PU", city: "Lahore", province: "Punjab", type: "public", programs_count: 120 },
    { name: "Aga Khan University", slug: "aga-khan-university", short_name: "AKU", city: "Karachi", province: "Sindh", type: "private", programs_count: 15 },
    { name: "NED University", slug: "ned-university", short_name: "NED", city: "Karachi", province: "Sindh", type: "public", programs_count: 40 },
  ];

  let filtered = universities;

  if (query) {
    const q = query.toLowerCase();
    filtered = filtered.filter(
      (u) => u.name.toLowerCase().includes(q) || u.short_name.toLowerCase().includes(q)
    );
  }
  if (type) filtered = filtered.filter((u) => u.type === type);
  if (city) filtered = filtered.filter((u) => u.city.toLowerCase() === city.toLowerCase());
  if (province) filtered = filtered.filter((u) => u.province.toLowerCase() === province.toLowerCase());

  const total = filtered.length;
  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + limit);

  return NextResponse.json({
    data: paginated,
    pagination: {
      page,
      limit,
      total,
      total_pages: Math.ceil(total / limit),
    },
  });
}
