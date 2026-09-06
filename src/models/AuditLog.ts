import mongoose, { Schema, Document } from "mongoose";

export interface IAuditLog extends Document {
  user: mongoose.Types.ObjectId;
  action: string;
  entity_type: string;
  entity_id: mongoose.Types.ObjectId;
  details: Record<string, unknown>;
  ip_address?: string;
  created_at: Date;
}

const AuditLogSchema = new Schema<IAuditLog>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    action: { type: String, required: true },
    entity_type: { type: String, required: true },
    entity_id: { type: Schema.Types.ObjectId, required: true },
    details: { type: Schema.Types.Mixed },
    ip_address: String,
  },
  { timestamps: { createdAt: "created_at" } }
);

AuditLogSchema.index({ user: 1, created_at: -1 });
AuditLogSchema.index({ entity_type: 1, entity_id: 1 });

export default mongoose.models.AuditLog || mongoose.model<IAuditLog>("AuditLog", AuditLogSchema);
