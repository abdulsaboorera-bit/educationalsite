import mongoose, { Schema, Document } from "mongoose";
import { ISource } from "@/types";

export interface IProgram extends Document {
  university: mongoose.Types.ObjectId;
  campus: mongoose.Types.ObjectId;
  name: string;
  slug: string;
  degree_level: string;
  field: string;
  department: string;
  duration_years: number;
  fee_per_year?: number;
  total_fee?: number;
  eligibility: string[];
  description?: string;
  admission_status: string;
  seats?: number;
  merit_formula?: string;
  source: ISource;
  is_active: boolean;
}

const ProgramSchema = new Schema<IProgram>(
  {
    university: { type: Schema.Types.ObjectId, ref: "University", required: true },
    campus: { type: Schema.Types.ObjectId, ref: "Campus", required: true },
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true },
    degree_level: { type: String, required: true },
    field: { type: String, required: true },
    department: { type: String, required: true },
    duration_years: { type: Number, required: true },
    fee_per_year: Number,
    total_fee: Number,
    eligibility: [String],
    description: String,
    admission_status: { type: String, default: "pending" },
    seats: Number,
    merit_formula: String,
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
    is_active: { type: Boolean, default: true },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

ProgramSchema.index({ university: 1, campus: 1 });
ProgramSchema.index({ field: 1 });
ProgramSchema.index({ slug: 1 });
ProgramSchema.index({ name: "text", department: "text", field: "text" });

export default mongoose.models.Program || mongoose.model<IProgram>("Program", ProgramSchema);
