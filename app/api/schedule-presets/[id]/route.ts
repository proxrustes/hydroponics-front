import { proxyToBackend, lastPathSegment } from "@/lib/backendProxy";

export async function DELETE(req: Request) {
  return proxyToBackend(req, `/api/schedule-presets/${lastPathSegment(req)}`, "DELETE");
}
