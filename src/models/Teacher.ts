import mongoose, { Schema, Document } from "mongoose";
import { ISource } from "@/types";

export interface ITeacher extends Document {
  university: mongoose.Types.ObjectId;
  campus: mongoose.Types.ObjectId;
  name: string;
  slug: string;
  designation: string;
  department: string;
  photo_url?: string;
  courses: string[];
  research_interests: string[];
  publications?: string;
  official_profile_url?: string;
  email?: string;
  source: ISource;
  is_active: boolean;
}

const TeacherSchema = new Schema<ITeacher>(
  {
    university: { type: Schema.Types.ObjectId, ref: "University", required: true },
    campus: { type: Schema.Types.ObjectId, ref: "Campus", required: true },
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true },
    designation: { type: String, required: true },
    department: { type: String, required: true },
    photo_url: String,
    courses: [String],
    research_interests: [String],
    publications: String,
    official_profile_url: String,
    email: String,
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

TeacherSchema.index({ university: 1, department: 1 });
TeacherSchema.index({ slug: 1 });
TeacherSchema.index({ name: "text", department: "text" });

export default mongoose.models.Teacher || mongoose.model<ITeacher>("Teacher", TeacherSchema);
