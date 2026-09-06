import mongoose, { Schema, Document } from "mongoose";
import { UserRole } from "@/types";

export interface IUser extends Document {
  name: string;
  email: string;
  password_hash: string;
  role: UserRole;
  university?: mongoose.Types.ObjectId;
  avatar_url?: string;
  is_active: boolean;
  last_login?: Date;
  created_at: Date;
  updated_at: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password_hash: { type: String, required: true },
    role: { type: String, default: "STUDENT", enum: ["SUPER_ADMIN", "ADMIN", "UNIVERSITY_ADMIN", "DATA_EDITOR", "MODERATOR", "STUDENT"] },
    university: { type: Schema.Types.ObjectId, ref: "University" },
    avatar_url: String,
    is_active: { type: Boolean, default: true },
    last_login: Date,
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

UserSchema.index({ email: 1 });
UserSchema.index({ role: 1 });

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
