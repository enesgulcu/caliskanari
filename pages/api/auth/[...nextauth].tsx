import NextAuth from "next-auth"
import CredentialsProvider, { CredentialsConfig } from "next-auth/providers/credentials";
import {postAPI} from "@/services/fetchAPI";
import { NextApiRequest, NextApiResponse } from "next";



interface AuthOptions{
  providers: CredentialsConfig<{
    email: {
        label: string;
        type: string;
    };
    password: {
        label: string;
        type: string;
    };
    role: {
        label: string;
        type: string;
    }; 
  }>[],
  secret: string | undefined;
  session: {
    maxAge: number;
    strategy: any
  };
  jwt: {
    secret: string | undefined;
    encryption: boolean;
  };
  callbacks: {
    jwt({ token, user }: {
        token: any;
        user?: any;
    }): Promise<any>;
    session({ session, token }: any): Promise<any>;
  }

  pages: {
    signIn: string;
    encryption:boolean;
  }
}


let loginPageRoute = "student";

const authOptions:AuthOptions = {

  providers: [
    // CredentialsProvider ile email ve şifreyi kullanıcıdan alarak normal giriş yapmasını sağlarız.
    // farklı giriş yöntemleri ile (google - github - facebook) giriş için hazır "provider" ları kullanabiliriz.
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text"},
        password: { label: "Password", type: "password" },
        role: { label: "role", type: "text" },
      },

      async authorize(credentials): Promise<any> {
        // kontrol edilecek (email ve password) bilgilerini credentials değişkeninden alıyoruz.
        const { email, password, role}:any = credentials;
        // giriş yapılacak sayfayı role değişkeninden alıyoruz.
        loginPageRoute = role;
        console.log("[...nextauth] ##########################")
        console.log(email)
        console.log(password)
        console.log(role)
        console.log("[...nextauth] ##########################")
        if(email){
          // yukarıda aldığımız giriş bilgilerini => [email eşleşmesi, password doğrulaması] için fonksiyonumuza gönderiyoruz.
          const data = await postAPI(`/auth/login`, {role, email, password});
          if(!data || data.error || data == null){
            if(data){
              throw new Error(data.error);
            }
            else{
              throw new Error("Giriş işleminde bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.");
            }
          }

          

          const {userFromDB, success, error, status, verifyEmail} = data;
            if(userFromDB === null || !success || userFromDB === undefined || error || !userFromDB){
              let error2:any = new  Error();
                  error2.message = error;
                  error2.status = status;
                  error2.verifyEmail = verifyEmail;
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
    async session({ session, token }:any) {
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

