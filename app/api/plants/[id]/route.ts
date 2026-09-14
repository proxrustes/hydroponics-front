import { proxyToBackend, lastPathSegment } from "@/lib/backendProxy";

export async function GET(req: Request) {
  return proxyToBackend(req, `/api/plants/${lastPathSegment(req)}`, "GET");
}
