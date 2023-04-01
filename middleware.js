import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt';
import RateLimitPageConfig from '@/functions/other/rateLimitPageConfig';
// kullanıcıların gidebileceği sayfaların başlangıç kısmını belirleriz.
const roles = {
  student: '/student',
  teacher: '/teacher',
  admin: '/admin',
};


export default async function middleware(req) {

  // TÜM route ve isteklerde çalışıyor çok iyi bir filtreleme yapılması gerekiyor...
  const { pathname } = new URL(req.url) || new URL(req.nextUrl);
  console.log("API : " + pathname)
    if (
      pathname.startsWith("/api/auth") &&
      !pathname.startsWith("/api/auth/session") &&
      !pathname.startsWith("/api/auth/signin") &&
      !pathname.startsWith("/api/auth/signout") &&
      !pathname.startsWith("/api/auth/providers") &&
      !pathname.startsWith("/api/auth/callback") &&
      !pathname.startsWith("/api/auth/csrf") &&
      !pathname.startsWith("/api/auth/_log")
      ) {
      
      // Bu bir API isteği, işlemeye devam edin.
      if (
        // istek gidecek sayfaları burada belirledik. eğer bu sayfalara istek giderse kontrol edilecek
        (pathname.startsWith("/api/auth/login") ||
          pathname.startsWith("/api/auth/register") ||
          pathname.startsWith("/api/auth/sendVerifyEmail") ||
          pathname.startsWith("/api/auth/forgotPassword") ||
          pathname.startsWith("/api/auth/verifyEmail")) &&
        (req.method === "POST" || req.method === "GET")
      ) {
        
        // rate limit kontrolü burada başlar.
        const { success, error, reset, backUrl, targetUrl } = await RateLimitPageConfig(req, pathname);

        if (!success || error) {
          // kullanıcı limiti aştı ise kullanıcıyı başka bir sayfaya yönlendirir.
          return NextResponse.redirect(new URL(`/notification?type=error&message=${error}&label=Lütfen Dikkat!&remainingTime=${reset}&buttonText=Giriş Yap&url=${targetUrl}`,req.url));
        } else {
          // kullanıcı limiti aşmadı ise isteği gönderir.
          return NextResponse.next();
        }
      }
      // ...
    } else if (pathname.startsWith("/_next")) {
      // Bu bir dosya isteği, atla.
      return NextResponse.next();
    } else {
      const session =  await getToken({ req, secret: process.env.NEXTAUTH_SECRET});
      if (session) {
        // kişinin (rolü) ile gitti sayfa aynı ise izin ver değil ise anasayfaya sayfasına yönlendir.
        if (!pathname.startsWith(roles[session.role])) {
           NextResponse.rewrite(new URL("/", req.url));
           //return NextResponse.next();
        }
      }

      if (!session) {
        return NextResponse.next();
        // kullanıcı giriş yapmamış ise ve gittiği sayfa login veya register sayfası değil ise login sayfasına yönlendir.
        // if (
        //   !pathname.includes("login") &&
        //   !pathname.includes("register") &&
        //   !pathname.includes("sendVerifyEmail") &&
        //   !pathname.includes("forgotPassword")

        // ) {
        //   return NextResponse.rewrite(new URL("/", req.url));
        // }
      }
    }    
  }


export const config = {
  // kontrol işleminin hangi sayfalarda olacağını belirleriz.
  // aşağıda örnek olarak belirtilen sayfanın ve ona bağlı tüm alt sayfaların kontrolü yapılıyor.
  // buraya sayfayı yazmazsanız -> hiçbir zaman kontrol edilmeyecektir.
  matcher: [
    '/admin/:path*',
    '/student/:path*',
    '/teacher/:path*',
    '/auth/:path*',
    '/api/:path*',

  ],
};