import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { smartFetch } from "@/lib/engine/fetcher";
import { classifyDocument } from "@/lib/engine/classifier";
import { extractByType } from "@/lib/engine/extractor";
import * as cheerio from "cheerio";
import * as crypto from "crypto";

const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGO_URI || "";

async function connectDB() {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(MONGODB_URI);
}

const SourceSchema = new mongoose.Schema({}, { strict: false, timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });
const DocumentSchema = new mongoose.Schema({}, { strict: false, timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });
const ExtractedDataSchema = new mongoose.Schema({}, { strict: false, timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });

const Source = mongoose.models.CrawlSource || mongoose.model("CrawlSource", SourceSchema);
const CrawledDocument = mongoose.models.CrawledDocument || mongoose.model("CrawledDocument", DocumentSchema);
const ExtractedDataModel = mongoose.models.ExtractedData || mongoose.model("ExtractedData", ExtractedDataSchema);

function computeContentHash(content: string): string {
  return crypto.createHash("sha256").update(content).digest("hex").substring(0, 32);
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { source_id, url } = body;

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const startTime = Date.now();
    const result = await smartFetch(url);

    if (!result.html || result.status !== 200) {
      return NextResponse.json({
        success: false,
        error: `Failed to fetch: HTTP ${result.status}`,
        status_code: result.status,
      });
    }

    const $ = cheerio.load(result.html);
    const title = $("title").text().trim() || $("h1").first().text().trim() || "Untitled";
    const visibleText = $("body").text().replace(/\s+/g, " ").trim().substring(0, 10000);
    const contentHash = computeContentHash(result.html);

    const classification = classifyDocument(url, title, visibleText);

    const existingDoc = await CrawledDocument.findOne({ url }).lean() as Record<string, unknown> | null;
    const contentChanged = existingDoc ? existingDoc.content_hash !== contentHash : true;

    let document;
    if (existingDoc) {
      document = await CrawledDocument.findOneAndUpdate(
        { url },
        {
          $set: {
            title,
            content_hash: contentHash,
            extracted_text: visibleText.substring(0, 5000),
            http_status: result.status,
            content_changed: contentChanged,
            verification_status: contentChanged ? "new" : (existingDoc.verification_status as string),
          },
        },
        { new: true }
      );
    } else {
      document = await new CrawledDocument({
        source_id: source_id || null,
        source_name: "manual",
        url,
        title,
        document_type: classification.document_type,
        content_type: "html",
        content_hash: contentHash,
        extracted_text: visibleText.substring(0, 5000),
        http_status: result.status,
        detected_at: new Date(),
        content_changed: true,
        verification_status: "new",
        confidence_score: classification.confidence,
      }).save();
    }

    const extractedInfo = extractByType(result.html, url, title, classification.document_type);

    let extractedData = null;
    if (contentChanged) {
      extractedData = await new ExtractedDataModel({
        document_id: document._id,
        source_id: source_id || null,
        data_type: classification.document_type,
        board: extractedInfo.board,
        class_level: extractedInfo.class_level,
        subject: extractedInfo.subject,
        year: extractedInfo.year,
        structured_data: extractedInfo.structured_data,
        raw_text: visibleText.substring(0, 3000),
        verification_status: "new",
        confidence_score: extractedInfo.confidence,
      }).save();
    }

    if (source_id) {
      await Source.findByIdAndUpdate(source_id, {
        $set: {
          last_checked: new Date(),
          last_successful_crawl: new Date(),
          http_status: result.status,
          parser_status: "success",
          last_content_change: contentChanged ? new Date() : undefined,
        },
      });
    }

    const duration = Date.now() - startTime;

    return NextResponse.json({
      success: true,
      url,
      title,
      status_code: result.status,
      content_hash: contentHash,
      content_changed: contentChanged,
      classification: {
        type: classification.document_type,
        confidence: classification.confidence,
      },
      extracted: {
        board: extractedInfo.board,
        class_level: extractedInfo.class_level,
        year: extractedInfo.year,
        confidence: extractedInfo.confidence,
      },
      document_id: document._id,
      extracted_data_id: extractedData?._id,
      duration_ms: duration,
      method: result.method,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();

    const stats = {
      total_documents: await CrawledDocument.countDocuments(),
      new_documents: await CrawledDocument.countDocuments({ verification_status: "new" }),
      pending_review: await CrawledDocument.countDocuments({ verification_status: "pending_review" }),
      published: await CrawledDocument.countDocuments({ verification_status: "published" }),
      total_sources: await Source.countDocuments(),
      active_sources: await Source.countDocuments({ status: "active" }),
      total_extracted: await ExtractedDataModel.countDocuments(),
    };

    const recentDocs = await CrawledDocument.find()
      .sort({ detected_at: -1 })
      .limit(20)
      .lean();

    return NextResponse.json({ stats, recent_documents: recentDocs });
  } catch {
    return NextResponse.json({ error: "Failed to fetch crawl status" }, { status: 500 });
  }
}
