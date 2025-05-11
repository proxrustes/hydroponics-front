import { NextRequest, NextResponse } from "next/server";
import { HTTP_RESPONSES } from "@/definitions/HttpDefinitions";
import { prisma } from "@/lib/prisma";

// GET: effective norms for a zone (merged plant.norms + zoneNorms)
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
        plant: { include: { norms: true } },
        zoneNorms: true,
      },
    });

    if (!zone) {
      return NextResponse.json(HTTP_RESPONSES[404]("Zone not found"));
    }

    const base = zone.plant?.norms;
    const override = zone.zoneNorms;

    if (!base) {
      return NextResponse.json(
        HTTP_RESPONSES[200]({
          zoneId: zone.id,
          zoneIndex: zone.index,
          zoneName: zone.name,
          plantName: zone.plant?.name || null,
          effectiveNorms: null,
        })
      );
    }

    const effectiveNorms = {
      temperature: [
        override?.temperatureMin ?? base.temperatureMin,
        override?.temperatureMax ?? base.temperatureMax,
      ],
      airHumidity: [
        override?.airHumidityMin ?? base.airHumidityMin,
        override?.airHumidityMax ?? base.airHumidityMax,
      ],
      substrateHumidity: [
        override?.substrateHumidityMin ?? base.substrateHumidityMin,
        override?.substrateHumidityMax ?? base.substrateHumidityMax,
      ],
      phLevel: [
        override?.phLevelMin ?? base.phLevelMin,
        override?.phLevelMax ?? base.phLevelMax,
      ],
      nutrientConcentration: [
        override?.nutrientConcentrationMin ?? base.nutrientConcentrationMin,
        override?.nutrientConcentrationMax ?? base.nutrientConcentrationMax,
      ],
      solutionTemperature: [
        override?.solutionTemperatureMin ?? base.solutionTemperatureMin,
        override?.solutionTemperatureMax ?? base.solutionTemperatureMax,
      ],
      solutionLvl: [
        override?.solutionLvlMin ?? base.solutionLvlMin,
        override?.solutionLvlMax ?? base.solutionLvlMax,
      ],
      lightIntensity: [
        override?.lightIntensityMin ?? base.lightIntensityMin,
        override?.lightIntensityMax ?? base.lightIntensityMax,
      ],
    };

    return NextResponse.json(
      HTTP_RESPONSES[200]({
        zoneId: zone.id,
        zoneIndex: zone.index,
        zoneName: zone.name,
        plantName: zone.plant?.name,
        effectiveNorms,
      })
    );
  } catch (error: any) {
    console.error("GET /api/zone/norms error:", error);
    return NextResponse.json(HTTP_RESPONSES[500](error.message));
  }
}

// PUT: override zoneNorms using UUID + index
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
      select: { id: true },
    });

    if (!zone) {
      return NextResponse.json(HTTP_RESPONSES[404]("Zone not found"));
    }

    const body = await req.json();
    const dataToWrite: any = {};

    if (body.temperature)
      [dataToWrite.temperatureMin, dataToWrite.temperatureMax] =
        body.temperature;
    if (body.airHumidity)
      [dataToWrite.airHumidityMin, dataToWrite.airHumidityMax] =
        body.airHumidity;
    if (body.substrateHumidity)
      [dataToWrite.substrateHumidityMin, dataToWrite.substrateHumidityMax] =
        body.substrateHumidity;
    if (body.phLevel)
      [dataToWrite.phLevelMin, dataToWrite.phLevelMax] = body.phLevel;
    if (body.nutrientConcentration)
      [
        dataToWrite.nutrientConcentrationMin,
        dataToWrite.nutrientConcentrationMax,
      ] = body.nutrientConcentration;
    if (body.solutionTemperature)
      [dataToWrite.solutionTemperatureMin, dataToWrite.solutionTemperatureMax] =
        body.solutionTemperature;
    if (body.solutionLvl)
      [dataToWrite.solutionLvlMin, dataToWrite.solutionLvlMax] =
        body.solutionLvl;
    if (body.lightIntensity)
      [dataToWrite.lightIntensityMin, dataToWrite.lightIntensityMax] =
        body.lightIntensity;

    const updated = await prisma.zoneNorms.upsert({
      where: { zoneId: zone.id },
      update: dataToWrite,
      create: { zoneId: zone.id, ...dataToWrite },
    });

    return NextResponse.json(HTTP_RESPONSES[200](updated));
  } catch (error: any) {
    console.error("PUT /api/zone/norms error:", error);
    return NextResponse.json(HTTP_RESPONSES[500](error.message));
  }
}
