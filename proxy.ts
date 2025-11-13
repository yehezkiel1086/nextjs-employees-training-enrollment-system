import { NextRequest, NextResponse } from 'next/server'
import { decrypt } from '@/app/lib/session'
import { cookies } from 'next/headers'

// 1. Specify protected and public routes
const publicRoutes = ["/login", "/register", "/"];

export default async function proxy(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = path.startsWith("/user");
  const isAdminRoute = path.startsWith("/admin");
  const isPublicRoute = publicRoutes.includes(path);

  // 3. Decrypt the session from the cookie
  const cookie = (await cookies()).get("jwt_token")?.value;
  const session = await decrypt(cookie);

  const isAdmin = session?.role === 5150;

  // 4. Redirect to /login if the user is not authenticated
  if ((isProtectedRoute || isAdminRoute) && !session?.email) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // 5. Redirect to /dashboard if the user is authenticated
  if (
    isPublicRoute &&
    session?.email &&
    !(
      req.nextUrl.pathname.startsWith("/user") ||
      req.nextUrl.pathname.startsWith("/admin")
    )
  ) {
    if (isAdmin) {
      return NextResponse.redirect(new URL("/admin/dashboard", req.nextUrl));
    }
    return NextResponse.redirect(new URL("/user/dashboard", req.nextUrl));
  }

  if (isAdminRoute && session?.email && !isAdmin) {
    return NextResponse.redirect(new URL("/user/dashboard", req.nextUrl));
  }

  if (isProtectedRoute && session?.email && isAdmin) {
    return NextResponse.redirect(new URL("/admin/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}
 
// Routes Proxy should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}