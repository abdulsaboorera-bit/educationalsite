import { NextRequest, NextResponse } from "next/server";

const UNIVERSITIES_DB: Record<string, object> = {
  "comsats-university-islamabad": {
    name: "COMSATS University Islamabad",
    short_name: "CUI",
    slug: "comsats-university-islamabad",
    description: "COMSATS University Islamabad is a public research university.",
    type: "public",
    city: "Islamabad",
    province: "Islamabad",
    website: "https://www.comsats.edu.pk",
    established_year: 1998,
    hec_recognized: true,
    campuses: [
      { name: "Islamabad Main Campus", city: "Islamabad", is_main: true },
      { name: "Lahore Campus", city: "Lahore", is_main: false },
    ],
  },
  "fast-nuces": {
    name: "Fast National University of Computer & Emerging Sciences",
    short_name: "FAST",
    slug: "fast-nuces",
    description: "FAST-NUCES is a private university known for CS and IT.",
    type: "private",
    city: "Islamabad",
    province: "Islamabad",
    website: "https://www.nu.edu.pk",
    established_year: 2000,
    hec_recognized: true,
    campuses: [
      { name: "Islamabad Campus", city: "Islamabad", is_main: true },
    ],
  },
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const uni = UNIVERSITIES_DB[slug];

  if (!uni) {
    return NextResponse.json({ error: "University not found" }, { status: 404 });
  }

  return NextResponse.json({ data: uni });
}
