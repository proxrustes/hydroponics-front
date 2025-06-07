import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
  console.log("🌱 Сидирование завершено успешно!");
}

seed()
  .then(() => prisma.$disconnect())
  .catch((err) => {
    console.error("❌ Ошибка при сидировании:", err);
    prisma.$disconnect();
    process.exit(1);
  });
