import { NextResponse } from "next/server";

export function middleware(request) {
	const tokenCookie = request.cookies.get("token");
	const token = tokenCookie ? tokenCookie.value : null;

	const protectedPaths = ["/login", "/register"];

	if (!token && (request.nextUrl.pathname.startsWith("/profile") || request.nextUrl.pathname.startsWith("/cart"))) {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	if (token && protectedPaths.includes(request.nextUrl.pathname)) {
		return NextResponse.redirect(new URL("/profile", request.url));
	}

	return NextResponse.next();
}

export const config = { matcher: ["/profile", "/login", "/register"] };
