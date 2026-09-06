import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGO_URI || "";

async function connectDB() {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(MONGODB_URI);
}

const SourceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  organization: { type: String, required: true },
  country: { type: String, default: "pakistan" },
  province: { type: String, default: "" },
  education_level: { type: String, default: "matric" },
  category: { type: String, required: true },
  official_website: { type: String, required: true },
  urls: { type: mongoose.Schema.Types.Mixed, default: {} },
  status: { type: String, default: "active" },
  crawl_frequency: { type: String, default: "6h" },
  last_checked: Date,
  last_successful_crawl: Date,
  last_content_change: Date,
  http_status: Number,
  parser_status: String,
  verification_status: { type: String, default: "unverified" },
  error_count: { type: Number, default: 0 },
  last_error: String,
}, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });

const Source = mongoose.models.CrawlSource || mongoose.model("CrawlSource", SourceSchema);

export async function GET() {
  try {
    await connectDB();
    const sources = await Source.find().sort({ created_at: -1 }).lean();
    return NextResponse.json({ sources, total: sources.length });
  } catch {
    return NextResponse.json({ error: "Failed to fetch sources" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();

    const slug = body.slug || body.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

    const source = new Source({
      ...body,
      slug,
      status: body.status || "active",
      crawl_frequency: body.crawl_frequency || "6h",
      error_count: 0,
    });

    await source.save();
    return NextResponse.json({ source }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
