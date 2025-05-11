import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { HTTP_RESPONSES } from "@/definitions/HttpDefinitions";

//returns target params
export async function GET(req: NextRequest) {
  const uuid = req.nextUrl.searchParams.get("uuid");
  if (!uuid) return NextResponse.json(HTTP_RESPONSES[400]("uuid"));

  const station = await prisma.station.findUnique({
    where: { uuid },
    select: {
      bucketTargetParams: true,
    },
  });

  if (!station) return NextResponse.json(HTTP_RESPONSES[404]("station"));

  return NextResponse.json(
    HTTP_RESPONSES[200]({
      nutrientConcentration: station.bucketTargetParams?.nutrientConcentration,
      phLevel: station.bucketTargetParams?.phLevel,
      solutionLvl: station.bucketTargetParams?.solutionLvl,
      solutionTemperature: station.bucketTargetParams?.solutionTemperature,
    })
  );
}

// для апдейта со стороны приложения
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { uuid, zoneId, params } = body;

  if (!uuid || typeof params !== "object") {
    return NextResponse.json(HTTP_RESPONSES[400]("uuid"));
  }

  const station = await prisma.station.findUnique({
    where: { uuid },
    select: { id: true },
  });

  if (!station) {
    return NextResponse.json(HTTP_RESPONSES[404]("station"));
  }

  try {
    if (zoneId) {
      const zone = await prisma.zone.findFirst({
        where: {
          id: zoneId,
          stationId: station.id,
        },
        select: { id: true },
      });

      if (!zone) {
        return NextResponse.json(HTTP_RESPONSES[404]("zone"));
      }

      const updated = await prisma.zoneTargetParams.upsert({
        where: { zoneId: zone.id },
        update: params,
        create: {
          zoneId: zone.id,
          ...params,
        },
      });

      return NextResponse.json(HTTP_RESPONSES[201]({ updated }));
    } else {
      const updated = await prisma.bucketTargetParams.upsert({
        where: { stationId: station.id },
        update: params,
        create: {
          stationId: station.id,
          ...params,
        },
      });

      return NextResponse.json(HTTP_RESPONSES[201]({ updated }));
    }
  } catch (e: any) {
    return NextResponse.json(HTTP_RESPONSES[500](e));
  }
}
