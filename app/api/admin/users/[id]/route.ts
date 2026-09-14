import { proxyToBackend, lastPathSegment } from "@/lib/backendProxy";

export async function DELETE(req: Request) {
  return proxyToBackend(req, `/api/admin/users/${lastPathSegment(req)}`, "DELETE");
}

export async function PATCH(req: Request) {
  return proxyToBackend(req, `/api/admin/users/${lastPathSegment(req)}`, "PATCH");
}
