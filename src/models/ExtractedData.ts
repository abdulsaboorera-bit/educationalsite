import mongoose, { Schema, Document } from "mongoose";

export interface IExtractedData extends Document {
  document_id: mongoose.Types.ObjectId;
  source_id: mongoose.Types.ObjectId;
  data_type: "result" | "date_sheet" | "roll_number_slip" | "past_paper" | "syllabus" | "model_paper" | "merit_list" | "admission_notice" | "scholarship" | "exam_schedule" | "notification" | "prospectus" | "other";
  board?: string;
  class_level?: string;
  subject?: string;
  year?: string;
  group?: string;
  structured_data: Record<string, unknown>;
  raw_text?: string;
  verification_status: "new" | "pending_review" | "verified" | "published" | "needs_correction" | "outdated" | "archived" | "rejected";
  confidence_score: number;
  published_page_url?: string;
  created_at: Date;
  updated_at: Date;
}

const ExtractedDataSchema = new Schema<IExtractedData>(
  {
    document_id: { type: Schema.Types.ObjectId, ref: "CrawledDocument", required: true },
    source_id: { type: Schema.Types.ObjectId, ref: "CrawlSource", required: true },
    data_type: {
      type: String,
      required: true,
      enum: ["result", "date_sheet", "roll_number_slip", "past_paper", "syllabus", "model_paper", "merit_list", "admission_notice", "scholarship", "exam_schedule", "notification", "prospectus", "other"],
    },
    board: String,
    class_level: String,
    subject: String,
    year: String,
    group: String,
    structured_data: { type: Schema.Types.Mixed, required: true },
    raw_text: String,
    verification_status: { type: String, default: "new", enum: ["new", "pending_review", "verified", "published", "needs_correction", "outdated", "archived", "rejected"] },
    confidence_score: { type: Number, default: 0, min: 0, max: 100 },
    published_page_url: String,
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

ExtractedDataSchema.index({ document_id: 1 });
ExtractedDataSchema.index({ source_id: 1 });
ExtractedDataSchema.index({ data_type: 1 });
ExtractedDataSchema.index({ board: 1, class_level: 1, year: 1 });
ExtractedDataSchema.index({ verification_status: 1 });
ExtractedDataSchema.index({ subject: 1 });

export const ExtractedData = mongoose.models.ExtractedData || mongoose.model<IExtractedData>("ExtractedData", ExtractedDataSchema);
