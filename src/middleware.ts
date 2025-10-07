import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
]);

// 👇 Replace this with YOUR real admin user ID from Clerk Dashboard
const ADMIN_USER_ID = "user_331OdYKTqtfoa5IdP0xyUHMggvT"; 

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn } = await auth();

  // ✅ If route is public, allow access
  if (isPublicRoute(req)) return;

  // 🚫 If not signed in, redirect to sign-in
  if (!userId) {
    return redirectToSignIn({ returnBackUrl: req.url });
  }

  // 🚫 If visiting /admin but not admin user
  if (req.nextUrl.pathname.startsWith("/admin") && userId !== ADMIN_USER_ID) {
    return new Response("Unauthorized", { status: 403 });
  }

  // ✅ Allow access otherwise
  return;
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
