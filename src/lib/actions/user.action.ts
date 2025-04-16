"use server";
import Users, { IUser } from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import { TCreateUserParams } from "@/types";

export async function createUser(params: TCreateUserParams) {
  try {
    connectToDatabase();
    const newUser = await Users.create(params);
    return newUser;
  } catch (error) {
    console.log(error);
  }
}

export async function getUserInfor({
  userId,
}: {
  userId: string;
}): Promise<IUser | null | undefined> {
  try {
    connectToDatabase();
    const findUser = await Users.findOne({ clerkId: userId });
    if (!findUser) return null;
    return findUser;
  } catch (error) {
    console.log(error);
  }
}
