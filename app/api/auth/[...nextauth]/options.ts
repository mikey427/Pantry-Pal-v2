import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<any> {
        //Where you would check the DB to see if user exists in a DB
        const user = { id: 1, name: "test", email: "testEmail@gmail.com" };
        if (
          credentials?.username === "test" &&
          credentials?.password === "test"
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
};
