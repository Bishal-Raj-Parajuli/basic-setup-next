import NextAuth, { AuthError, User } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import { config } from "./lib/config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialProvider({
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid Email or Password");
        }

        const response = await fetch(`${config.env.apiUrl}/auth/validate`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        })
          .then((resp) => resp.json())
          .catch((err) => console.error(err));

        if (!response.success) {
          throw null;
        }

        const user = response.data;

        return {
          id: user.id.toString(),
          name: user.fullName,
          email: user.email,
        } as User;
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        (token.id = user.id), (token.name = user.name);
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },
});
