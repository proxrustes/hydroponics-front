import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { HTTP_RESPONSES } from "@/definitions/HttpDefinitions";

// GET: returns target params for a zone by station UUID and index
export async function GET(req: NextRequest) {
  const uuid = req.nextUrl.searchParams.get("uuid");
  const index = parseInt(req.nextUrl.searchParams.get("index") || "");

  if (!uuid || isNaN(index)) {
    return NextResponse.json(HTTP_RESPONSES[400]("Invalid uuid or index"));
  }

  const zone = await prisma.zone.findFirst({
    where: {
      station: { uuid },
      index,
    },
    select: { id: true },
  });

  if (!zone) {
    return NextResponse.json(HTTP_RESPONSES[404]("Zone not found"));
  }

  const [targetParams, scheduleIntervals] = await Promise.all([
    prisma.zoneTargetParams.findUnique({
      where: { zoneId: zone.id },
    }),
    prisma.zoneScheduleInterval.findMany({
      where: { zoneId: zone.id },
    }),
  ]);

  return NextResponse.json(
    HTTP_RESPONSES[200]({
      targetParams: targetParams ?? null,
      scheduleIntervals: scheduleIntervals ?? [],
    })
  );
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { uuid, index, params, scheduleIntervals } = body;
  console.log("BODX", body);
  // Перевірка наявності uuid та index
  if (!uuid || isNaN(index)) {
    return NextResponse.json(HTTP_RESPONSES[400]("Invalid uuid or index"));
  }

  // Знаходимо зону за uuid та index
  const zone = await prisma.zone.findFirst({
    where: {
      station: { uuid },
      index,
    },
    select: { id: true },
  });

  if (!zone) {
    return NextResponse.json(HTTP_RESPONSES[404]("Zone not found"));
  }

  try {
    // Якщо params надано, оновлюємо або створюємо targetParams
    const updatedTarget = params
      ? await prisma.zoneTargetParams.upsert({
          where: { zoneId: zone.id },
          update: params,
          create: {
            zoneId: zone.id,
            ...params,
          },
        })
      : null; // Якщо params не надано, пропускаємо оновлення

    // Якщо scheduleIntervals надано, створюємо інтервали
    const updatedIntervals = scheduleIntervals?.length
      ? await prisma.zoneScheduleInterval.createMany({
          data: scheduleIntervals.map((interval: any) => ({
            zoneId: zone.id,
            device: interval.device,
            onTime: interval.onTime,
            offTime: interval.offTime,
          })),
        })
      : null; // Якщо scheduleIntervals не надано, пропускаємо

    // Повертаємо результат залежно від того, що було оновлено
    return NextResponse.json(
      HTTP_RESPONSES[200]({
        targetParams: updatedTarget ?? null,
        scheduleIntervals: updatedIntervals ?? null,
      })
    );
  } catch (e: any) {
    console.error("❌ Error in POST /station/zone/schedule:", e);
    return NextResponse.json(HTTP_RESPONSES[500](e.message));
  }
}
