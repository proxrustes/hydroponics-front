import { NextResponse } from "next/server";
import { HTTP_RESPONSES } from "@/definitions/HttpDefinitions";
import { parse } from "@/lib/utils/jwtUtils";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("currentUser")?.value;

    if (!token) {
      return NextResponse.json(HTTP_RESPONSES[401]);
    }

    const user = await parse(token);
    if (!user) {
      return NextResponse.json(HTTP_RESPONSES[401]);
    }

    const stations = await prisma.station.findMany({
      where: {
        userId: user.id,
      },
      include: {
        zones: {
          include: {
            plant: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(HTTP_RESPONSES[200](stations));
  } catch (error: any) {
    console.error("❌ Error in GET /stations:", error);
    return NextResponse.json(HTTP_RESPONSES[500](error.message));
  }
}

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("currentUser")?.value;

    if (!token) {
      return NextResponse.json(HTTP_RESPONSES[401]);
    }

    const user = await parse(token);
    if (!user) {
      return NextResponse.json(HTTP_RESPONSES[401]);
    }

    const body = await req.json();
    const { name, uuid } = body;

    if (!name || !uuid) {
      return NextResponse.json(HTTP_RESPONSES[400]("'name' or 'uuid'"));
    }

    const existing = await prisma.station.findUnique({ where: { uuid } });
    if (existing) {
      return NextResponse.json(HTTP_RESPONSES[409]("Station with this UUID"));
    }

    const station = await prisma.station.create({
      data: {
        name,
        uuid,
        userId: user.id,
      },
    });

    return NextResponse.json(HTTP_RESPONSES[201](station));
  } catch (error: any) {
    console.error("❌ Error in POST /stations:", error);
    return NextResponse.json(HTTP_RESPONSES[500](error.message));
  }
}
