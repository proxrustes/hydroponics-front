import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { HTTP_RESPONSES } from "@/definitions/HttpDefinitions";
import { parse } from "@/lib/utils/jwtUtils";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();
    const stationId = parseInt(id || "");

    if (isNaN(stationId)) {
      return NextResponse.json(
        HTTP_RESPONSES[400]("Station ID must be a number")
      );
    }

    const authHeader = req.headers.get("authorization");
    const token = authHeader?.startsWith("Bearer ")
      ? authHeader.slice(7)
      : null;

    if (!token) {
      return NextResponse.json(HTTP_RESPONSES[401]);
    }

    const user = await parse(token); // <--- юзаем парсинг токена
    if (!user) {
      return NextResponse.json(HTTP_RESPONSES[401]);
    }

    const station = await prisma.station.findFirst({
      where: {
        id: stationId,
        userId: user.id, // используем user.id
      },
      include: {
        zones: {
          include: {
            plant: {
              include: {
                plantGroup: true,
              },
            },
          },
        },
      },
    });

    if (!station) {
      return NextResponse.json(
        HTTP_RESPONSES[404]("Station not found or access denied")
      );
    }

    return NextResponse.json(HTTP_RESPONSES[200](station));
  } catch (error: any) {
    console.error("GET /api/stations/[id] error:", error);
    return NextResponse.json(HTTP_RESPONSES[500](error.message));
  }
}
