import { withAuth } from 'next-auth/middleware';
import {NextRequest, NextResponse} from 'next/server';

// kullanıcıların gidebileceği sayfaların başlangıç kısmını belirleriz.
const roles = {
  student: '/student',
  teacher: '/teacher',
  admin: '/admin',
};


export default withAuth(
  function middleware(req) {

   let ip = "selam"; 
   ip = req.headers['x-real-ip'] || req?.connection?.remoteAddress || req?.socket?.remoteAddress || req?.connection?.socket?.remoteAddress;
    

      return NextResponse.redirect(new URL(`/${ip}`, req.url));
    


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
        if (!user && (!path.includes('login') && !path.includes('register') && !path.includes('test'))) {
          
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
  matcher: [
    '/student/:path*',
    '/teacher/:path*',
    '/admin/:path*',
    '/auth/login/:path*',
    '/auth/register/:path*',
    '/api/:path*'
  ],
};