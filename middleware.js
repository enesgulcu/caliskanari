import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server'
import RateLimitPageConfig from '@/functions/other/rateLimitPageConfig';

// kullanıcıların gidebileceği sayfaların başlangıç kısmını belirleriz.
const roles = {
  student: '/student',
  teacher: '/teacher',
  admin: '/admin',
};

export async function middleware(req) {
 

  const { pathname } = new URL(req.url) || new URL(req.nextUrl);
  
  if (
    // istek gidecek sayfaları burada belirledik. eğer bu sayfalara istek giderse kontrol edilecek
    (
    pathname.startsWith('/api/auth/login') ||
    pathname.startsWith('/api/auth/register') ||
    pathname.startsWith('/api/auth/sendVerifyEmail') ||
    pathname.startsWith('/api/auth/forgotPassword') ||
    pathname.startsWith('/api/auth/verifyEmail')) &&
    (req.method === "POST" || req.method === "GET")
  ) {
    
    // rate limit kontrolü burada başlar.
    const {success, error, reset, backUrl, targetUrl} = await RateLimitPageConfig(req, pathname);

    if(!success || error){
      // kullanıcı limiti aştı ise kullanıcıyı başka bir sayfaya yönlendirir.
      return NextResponse.redirect(new URL(`/notification?type=error&message=${error}&label=Lütfen Dikkat!&remainingTime=${reset}&buttonText=Giriş Yap&url=${targetUrl}`, req.url));

        }
    else{
        // kullanıcı limiti aşmadı ise isteği gönderir.
        return NextResponse.next();
    }
  }
}

export default withAuth(
  async function middleware(req) {

      // kullanıcının gittiği sayfanın path bilgisini alırız.
      const path = req.nextUrl.pathname || new URL(req.url.pathname)
      // kullanıcı bilgilerini çekeriz
      const user = req.nextauth.token;

      if(user){

          // kişinin (rolü) ile gitti sayfa aynı ise izin ver değil ise anasayfaya sayfasına yönlendir.
          if (!path.startsWith(roles[user.role])) {
              return NextResponse.rewrite(new URL('/', req.url));
          }
      }
      
      if(!user){
          // kullanıcı giriş yapmamış ise ve gittiği sayfa login veya register sayfası değil ise login sayfasına yönlendir.
          if (
            !user && (
            !path.includes('login') &&
            !path.includes('register') &&
            !path.includes('sendVerifyEmail') &&
            !path.includes('forgotPassword') &&
            !path.includes('test')
            )) {
            
              return NextResponse.rewrite(new URL('/', req.url));
          }
      }
       
  },
  {
    // kullanıcının giriş yapmış olması ve belirtilen rollerden birine sahip olması gerektiğini belirtiyoruz.
    callbacks: {
      authorized: ({ token }) => {
        if (token === null) {
          return true;
        } else {
          return !!(token && roles[token.role]);
        }
      },
    },
    pages: {
      signIn: '/auth/login/',
    },
  }
);

export const config = {
  // kontrol işleminin hangi sayfalarda olacağını belirleriz.
  // aşağıda örnek olarak belirtilen sayfanın ve ona bağlı tüm alt sayfaların kontrolü yapılıyor.
  // buraya sayfayı yazmazsanız -> hiçbir zaman kontrol edilmeyecektir.
  matcher: [
    '/app/admin/:path*',
    '/app/student/:path*',
    '/app/teacher/:path*',
    '/app/auth/:path*',
    '/api/:path*',
    
  ],
};