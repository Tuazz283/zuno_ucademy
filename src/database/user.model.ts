import { EUserRole, EUserStatus } from "@/types/enums";
import { Document, Schema, model, models } from "mongoose";

// clerkId
export interface IUser extends Document {
  clerkId: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  courses: Schema.Types.ObjectId;
  status: EUserStatus;
  role: EUserRole;
  created_at: Date;
}

const userSchema = new Schema<IUser>({
  clerkId: {
    type: String,
  },
  name: {
    type: String,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
  created_at: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    enum: Object.values(EUserRole),
    default: EUserRole.USER,
  },
  status: {
    type: String,
    enum: Object.values(EUserStatus),
    default: EUserStatus.ACTIVE,
  },
});
const Users = models.Users || model<IUser>("Users", userSchema);
export default Users;
