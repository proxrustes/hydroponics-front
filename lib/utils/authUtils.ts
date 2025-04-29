import { decodeJwt } from "jose";

export async function getUserIdFromRequest(
  req: Request
): Promise<number | null> {
  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.startsWith("Bearer ")
      ? authHeader.slice(7)
      : null;

    if (!token) return null;

    const decoded = decodeJwt(token) as { id?: number };
    if (!decoded.id) return null;

    return decoded.id;
  } catch (err) {
    console.error("Error decoding token:", err);
    return null;
  }
}
