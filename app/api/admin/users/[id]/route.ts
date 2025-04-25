import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(req: NextRequest) {
  const url = new URL(req.url);
  const id = parseInt(url.pathname.split("/").pop() || "");
  if (isNaN(id))
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

  await prisma.user.delete({ where: { id } });

  return NextResponse.json({ message: "Deleted" }, { status: 200 });
}

export async function PATCH(req: NextRequest) {
  const url = new URL(req.url);
  const id = parseInt(url.pathname.split("/").pop() || "");
  const { role } = await req.json();

  if (!["USER", "ADMIN"].includes(role)) {
    return NextResponse.json({ error: "Invalid role" }, { status: 400 });
  }

  await prisma.user.update({
    where: { id },
    data: { role },
  });

  return NextResponse.json({ message: "Role updated" }, { status: 200 });
}
