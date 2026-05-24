import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/validators/auth";
import { generateToken } from "@/lib/jwt";

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const validatedData = loginSchema.parse(body);

    const user = await prisma.user.findUnique({
      where: {
        email: validatedData.email,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid credentials",
        },
        {
          status: 401,
        },
      );
    }

    const isPasswordCorrect = await bcrypt.compare(
      validatedData.password,
      user.password,
    );

    if (!isPasswordCorrect) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid credentials",
        },
        {
          status: 401,
        },
      );
    }

    const token = generateToken(user.id);

    return NextResponse.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
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
