import { HTTP_RESPONSES } from "@/definitions/HttpDefinitions";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const uuid = req.nextUrl.searchParams.get("uuid");
    const start = req.nextUrl.searchParams.get("start");
    const end = req.nextUrl.searchParams.get("end");
    const limitStr = req.nextUrl.searchParams.get("limit");

    const limit = Math.min(parseInt(limitStr || "100"), 1000); // safety cap

    if (!uuid) {
      return NextResponse.json(HTTP_RESPONSES[400]("Missing 'uuid'"));
    }

    const station = await prisma.station.findUnique({
      where: { uuid },
      select: { id: true },
    });

    if (!station) {
      return NextResponse.json(HTTP_RESPONSES[404]("Station not found"));
    }

    const where: any = {
      stationId: station.id,
    };

    if (start)
      where.recordedAt = { ...(where.recordedAt ?? {}), gte: new Date(start) };
    if (end)
      where.recordedAt = { ...(where.recordedAt ?? {}), lte: new Date(end) };

    const logs = await prisma.bucketParamsLog.findMany({
      where,
      orderBy: { recordedAt: "asc" },
      take: limit,
    });

    return NextResponse.json(HTTP_RESPONSES[200](logs));
  } catch (error: any) {
    console.error("❌ GET /station/bucket/logs error:", error);
    return NextResponse.json(HTTP_RESPONSES[500](error.message));
  }
}
