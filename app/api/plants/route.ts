import { proxyToBackend } from "@/lib/backendProxy";

export async function GET(req: Request) {
  return proxyToBackend(req, "/api/plants", "GET");
}

export async function POST(req: Request) {
  return proxyToBackend(req, "/api/plants", "POST");
}
