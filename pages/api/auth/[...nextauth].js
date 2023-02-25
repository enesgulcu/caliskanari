import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { loginStudent } from "@/services/auth/login";

export const authOptions = {

  providers: [
    // CredentialsProvider ile email veşifreyi kullanıcıdan alarak normal giriş yapmasını sağlarız.
    // farklı giriş yöntemleri ile (google - github - facebook) giriş için hazır "provider" ları kullanabiliriz.
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "email", type: "text"},
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // kontrol edilecek (email ve password) bilgilerini credentials değişkeninden alıyoruz.
        const { email, password } = credentials;
            
        // yukarıda aldığımız giriş bilgilerini => [email eşleşmesi, password doğrulaması] için fonksiyonumuza gönderiyoruz.
        const  { student } = await loginStudent({ email, password });
            
        const user =  { 
          id: student.id, 
          name: student.name, 
          email: student.email, 
          status: student.status 
        };
        console.log(user);
        if (user) {
            return user;
        }
        return null;
      }
    }),
  ],

  // callback: bir eylem gerçekleştirildiğinde ne olacağını kontrol etmek için kullanabileceğiniz eşzamansız işlevlerdir.
  callbacks: {
    jwt: async ({token, user})=>{
      if(token){
        token.user = user;
      }
      return token;
    },
    session: async ({session, token})=>{
      
      if(token){
        session.token = token;
      }
      return session;
    },      
  },

  secret: process.env.NEXTAUTH_SECRET,

  pages:{
    // signIn fonksiyonu çalıştığında kulanıcıyı yönlendireceğimiz sayfayı belirtiyoruz.
    signIn: '/auth/login/student',
    encryption: true,
  },
}

export default NextAuth(authOptions)

