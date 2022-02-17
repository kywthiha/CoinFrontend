import { NextResponse } from "next/server";

export function middleware(req, ev) {
  const { token, anonymous_token } = req.cookies;
  if (token) {
    return NextResponse.next();
  }
  return NextResponse.redirect("/auth/login");
}
