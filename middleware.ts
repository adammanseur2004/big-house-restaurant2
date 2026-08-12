import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(
  process.env.AUTH_SECRET || "fallback-secret-change-me"
);

export async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const isAdminRoute = nextUrl.pathname.startsWith("/admin") && nextUrl.pathname !== "/admin/login";

  if (isAdminRoute) {
    const token = req.cookies.get("auth-token")?.value;
    let isLoggedIn = false;

    if (token) {
      try {
        await jwtVerify(token, SECRET);
        isLoggedIn = true;
      } catch {
        isLoggedIn = false;
      }
    }

    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/admin/login", nextUrl));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
