import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const isLoggedIn = req.cookies.get("auth")?.value === "1";
  const { pathname } = req.nextUrl;

  if (pathname === "/healthz" || pathname.startsWith("/api/health")) {
    return NextResponse.next();
  }
  // ✅ API 요청은 미들웨어 통과
  if (pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  // ✅ 로그인/회원가입 페이지는 예외
  if (
    !isLoggedIn &&
    !pathname.startsWith("/login") &&
    !pathname.startsWith("/signup")
  ) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return NextResponse.next();
}
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};