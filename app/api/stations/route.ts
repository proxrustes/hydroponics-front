import { NextResponse } from "next/server";
import { HTTP_RESPONSES } from "@/definitions/HttpDefinitions";
import { parse } from "@/lib/utils/jwtUtils";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("currentUser")?.value;

    if (!token) {
      return NextResponse.json(HTTP_RESPONSES[401]);
    }

    const user = await parse(token);
    if (!user) {
      return NextResponse.json(HTTP_RESPONSES[401]);
    }

    const stations = await prisma.station.findMany({
      where: {
        userId: user.id,
      },
      include: {
        zones: {
          include: {
            plant: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(HTTP_RESPONSES[200](stations));
  } catch (error: any) {
    console.error("❌ Error in GET /stations:", error);
    return NextResponse.json(HTTP_RESPONSES[500](error.message));
  }
}
