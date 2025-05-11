import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { HTTP_RESPONSES } from "@/definitions/HttpDefinitions";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { uuid, params } = body;

  if (!uuid || typeof params !== "object") {
    return NextResponse.json(HTTP_RESPONSES[400]("uuid"));
  }

  const station = await prisma.station.findUnique({
    where: { uuid },
    select: { id: true },
  });

  if (!station) return NextResponse.json(HTTP_RESPONSES[404]("station"));

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
  return NextResponse.json(HTTP_RESPONSES[201](updated));
}

export async function GET(req: NextRequest) {
  const uuid = req.nextUrl.searchParams.get("uuid");
  console.log(uuid);
  if (!uuid) {
    return NextResponse.json(HTTP_RESPONSES[400]("uuid"));
  }

  const station = await prisma.station.findUnique({
    where: { uuid },
    select: {
      bucketParams: true,
    },
  });

  if (!station) {
    return NextResponse.json(HTTP_RESPONSES[404]("station"));
  }

  return NextResponse.json(
    HTTP_RESPONSES[200]({
      nutrientConcentration: station.bucketParams?.nutrientConcentration,
      phLevel: station.bucketParams?.phLevel,
      solutionLvl: station.bucketParams?.solutionLvl,
      solutionTemperature: station.bucketParams?.solutionTemperature,
      updatedAt: station.bucketParams?.updatedAt,
    })
  );
}
