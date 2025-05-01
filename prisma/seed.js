import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  console.log("🌱 Начинаем сидирование...");

  // Чистим таблицы
  await prisma.zoneParamsLog.deleteMany({});
  await prisma.stationParamsLog.deleteMany({});
  await prisma.zoneNorms.deleteMany({});
  await prisma.zone.deleteMany({});
  await prisma.station.deleteMany({});
  await prisma.norms.deleteMany({});
  await prisma.plant.deleteMany({});
  await prisma.plantGroup.deleteMany({});
  await prisma.user.deleteMany({});

  console.log("🧹 База данных очищена");

  // Создаём пользователей по одному
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

  // Создаём группу растений
  const plantGroup = await prisma.plantGroup.create({
    data: {
      name: "Плодоносні рослини",
    },
  });

  // Создаём растение Томат
  const tomatoPlant = await prisma.plant.create({
    data: {
      name: "Томат",
      description: "Требует интенсивного освещения и тепла.",
      plantGroupId: plantGroup.id,
    },
  });

  // Нормы для Томатов
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

  // Создаём станции по одной
  const station1 = await prisma.station.create({
    data: { name: "Станція 1 користувача 1", userId: user1.id },
  });

  const station2 = await prisma.station.create({
    data: { name: "Станція 2 користувача 1", userId: user1.id },
  });

  const station3 = await prisma.station.create({
    data: { name: "Станція 1 користувача 2", userId: user2.id },
  });

  console.log("✅ Станции добавлены");

  // Создаём зоны по одной
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

  // Создаём логи параметров станций по одной
  await prisma.stationParamsLog.create({
    data: {
      stationId: station1.id,
      recordedAt: new Date(),
      phLevel: 6.2,
      nutrientConcentration: 2.0,
      solutionTemperature: 22,
      solutionLvl: 85,
    },
  });

  await prisma.stationParamsLog.create({
    data: {
      stationId: station2.id,
      recordedAt: new Date(),
      phLevel: 6.1,
      nutrientConcentration: 2.4,
      solutionTemperature: 21,
      solutionLvl: 80,
    },
  });

  console.log("✅ Логи параметров станций добавлены");

  // Создаём логи параметров зон
  const now = Date.now();
  for (let i = 0; i < 10; i++) {
    await prisma.zoneParamsLog.create({
      data: {
        zoneId: zone1.id,
        recordedAt: new Date(now - i * 15 * 60_000),
        temperature: 23 + Math.random(),
        airHumidity: 70 + Math.floor(Math.random() * 10),
        substrateHumidity: 65 + Math.floor(Math.random() * 10),
        isLightOn: i % 2 === 0,
      },
    });
  }

  for (let i = 0; i < 8; i++) {
    await prisma.zoneParamsLog.create({
      data: {
        zoneId: zone2.id,
        recordedAt: new Date(now - i * 20 * 60_000),
        temperature: 22 + Math.random(),
        airHumidity: 65 + Math.floor(Math.random() * 10),
        substrateHumidity: 60 + Math.floor(Math.random() * 10),
        isLightOn: i % 2 === 1,
      },
    });
  }

  // Логи для zone3
  for (let i = 0; i < 6; i++) {
    await prisma.zoneParamsLog.create({
      data: {
        zoneId: zone3.id,
        recordedAt: new Date(now - i * 30 * 60_000),
        temperature: 21 + Math.random(),
        airHumidity: 68 + Math.floor(Math.random() * 10),
        substrateHumidity: 63 + Math.floor(Math.random() * 10),
        isLightOn: i % 2 === 0,
      },
    });
  }

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
