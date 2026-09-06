import mongoose, { Schema, Document } from "mongoose";
import { ISource } from "@/types";

export interface ICampus extends Document {
  university: mongoose.Types.ObjectId;
  name: string;
  slug: string;
  city: string;
  province: string;
  address?: string;
  phone?: string;
  email?: string;
  is_main: boolean;
  facilities: string[];
  hostel_available: boolean;
  source: ISource;
  is_active: boolean;
}

const CampusSchema = new Schema<ICampus>(
  {
    university: { type: Schema.Types.ObjectId, ref: "University", required: true },
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true },
    city: { type: String, required: true },
    province: { type: String, required: true },
    address: String,
    phone: String,
    email: String,
    is_main: { type: Boolean, default: false },
    facilities: [String],
    hostel_available: { type: Boolean, default: false },
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

CampusSchema.index({ university: 1 });
CampusSchema.index({ city: 1 });
CampusSchema.index({ slug: 1 });

export default mongoose.models.Campus || mongoose.model<ICampus>("Campus", CampusSchema);
