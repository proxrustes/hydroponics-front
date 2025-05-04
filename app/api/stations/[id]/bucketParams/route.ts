import { NextResponse } from "next/server";
import { HTTP_RESPONSES } from "@/definitions/HttpDefinitions";
import { parse } from "@/lib/utils/jwtUtils";
import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/")[3];

    const stationId = parseInt(id || "");

    if (isNaN(stationId)) {
      return NextResponse.json(HTTP_RESPONSES[400]("id"));
    }
    const cookieStore = await cookies();
    const token = cookieStore.get("currentUser")?.value;
    if (!token) return NextResponse.json(HTTP_RESPONSES[401]);

    const user = await parse(token);
    if (!user) return NextResponse.json(HTTP_RESPONSES[401]);

    const station = await prisma.station.findUnique({
      where: { id: stationId },
    });

    if (!station) {
      return NextResponse.json(HTTP_RESPONSES[404]("Station"));
    }
    const currentStationParams = await prisma.stationParamsLog.findFirst({
      where: { stationId: station.id },
      orderBy: { recordedAt: "desc" },
    });

    const result = {
      station,
      currentStationParams,
    };

    return NextResponse.json(HTTP_RESPONSES[200](result));
  } catch (error: any) {
    console.error("❌ Error fetching station bucket params:", error);
    return NextResponse.json(HTTP_RESPONSES[500](error.message));
  }
}
