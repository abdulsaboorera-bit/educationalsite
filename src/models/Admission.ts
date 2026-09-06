import mongoose, { Schema, Document } from "mongoose";
import { ISource } from "@/types";

export interface IAdmission extends Document {
  university: mongoose.Types.ObjectId;
  campus: mongoose.Types.ObjectId;
  program: mongoose.Types.ObjectId;
  admission_year: string;
  status: string;
  opening_date?: Date;
  closing_date?: Date;
  test_date?: Date;
  merit_formula?: string;
  eligibility: string[];
  required_documents: string[];
  source: ISource;
  is_active: boolean;
}

const AdmissionSchema = new Schema<IAdmission>(
  {
    university: { type: Schema.Types.ObjectId, ref: "University", required: true },
    campus: { type: Schema.Types.ObjectId, ref: "Campus", required: true },
    program: { type: Schema.Types.ObjectId, ref: "Program", required: true },
    admission_year: { type: String, required: true },
    status: { type: String, default: "pending" },
    opening_date: Date,
    closing_date: Date,
    test_date: Date,
    merit_formula: String,
    eligibility: [String],
    required_documents: [String],
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

AdmissionSchema.index({ university: 1, admission_year: 1 });

export default mongoose.models.Admission || mongoose.model<IAdmission>("Admission", AdmissionSchema);
