import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { getUserFromToken } from "@/lib/auth";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function DELETE(req: Request, { params }: Params) {
  try {
    const authHeader = req.headers.get("authorization");

    const decoded = getUserFromToken(authHeader);

    const { id } = await params;

    const savedCollege = await prisma.savedCollege.findUnique({
      where: {
        id,
      },
    });

    if (!savedCollege) {
      return NextResponse.json(
        {
          success: false,
          message: "Saved college not found",
        },
        {
          status: 404,
        },
      );
    }

    if (savedCollege.userId !== decoded.id) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    await prisma.savedCollege.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "College removed from saved list",
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Delete failed",
      },
      {
        status: 500,
      },
    );
  }
}
