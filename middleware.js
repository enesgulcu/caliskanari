import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import RateLimitPageConfig from '@/functions/other/rateLimitPageConfig';

const roles = {
  student: '/student',
  teacher: '/teacher',
  admin: '/admin',
};

const middleware = withAuth({
  async authorize({ token }) {
    if (token === null) {
      return true;
    } else {
      return !!(token && roles[token.role]);
    }
  },
  pages: {
    signIn: '/auth/login/',
  },
})(
  async function middleware(req) {
    const { pathname } = new URL(req.url) || new URL(req.nextUrl);

    if (
      (pathname.startsWith('/api/auth/register') ||
        pathname.startsWith('/api/auth/sendVerifyEmail') ||
        pathname.startsWith('/api/auth/forgotPassword') ||
        pathname.startsWith('/api/auth/verifyEmail')) &&
      (req.method === 'POST' || req.method === 'GET')
    ) {
      const { success, error, reset, backUrl, targetUrl } = await RateLimitPageConfig(
        req,
        pathname
      );
      if (!success || error) {
        return NextResponse.redirect(
          new URL(
            `/notification?type=error&message=${error}&label=Lütfen Dikkat!&remainingTime=${reset}&buttonText=Giriş Yap&url=${targetUrl}`,
            req.url
          )
        );
      } else {
        return NextResponse.next();
      }
    }

    const path = req.nextUrl.pathname || new URL(req.url.pathname);
    const user = req.nextauth.token;

    if (user) {
      if (path.startsWith(roles[user.role]) || path.includes('notification')) {
        return NextResponse.next();
      } else {
        return NextResponse.rewrite(new URL('/', req.url));
      }
    }

    if (!user) {
      if (
        !user &&
        !(
          path.includes('login') ||
          path.includes('register') ||
          path.includes('sendVerifyEmail') ||
          path.includes('forgotPassword') ||
          path.includes('notification')
        )
      ) {
        return NextResponse.rewrite(new URL('/', req.url));
      }
    }
  }
);

export default middleware;

export const config = {
  matcher: [
    '/app/admin/:path*',
    '/app/student/:path*',
    '/app/teacher/:path*',
    '/auth/:path*',
    '/api/auth/:path*',
    '/pages/api/:path*',
  ],
};