import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"
import { HTTP_RESPONSES } from "@/definitions/HttpDefinitions"

const prisma = new PrismaClient()

/**
 * Пример: GET /api/zone/[id]/logs?start=2025-01-01T00:00:00Z&end=2025-01-30T23:59:59Z&limit=50
 *
 * Параметры в query:
 * - start (ISO-строка): брать логи, у которых recordedAt >= start
 * - end (ISO-строка):   брать логи, у которых recordedAt <= end
 * - limit (число):      ограничение кол-ва записей, по умолчанию 100
 */
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
    const limit = 100

    // Формируем объект "where" для фильтрации
    const where: any = {
      zoneId,
    }
    // Достаём записи из лога
    // По умолчанию берём limit=100, отсортируем по времени (самые новые в конце, чтобы удобно рисовать график).
    // Если нужно, меняйте порядок на "desc"
    const logs = await prisma.zoneParamsLog.findMany({
      where,
      orderBy: {
        recordedAt: "asc", // или "desc", если хотите сначала последние
      },
      take: limit,
    })

    return NextResponse.json(HTTP_RESPONSES[200](logs))
  } catch (error: any) {
    console.error("GET /api/zone/[id]/logs error:", error)
    return NextResponse.json(HTTP_RESPONSES[500](error.message))
  }
}
