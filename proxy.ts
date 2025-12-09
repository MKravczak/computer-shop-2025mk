import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

// Publiczne ścieżki, które nie wymagają zalogowania
const PUBLIC_PATHS = ["/", "/api/auth", "/product-list"];

const isPublicPath = (pathname: string) => {
  if (pathname.startsWith("/_next")) return true; // assety Next.js
  if (pathname.startsWith("/images")) return true; // statyczne zasoby
  if (pathname.startsWith("/api/auth")) return true; // ścieżki Auth.js
  return PUBLIC_PATHS.some((path) => pathname.startsWith(path));
};

export default auth((req) => {
  const session = req.auth;
  const { pathname } = req.nextUrl;

  // Zezwól na publiczne trasy bez sesji
  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  // Jeśli brak sesji, przekieruj do logowania
  if (!session) {
    const signInUrl = new URL("/api/auth/signin", req.nextUrl);
    signInUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
});

// Ograniczamy proxy do tras wymagających autoryzacji (np. koszyk, historia zamówień)
export const config = {
  matcher: ["/basket/:path*", "/order-history/:path*"],
};

