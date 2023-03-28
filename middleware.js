import { withAuth } from 'next-auth/middleware';
import {NextResponse} from 'next/server';
import RateLimitPageConfig from '@/functions/other/rateLimitPageConfig';

// kullanıcıların gidebileceği sayfaların başlangıç kısmını belirleriz.
const roles = {
  student: '/student',
  teacher: '/teacher',
  admin: '/admin',
};

export default async function middleware(req){
    const url =  new URL(req.url);
    const path = url?.pathname;

    console.log(path)
}

// export default withAuth(
//   async function middleware(req) {
//     console.log(req.nextUrl.pathname)
//     // rate limit kontrolü burada başlar.
//     const {success, error, reset, path} = await RateLimitPageConfig(req);
//     if(!success || error){
      
//         // kullanıcı limiti aştı ise hata mesajını gösterir.
//         return NextResponse.redirect(new URL(`/notification?type=error&message=${error}&label=Lütfen Dikkat!&remainingTime=${reset}&buttonText=Giriş Yap&url=${process.env.NEXT_PUBLIC_URL + path}`, req.url));
//     }

//     else{
//       // kullanıcının gittiği sayfanın path bilgisini alırız.
//       const path = req.nextUrl.pathname;

//       // kullanıcı bilgilerini çekeriz
//       const user = req.nextauth.token;
//       console.log(user);

//       if(user){

//           // kişinin (rolü) ile gitti sayfa aynı ise izin ver değil ise anasayfaya sayfasına yönlendir.
//           if (!path.startsWith(roles[user.role])) {
//               return NextResponse.rewrite(new URL('/', req.url));
//           }
//       }
      
//       if(!user){
//           // kullanıcı giriş yapmamış ise ve gittiği sayfa login veya register sayfası değil ise login sayfasına yönlendir.
//           if (
//             !user && (
//             !path.includes('login') &&
//             !path.includes('register') &&
//             !path.includes('sendVerifyEmail') &&
//             !path.includes('forgotPassword') &&
//             !path.includes('test')
//             )) {
              

//               return NextResponse.rewrite(new URL('/', req.url));
//           }
//       }
//     }   
//   },
//   {
//     // kullanıcının giriş yapmış olması ve belirtilen rollerden birine sahip olması gerektiğini belirtiyoruz.
//     callbacks: {
//       authorized: ({ token }) => {
//         if (token === null) {
//           return true;
//         } else {
//           return !!(token && roles[token.role]);
//         }
//       },
//     },
//     pages: {
//       signIn: '/auth/login/',
//     },
//   }
// );

// export const config = {
//   // kontrol işleminin hangi sayfalarda olacağını belirleriz.
//   // aşağıda örnek olarak belirtilen sayfanın ve ona bağlı tüm alt sayfaların kontrolü yapılıyor.
//   // buraya sayfayı yazmazsanız -> hiçbir zaman kontrol edilmeyecektir.
//   matcher: [
//     '/student/:path*',
//     '/teacher/:path*',
//     '/admin/:path*',
//     '/auth/login/:path*',
//     '/auth/register/:path*',
//     '/api/:path*',
//     '/auth/sendVerifyEmail/:path*',
//     '/auth/forgotPassword/:path*',
//   ],
// };