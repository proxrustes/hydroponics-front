import { sign } from "@/lib/jwtUtils"
import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email, password } = await req.json()

  const user = await prisma.user.findUnique({
    where: { email }
  })

  if (!user || user.password !== password) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  }

  const token = await sign({
    id: user.id,
    email: user.email,
    name: user.email.split("@")[0],
    role: user.role,
    password: ""
  }, process.env.JWT_KEY ?? "KEY")

  return NextResponse.json({ token })
}
