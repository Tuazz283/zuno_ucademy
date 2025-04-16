import { ELessonType } from "@/types/enums";
import { Document, model, models, Schema } from "mongoose";

export interface ILesson extends Document {
  _id: string;
  title: string;
  slug: string;
  lecture: Schema.Types.ObjectId;
  course: Schema.Types.ObjectId;
  order: number;
  duration: number;
  video_url: string;
  content: string;
  type: ELessonType;
  _destroy: boolean;
  created_at: Date;
}
const lessonSchema = new Schema<ILesson>({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    default: 0,
  },
  content: {
    type: String,
  },
  video_url: {
    type: String,
  },
  _destroy: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  duration: {
    type: Number,
    default: 0,
  },
  lecture: {
    type: Schema.Types.ObjectId,
    refL: "Lecture",
  },
  course: {
    type: Schema.Types.ObjectId,
    refL: "Course",
  },
  type: {
    type: String,
    enum: Object.values(ELessonType),
    default: ELessonType.VIDEO,
  },
});
const Lesson = models.Lesson || model<ILesson>("Lecture", lessonSchema);
export default Lesson;
