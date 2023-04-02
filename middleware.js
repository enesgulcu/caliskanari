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

  // Tüm istekleri burad ayakalarız.
  const { pathname } = new URL(req.url) || new URL(req.nextUrl);
console.log(pathname);
    //########################################################################################################
    // Sistemin kendi API isteklerini görmezden gelir.########################################################
    if (
      pathname.startsWith("/_next") ||
      pathname.startsWith("/api/auth/session") ||
      pathname.startsWith("/api/auth/signin") ||
      pathname.startsWith("/api/auth/signout") ||
      pathname.startsWith("/api/auth/providers") ||
      pathname.startsWith("/api/auth/callback") ||
      pathname.startsWith("/api/auth/csrf") ||
      pathname.startsWith("/api/auth/error") ||
      pathname.startsWith("/api/auth/_log") ||
      pathname.startsWith("/api/auth/_")
    ) {
      // Bu bir dosya isteği, atla.
      return NextResponse.next();
    }

    //########################################################################################################
    // sistem API istekleri haricinde...######################################################################
    // /api/auth ile başlayan tüm gelen isteklerin hepsini kontrol eder. #####################################
    else if (
      pathname.startsWith("/api/auth") &&
      pathname.startsWith("/api/auth/login") ||
      pathname.startsWith("/api/auth/register") ||
      pathname.startsWith("/api/auth/sendVerifyEmail") ||
      pathname.startsWith("/api/auth/forgotPassword") ||
      pathname.startsWith("/api/auth/verifyEmail")
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
    //########################################################################################################
    // kullanıcının gittiği sayfaları (oturum açılmış) ve (oturum kapalı) durumuna göre kontrol eder. ########
    else {
      // kullanıcının oturum bilgilerini alır.
      const session =  await getToken({ req, secret: process.env.NEXTAUTH_SECRET});

      //########################################################################################################  
      // kullanıcı oturum açmış ise. ###########################################################################  
      if (session) {
        if (
          !pathname.startsWith(roles[session.role]) || 
          pathname.startsWith("/auth/login") ||
          pathname.startsWith("/auth/register") ||
          pathname.startsWith("/auth/sendVerifyEmail") ||
          pathname.startsWith("/auth/forgotPassword") ||
          pathname.startsWith("/auth/verifyEmail")
        ) {
           return NextResponse.rewrite(new URL("/", req.url));
        }
      }

      //########################################################################################################  
      // kullanıcı oturum açmamış ise. #########################################################################
      if (
        !session &&
        (!pathname.startsWith("/auth/") ||
        !pathname.startsWith("/api/")) &&
        !pathname.startsWith("/auth/login") &&
        !pathname.startsWith("/auth/register") &&
        !pathname.startsWith("/auth/verifyEmail") &&
        !pathname.startsWith("/auth/forgotPassword") &&
        !pathname.startsWith("/auth/sendVerifyEmail") 
      ) {
        return NextResponse.rewrite(new URL("/", req.url));
      }
      else{
        return NextResponse.next();
      }
    }

//########################################################################################################
//######################################################################################################## 

    return NextResponse.next();
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