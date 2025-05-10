import { NextRequest, NextResponse } from "next/server";
import { decodeJwt } from "jose";
import { verify } from "./lib/utils/jwtUtils";

export const adminRoutes = ["/admin", "/admin/users", "/admin/users/"];

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("currentUser")?.value;
  const isAdminRoute = adminRoutes.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );
  if (!token && req.nextUrl.pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token) {
    try {
      const decodedJWT = decodeJwt(token);
      const currentTimestamp = Math.floor(Date.now() / 1000);
      if (decodedJWT.exp && decodedJWT.exp < currentTimestamp) {
        return NextResponse.redirect(new URL("/login", req.url));
      }

      const isValid = await verify(token);
      if (!isValid) {
        return NextResponse.redirect(new URL("/login", req.url));
      }
      if (isAdminRoute && decodedJWT.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/login", req.url));
      }

      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api/|_next/static|_next/image|favicon.ico|manifest.json|robots.txt).*)",
  ],
};
