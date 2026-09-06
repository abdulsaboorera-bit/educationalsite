import mongoose, { Schema, Document } from "mongoose";
import { ISource } from "@/types";

export interface IMeritRecord extends Document {
  university: mongoose.Types.ObjectId;
  campus: mongoose.Types.ObjectId;
  program: mongoose.Types.ObjectId;
  admission_year: string;
  merit_list_number: number;
  closing_merit: number;
  opening_merit?: number;
  category: string;
  seats?: number;
  source: ISource;
  is_active: boolean;
}

const MeritRecordSchema = new Schema<IMeritRecord>(
  {
    university: { type: Schema.Types.ObjectId, ref: "University", required: true },
    campus: { type: Schema.Types.ObjectId, ref: "Campus", required: true },
    program: { type: Schema.Types.ObjectId, ref: "Program", required: true },
    admission_year: { type: String, required: true },
    merit_list_number: { type: Number, default: 1 },
    closing_merit: { type: Number, required: true },
    opening_merit: Number,
    category: { type: String, default: "open_merit" },
    seats: Number,
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

MeritRecordSchema.index({ university: 1, admission_year: 1 });
MeritRecordSchema.index({ program: 1 });
MeritRecordSchema.index({ campus: 1 });

export default mongoose.models.MeritRecord || mongoose.model<IMeritRecord>("MeritRecord", MeritRecordSchema);
