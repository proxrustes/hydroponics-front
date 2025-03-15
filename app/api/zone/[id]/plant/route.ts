import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"
import { HTTP_RESPONSES } from "@/definitions/HttpDefinitions"

const prisma = new PrismaClient()

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const zoneId = parseInt(params.id, 10)
    if (isNaN(zoneId)) {
      return NextResponse.json(HTTP_RESPONSES[400]("Invalid Zone ID"))
    }

    const { plantId } = await req.json()
    if (!plantId || typeof plantId !== "number") {
      return NextResponse.json(HTTP_RESPONSES[400]("plantId must be a number"))
    }

    // Проверяем, существует ли новое растение
    const plantExists = await prisma.plant.findUnique({
      where: { id: plantId },
    })
    if (!plantExists) {
      return NextResponse.json(HTTP_RESPONSES[404]("Plant not found"))
    }

    // Обновляем зону, назначая новое растение
    const updatedZone = await prisma.zone.update({
      where: { id: zoneId },
      data: { plantId },
    })

    return NextResponse.json(HTTP_RESPONSES[200](updatedZone))
  } catch (error: any) {
    console.error("PUT /api/zone/[id]/plant error:", error)
    return NextResponse.json(HTTP_RESPONSES[500](error.message))
  }
}
