import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { loginStudent } from "@/services/auth/login";

export const authOptions = {

  providers: [
    CredentialsProvider({

        name: "Credentials",

        credentials: {
          email: { label: "email", type: "text", placeholder: "jsmith" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
            const { email, password } = credentials;
            const { student } = await loginStudent({ email, password });
            
            if (student) {
                return student;
                }
            return null;

        }}),
    ],

    session: {
        jwt: true,
    },

    pages:{
        signIn: '/auth/login/student',
    },

    secret: process.env.NEXTAUTH_SECRET,
}
export default NextAuth(authOptions)

