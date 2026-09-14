import { proxyToBackend } from "@/lib/backendProxy";

export async function GET(req: Request) {
  return proxyToBackend(req, "/api/station/zone", "GET");
}

export async function PUT(req: Request) {
  return proxyToBackend(req, "/api/station/zone", "PUT");
}
