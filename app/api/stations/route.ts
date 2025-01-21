import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { HTTP_RESPONSES } from "../../../definitions/HttpDefinitions";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const stations = await prisma.station.findMany({
      include: {
        zones: {
          include: {
            plant: {
              select: {
                id: true,
                name: true,
              },
            },
            zoneParams: true
          },
        },
      },
    });

    return NextResponse.json(HTTP_RESPONSES[200](stations));
  } catch (error: any) {
    console.error("❌", error);
    return NextResponse.json(HTTP_RESPONSES[500](error.message));
  }
}
