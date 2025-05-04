import { HTTP_RESPONSES } from "@/definitions/HttpDefinitions"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request
) {
  try {
         const url = new URL(req.url)
  const id = url.pathname.split("/").pop()

  const zoneId = parseInt(id || "")
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
