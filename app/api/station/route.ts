import { proxyToBackend } from "@/lib/backendProxy";

export async function GET(req: Request) {
  return proxyToBackend(req, "/api/station", "GET");
}

export async function POST(req: Request) {
  return proxyToBackend(req, "/api/station", "POST");
}

export async function PUT(req: Request) {
  return proxyToBackend(req, "/api/station", "PUT");
}
