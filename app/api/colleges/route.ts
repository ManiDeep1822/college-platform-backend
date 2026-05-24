import { successResponse, errorResponse } from "@/lib/api-response";

import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page") || 1);

    const limit = Number(searchParams.get("limit") || 10);

    const search = searchParams.get("search") || "";

    const location = searchParams.get("location") || "";

    const skip = (page - 1) * limit;

    const colleges = await prisma.college.findMany({
      where: {
        name: {
          contains: search,
          mode: "insensitive",
        },

        location: {
          contains: location,
          mode: "insensitive",
        },
      },

      skip,
      take: limit,

      orderBy: {
        rating: "desc",
      },
    });

    const total = await prisma.college.count({
      where: {
        name: {
          contains: search,
          mode: "insensitive",
        },

        location: {
          contains: location,
          mode: "insensitive",
        },
      },
    });

    return successResponse({
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },

      colleges,
    });
  } catch (error) {
    console.log(error);

    return errorResponse("Failed to fetch colleges", 500);
  }
}
