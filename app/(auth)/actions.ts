"use server";

import { signIn } from "@/auth";
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

export const signInUser = async (
  data: Pick<UserCredential, "email" | "password">
) => {
  const { email, password } = data;
  try {
    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    console.log("SignIn Response:", response.error);
    if (response?.error) {
      return { success: false, error: response.error };
    }
    return { success: true };
  } catch (error: any) {
    console.log("Sign In Error", error.message);
    return {
      success: false,
      error: "Invalid Password or Email",
    };
  }
};
