import { proxyToBackend } from "@/lib/backendProxy";

export async function GET(req: Request) {
  return proxyToBackend(req, "/api/station/bucket/config", "GET");
}

export async function POST(req: Request) {
  return proxyToBackend(req, "/api/station/bucket/config", "POST");
}
