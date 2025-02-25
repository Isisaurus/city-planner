import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({token, account}) {
      if(account) {
        token.id = account?.providerAccountId as string;
      }
      return token;
    },
    async session({session, token}) {
      session.user.id = token.id as string;
      return session;
    }
  }
});