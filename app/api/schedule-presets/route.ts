import { NextResponse } from "next/server";
import { HTTP_RESPONSES } from "@/definitions/HttpDefinitions";
import { parse } from "@/lib/utils/jwtUtils";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

// GET /api/schedule-presets?plantId=ID — list the current user's presets,
// optionally narrowed to ones for a given plant.
export async function GET(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("currentUser")?.value;

    if (!token) return NextResponse.json(HTTP_RESPONSES[401]);

    const user = await parse(token);
    if (!user) return NextResponse.json(HTTP_RESPONSES[401]);

    const url = new URL(req.url);
    const plantIdParam = url.searchParams.get("plantId");
    const plantId = plantIdParam ? parseInt(plantIdParam) : undefined;

    const presets = await prisma.schedulePreset.findMany({
      where: {
        userId: user.id,
        ...(plantId ? { plantId } : {}),
      },
      include: {
        intervals: true,
        plant: { select: { id: true, name: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(HTTP_RESPONSES[200](presets));
  } catch (error: any) {
    console.error("❌ Error in GET /schedule-presets:", error);
    return NextResponse.json(HTTP_RESPONSES[500](error.message));
  }
}

// POST /api/schedule-presets — create a preset owned by the current user.
// Body: { name: string, plantId?: number, intervals: { device, onTime, offTime?, volumeMl? }[] }
export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("currentUser")?.value;

    if (!token) return NextResponse.json(HTTP_RESPONSES[401]);

    const user = await parse(token);
    if (!user) return NextResponse.json(HTTP_RESPONSES[401]);

    const body = await req.json();
    const { name, plantId, intervals } = body;

    if (!name) {
      return NextResponse.json(HTTP_RESPONSES[400]("'name'"));
    }
    if (!Array.isArray(intervals) || intervals.length === 0) {
      return NextResponse.json(HTTP_RESPONSES[400]("'intervals'"));
    }

    if (plantId) {
      const plant = await prisma.plant.findUnique({ where: { id: Number(plantId) } });
      if (!plant) {
        return NextResponse.json(HTTP_RESPONSES[404]("Plant"));
      }
    }

    const preset = await prisma.schedulePreset.create({
      data: {
        name,
        userId: user.id,
        plantId: plantId ? Number(plantId) : null,
        intervals: {
          create: intervals.map((interval: any) => ({
            device: interval.device,
            onTime: interval.onTime,
            offTime: interval.offTime ?? null,
            volumeMl: interval.volumeMl ?? null,
          })),
        },
      },
      include: {
        intervals: true,
        plant: { select: { id: true, name: true } },
      },
    });

    return NextResponse.json(HTTP_RESPONSES[201](preset));
  } catch (error: any) {
    console.error("❌ Error in POST /schedule-presets:", error);
    return NextResponse.json(HTTP_RESPONSES[500](error.message));
  }
}
