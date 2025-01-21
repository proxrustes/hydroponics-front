import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { HTTP_RESPONSES } from "@/definitions/HttpDefinitions";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const plantGroups = await prisma.plantGroup.findMany({
      include: {
        plants: {
          select: {
            id: true,
            name: true,
            description: true, 
          },
        },
      },
    });

    return NextResponse.json(HTTP_RESPONSES[200](plantGroups));
  } catch (error: any) {
    console.error("❌ Error fetching plant groups:", error);
    return NextResponse.json(HTTP_RESPONSES[500](error.message));
  }
}
