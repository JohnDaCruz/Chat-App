import {NextAuthOptions} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions  = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "email", type: "string" },
                password: { label: "password",type:"string"}
            },
            async authorize(credentials, req) {
                console.log('CREDENTIALS -> ', credentials)
                const res = await fetch('http://localhost:3000/api/login_Controller', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        email:credentials?.email,
                        password: credentials?.password
                    })
                })
                const user = await res.json();
                if (user) {
                    return user
                } else {
                    return null
                }
            }
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages:{
        signIn:'/'
    }
};