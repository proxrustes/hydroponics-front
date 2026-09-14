import { proxyToBackend } from "@/lib/backendProxy";

export async function GET(req: Request) {
  return proxyToBackend(req, "/api/station/bucket/params", "GET");
}
