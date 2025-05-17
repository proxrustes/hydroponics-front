import { NextRequest, NextResponse } from "next/server";
import { HTTP_RESPONSES } from "@/definitions/HttpDefinitions";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const url = req.nextUrl;
    const uuid = url.searchParams.get("uuid");
    const index = parseInt(url.searchParams.get("index") || "");

    if (!uuid || isNaN(index) || index < 0 || index > 3) {
      return NextResponse.json(
        HTTP_RESPONSES[400]("Invalid UUID or zone index")
      );
    }

    const station = await prisma.station.findUnique({
      where: { uuid },
      select: { id: true },
    });

    if (!station) {
      return NextResponse.json(HTTP_RESPONSES[404]("Station not found"));
    }

    // Пошук зони
    const zone = await prisma.zone.findFirst({
      where: {
        stationId: station.id,
        index,
      },
      select: { id: true, zoneParams: true },
    });

    if (!zone) {
      return NextResponse.json(HTTP_RESPONSES[404]("Zone not found"));
    }

    // Перевіряємо, чи є параметри в query
    const hasAllParams =
      url.searchParams.has("temperature") &&
      url.searchParams.has("airHumidity") &&
      url.searchParams.has("substrateHumidity");

    if (hasAllParams) {
      // Парсимо параметри з запиту
      const temperature = parseFloat(url.searchParams.get("temperature") || "");
      const airHumidity = parseFloat(url.searchParams.get("airHumidity") || "");
      const substrateHumidity = parseFloat(
        url.searchParams.get("substrateHumidity") || ""
      );

      // Оновлюємо або створюємо параметри
      await prisma.zoneParams.upsert({
        where: { zoneId: zone.id },
        update: {
          temperature,
          airHumidity,
          substrateHumidity,
        },
        create: {
          zoneId: zone.id,
          temperature,
          airHumidity,
          substrateHumidity,
        },
      });
    }

    // Завжди повертаємо актуальні параметри
    const latestParams = await prisma.zoneParams.findUnique({
      where: { zoneId: zone.id },
    });

    if (!latestParams) {
      return NextResponse.json(
        HTTP_RESPONSES[404]("No parameters found for this zone")
      );
    }

    return NextResponse.json(HTTP_RESPONSES[200](latestParams));
  } catch (error: any) {
    console.error("❌ Error in GET /station/zone/params:", error);
    return NextResponse.json(HTTP_RESPONSES[500](error.message));
  }
}
