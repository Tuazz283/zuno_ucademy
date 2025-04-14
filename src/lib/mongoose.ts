import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  if (!process.env.MONGODB_URL) {
    throw new Error("MONGODB_URL is not set");
  }

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "zuno_course",
    });

    isConnected = true;
    console.log("MongoDB connected successfully");
  } catch (err: any) {
    console.log(`Error while connecting to database: ${err.message || err}`);
    throw err; // Thêm throw để có thể bắt lỗi ngoài này
  }
};
