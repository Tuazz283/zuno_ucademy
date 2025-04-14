"use server";
import Users, { IUser } from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import { TCreateUserParams } from "@/types";

export default async function createUser(params: TCreateUserParams) {
  try {
    connectToDatabase();
    const newUser = await Users.create(params);
    return newUser;
  } catch (error) {
    console.log(error);
  }
}
