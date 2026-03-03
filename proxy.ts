import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// 1. We removed '/shop(.*)' and '/checkout(.*)' from here
// Now, ONLY the profile page requires a user to be signed in.
const isProtectedRoute = createRouteMatcher([
  '/profile(.*)',    
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect(); // Redirects to sign-in only if they try to view a profile
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};