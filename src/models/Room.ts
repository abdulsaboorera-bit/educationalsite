import mongoose, { Schema, Document } from "mongoose";

export interface IRoom extends Document {
  university: mongoose.Types.ObjectId;
  campus: mongoose.Types.ObjectId;
  building: string;
  floor: number;
  room_number: string;
  capacity?: number;
  current_status: string;
  source_type: string;
  verification_status: string;
  last_updated: Date;
  is_active: boolean;
}

const RoomSchema = new Schema<IRoom>(
  {
    university: { type: Schema.Types.ObjectId, ref: "University", required: true },
    campus: { type: Schema.Types.ObjectId, ref: "Campus", required: true },
    building: { type: String, required: true },
    floor: { type: Number, default: 0 },
    room_number: { type: String, required: true },
    capacity: Number,
    current_status: { type: String, default: "last_known" },
    source_type: { type: String, default: "COMMUNITY_REPORT" },
    verification_status: { type: String, default: "unverified" },
    last_updated: { type: Date, default: Date.now },
    is_active: { type: Boolean, default: true },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

RoomSchema.index({ university: 1, campus: 1, building: 1 });

export default mongoose.models.Room || mongoose.model<IRoom>("Room", RoomSchema);
