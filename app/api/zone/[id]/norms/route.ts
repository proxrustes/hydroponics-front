import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { HTTP_RESPONSES } from "@/definitions/HttpDefinitions"

const prisma = new PrismaClient()

export async function GET(
  req: Request
) {
  try {
         const url = new URL(req.url)
  const id = url.pathname.split("/")[3]

  const zoneId = parseInt(id || "")
    if (isNaN(zoneId)) {
      return NextResponse.json(HTTP_RESPONSES[400]("Zone ID must be a number"))
    }

    // Ищем зону + базовые нормы (plant.norms) + override (zoneNorms)
    const zone = await prisma.zone.findUnique({
      where: { id: zoneId },
      include: {
        plant: {
          include: { norms: true },
        },
        zoneNorms: true,
      },
    })

    if (!zone) {
      return NextResponse.json(HTTP_RESPONSES[404]("Zone not found"))
    }

    const base = zone.plant?.norms
    const override = zone.zoneNorms

    // Если базовых норм нет, effectiveNorms будет null или пустым объектом
    if (!base) {
      return NextResponse.json(HTTP_RESPONSES[200]({
        zoneId: zone.id,
        zoneName: zone.name,
        plantName: zone.plant?.name || null,
        effectiveNorms: null,
      }))
    }

    // Мерджим (min, max) для каждого параметра
    // Если override?.temperatureMin не null, берём его, иначе base.temperatureMin
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
    }

    const responseBody = {
      zoneId: zone.id,
      zoneName: zone.name,
      plantName: zone.plant?.name || null,
      effectiveNorms, 
    }

    return NextResponse.json(HTTP_RESPONSES[200](responseBody))
  } catch (error: any) {
    console.error("GET /api/zone/[id]/norms error:", error)
    return NextResponse.json(HTTP_RESPONSES[500](error.message))
  }
}


export async function PUT(
    req: Request,
  ) {
    try {
         const url = new URL(req.url)
  const id = url.pathname.split("/")[3]

  const zoneId = parseInt(id || "")
      if (isNaN(zoneId)) {
        return NextResponse.json(HTTP_RESPONSES[400]("Zone ID must be a number"))
      }
  
      const body = await req.json()
      // Ожидается структура полей:
      // {
      //   "temperature": [20, 28],
      //   "airHumidity": [60, 80],
      //   ...
      // }
      // где каждый элемент - [min, max] (числа либо null)
  
      // Убедимся, что зона существует
      const zone = await prisma.zone.findUnique({ where: { id: zoneId } })
      if (!zone) {
        return NextResponse.json(HTTP_RESPONSES[404]("Zone not found"))
      }
  
      // Проверяем, есть ли уже запись в ZoneNorms
      let existingZoneNorms = await prisma.zoneNorms.findUnique({
        where: { zoneId },
      })
  
      // Формируем объект data для update/create
      // Если body.temperature = [20, 28], то temperatureMin=20, temperatureMax=28
      // Если значение не передано, оставляем undefined (чтобы не перезаписывать).
      // Если передали null, можно либо сбросить поле в null, либо пропустить — на ваше усмотрение.
      const dataToWrite: any = {}
  
      if (body.temperature) {
        dataToWrite.temperatureMin = body.temperature[0] ?? null
        dataToWrite.temperatureMax = body.temperature[1] ?? null
      }
      if (body.airHumidity) {
        dataToWrite.airHumidityMin = body.airHumidity[0] ?? null
        dataToWrite.airHumidityMax = body.airHumidity[1] ?? null
      }
      if (body.substrateHumidity) {
        dataToWrite.substrateHumidityMin = body.substrateHumidity[0] ?? null
        dataToWrite.substrateHumidityMax = body.substrateHumidity[1] ?? null
      }
      if (body.phLevel) {
        dataToWrite.phLevelMin = body.phLevel[0] ?? null
        dataToWrite.phLevelMax = body.phLevel[1] ?? null
      }
      if (body.nutrientConcentration) {
        dataToWrite.nutrientConcentrationMin = body.nutrientConcentration[0] ?? null
        dataToWrite.nutrientConcentrationMax = body.nutrientConcentration[1] ?? null
      }
      if (body.solutionTemperature) {
        dataToWrite.solutionTemperatureMin = body.solutionTemperature[0] ?? null
        dataToWrite.solutionTemperatureMax = body.solutionTemperature[1] ?? null
      }
      if (body.solutionLvl) {
        dataToWrite.solutionLvlMin = body.solutionLvl[0] ?? null
        dataToWrite.solutionLvlMax = body.solutionLvl[1] ?? null
      }
      if (body.lightIntensity) {
        dataToWrite.lightIntensityMin = body.lightIntensity[0] ?? null
        dataToWrite.lightIntensityMax = body.lightIntensity[1] ?? null
      }
  
      if (!existingZoneNorms) {
        existingZoneNorms = await prisma.zoneNorms.create({
          data: {
            zoneId,
            ...dataToWrite,
          },
        })
      } else {
        existingZoneNorms = await prisma.zoneNorms.update({
          where: { zoneId },
          data: {
            ...dataToWrite,
          },
        })
      }
  
      return NextResponse.json(HTTP_RESPONSES[200](existingZoneNorms))
    } catch (error: any) {
      console.error("PUT /api/zone/[id]/norms error:", error)
      return NextResponse.json(HTTP_RESPONSES[500](error.message))
    }
  }