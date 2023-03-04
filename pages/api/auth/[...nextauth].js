import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import loginAdmin from "@/functions/auth/login/admin/loginAdmin";
import { loginStudent } from "@/services/auth/login";
import jwt from "jsonwebtoken";

let loginPageRoute = "student";

export const authOptions = {

  providers: [
    // CredentialsProvider ile email veşifreyi kullanıcıdan alarak normal giriş yapmasını sağlarız.
    // farklı giriş yöntemleri ile (google - github - facebook) giriş için hazır "provider" ları kullanabiliriz.
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "email", type: "text"},
        password: { label: "Password", type: "password" },
        role: { label: "role", type: "text" },
      },
      async authorize(credentials, req) {
        // kontrol edilecek (email ve password) bilgilerini credentials değişkeninden alıyoruz.
        const { email, password, role} = credentials;
        // giriş yapılacak sayfayı role değişkeninden alıyoruz.
      
        loginPageRoute = role;
        
        if(role === "admin"){
          // yukarıda aldığımız giriş bilgilerini => [email eşleşmesi, password doğrulaması] için fonksiyonumuza gönderiyoruz.
          const  admin = await loginAdmin({email, password });
          if(admin === null || !admin.ok){
            throw new Error("Kullanıcı adı veya şifre hatalı");
          }
          const user =  { 
            name: admin.name,
            surname: admin.surname, 
            role: admin.role  
          };
          
          if (user) {
              return user;
          }
        }

        else if(role === "student"){
          // yukarıda aldığımız giriş bilgilerini => [email eşleşmesi, password doğrulaması] için fonksiyonumuza gönderiyoruz.
          const  { student } = await loginStudent({ email, password });
              
          const user =  { 
            id: student.id, 
            name: student.name, 
            role: student.role,  
          };
          
          if (user) {
              return user;
          }
        }
        
        else{
          return null;
        }        
      }
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    encryption: true, 

  },

  // kullanıcı giriş yaptıktan sonra giriş yapan kullanıcının bilgilerini token değişkenine atıyoruz.
  session: {
    strategy: 'jwt',
    maxAge: 1 * 24 * 60 * 60 // 1 days * 24 hours * 60 minutes * 60 seconds
  },

  callbacks: {
    // jwt fonksiyonu ile kullanıcı giriş yaptıktan sonra giriş yapan kullanıcının bilgilerini token değişkenine atıyoruz.
    // bu bilgileri session fonksiyonunda kullanacağız.
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    // session fonksiyonu ile kullanıcı giriş yaptıktan sonra giriş yapan kullanıcının bilgilerini session değişkenine atıyoruz.
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },

  pages:{
    // signIn fonksiyonu çalıştığında kulanıcıyı yönlendireceğimiz sayfayı belirtiyoruz.
    signIn: `/auth/login/${loginPageRoute}`,
    encryption: true,
  },
}

export default NextAuth(authOptions)

