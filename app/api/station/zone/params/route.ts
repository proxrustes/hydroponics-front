import { NextRequest, NextResponse } from "next/server";
import { HTTP_RESPONSES } from "@/definitions/HttpDefinitions";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    const zoneId = parseInt(id || "");

    if (isNaN(zoneId)) {
      return NextResponse.json(HTTP_RESPONSES[400]("Zone ID must be a number"));
    }

    const currentZoneParams = await prisma.zoneParamsLog.findFirst({
      where: { zoneId },
      orderBy: { recordedAt: "desc" },
    });
    console.log(currentZoneParams);
    if (!currentZoneParams) {
      return NextResponse.json(
        HTTP_RESPONSES[404]("No current params for this zone")
      );
    }

    return NextResponse.json(HTTP_RESPONSES[200](currentZoneParams));
  } catch (error: any) {
    console.error("GET /api/zone/[id]/params error:", error);
    return NextResponse.json(HTTP_RESPONSES[500](error.message));
  }
}
