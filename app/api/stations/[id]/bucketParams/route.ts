import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"
import { HTTP_RESPONSES } from "@/definitions/HttpDefinitions"

// Инициируем Prisma
const prisma = new PrismaClient()

// Route: GET /api/station/[id]/bucket
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const stationId = parseInt(params.id)
    
    if (isNaN(stationId)) {
      return NextResponse.json(HTTP_RESPONSES[400]("id"))
    }
    
    const station = await prisma.station.findUnique({
      where: { id: stationId }
    })

    if (!station) {
      return NextResponse.json(HTTP_RESPONSES[404]("Station"))
    }

    // 2. Ищем «последнюю» запись из лога
    const currentStationParams = await prisma.stationParamsLog.findFirst({
      where: { stationId: station.id },
      orderBy: { recordedAt: "desc" },
    })

    // 3. Формируем итоговый объект
    const result = {
      station,
      currentStationParams,
    }

    return NextResponse.json(HTTP_RESPONSES[200](result))
  } catch (error: any) {
    console.error("❌ Error fetching station bucket params:", error)
    return NextResponse.json(HTTP_RESPONSES[500](error.message))
  }
}
