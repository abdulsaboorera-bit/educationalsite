import mongoose, { Schema, Document } from "mongoose";

export interface ITimetableEntry extends Document {
  university: mongoose.Types.ObjectId;
  campus: mongoose.Types.ObjectId;
  department: string;
  program: string;
  semester: number;
  section: string;
  course_code: string;
  course_name: string;
  teacher_name?: string;
  day: string;
  start_time: string;
  end_time: string;
  room: string;
  building?: string;
  academic_session: string;
  source_type: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

const TimetableSchema = new Schema<ITimetableEntry>(
  {
    university: { type: Schema.Types.ObjectId, ref: "University", required: true },
    campus: { type: Schema.Types.ObjectId, ref: "Campus", required: true },
    department: { type: String, required: true },
    program: { type: String, required: true },
    semester: { type: Number, required: true },
    section: { type: String, required: true },
    course_code: { type: String, required: true },
    course_name: { type: String, required: true },
    teacher_name: String,
    day: { type: String, required: true },
    start_time: { type: String, required: true },
    end_time: { type: String, required: true },
    room: { type: String, required: true },
    building: String,
    academic_session: { type: String, required: true },
    source_type: { type: String, default: "COMMUNITY_REPORT" },
    is_active: { type: Boolean, default: true },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

TimetableSchema.index({ university: 1, campus: 1, semester: 1, section: 1 });

export default mongoose.models.Timetable || mongoose.model<ITimetableEntry>("Timetable", TimetableSchema);
