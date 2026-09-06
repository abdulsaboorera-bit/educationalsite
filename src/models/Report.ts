import mongoose, { Schema, Document } from "mongoose";

export interface IReport extends Document {
  reporter_name?: string;
  reporter_email?: string;
  report_type: string;
  target_type: string;
  target_id: mongoose.Types.ObjectId;
  university: mongoose.Types.ObjectId;
  description: string;
  status: string;
  admin_notes?: string;
  resolved_by?: string;
  resolved_at?: Date;
  created_at: Date;
  updated_at: Date;
}

const ReportSchema = new Schema<IReport>(
  {
    reporter_name: String,
    reporter_email: String,
    report_type: { type: String, required: true },
    target_type: { type: String, required: true },
    target_id: { type: Schema.Types.ObjectId, required: true },
    university: { type: Schema.Types.ObjectId, ref: "University", required: true },
    description: { type: String, required: true },
    status: { type: String, default: "pending" },
    admin_notes: String,
    resolved_by: String,
    resolved_at: Date,
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

ReportSchema.index({ status: 1 });
ReportSchema.index({ university: 1 });

export default mongoose.models.Report || mongoose.model<IReport>("Report", ReportSchema);
