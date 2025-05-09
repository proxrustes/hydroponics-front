import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  console.log("🌱 Начинаем сидирование...");

  await prisma.zoneParamsLog.deleteMany({});
  await prisma.bucketParamsLog.deleteMany({});
  await prisma.zoneParams.deleteMany({});
  await prisma.bucketParams.deleteMany({});
  await prisma.zoneNorms.deleteMany({});
  await prisma.zone.deleteMany({});
  await prisma.station.deleteMany({});
  await prisma.norms.deleteMany({});
  await prisma.plant.deleteMany({});
  await prisma.plantGroup.deleteMany({});
  await prisma.user.deleteMany({});

  console.log("🧹 База данных очищена");

  const admin = await prisma.user.create({
    data: {
      email: "admin@hydro.local",
      name: "Nastya Ku",
      password: "admin",
      role: "ADMIN",
    },
  });

  const user1 = await prisma.user.create({
    data: {
      email: "user1@hydro.local",
      name: "Romka Khu",
      password: "userpass1",
      role: "USER",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: "user2@hydro.local",
      name: "Mary Jane",
      password: "userpass2",
      role: "USER",
    },
  });

  console.log("✅ Пользователи добавлены");

  const plantGroup = await prisma.plantGroup.create({
    data: {
      name: "Плодоносні рослини",
    },
  });

  const tomatoPlant = await prisma.plant.create({
    data: {
      name: "Томат",
      description: "Требует интенсивного освещения и тепла.",
      plantGroupId: plantGroup.id,
    },
  });

  await prisma.norms.create({
    data: {
      plantId: tomatoPlant.id,
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
  });

  console.log("✅ Растения и нормы добавлены");

  const station1 = await prisma.station.create({
    data: { name: "Станція 1 користувача 1", uuid: "100", userId: user1.id },
  });

  const station2 = await prisma.station.create({
    data: { name: "Станція 2 користувача 1", uuid: "101", userId: user1.id },
  });

  const station3 = await prisma.station.create({
    data: { name: "Станція 1 користувача 2", uuid: "120", userId: user2.id },
  });

  console.log("✅ Станции добавлены");

  const zone1 = await prisma.zone.create({
    data: {
      name: "Зона A станції 1",
      plantId: tomatoPlant.id,
      stationId: station1.id,
      isLightOn: true,
    },
  });

  const zone2 = await prisma.zone.create({
    data: {
      name: "Зона B станції 2",
      plantId: tomatoPlant.id,
      stationId: station2.id,
      isLightOn: false,
    },
  });

  const zone3 = await prisma.zone.create({
    data: {
      name: "Зона A станції користувача 2",
      plantId: tomatoPlant.id,
      stationId: station3.id,
      isLightOn: true,
    },
  });

  console.log("✅ Зоны добавлены");

  await Promise.all([
    prisma.bucketParams.create({
      data: {
        stationId: station1.id,
        phLevel: 6.2,
        nutrientConcentration: 2.1,
        solutionTemperature: 22,
        solutionLvl: 85,
      },
    }),
    prisma.bucketParams.create({
      data: {
        stationId: station2.id,
        phLevel: 6.1,
        nutrientConcentration: 2.4,
        solutionTemperature: 21,
        solutionLvl: 80,
      },
    }),
  ]);

  // Поточні параметри зони
  await Promise.all([
    prisma.zoneParams.create({
      data: {
        zoneId: zone1.id,
        temperature: 24,
        airHumidity: 70,
        substrateHumidity: 65,
        isLightOn: true,
      },
    }),
    prisma.zoneParams.create({
      data: {
        zoneId: zone2.id,
        temperature: 23,
        airHumidity: 68,
        substrateHumidity: 63,
        isLightOn: false,
      },
    }),
  ]);

  console.log("✅ Логи параметров зон добавлены");

  console.log("🌱 Сидирование завершено успешно!");
}

seed()
  .then(() => prisma.$disconnect())
  .catch((err) => {
    console.error("❌ Ошибка при сидировании:", err);
    prisma.$disconnect();
    process.exit(1);
  });
