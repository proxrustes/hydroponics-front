import { HTTP_RESPONSES } from "@/definitions/HttpDefinitions";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");

    const zoneId = parseInt(id || "");
    if (isNaN(zoneId)) {
      return NextResponse.json(HTTP_RESPONSES[400]("Invalid Zone ID"));
    }

    // Загружаем зону из БД
    const zone = await prisma.zone.findUnique({
      where: { id: zoneId },
      include: {
        plant: true,
      },
    });

    if (!zone) {
      return NextResponse.json(HTTP_RESPONSES[404]("Zone"));
    }

    return NextResponse.json(HTTP_RESPONSES[200](zone));
  } catch (error: any) {
    console.error("GET /api/zone/[id] error:", error);
    return NextResponse.json(HTTP_RESPONSES[500](error.message));
  }
}

export async function PUT(req: NextRequest) {
  const idParam = req.nextUrl.searchParams.get("id");
  const id = Number(idParam);

  if (!id || isNaN(id)) {
    return NextResponse.json(
      { error: "Invalid or missing zone ID" },
      { status: 400 }
    );
  }

  const body = await req.json();
  const { name, plantId, isLightOn } = body;

  try {
    const updated = await prisma.zone.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(plantId && { plantId }),
        ...(isLightOn !== undefined && { isLightOn }),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      { error: "Zone not found or update failed" },
      { status: 500 }
    );
  }
}
