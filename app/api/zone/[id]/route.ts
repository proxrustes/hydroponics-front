import { HTTP_RESPONSES } from "@/definitions/HttpDefinitions"
import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const zoneId = parseInt(params.id, 10)
    if (isNaN(zoneId)) {
      return NextResponse.json(HTTP_RESPONSES[400]("Invalid Zone ID"))
    }

    // Загружаем зону из БД
    const zone = await prisma.zone.findUnique({
      where: { id: zoneId },
       include: {
         plant: true,
       },
    })

    if (!zone) {
      return NextResponse.json(HTTP_RESPONSES[404]("Zone"))
    }

    return NextResponse.json(HTTP_RESPONSES[200](zone))
  } catch (error: any) {
    console.error("GET /api/zone/[id] error:", error)
    return NextResponse.json(HTTP_RESPONSES[500](error.message))
  }
}
