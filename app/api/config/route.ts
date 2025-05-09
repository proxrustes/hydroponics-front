import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const uuid = req.nextUrl.searchParams.get("uuid");
  if (!uuid)
    return NextResponse.json({ error: "Missing uuid" }, { status: 400 });

  const station = await prisma.station.findUnique({
    where: { uuid },
    select: {
      bucketParams: true,
    },
  });

  if (!station)
    return NextResponse.json({ error: "Station not found" }, { status: 404 });

  return NextResponse.json({
    nutrientConcentration: station.bucketParams?.nutrientConcentration,
    phLevel: station.bucketParams?.phLevel,
    solutionLvl: station.bucketParams?.solutionLvl,
    solutionTemperature: station.bucketParams?.solutionTemperature,
  });
}
