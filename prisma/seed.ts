import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type ParamsBaseline = {
  temperature: number;
  airHumidity: number;
  substrateHumidity: number;
};

// Hourly history for the last `hours` hours with a mild diurnal swing
// (warmer/drier at midday) plus small random noise, so ParameterChart has
// something to plot instead of "No logs found for this period."
function generateZoneLogs(zoneId: number, baseline: ParamsBaseline, hours = 72) {
  const logs = [];
  const now = Date.now();

  for (let h = hours; h >= 0; h--) {
    const recordedAt = new Date(now - h * 60 * 60 * 1000);
    const dayPhase = (recordedAt.getHours() / 24) * Math.PI * 2;

    const temperature = baseline.temperature + Math.sin(dayPhase) * 1.8 + (Math.random() - 0.5) * 0.6;
    const airHumidity = baseline.airHumidity - Math.sin(dayPhase) * 6 + (Math.random() - 0.5) * 2;
    const substrateHumidity = baseline.substrateHumidity + (Math.random() - 0.5) * 2;

    logs.push({
      zoneId,
      recordedAt,
      temperature: Math.round(temperature * 10) / 10,
      airHumidity: Math.round(Math.max(0, Math.min(100, airHumidity)) * 10) / 10,
      substrateHumidity: Math.round(Math.max(0, Math.min(100, substrateHumidity)) * 10) / 10,
    });
  }

  return logs;
}

async function seed() {
  console.log("🌱 Начинаем сидирование...");

  await prisma.bucketParamsLog.deleteMany({});
  await prisma.bucketParams.deleteMany({});
  await prisma.bucketTargetParams.deleteMany({});

  await prisma.zoneScheduleInterval.deleteMany({});
  await prisma.zoneTargetParams.deleteMany({});
  await prisma.zoneParamsLog.deleteMany({});
  await prisma.zoneParams.deleteMany({});
  await prisma.zoneNorms.deleteMany({});
  await prisma.zone.deleteMany({});

  await prisma.norms.deleteMany({});
  await prisma.plant.deleteMany({});
  await prisma.plantGroup.deleteMany({});

  await prisma.station.deleteMany({});
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

  console.log("✅ Пользователи добавлены");

  const groups = [
    {
      name: "Плодоносні рослини",
      plants: [
        {
          name: "Томат",
          description:
            "Томати потребують багато світла, тепла та помірної вологості повітря. Вони чутливі до перепадів температур, особливо вночі. Для формування солодких та соковитих плодів важливо забезпечити стабільне живлення. В умовах гідропоніки томати часто вирощують із підв'язкою для підтримки стебел. Оптимальний рівень pH для вирощування становить 5.8–6.5.",
        },
        { name: "Перец", description: "Нуждается в высокой влажности." },
        { name: "Огурец", description: "Требует постоянного полива." },
        { name: "Баклажан", description: "Чувствителен к переохлаждению." },
        { name: "Кабачок", description: "Быстрорастущий овощ." },
      ],
    },
    {
      name: "Листові культури",
      plants: [
        { name: "Салат", description: "Любит прохладу и регулярный полив." },
        { name: "Шпинат", description: "Предпочитает тень и влажность." },
        { name: "Рукола", description: "Растёт быстро, любит свет." },
        { name: "Кресс-салат", description: "Хорош для микрозелени." },
        {
          name: "Мангольд",
          description: "Листовая свёкла с яркими черешками.",
        },
      ],
    },
    {
      name: "Запашні трави",
      plants: [
        { name: "Базилик", description: "Ароматная трава, требующая тепла." },
        { name: "Петрушка", description: "Холодостойкая, растёт долго." },
        { name: "Кинза", description: "Любит прохладу, быстро растёт." },
        { name: "Тимьян", description: "Неприхотливый к почве, любит солнце." },
        { name: "Мята", description: "Растёт активно, требует контроля." },
      ],
    },
  ];

  for (const group of groups) {
    const plantGroup = await prisma.plantGroup.create({
      data: { name: group.name },
    });

    for (const plant of group.plants) {
      const createdPlant = await prisma.plant.create({
        data: {
          name: plant.name,
          description: plant.description,
          plantGroupId: plantGroup.id,
        },
      });

      await prisma.norms.create({
        data: {
          plantId: createdPlant.id,
          temperatureMin: 18,
          temperatureMax: 26,
          airHumidityMin: 50,
          airHumidityMax: 80,
          substrateHumidityMin: 50,
          substrateHumidityMax: 75,
          phLevelMin: 5.5,
          phLevelMax: 6.5,
          nutrientConcentrationMin: 1.5,
          nutrientConcentrationMax: 2.5,
          solutionTemperatureMin: 18,
          solutionTemperatureMax: 22,
          solutionLvlMin: 50,
          solutionLvlMax: 90,
          lightIntensityMin: 400,
          lightIntensityMax: 700,
        },
      });
    }
  }

  console.log("✅ Группы и растения успешно добавлены");

  const stationAdmin = await prisma.station.create({
    data: {
      name: "Станція підвал",
      uuid: "100",
      userId: user1.id,
      zones: {
        create: Array.from({ length: 4 }).map((_, i) => ({
          name: `Зона A${i + 1}`,
          index: i,
        })),
      },
    },
    include: { zones: true },
  });

  const stationUser1 = await prisma.station.create({
    data: {
      name: "Станція балкон",
      uuid: "101",
      userId: user1.id,
      zones: {
        create: Array.from({ length: 4 }).map((_, i) => ({
          name: `Зона B${i + 1}`,
          index: i,
        })),
      },
    },
    include: { zones: true },
  });

  console.log("✅ Станції та зони створені");
  for (const zone of stationAdmin.zones) {
    await prisma.zoneParams.create({
      data: {
        zoneId: zone.id,
        temperature: 22.5,
        airHumidity: 65,
        substrateHumidity: 60,
      },
    });
  }

  console.log("✅ Поточні параметри зон для станції адміністратора додані");

  const zoneBaselines: Record<string, ParamsBaseline> = {
    "Зона A1": { temperature: 22, airHumidity: 63, substrateHumidity: 58 },
    "Зона A2": { temperature: 24, airHumidity: 68, substrateHumidity: 61 },
    "Зона A3": { temperature: 22, airHumidity: 66, substrateHumidity: 55 },
    "Зона A4": { temperature: 21, airHumidity: 62, substrateHumidity: 63 },
    "Зона B1": { temperature: 19, airHumidity: 70, substrateHumidity: 59 },
    "Зона B2": { temperature: 21, airHumidity: 72, substrateHumidity: 63 },
    "Зона B3": { temperature: 23, airHumidity: 60, substrateHumidity: 57 },
    "Зона B4": { temperature: 20, airHumidity: 68, substrateHumidity: 64 },
  };

  const allZones = [...stationAdmin.zones, ...stationUser1.zones];
  const zoneLogs = allZones.flatMap((zone) =>
    generateZoneLogs(
      zone.id,
      zoneBaselines[zone.name] ?? { temperature: 22, airHumidity: 65, substrateHumidity: 60 }
    )
  );
  await prisma.zoneParamsLog.createMany({ data: zoneLogs });

  console.log(`✅ Історія параметрів для графіків додана (${zoneLogs.length} записів)`);
  console.log("🌱 Сидирование завершено успешно!");
}

seed()
  .then(() => prisma.$disconnect())
  .catch((err) => {
    console.error("❌ Ошибка при сидировании:", err);
    prisma.$disconnect();
    process.exit(1);
  });
