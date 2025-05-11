import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { HTTP_RESPONSES } from "@/definitions/HttpDefinitions";

// GET: returns target params for a zone by station UUID and index
export async function GET(req: NextRequest) {
  const uuid = req.nextUrl.searchParams.get("uuid");
  const indexParam = req.nextUrl.searchParams.get("index");
  const index = parseInt(indexParam || "");

  if (!uuid || isNaN(index)) {
    return NextResponse.json(HTTP_RESPONSES[400]);
  }

  const zone = await prisma.zone.findFirst({
    where: {
      station: { uuid },
      index,
    },
    select: { id: true },
  });

  if (!zone) {
    return NextResponse.json(HTTP_RESPONSES[404]("zone"));
  }
  console.log(zone);
  const target = await prisma.zoneTargetParams.findUnique({
    where: { zoneId: zone.id },
  });

  if (!target) {
    return NextResponse.json(HTTP_RESPONSES[404]("target"));
  }

  return NextResponse.json(HTTP_RESPONSES[200](target));
}

// POST: update or create zone target params by uuid + index
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { uuid, index, params } = body;

  if (!uuid || typeof index !== "number" || typeof params !== "object") {
    return NextResponse.json(HTTP_RESPONSES[400]("uuid"));
  }

  const zone = await prisma.zone.findFirst({
    where: {
      station: { uuid },
      index,
    },
    select: { id: true },
  });

  if (!zone) {
    return NextResponse.json(HTTP_RESPONSES[404]("zone"));
  }

  try {
    const updated = await prisma.zoneTargetParams.upsert({
      where: { zoneId: zone.id },
      update: params,
      create: {
        zoneId: zone.id,
        ...params,
      },
    });

    return NextResponse.json(HTTP_RESPONSES[200](updated));
  } catch (e: any) {
    return NextResponse.json(HTTP_RESPONSES[500](e));
  }
}
