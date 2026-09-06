import mongoose, { Schema, Document } from "mongoose";
import { ISource } from "@/types";

export interface ICourse extends Document {
  university: mongoose.Types.ObjectId;
  campus: mongoose.Types.ObjectId;
  department: string;
  code: string;
  name: string;
  credit_hours: number;
  description?: string;
  semester: number;
  source: ISource;
  is_active: boolean;
}

const CourseSchema = new Schema<ICourse>(
  {
    university: { type: Schema.Types.ObjectId, ref: "University", required: true },
    campus: { type: Schema.Types.ObjectId, ref: "Campus", required: true },
    department: { type: String, required: true },
    code: { type: String, required: true },
    name: { type: String, required: true },
    credit_hours: { type: Number, required: true },
    description: String,
    semester: { type: Number, required: true },
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

CourseSchema.index({ university: 1, department: 1 });
CourseSchema.index({ code: 1 });

export default mongoose.models.Course || mongoose.model<ICourse>("Course", CourseSchema);
