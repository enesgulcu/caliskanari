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
            const { student } = await loginStudent({ email, password });
            if (student) {
                return student;
                }
            return null;
        }}),
    ],

    // callback: bir eylem gerçekleştirildiğinde ne olacağını kontrol etmek için kullanabileceğiniz eşzamansız işlevlerdir.
    callbacks: {
      
        async jwt({ token, user }) {
          // Persist the OAuth access_token to the token right after signin
          if (user) {
            token.accessToken = user.access_token
            console.log(user.access_token)
          }
          return token;


        },
        async session({ session, token}) {
          // Send properties to the client, like an access_token from a provider.
          session.accessToken = token.accessToken
          
          return session
        }
      },

    pages:{
        // signIn fonksiyonu çalıştığında kulanıcıyı yönlendireceğimiz sayfayı belirtiyoruz.
        signIn: '/auth/login/student',
    },

    secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions)

