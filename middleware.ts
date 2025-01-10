// export { default } from "next-auth/middleware";

import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { NextRequestWithAuth, withAuth } from "next-auth/middleware";

export default withAuth(
  async function middleware(req: NextRequestWithAuth) {
    const token = await getToken({ req });
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    // Protect all routes except auth
    "/((?!api/auth|_next/static|_next/image|favicon.ico).*)",
  ],
};
