import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET: returns target params for a zone by zoneId
export async function GET(req: NextRequest) {
  const zoneIdParam = req.nextUrl.searchParams.get("zoneId");

  const zoneId = parseInt(zoneIdParam || "");
  if (isNaN(zoneId)) {
    return NextResponse.json(
      { error: "Missing or invalid zoneId" },
      { status: 400 }
    );
  }

  const target = await prisma.zoneTargetParams.findUnique({
    where: { zoneId },
  });

  if (!target) {
    return NextResponse.json(
      { error: "Zone target params not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(target);
}

// POST: update or create zone target params
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { zoneId, params } = body;

  if (!zoneId || typeof params !== "object") {
    return NextResponse.json(
      { error: "Missing zoneId or params" },
      { status: 400 }
    );
  }

  const zone = await prisma.zone.findUnique({
    where: { id: zoneId },
    select: { id: true },
  });

  if (!zone) {
    return NextResponse.json({ error: "Zone not found" }, { status: 404 });
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

    return NextResponse.json({ updated });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
