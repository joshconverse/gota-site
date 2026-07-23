import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Root layout needs to know the current path (to hide the site Header/Footer
// on /sanity) but Server Components have no direct way to read pathname —
// stash it in a response header and read it back via next/headers.
export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  response.headers.set("x-pathname", request.nextUrl.pathname);
  return response;
}

export const config = {
  matcher: "/:path*",
};
