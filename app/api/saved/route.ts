import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { getUserFromToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");

    const decoded = getUserFromToken(authHeader);

    const body = await req.json();

    const { collegeId } = body;

    const savedCollege = await prisma.savedCollege.create({
      data: {
        userId: decoded.id,
        collegeId,
      },
    });

    return NextResponse.json({
      success: true,
      savedCollege,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to save college",
      },
      {
        status: 500,
      },
    );
  }
}

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");

    const decoded = getUserFromToken(authHeader);

    const savedColleges = await prisma.savedCollege.findMany({
      where: {
        userId: decoded.id,
      },

      include: {
        college: true,
      },
    });

    return NextResponse.json({
      success: true,
      savedColleges,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch saved colleges",
      },
      {
        status: 500,
      },
    );
  }
}
