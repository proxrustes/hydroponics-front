import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { HTTP_RESPONSES } from "@/definitions/HttpDefinitions"

const prisma = new PrismaClient()

// File: app/api/stations/[id]/route.ts
export async function GET(
  req: Request
) {
  try {
         const url = new URL(req.url)
  const id = url.pathname.split("/").pop()

  const stationId = parseInt(id || "")
    if (isNaN(stationId)) {
      return NextResponse.json(HTTP_RESPONSES[400]("Station ID must be a number"))
    }

    // Получаем станцию, связанные зоны и информацию о растениях в этих зонах
    const station = await prisma.station.findUnique({
      where: { id: stationId },
      include: {
        zones: {
          include: {
            plant: {
              include: {
                plantGroup: true,
              },
            },
          },
        },
      },
    })

    if (!station) {
      return NextResponse.json(HTTP_RESPONSES[404]("Station not found"))
    }

    return NextResponse.json(HTTP_RESPONSES[200](station))
  } catch (error: any) {
    console.error("GET /api/stations/[id] error:", error)
    return NextResponse.json(HTTP_RESPONSES[500](error.message))
  }
}
