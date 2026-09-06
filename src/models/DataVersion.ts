import mongoose, { Schema, Document } from "mongoose";

export interface IDataVersion extends Document {
  entity_type: string;
  entity_id: mongoose.Types.ObjectId;
  field_name: string;
  previous_value: string;
  new_value: string;
  changed_at: Date;
  source?: string;
  verified_by?: string;
}

const DataVersionSchema = new Schema<IDataVersion>(
  {
    entity_type: { type: String, required: true },
    entity_id: { type: Schema.Types.ObjectId, required: true },
    field_name: { type: String, required: true },
    previous_value: { type: String, default: "" },
    new_value: { type: String, default: "" },
    changed_at: { type: Date, default: Date.now },
    source: String,
    verified_by: String,
  },
  { timestamps: false }
);

DataVersionSchema.index({ entity_type: 1, entity_id: 1 });
DataVersionSchema.index({ changed_at: -1 });

export const DataVersion = mongoose.models.DataVersion || mongoose.model<IDataVersion>("DataVersion", DataVersionSchema);
