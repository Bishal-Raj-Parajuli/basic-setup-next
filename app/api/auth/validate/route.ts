import db from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { success: false, error: "Invalid Data" },
      { status: 400 }
    );
  }

  try {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User with email doesnot exist." },
        { status: 400 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, error: "Password is Incorrect" },
        { status: 400 }
      );
    }

    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(
      { success: true, data: userWithoutPassword },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong on the server.",
      },
      { status: 500 }
    );
  }
}
