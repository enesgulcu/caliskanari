import { withAuth } from 'next-auth/middleware';
import {NextResponse} from 'next/server';
import {Ratelimit} from "@upstash/ratelimit";
import {Redis} from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

// Create a new ratelimiter, that allows 5 requests per 5 seconds
const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.fixedWindow(5, "10 s"),
});

// kullanıcıların gidebileceği sayfaların başlangıç kısmını belirleriz.
const roles = {
  student: '/student',
  teacher: '/teacher',
  admin: '/admin',
};


export default withAuth(
  async function middleware(req) {
    console.log(req);

    const result = await ratelimit.limit(req).then((result) => {
      return result;
    });

    console.log(result);

    // kullanıcı bilgilerini çekeriz
    const user = req.nextauth.token;
    // kullanıcının gittiği sayfanın path bilgisini alırız.
    const path = req.nextUrl.pathname;

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
          !path.includes('forgotPassword')
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
    '/student/:path*',
    '/teacher/:path*',
    '/admin/:path*',
    '/auth/login/:path*',
    '/auth/register/:path*',
    '/api/:path*',
    '/auth/sendVerifyEmail/:path*',
    '/auth/forgotPassword/:path*',
  ],
};