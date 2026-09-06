import mongoose, { Schema, Document } from "mongoose";
import { ISource } from "@/types";

export interface IUniversity extends Document {
  name: string;
  short_name: string;
  slug: string;
  logo_url?: string;
  description: string;
  type: "public" | "private" | "semi-government";
  category: string[];
  province: string;
  city: string;
  address?: string;
  website?: string;
  admission_url?: string;
  phone?: string;
  email?: string;
  established_year?: number;
  hec_recognized: boolean;
  campuses: mongoose.Types.ObjectId[];
  programs_count: number;
  teachers_count: number;
  source: ISource;
  is_featured: boolean;
  is_active: boolean;
  meta_title?: string;
  meta_description?: string;
  created_at: Date;
  updated_at: Date;
}

const UniversitySchema = new Schema<IUniversity>(
  {
    name: { type: String, required: true, trim: true },
    short_name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    logo_url: { type: String },
    description: { type: String, required: true },
    type: { type: String, required: true, enum: ["public", "private", "semi-government"] },
    category: [{ type: String }],
    province: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String },
    website: { type: String },
    admission_url: { type: String },
    phone: { type: String },
    email: { type: String },
    established_year: { type: Number },
    hec_recognized: { type: Boolean, default: true },
    campuses: [{ type: Schema.Types.ObjectId, ref: "Campus" }],
    programs_count: { type: Number, default: 0 },
    teachers_count: { type: Number, default: 0 },
    source: {
      source_url: String,
      source_type: { type: String, default: "OFFICIAL_WEBSITE" },
      verified: { type: Boolean, default: false },
      verified_by: String,
      verified_at: Date,
      last_updated: { type: Date, default: Date.now },
      academic_year: String,
      confidence: { type: String, default: "medium" },
    },
    is_featured: { type: Boolean, default: false },
    is_active: { type: Boolean, default: true },
    meta_title: String,
    meta_description: String,
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

UniversitySchema.index({ slug: 1 });
UniversitySchema.index({ city: 1, province: 1 });
UniversitySchema.index({ type: 1 });
UniversitySchema.index({ name: "text", short_name: "text", description: "text" });
UniversitySchema.index({ is_featured: -1, is_active: 1 });

export default mongoose.models.University || mongoose.model<IUniversity>("University", UniversitySchema);
