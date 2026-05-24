import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/validators/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const validatedData = registerSchema.parse(body);

    const existingUser = await prisma.user.findUnique({
      where: {
        email: validatedData.email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User already exists",
        },
        {
          status: 400,
        },
      );
    }

    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    const user = await prisma.user.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      {
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        error,
      },
      {
        status: 500,
      },
    );
  }
}
