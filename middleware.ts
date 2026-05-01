import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"

/*
  middleware.ts  —  Route protection
  ─────────────────────────────────────────────────────────────────────────────
  The account dashboard is private. Auth.js reads the signed JWT cookie and
  exposes it as req.auth. If no valid session exists, redirect to /login.
*/

export default auth((req) => {
  if (!req.auth) {
    const loginUrl = new URL("/login", req.nextUrl)
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    "/account",
    "/account/:path*",
    // Add more protected routes here later, e.g.:
    // "/booking"  — if you want to require login just to view the booking form
  ],
}
