import { NextResponse } from "next/server";
import { HTTP_RESPONSES } from "@/definitions/HttpDefinitions";

import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const plantGroups = await prisma.plantGroup.findMany({
      include: {
        plants: {
          select: {
            id: true,
            name: true,
            description: true,
          },
        },
      },
    });

    return NextResponse.json(HTTP_RESPONSES[200](plantGroups));
  } catch (error: any) {
    console.error("❌ Error fetching plant groups:", error);
    return NextResponse.json(HTTP_RESPONSES[500](error.message));
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, description, groupId, newGroupName, norms } = body;

    if (!name || !description || !norms) {
      return NextResponse.json(HTTP_RESPONSES[400]("Missing required fields"));
    }

    let finalGroupId = groupId;

    if (!groupId && newGroupName) {
      const newGroup = await prisma.plantGroup.create({
        data: { name: newGroupName },
      });
      finalGroupId = newGroup.id;
    }

    if (!finalGroupId) {
      return NextResponse.json(HTTP_RESPONSES[400]("Plant group is required"));
    }

    const plant = await prisma.plant.create({
      data: {
        name,
        description,
        plantGroupId: finalGroupId,
      },
    });

    // Создаём нормы для растения
    await prisma.norms.create({
      data: {
        plantId: plant.id,
        temperatureMin: norms.temperatureMin,
        temperatureMax: norms.temperatureMax,
        airHumidityMin: norms.airHumidityMin,
        airHumidityMax: norms.airHumidityMax,
        substrateHumidityMin: norms.substrateHumidityMin,
        substrateHumidityMax: norms.substrateHumidityMax,
        phLevelMin: norms.phLevelMin,
        phLevelMax: norms.phLevelMax,
        nutrientConcentrationMin: norms.nutrientConcentrationMin,
        nutrientConcentrationMax: norms.nutrientConcentrationMax,
        solutionTemperatureMin: norms.solutionTemperatureMin,
        solutionTemperatureMax: norms.solutionTemperatureMax,
        solutionLvlMin: norms.solutionLvlMin,
        solutionLvlMax: norms.solutionLvlMax,
        lightIntensityMin: norms.lightIntensityMin,
        lightIntensityMax: norms.lightIntensityMax,
      },
    });

    return NextResponse.json(HTTP_RESPONSES[200]("Plant successfully created"));
  } catch (error: any) {
    console.error("❌ Error creating plant:", error);
    return NextResponse.json(HTTP_RESPONSES[500](error.message));
  }
}
