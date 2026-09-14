import { NextRequest, NextResponse } from "next/server";
import { HTTP_RESPONSES } from "@/definitions/HttpDefinitions";
import { parse } from "@/lib/utils/jwtUtils";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

// DELETE /api/schedule-presets/:id — remove a preset the current user owns.
export async function DELETE(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("currentUser")?.value;

    if (!token) return NextResponse.json(HTTP_RESPONSES[401]);

    const user = await parse(token);
    if (!user) return NextResponse.json(HTTP_RESPONSES[401]);

    const url = new URL(req.url);
    const id = parseInt(url.pathname.split("/").pop() || "");

    if (isNaN(id)) {
      return NextResponse.json(HTTP_RESPONSES[400]("Invalid preset ID"));
    }

    const preset = await prisma.schedulePreset.findUnique({ where: { id } });
    if (!preset || preset.userId !== user.id) {
      return NextResponse.json(HTTP_RESPONSES[404]("SchedulePreset"));
    }

    await prisma.schedulePresetInterval.deleteMany({ where: { presetId: id } });
    await prisma.schedulePreset.delete({ where: { id } });

    return NextResponse.json(HTTP_RESPONSES[200]({ id }));
  } catch (error: any) {
    console.error("❌ Error in DELETE /schedule-presets/:id:", error);
    return NextResponse.json(HTTP_RESPONSES[500](error.message));
  }
}
