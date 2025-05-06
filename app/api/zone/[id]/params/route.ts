import { NextResponse } from "next/server";
import { HTTP_RESPONSES } from "@/definitions/HttpDefinitions";
import { prisma } from "@/lib/prisma";

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

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const zoneId = parseInt(params.id);
  if (isNaN(zoneId)) {
    return NextResponse.json({ error: "Invalid zone ID" }, { status: 400 });
  }

  const body = await req.json();
  const { temperature, airHumidity, substrateHumidity, isLightOn } = body;

  if (
    typeof temperature !== "number" ||
    typeof airHumidity !== "number" ||
    typeof substrateHumidity !== "number"
  ) {
    return NextResponse.json(
      { error: "Missing or invalid fields" },
      { status: 400 }
    );
  }

  const log = await prisma.zoneParamsLog.create({
    data: {
      zoneId,
      temperature,
      airHumidity,
      substrateHumidity,
      isLightOn: typeof isLightOn === "boolean" ? isLightOn : null,
    },
  });

  return NextResponse.json(log, { status: 201 });
}
