import { NextResponse } from "next/server";
import { sign } from "@/lib/utils/jwtUtils";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { email, password, role, name } = await req.json();

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const user = await prisma.user.create({
    data: {
      email,
      name,
      password,
      role: role || "USER",
    },
  });

  const token = await sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      password: "",
    },
    process.env.JWT_KEY ?? "KEY"
  );

  return NextResponse.json({ token });
}
