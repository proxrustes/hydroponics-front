import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { HTTP_RESPONSES } from "@/definitions/HttpDefinitions";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
     const url = new URL(req.url)
  const id = url.pathname.split("/").pop()

  const plantId = parseInt(id || "")

    const plant = await prisma.plant.findUnique({
      where: { id: plantId },
      include: {
        plantGroup: true,  
        norms: true
      },
    });

    if (!plant) {
      return NextResponse.json(HTTP_RESPONSES[404]("Plant not found"));
    }

    return NextResponse.json(HTTP_RESPONSES[200](plant));
  } catch (error: any) {
    console.error("❌ Error fetching plant:", error);
    return NextResponse.json(HTTP_RESPONSES[500](error.message));
  }
}
