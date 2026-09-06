import mongoose, { Schema, Document } from "mongoose";

export interface ICrawledDocument extends Document {
  source_id: mongoose.Types.ObjectId;
  source_name: string;
  url: string;
  title: string;
  document_type: "result" | "date_sheet" | "roll_number_slip" | "past_paper" | "syllabus" | "model_paper" | "merit_list" | "admission_notice" | "scholarship" | "exam_schedule" | "notification" | "prospectus" | "other";
  content_type: "html" | "pdf" | "image" | "json";
  content_hash: string;
  raw_content?: string;
  extracted_text?: string;
  file_size?: number;
  http_status: number;
  detected_at: Date;
  content_changed: boolean;
  previous_hash?: string;
  verification_status: "new" | "pending_review" | "verified" | "published" | "needs_correction" | "outdated" | "archived" | "rejected";
  confidence_score: number;
  admin_notes?: string;
  reviewed_by?: string;
  reviewed_at?: Date;
  published_at?: Date;
  created_at: Date;
  updated_at: Date;
}

const CrawledDocumentSchema = new Schema<ICrawledDocument>(
  {
    source_id: { type: Schema.Types.ObjectId, ref: "CrawlSource", required: true },
    source_name: { type: String, required: true },
    url: { type: String, required: true },
    title: { type: String, required: true },
    document_type: {
      type: String,
      required: true,
      enum: ["result", "date_sheet", "roll_number_slip", "past_paper", "syllabus", "model_paper", "merit_list", "admission_notice", "scholarship", "exam_schedule", "notification", "prospectus", "other"],
    },
    content_type: { type: String, default: "html", enum: ["html", "pdf", "image", "json"] },
    content_hash: { type: String, required: true },
    raw_content: { type: String },
    extracted_text: { type: String },
    file_size: Number,
    http_status: { type: Number, default: 200 },
    detected_at: { type: Date, default: Date.now },
    content_changed: { type: Boolean, default: false },
    previous_hash: String,
    verification_status: { type: String, default: "new", enum: ["new", "pending_review", "verified", "published", "needs_correction", "outdated", "archived", "rejected"] },
    confidence_score: { type: Number, default: 0, min: 0, max: 100 },
    admin_notes: String,
    reviewed_by: String,
    reviewed_at: Date,
    published_at: Date,
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

CrawledDocumentSchema.index({ source_id: 1 });
CrawledDocumentSchema.index({ document_type: 1 });
CrawledDocumentSchema.index({ verification_status: 1 });
CrawledDocumentSchema.index({ content_hash: 1 });
CrawledDocumentSchema.index({ detected_at: -1 });
CrawledDocumentSchema.index({ url: 1 }, { unique: true });

export const CrawledDocument = mongoose.models.CrawledDocument || mongoose.model<ICrawledDocument>("CrawledDocument", CrawledDocumentSchema);
