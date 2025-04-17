import { PrismaClient } from "@prisma/client"

// Пример: набор данных для сидирования
// В норме min/max для каждого параметра.
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
]

const prisma = new PrismaClient()

async function seed() {
  console.log("🌱 Начинаем сидирование...")
// 1. Удаляем зависимые логи
await prisma.zoneParamsLog.deleteMany({})
await prisma.stationParamsLog.deleteMany({})

// 2. Удаляем ZoneNorms перед Zone!
await prisma.zoneNorms.deleteMany({})

// 3. Удаляем Zone, Station, ...
await prisma.zone.deleteMany({})
await prisma.station.deleteMany({})
await prisma.norms.deleteMany({})
await prisma.plant.deleteMany({})
await prisma.plantGroup.deleteMany({})
await prisma.user.deleteMany({})

  console.log("🗑️ Все таблицы очищены.")

  // 3. Создаём plant groups + plants + norms
  for (const group of initialPlantGroups) {
    const plantGroup = await prisma.plantGroup.create({
      data: {
        name: group.title,
        plants: {
          create: group.plants.map((plant) => ({
            name: plant.name,
            description: plant.description,
            norms: {
              create: {
                temperatureMin: plant.norm.temperatureMin,
                temperatureMax: plant.norm.temperatureMax,
                airHumidityMin: plant.norm.airHumidityMin,
                airHumidityMax: plant.norm.airHumidityMax,
                substrateHumidityMin: plant.norm.substrateHumidityMin,
                substrateHumidityMax: plant.norm.substrateHumidityMax,
                phLevelMin: plant.norm.phLevelMin,
                phLevelMax: plant.norm.phLevelMax,
                nutrientConcentrationMin: plant.norm.nutrientConcentrationMin,
                nutrientConcentrationMax: plant.norm.nutrientConcentrationMax,
                solutionTemperatureMin: plant.norm.solutionTemperatureMin,
                solutionTemperatureMax: plant.norm.solutionTemperatureMax,
                solutionLvlMin: plant.norm.solutionLvlMin,
                solutionLvlMax: plant.norm.solutionLvlMax,
                lightIntensityMin: plant.norm.lightIntensityMin,
                lightIntensityMax: plant.norm.lightIntensityMax,
              },
            },
          })),
        },
      },
    })

    console.log(`✅ Добавлена группа: ${plantGroup.name}`)
  }
  await prisma.user.createMany({
    data: [
      {
        email: "admin@hydro.local",
        name: "Nastya Ku",
        password: "admin", 
        role: "ADMIN",
      },
      {
        email: "user1@hydro.local",
        name: "Romka Khu",
        password: "userpass1",
        role: "USER",
      },
      {
        email: "user2@hydro.local",
        name: "Mary Jane",
        password: "userpass2",
        role: "USER",
      },
    ],
  })

  console.log("✅ Добавлены пользователи (1 админ, 2 юзера)")
  // 4. Создаём одну тестовую станцию
  const station = await prisma.station.create({
    data: {
      name: "Гідропонна станція №1",
    },
  })
  console.log(`✅ Добавлена станция: ${station.name}`)

  // 4.1 Создаём логи для станции (stationParamsLog)
  await prisma.stationParamsLog.createMany({
    data: [
      {
        stationId: station.id,
        recordedAt: new Date(),
        phLevel: 6.2,
        nutrientConcentration: 2.0,
        solutionTemperature: 22,
        solutionLvl: 85,
      },
      {
        stationId: station.id,
        recordedAt: new Date(Date.now() - 2 * 3600_000), // 2 часа назад
        phLevel: 6.1,
        nutrientConcentration: 2.4,
        solutionTemperature: 21,
        solutionLvl: 80,
      },
    ],
  })
  console.log("✅ Добавлены StationParamsLog для станции №1")

  // 5. Найдём "Томат", чтобы создать ему зону
  const tomatoPlant = await prisma.plant.findFirst({
    where: { name: "Томат" },
  })
  if (!tomatoPlant) {
    throw new Error('❌ Не найдено растение "Томат"!')
  }

  // 6. Создаём зону с этим растением
  const tomatoZone = await prisma.zone.create({
    data: {
      name: "Зона для Томатів",
      plantId: tomatoPlant.id,
      stationId: station.id,
      isLightOn: true,
    },
  })
  console.log(`✅ Создана зона для томатов: ${tomatoZone.name}`)

  // 7. (Необязательно) создаём логи для зоны
  const now = Date.now()
  const logsData = Array.from({ length: 10 }).map((_, idx) => {
    const minutesAgo = (10 - idx) * 15 // убывающая шкала
    return {
      zoneId: tomatoZone.id,
      recordedAt: new Date(now - minutesAgo * 60_000),
      temperature: 23 + Math.random(),       // 23.x
      airHumidity: 70 + Math.floor(Math.random() * 10),  // от 70 до 79
      substrateHumidity: 65 + Math.floor(Math.random() * 10),
      isLightOn: idx % 2 === 0, // для разнообразия
    }
  })

  await prisma.zoneParamsLog.createMany({
    data: logsData,
  })
  console.log(`✅ Добавлено ${logsData.length} записей ZoneParamsLog для томатов.`)

  // 8. (Необязательно) переопределим нормы в ZoneNorms (допустим, хотим поднять макс температуру)
  await prisma.zoneNorms.create({
    data: {
      zoneId: tomatoZone.id,
      temperatureMax: 29, // переопределяем верхнюю границу
      airHumidityMin: 65,
    },
  })
  console.log("✅ Создан override ZoneNorms для томатов")

  console.log("🌱 Сидирование успешно завершено!")
}

seed()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (err) => {
    console.error("❌ Ошибка при сидировании:", err)
    await prisma.$disconnect()
    process.exit(1)
  })
