"use server";
import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  // Kiểm tra nếu biến môi trường không tồn tại
  if (!process.env.MONGODB_URL) {
    throw new Error("MONGODB_URL is not set"); // Đảm bảo là MONGODB_URL được set
  }

  // Nếu đã kết nối, không cần kết nối lại
  if (isConnected) {
    console.log("MONGODB is already connected");
    return;
  }

  try {
    // Kết nối đến MongoDB
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "zuno_course", // Tên cơ sở dữ liệu
    });

    isConnected = true;
    console.log("Using new database connection");
  } catch (err: any) {
    // Dùng `any` nếu không biết trước kiểu của `err`
    console.log(`Error while connecting to database: ${err.message || err}`);
  }
};
