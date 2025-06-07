import { NextResponse } from "next/server";
import { HTTP_RESPONSES } from "@/definitions/HttpDefinitions";
import { parse } from "@/lib/utils/jwtUtils";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("currentUser")?.value;

    if (!token) return NextResponse.json(HTTP_RESPONSES[401]);

    const user = await parse(token);
    if (!user) return NextResponse.json(HTTP_RESPONSES[401]);

    const url = new URL(req.url);
    const uuid = url.searchParams.get("uuid");

    if (uuid) {
      console.log("uuid:", uuid, "user.id:", user.id);
      const station = await prisma.station.findUnique({
        where: { uuid, userId: user.id },
        include: {
          zones: {
            include: {
              plant: { select: { id: true, name: true } },
            },
          },
        },
      });

      if (!station || station.userId !== user.id) {
        return NextResponse.json(HTTP_RESPONSES[404]("Station"));
      }

      return NextResponse.json(HTTP_RESPONSES[200](station));
    }

    console.log("user.id:", user.id);
    const stations = await prisma.station.findMany({
      where: { userId: user.id },
      include: {
        zones: {
          include: {
            plant: { select: { id: true, name: true } },
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
    console.log(body)
    const { name, uuid } = body;

    if (!name || !uuid) {
      return NextResponse.json(HTTP_RESPONSES[400]("'name' or 'uuid'"));
    }

    const existing = await prisma.station.findUnique({ where: { uuid } });
    if (existing) {
      return NextResponse.json(HTTP_RESPONSES[409]("Station with this UUID"));
    }
    console.log(user.id);

    const station = await prisma.station.create({
      data: {
        name,
        uuid,
        userId: user.id,
        zones: {
          create: Array.from({ length: 4 }).map((_, index) => ({
            name: `Зона ${index + 1}`,
            index,
          })),
        },
      },
      include: {
        zones: true,
      },
    });

    return NextResponse.json(HTTP_RESPONSES[201](station));
  } catch (error: any) {
    console.error("❌ Error in POST /stations:", error);
    return NextResponse.json(HTTP_RESPONSES[500](error.message));
  }
}

export async function PUT(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("currentUser")?.value;

    if (!token) return NextResponse.json(HTTP_RESPONSES[401]);

    const user = await parse(token);
    if (!user) return NextResponse.json(HTTP_RESPONSES[401]);

    const body = await req.json();
    const { uuid, name } = body;

    if (!uuid || !name) {
      return NextResponse.json(HTTP_RESPONSES[400]("Missing 'uuid' or 'name'"));
    }

    const station = await prisma.station.findUnique({
      where: { uuid },
    });

    if (!station || station.userId !== user.id) {
      return NextResponse.json(
        HTTP_RESPONSES[404]("Station not found or unauthorized")
      );
    }

    const updated = await prisma.station.update({
      where: { uuid },
      data: { name },
    });

    return NextResponse.json(HTTP_RESPONSES[201](updated));
  } catch (error: any) {
    console.error("❌ Error in PUT /stations:", error);
    return NextResponse.json(HTTP_RESPONSES[500](error.message));
  }
}
