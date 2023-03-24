import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import {postAPI} from "@/services/fetchAPI";

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
        
        if(role){
          // yukarıda aldığımız giriş bilgilerini => [email eşleşmesi, password doğrulaması] için fonksiyonumuza gönderiyoruz.
          const  {userFromDB, success, error, verifyEmail, status} = await postAPI(`/auth/login`, {role, email, password});

          if(userFromDB === null || !success || userFromDB === undefined || error){
            let error2 = new Error();
                error2.message = error;
                error2.status = status;
                error2.verifyEmail = verifyEmail;
                console.log(error2)
                throw error2;
          }

          const user =  {
            name: userFromDB.name,
            surname: userFromDB.surname, 
            role: userFromDB.role,
            email: userFromDB.email,  
          };
          
          if (user) {
              return user;
          }
        }

        else{
          throw new Error("Giriş işleminde bir hata oluştu.");
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

