import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const uuid = req.nextUrl.searchParams.get("uuid");

  if (!uuid) {
    return NextResponse.json({ error: "Missing uuid" }, { status: 400 });
  }

  const station = await prisma.station.findUnique({
    where: { uuid },
    select: { id: true },
  });

  if (!station) {
    return NextResponse.json({ error: "Station not found" }, { status: 404 });
  }

  const logs = await prisma.bucketParamsLog.findMany({
    where: { stationId: station.id },
    orderBy: { recordedAt: "desc" },
  });

  return NextResponse.json(logs);
}
