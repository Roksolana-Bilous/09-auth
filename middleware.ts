import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const accessToken = req.cookies.get("accessToken")?.value;

  // публічні маршрути
  const publicPaths = ["/sign-in", "/sign-up"];

  // якщо користувач неавторизований і намагається зайти на приватну сторінку
  if (!accessToken && !publicPaths.includes(pathname)) {
    const loginUrl = new URL("/sign-in", req.url);
    return NextResponse.redirect(loginUrl);
  }

  // якщо користувач авторизований і відкриває публічну сторінку
  if (accessToken && publicPaths.includes(pathname)) {
    const profileUrl = new URL("/profile", req.url);
    return NextResponse.redirect(profileUrl);
  }

  // інакше пропускаємо далі
  return NextResponse.next();
}

// Налаштовуємо, до яких маршрутів застосовується middleware
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
