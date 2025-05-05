import { HTTP_RESPONSES } from "@/definitions/HttpDefinitions";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true, stations: true },
  });
  return NextResponse.json(HTTP_RESPONSES[200](users));
}
