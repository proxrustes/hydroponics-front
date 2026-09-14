// Every /api/** route in this app is now a thin proxy to the Python
// (FastAPI) backend, which owns the database. Kept as Next.js routes so no
// frontend component needed to change: they all still call /api/* via
// customFetch exactly as before.

const BACKEND_URL =
  process.env.PLATFORM_API_URL ??
  process.env.NEXT_PUBLIC_PLATFORM_API_URL ??
  "http://localhost:8000";

export async function proxyToBackend(
  req: Request,
  backendPath: string,
  method: string
): Promise<Response> {
  const url = new URL(req.url);
  const target = `${BACKEND_URL}${backendPath}${url.search}`;

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  const cookie = req.headers.get("cookie");
  if (cookie) headers["cookie"] = cookie;

  const hasBody = method !== "GET" && method !== "DELETE";
  const body = hasBody ? await req.text() : undefined;

  const res = await fetch(target, {
    method,
    headers,
    body,
    cache: "no-store",
  });

  const text = await res.text();

  return new Response(text, {
    status: res.status,
    headers: { "Content-Type": res.headers.get("content-type") ?? "application/json" },
  });
}

// Next 15's route params are async; every dynamic route here already
// extracted the trailing id from the URL manually instead of typed params,
// so the proxies keep doing the same for a minimal diff.
export function lastPathSegment(req: Request): string {
  const url = new URL(req.url);
  return url.pathname.split("/").filter(Boolean).pop() ?? "";
}
