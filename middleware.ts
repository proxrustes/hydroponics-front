import { NextRequest, NextResponse } from "next/server"
import { decodeJwt } from "jose"
import { verify } from "./lib/jwtUtils"

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("currentUser")?.value

  if (!token && req.nextUrl.pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  if (token) {
    try {
      const decodedJWT = decodeJwt(token)
      const currentTimestamp = Math.floor(Date.now() / 1000)
      if (decodedJWT.exp && decodedJWT.exp < currentTimestamp) {
        return NextResponse.redirect(new URL("/login", req.url))
      }

      const isValid = await verify(token)
      if (!isValid) {
        return NextResponse.redirect(new URL("/login", req.url))
      }

      if (req.nextUrl.pathname === "/dashboard") {
        req.nextUrl.pathname = "/dashboard/current-shift"
        return NextResponse.redirect(req.nextUrl)
      }

      return NextResponse.next()
    } catch {
      return NextResponse.redirect(new URL("/login", req.url))
    }
  }

  return NextResponse.next()
}


export const config = {
  matcher: [
    "/((?!api/|_next/static|_next/image|favicon.ico|manifest.json|robots.txt).*)",
  ],
}
