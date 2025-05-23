"use server";
import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  if (!process.env.MONGODB_URL) {
    throw new Error("MONGODB_URL is not set");
  }

  if (isConnected) {
    console.log("MONGODB is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "zuno_course",
    });

    isConnected = true;
    console.log("Using new database connection");
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(`Error while connecting to database: ${err.message}`);
    } else {
      console.log(`Unknown error while connecting to database: ${String(err)}`);
    }
  }
};
