import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { uuid, params } = body;

  if (!uuid || typeof params !== "object") {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const station = await prisma.station.findUnique({
    where: { uuid },
    select: { id: true },
  });

  if (!station)
    return NextResponse.json({ error: "Station not found" }, { status: 404 });

  const updated = await prisma.bucketParams.update({
    where: { stationId: station.id },
    data: params,
  });

  await prisma.bucketParamsLog.create({
    data: {
      stationId: station.id,
      ...params,
    },
  });
  return NextResponse.json({ updated });
}
