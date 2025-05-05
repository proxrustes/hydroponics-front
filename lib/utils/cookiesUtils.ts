import { cookies } from "next/headers";
import { parse } from "@/lib/utils/jwtUtils";

export async function getUserRoleFromCookie(): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("currentUser")?.value;

    if (!token) return null;

    const user = await parse(token);
    return user?.role ?? null;
  } catch (e) {
    console.error("❌ Ошибка парсинга токена:", e);
    return null;
  }
}
