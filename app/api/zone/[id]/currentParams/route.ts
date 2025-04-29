import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { HTTP_RESPONSES } from "@/definitions/HttpDefinitions";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/")[3];

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
