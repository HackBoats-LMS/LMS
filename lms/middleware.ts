import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAdmin = token?.isAdmin;
    const path = req.nextUrl.pathname;

    // Redirect admins from root to admin dashboard
    if (path === "/" && isAdmin) {
      return NextResponse.redirect(new URL("/pages/adminDashboard", req.url));
    }

    // Prevent non-admins from accessing admin dashboard
    if (path.startsWith("/pages/adminDashboard") && !isAdmin) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Prevent non-admins from accessing admin progress page
    if (path.startsWith("/pages/adminProgress") && !isAdmin) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Prevent admins from accessing student pages (except livebooks and subjects)
    if (isAdmin && path.startsWith("/pages/") && !path.startsWith("/pages/adminDashboard") && !path.startsWith("/pages/adminLogin") && !path.startsWith("/pages/adminProgress") && !path.startsWith("/pages/livebooks") && !path.startsWith("/pages/es") && !path.startsWith("/pages/ds") && !path.startsWith("/pages/os") && !path.startsWith("/pages/nss") && !path.startsWith("/pages/ls") && !path.startsWith("/pages/flat")) {
      return NextResponse.redirect(new URL("/pages/adminDashboard", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        if (req.nextUrl.pathname === "/pages/adminLogin") return true;
        return !!token;
      },
    },
    pages: {
      signIn: "/pages/login",
    },
  }
);

export const config = {
  matcher: ["/", "/pages/((?!login|adminLogin).*)"],
};
