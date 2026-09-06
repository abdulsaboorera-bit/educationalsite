import mongoose, { Schema, Document } from "mongoose";

export interface ICrawlSource extends Document {
  name: string;
  slug: string;
  organization: string;
  country: string;
  province: string;
  education_level: string;
  category: "board" | "university" | "hec" | "scholarship_portal" | "government" | "other";
  official_website: string;
  urls: {
    results?: string;
    date_sheets?: string;
    roll_number_slips?: string;
    past_papers?: string;
    syllabus?: string;
    admissions?: string;
    scholarships?: string;
    announcements?: string;
    merit_lists?: string;
  };
  status: "active" | "paused" | "disabled" | "error";
  crawl_frequency: "hourly" | "6h" | "12h" | "daily" | "weekly";
  last_checked?: Date;
  last_successful_crawl?: Date;
  last_content_change?: Date;
  http_status?: number;
  parser_status?: string;
  verification_status: string;
  error_count: number;
  last_error?: string;
  created_at: Date;
  updated_at: Date;
}

const CrawlSourceSchema = new Schema<ICrawlSource>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    organization: { type: String, required: true },
    country: { type: String, default: "pakistan" },
    province: { type: String, default: "" },
    education_level: { type: String, default: "matric" },
    category: { type: String, required: true, enum: ["board", "university", "hec", "scholarship_portal", "government", "other"] },
    official_website: { type: String, required: true },
    urls: {
      results: String,
      date_sheets: String,
      roll_number_slips: String,
      past_papers: String,
      syllabus: String,
      admissions: String,
      scholarships: String,
      announcements: String,
      merit_lists: String,
    },
    status: { type: String, default: "active", enum: ["active", "paused", "disabled", "error"] },
    crawl_frequency: { type: String, default: "6h", enum: ["hourly", "6h", "12h", "daily", "weekly"] },
    last_checked: Date,
    last_successful_crawl: Date,
    last_content_change: Date,
    http_status: Number,
    parser_status: String,
    verification_status: { type: String, default: "unverified" },
    error_count: { type: Number, default: 0 },
    last_error: String,
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

CrawlSourceSchema.index({ slug: 1 });
CrawlSourceSchema.index({ status: 1, crawl_frequency: 1 });
CrawlSourceSchema.index({ category: 1 });
CrawlSourceSchema.index({ country: 1, province: 1 });

export const CrawlSource = mongoose.models.CrawlSource || mongoose.model<ICrawlSource>("CrawlSource", CrawlSourceSchema);
