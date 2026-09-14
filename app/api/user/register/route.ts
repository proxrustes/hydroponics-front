import { proxyToBackend } from "@/lib/backendProxy";

export async function POST(req: Request) {
  return proxyToBackend(req, "/api/user/register", "POST");
}
