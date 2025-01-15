"use server";

import db from "@/database/drizzle";
import { users } from "@/database/schema";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

interface UserCredential {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const signUpUserData = async (data: UserCredential) => {
  const { fullName, email, password, confirmPassword } = data;

  if (!fullName || !email || !password || !confirmPassword) {
    return {
      success: false,
      error: "Invalid Data !",
    };
  }
  try {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    console.log("Email Error", user);
    if (user.length > 0) {
      return {
        success: false,
        error: "User already exist !",
      };
    }

    const [savedUser] = await db
      .insert(users)
      .values({
        fullName,
        email,
        password: await bcrypt.hash(password, 10),
      })
      .returning();

    const { password: _, ...userDetailWithoutPassword } = savedUser;

    return {
      success: true,
      data: userDetailWithoutPassword,
    };
  } catch (error) {
    console.error("Someting went wrong", error);
    return {
      success: false,
      error: `Someting went wrong while saving data.`,
    };
  }
};
