import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { report_type, target_type, target_id, university, description, reporter_name, reporter_email } = body;

    if (!report_type || !target_type || !target_id || !university || !description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Save to database
    const report = {
      id: Date.now().toString(),
      report_type,
      target_type,
      target_id,
      university,
      description,
      reporter_name: reporter_name || "Anonymous",
      reporter_email: reporter_email || "",
      status: "pending",
      created_at: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      message: "Report submitted successfully. Our team will review it.",
      data: report,
    });
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Use POST to submit a report. GET requires admin authentication.",
  });
}
