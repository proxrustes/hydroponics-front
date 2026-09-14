import { proxyToBackend } from "@/lib/backendProxy";

export async function GET(req: Request) {
  return proxyToBackend(req, "/api/station/zone/config", "GET");
}

export async function POST(req: Request) {
  return proxyToBackend(req, "/api/station/zone/config", "POST");
}
