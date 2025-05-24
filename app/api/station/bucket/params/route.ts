import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { HTTP_RESPONSES } from "@/definitions/HttpDefinitions";

export async function GET(req: NextRequest) {
  const url = req.nextUrl;
  const uuid = url.searchParams.get("uuid");

  if (!uuid) {
    return NextResponse.json(HTTP_RESPONSES[400]("Missing uuid"));
  }

  const station = await prisma.station.findUnique({
    where: { uuid },
    select: { id: true, bucketParams: true },
  });

  if (!station) {
    return NextResponse.json(HTTP_RESPONSES[404]("Station not found"));
  }

  // Читаємо query-параметри
  const hasAllParams =
    url.searchParams.has("phLevel") &&
    url.searchParams.has("nutrientConcentration") &&
    url.searchParams.has("solutionLvl") &&
    url.searchParams.has("solutionTemperature");

  if (hasAllParams) {
    const phLevel = parseFloat(url.searchParams.get("phLevel") || "");
    const nutrientConcentration = parseFloat(
      url.searchParams.get("nutrientConcentration") || ""
    );
    const solutionLvl = parseFloat(url.searchParams.get("solutionLvl") || "");
    const solutionTemperature = parseFloat(
      url.searchParams.get("solutionTemperature") || ""
    );

    // Запис bucketParams (upsert)
    const updated = await prisma.bucketParams.upsert({
      where: { stationId: station.id },
      update: {
        phLevel,
        nutrientConcentration,
        solutionLvl,
        solutionTemperature,
      },
      create: {
        stationId: station.id,
        phLevel,
        nutrientConcentration,
        solutionLvl,
        solutionTemperature,
      },
    });

    // Запис у лог
    await prisma.bucketParamsLog.create({
      data: {
        stationId: station.id,
        phLevel,
        nutrientConcentration,
        solutionLvl,
        solutionTemperature,
      },
    });

    return NextResponse.json(HTTP_RESPONSES[200](updated));
  }

  // Якщо параметрів немає — просто повертаємо останній стан
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
