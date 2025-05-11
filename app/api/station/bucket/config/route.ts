import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

//returns target params
export async function GET(req: NextRequest) {
  const uuid = req.nextUrl.searchParams.get("uuid");
  if (!uuid)
    return NextResponse.json({ error: "Missing uuid" }, { status: 400 });

  const station = await prisma.station.findUnique({
    where: { uuid },
    select: {
      bucketTargetParams: true,
    },
  });

  if (!station)
    return NextResponse.json({ error: "Station not found" }, { status: 404 });

  return NextResponse.json({
    nutrientConcentration: station.bucketTargetParams?.nutrientConcentration,
    phLevel: station.bucketTargetParams?.phLevel,
    solutionLvl: station.bucketTargetParams?.solutionLvl,
    solutionTemperature: station.bucketTargetParams?.solutionTemperature,
  });
}

// для апдейта со стороны приложения
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { uuid, zoneId, params } = body;

  if (!uuid || typeof params !== "object") {
    return NextResponse.json(
      { error: "Missing uuid or params" },
      { status: 400 }
    );
  }

  const station = await prisma.station.findUnique({
    where: { uuid },
    select: { id: true },
  });

  if (!station) {
    return NextResponse.json({ error: "Station not found" }, { status: 404 });
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
        return NextResponse.json(
          { error: "Zone not found or does not belong to station" },
          { status: 404 }
        );
      }

      const updated = await prisma.zoneTargetParams.upsert({
        where: { zoneId: zone.id },
        update: params,
        create: {
          zoneId: zone.id,
          ...params,
        },
      });

      return NextResponse.json({ updated });
    } else {
      const updated = await prisma.bucketTargetParams.upsert({
        where: { stationId: station.id },
        update: params,
        create: {
          stationId: station.id,
          ...params,
        },
      });

      return NextResponse.json({ updated });
    }
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
