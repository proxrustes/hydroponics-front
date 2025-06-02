import { HTTP_RESPONSES } from "@/definitions/HttpDefinitions";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(req: NextRequest) {
  const url = new URL(req.url);
  const id = parseInt(url.pathname.split("/").pop() || "");

  if (isNaN(id))
    return NextResponse.json(HTTP_RESPONSES[400]("Invalid user ID"));

  try {
    const stations = await prisma.station.findMany({
      where: { userId: id },
      select: { id: true },
    });

    const stationIds = stations.map((s) => s.id);

    if (stationIds.length > 0) {
      const zones = await prisma.zone.findMany({
        where: { stationId: { in: stationIds } },
        select: { id: true },
      });
      const zoneIds = zones.map((z) => z.id);

      if (zoneIds.length > 0) {
        await prisma.zoneParamsLog.deleteMany({
          where: { zoneId: { in: zoneIds } },
        });
        await prisma.zoneNorms.deleteMany({
          where: { zoneId: { in: zoneIds } },
        });
      }

      await prisma.bucketParamsLog.deleteMany({
        where: { stationId: { in: stationIds } },
      });
      await prisma.zone.deleteMany({
        where: { stationId: { in: stationIds } },
      });
      await prisma.station.deleteMany({ where: { id: { in: stationIds } } });
    }

    await prisma.user.delete({ where: { id } });

    return NextResponse.json(HTTP_RESPONSES[200]("User deleted"));
  } catch (e: any) {
    console.error("❌ Ошибка при удалении пользователя:", e);
    return NextResponse.json(HTTP_RESPONSES[500](e.message));
  }
}

export async function PATCH(req: NextRequest) {
  const url = new URL(req.url);
  const id = parseInt(url.pathname.split("/").pop() || "");
  const { role } = await req.json();

  if (!["USER", "ADMIN"].includes(role)) {
    return NextResponse.json(HTTP_RESPONSES[400]("Invalid role"));
  }

  await prisma.user.update({
    where: { id },
    data: { role },
  });

  return NextResponse.json(HTTP_RESPONSES[200]);
}
