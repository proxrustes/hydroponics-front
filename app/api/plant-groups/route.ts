import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { HTTP_RESPONSES } from "@/definitions/HttpDefinitions";

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

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name } = body;

    if (!name || typeof name !== "string" || name.trim() === "") {
      return NextResponse.json(HTTP_RESPONSES[400]("Invalid group name"));
    }

    const existingGroup = await prisma.plantGroup.findFirst({
      where: { name },
    });

    if (existingGroup) {
      return NextResponse.json(HTTP_RESPONSES[400]("Group already exists"));
    }

    const newGroup = await prisma.plantGroup.create({
      data: { name },
    });

    return NextResponse.json(HTTP_RESPONSES[200](newGroup));
  } catch (error: any) {
    console.error("❌ Error creating plant group:", error);
    return NextResponse.json(HTTP_RESPONSES[500](error.message));
  }
}
