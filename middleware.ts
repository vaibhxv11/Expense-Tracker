import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
    publicRoutes:['/']
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};

//authMiddlware is depricated by clerkMiddleware now