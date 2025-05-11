import { HTTP_RESPONSES } from "@/definitions/HttpDefinitions";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET: получить информацию о зоне по uuid станции и index зоны
export async function GET(req: NextRequest) {
  try {
    const uuid = req.nextUrl.searchParams.get("uuid");
    const index = parseInt(req.nextUrl.searchParams.get("index") || "");

    if (!uuid || isNaN(index)) {
      return NextResponse.json(HTTP_RESPONSES[400]("Invalid uuid or index"));
    }

    const zone = await prisma.zone.findFirst({
      where: {
        station: { uuid },
        index,
      },
      include: {
        plant: true,
      },
    });

    if (!zone) {
      return NextResponse.json(HTTP_RESPONSES[404]("Zone not found"));
    }

    return NextResponse.json(HTTP_RESPONSES[200](zone));
  } catch (error: any) {
    console.error("GET /api/zone error:", error);
    return NextResponse.json(HTTP_RESPONSES[500](error.message));
  }
}

// PUT: обновить имя, растение или свет по uuid + index
export async function PUT(req: NextRequest) {
  try {
    const uuid = req.nextUrl.searchParams.get("uuid");
    const index = parseInt(req.nextUrl.searchParams.get("index") || "");

    if (!uuid || isNaN(index)) {
      return NextResponse.json(HTTP_RESPONSES[400]("Invalid uuid or index"));
    }

    const zone = await prisma.zone.findFirst({
      where: {
        station: { uuid },
        index,
      },
    });

    if (!zone) {
      return NextResponse.json(HTTP_RESPONSES[404]("Zone not found"));
    }

    const body = await req.json();
    const { name, plantId, isLightOn } = body;

    const updated = await prisma.zone.update({
      where: { id: zone.id },
      data: {
        ...(name && { name }),
        ...(plantId && { plantId }),
        ...(isLightOn !== undefined && { isLightOn }),
      },
    });

    return NextResponse.json(HTTP_RESPONSES[200](updated));
  } catch (error: any) {
    console.error("PUT /api/zone error:", error);
    return NextResponse.json(HTTP_RESPONSES[500]("Zone update failed"));
  }
}
