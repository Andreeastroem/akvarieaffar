import { withClerkMiddleware, getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export default withClerkMiddleware((request: NextRequest) => {
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!static|.*\\..*|_next|favicon.ico).*)", "/"],
};
