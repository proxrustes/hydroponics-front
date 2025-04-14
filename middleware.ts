import { NextRequest, NextResponse } from "next/server"
import { decodeJwt } from "jose"
import { verify } from "./lib/jwtUtils"

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === "/") {
    req.nextUrl.pathname = "/login"
    return NextResponse.redirect(req.nextUrl)
  }
  const token = req.cookies.get("currentUser")?.value

  if (!token && req.nextUrl.pathname === "/login") {
    return NextResponse.next()
  }
  if (!token) {
    req.nextUrl.pathname = "/login"
    return NextResponse.redirect(req.nextUrl)
  }
  const decodedJWT = decodeJwt(token)
  const currentTimestamp = Math.floor(Date.now() / 1000)
  if (
    decodedJWT.exp &&
    decodedJWT.exp < currentTimestamp &&
    req.nextUrl.pathname !== "/login" 
  ) {
    return redirectWithDelete(req, "/login")
  }

  const isValidToken = await verify(token)
  if (!isValidToken) {
    return redirectWithDelete(req, "/login")
  }

  if (req.nextUrl.pathname === "/dashboard") {
    req.nextUrl.pathname = "/dashboard/current-shift"
    return NextResponse.redirect(req.nextUrl)
  }

  return NextResponse.next()
}

function redirectWithDelete(req: NextRequest, url: string) {
  req.cookies.delete("currentUser")
  const response = NextResponse.redirect(new URL(url, req.url))
  response.cookies.delete("currentUser")
  return response
}