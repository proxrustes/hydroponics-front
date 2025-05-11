import { NextRequest, NextResponse } from "next/server";
import { HTTP_RESPONSES } from "@/definitions/HttpDefinitions";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const uuid = req.nextUrl.searchParams.get("uuid");
    const index = parseInt(req.nextUrl.searchParams.get("index") || "");

    if (!uuid || isNaN(index) || index < 0 || index > 3) {
      return NextResponse.json(
        HTTP_RESPONSES[400]("Invalid UUID or zone index")
      );
    }

    // Найти станцию по UUID
    const station = await prisma.station.findUnique({
      where: { uuid },
      select: { id: true },
    });

    if (!station) {
      return NextResponse.json(HTTP_RESPONSES[404]("Station not found"));
    }

    // Найти зону по индексу и станции
    const zone = await prisma.zone.findFirst({
      where: {
        stationId: station.id,
        index,
      },
      select: { id: true, zoneParams: true },
    });

    if (!zone) {
      return NextResponse.json(HTTP_RESPONSES[404]("Zone not found"));
    }
    console.log(zone);
    const currentZoneParams = zone.zoneParams;

    if (!currentZoneParams) {
      return NextResponse.json(
        HTTP_RESPONSES[404]("No parameters found for this zone")
      );
    }

    return NextResponse.json(HTTP_RESPONSES[200](currentZoneParams));
  } catch (error: any) {
    console.error(
      "❌ Error in GET /station/[uuid]/zone/[index]/params:",
      error
    );
    return NextResponse.json(HTTP_RESPONSES[500](error.message));
  }
}
