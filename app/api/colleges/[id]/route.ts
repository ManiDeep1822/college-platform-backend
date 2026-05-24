import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(req: Request, { params }: Params) {
  try {
    const { id } = await params;

    const college = await prisma.college.findUnique({
      where: {
        id,
      },

      include: {
        courses: true,
        reviews: true,
      },
    });

    if (!college) {
      return NextResponse.json(
        {
          success: false,
          message: "College not found",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json({
      success: true,
      college,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch college",
      },
      {
        status: 500,
      },
    );
  }
}
