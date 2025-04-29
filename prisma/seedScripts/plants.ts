import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const initialPlantGroups = [
  {
    title: "Плодоносні рослини",
    plants: [
      {
        name: "Томат",
        description: "Требует интенсивного освещения и тепла.",
        norm: {
          temperatureMin: 20,
          temperatureMax: 28,
          airHumidityMin: 60,
          airHumidityMax: 80,
          substrateHumidityMin: 55,
          substrateHumidityMax: 75,
          phLevelMin: 5.8,
          phLevelMax: 6.5,
          nutrientConcentrationMin: 1.5,
          nutrientConcentrationMax: 2.5,
          solutionTemperatureMin: 18,
          solutionTemperatureMax: 22,
          solutionLvlMin: 50,
          solutionLvlMax: 90,
          lightIntensityMin: 500,
          lightIntensityMax: 700,
        },
      },
      {
        name: "Огурец",
        description: "Любит повышенную влажность и тёплый климат.",
        norm: {
          temperatureMin: 18,
          temperatureMax: 26,
          airHumidityMin: 65,
          airHumidityMax: 85,
          substrateHumidityMin: 60,
          substrateHumidityMax: 80,
          phLevelMin: 5.5,
          phLevelMax: 6.2,
          nutrientConcentrationMin: 1.2,
          nutrientConcentrationMax: 2.0,
          solutionTemperatureMin: 18,
          solutionTemperatureMax: 24,
          solutionLvlMin: 40,
          solutionLvlMax: 90,
          lightIntensityMin: 400,
          lightIntensityMax: 600,
        },
      },
    ],
  },
  {
    title: "Зелені культури",
    plants: [
      {
        name: "Салат",
        description: "Предпочитает умеренную температуру и обильный полив.",
        norm: {
          temperatureMin: 16,
          temperatureMax: 24,
          airHumidityMin: 55,
          airHumidityMax: 75,
          substrateHumidityMin: 50,
          substrateHumidityMax: 70,
          phLevelMin: 5.5,
          phLevelMax: 6.5,
          nutrientConcentrationMin: 1.0,
          nutrientConcentrationMax: 1.8,
          solutionTemperatureMin: 16,
          solutionTemperatureMax: 20,
          solutionLvlMin: 40,
          solutionLvlMax: 80,
          lightIntensityMin: 300,
          lightIntensityMax: 500,
        },
      },
    ],
  },
];

export async function seedPlants() {
  for (const group of initialPlantGroups) {
    const plantGroup = await prisma.plantGroup.create({
      data: {
        name: group.title,
        plants: {
          create: group.plants.map((plant) => ({
            name: plant.name,
            description: plant.description,
            norms: { create: plant.norm },
          })),
        },
      },
    });
    console.log(`✅ Добавлена группа: ${plantGroup.name}`);
  }
}
