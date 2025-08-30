import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { checkServerSession, refreshServerSession } from "@/lib/api/serverApi";

export async function middleware(req: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const pathname = req.nextUrl.pathname;

  const publicPaths = ["/sign-in", "/sign-up"];
  const privatePaths = ["/profile", "/notes"];

  if (!accessToken && !refreshToken && privatePaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  if (accessToken) {
    const session = await checkServerSession();
    if (session.success) {
      if (publicPaths.includes(pathname)) {
        return NextResponse.redirect(new URL("/", req.url));
      }
      return NextResponse.next();
    }

    if (refreshToken) {
      const refreshed = await refreshServerSession();
      if (refreshed?.newAccessToken && refreshed?.newRefreshToken) {
        const response = NextResponse.next();
        response.cookies.set("accessToken", refreshed.newAccessToken, { httpOnly: true });
        response.cookies.set("refreshToken", refreshed.newRefreshToken, { httpOnly: true });
        return response;
      }
    }

    const response = NextResponse.redirect(new URL("/sign-in", req.url));
    response.cookies.delete("accessToken");
    response.cookies.delete("refreshToken");
    return response;
  }

  if (!accessToken && refreshToken) {
    const refreshed = await refreshServerSession();
    if (refreshed?.newAccessToken && refreshed?.newRefreshToken) {
      const response = NextResponse.next();
      response.cookies.set("accessToken", refreshed.newAccessToken, { httpOnly: true });
      response.cookies.set("refreshToken", refreshed.newRefreshToken, { httpOnly: true });
      return response;
    }

    const response = NextResponse.redirect(new URL("/sign-in", req.url));
    response.cookies.delete("refreshToken");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};
