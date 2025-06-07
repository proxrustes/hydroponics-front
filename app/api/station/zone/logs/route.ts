import { HTTP_RESPONSES } from "@/definitions/HttpDefinitions";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const uuid = req.nextUrl.searchParams.get("uuid");
    const indexStr = req.nextUrl.searchParams.get("index");
    const start = req.nextUrl.searchParams.get("start");
    const end = req.nextUrl.searchParams.get("end");
    const limitStr = req.nextUrl.searchParams.get("limit");

    const index = parseInt(indexStr || "");
    const limit = Math.min(parseInt(limitStr || "100"), 1000);

    if (!uuid || isNaN(index) || index < 0 || index > 3) {
      return NextResponse.json(
        HTTP_RESPONSES[400]("Missing or invalid 'uuid' or 'index'")
      );
    }

    const station = await prisma.station.findUnique({
      where: { uuid },
      select: { id: true },
    });

    if (!station) {
      return NextResponse.json(HTTP_RESPONSES[404]("Station not found"));
    }

    const zone = await prisma.zone.findFirst({
      where: {
        stationId: station.id,
        index,
      },
      select: { id: true },
    });

    if (!zone) {
      return NextResponse.json(
        HTTP_RESPONSES[404]("Zone not found for given index")
      );
    }

    const where: any = {
      zoneId: zone.id,
    };

    if (start)
      where.recordedAt = { ...(where.recordedAt ?? {}), gte: new Date(start) };
    if (end)
      where.recordedAt = { ...(where.recordedAt ?? {}), lte: new Date(end) };

    const logs = await prisma.zoneParamsLog.findMany({
      orderBy: { recordedAt: "asc" },
      take: limit,
    });

    return NextResponse.json(HTTP_RESPONSES[200](logs));
  } catch (error: any) {
    console.error("❌ GET /station/zone/logs error:", error);
    return NextResponse.json(HTTP_RESPONSES[500](error.message));
  }
}
