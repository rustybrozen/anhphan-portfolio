import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const sessionCookie = 
    request.cookies.get("better-auth.session_token") || 
    request.cookies.get("__Secure-better-auth.session_token");

  const isProtectedRoute = request.nextUrl.pathname.startsWith("/profile");

  if (isProtectedRoute && !sessionCookie) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*"],
};