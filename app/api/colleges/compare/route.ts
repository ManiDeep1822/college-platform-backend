import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const ids = searchParams.getAll("id");

    if (ids.length < 2) {
      return NextResponse.json(
        {
          success: false,
          message: "At least 2 college IDs required",
        },
        {
          status: 400,
        },
      );
    }

    const colleges = await prisma.college.findMany({
      where: {
        id: {
          in: ids,
        },
      },

      include: {
        courses: true,
        reviews: true,
      },
    });

    return NextResponse.json({
      success: true,
      count: colleges.length,
      colleges,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Comparison failed",
      },
      {
        status: 500,
      },
    );
  }
}
