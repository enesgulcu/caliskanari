import {withAuth} from 'next-auth/middleware';
import {NextResponse} from 'next/server';

// kullanıcıların gidebileceği sayfaların başlangıç kısmını belirleriz.
const roles = {
    student: '/student',
    teacher: '/teacher',
    admin: '/admin'
  };

export default withAuth(
    function middleware(req) {
        // kullanıcı bilgilerini çekeriz
        const user = req.nextauth.token;
        // kullanıcının gittiği sayfanın path bilgisini alırız.
        const path = req.nextUrl.pathname;

        // kişinin (rolü) ile gitti sayfa aynı ise izin ver değil ise anasayfaya sayfasına yönlendir.
        if(!path.startsWith(roles[user.role]) && user){
            return NextResponse.rewrite(
                new URL("/", req.url)
            )
        }
    },
    {
        // kullanıcının giriş yapmış olması ve belirtilen rollerden birine sahip olması gerektiğini belirtiyoruz.
        callbacks: {
            authorized: ({ token }) => {
              // Eğer kullanıcının oturumu açılmışsa ve belirtilen rollerden birine sahip değilse giriş izni yok.
              return !!(token && roles[token.role]);
            }
        }
    }
)

export const config = {
    // kontrol işleminin hangi sayfalarda olacağını belirleriz.
    // aşağıda örnek olarak belirtilen sayfanın ve ona bağlı tüm alt sayfaların kontrolü yapılıyor.
    matcher:[
        "/student/:path*",
        "/teacher/:path*",
        "/admin/:path*",
    ],
}