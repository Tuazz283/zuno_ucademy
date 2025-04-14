"use server";
import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import { TCreateUserParams } from "@/types";

export default async function createUser(params: TCreateUserParams) {
  try {
    console.log("Tạo user với các tham số:", params); // Thêm log vào để kiểm tra params

    await connectToDatabase();

    // Validate input
    if (!params.email?.trim()) {
      console.error("Thiếu email trong params:", params);
      throw new Error("Missing required field: email");
    }
    if (!params.username?.trim() || !params.clerkId?.trim()) {
      console.error("Thiếu username hoặc clerkId trong params:", params);
      throw new Error("Missing required fields");
    }

    // Kiểm tra xem user đã tồn tại chưa
    const existingUser = await User.findOne({
      $or: [{ email: params.email }, { clerkId: params.clerkId }],
    });

    // Nếu người dùng đã tồn tại, trả về người dùng hiện tại
    if (existingUser) {
      console.log("User đã tồn tại:", existingUser);
      return existingUser;
    }

    // Nếu không tồn tại, tạo người dùng mới
    console.log("Đang tạo mới user với các tham số:", params);
    const newUser = await User.create(params);
    console.log("✅ User tạo thành công:", newUser);
    return newUser;
  } catch (error: any) {
    console.error("❌ Lỗi khi tạo user:", error.message || error);
    throw error;
  }
}
