import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { checkServerSession } from "@/lib/api/serverApi";

export async function middleware(req: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const pathname = req.nextUrl.pathname;

  const publicPaths = ["/sign-in", "/sign-up"];
  const privatePaths = ["/profile", "/notes"];

  if (!accessToken && privatePaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  if (accessToken && publicPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (accessToken) {
    const isValid = await checkServerSession();
      if (!isValid) {
        if (refreshToken) {
        const refreshResponse = await checkServerSession();
        if (refreshResponse?.newAccessToken && refreshResponse?.newRefreshToken) {
          const response = NextResponse.redirect(new URL("/", req.url));
          response.cookies.set("accessToken", refreshResponse.newAccessToken, { httpOnly: true });
          response.cookies.set("refreshToken", refreshResponse.newRefreshToken, { httpOnly: true });
          return response;
        }
      }
      const response = NextResponse.redirect(new URL("/sign-in", req.url));
      response.cookies.delete("accessToken");
      response.cookies.delete("refreshToken");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};