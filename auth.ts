import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient, UserRole } from "@prisma/client";
import NextAuth from "next-auth";
import { getUserByID } from "./lib/data";

const prisma = new PrismaClient();

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  callbacks: {
    // async signIn({ user }) {
    //   const existingUser = await getUserByID(user.id);
    //   if (!existingUser || !existingUser.emailVerified) return false;
    //   return true;
    // },
    async jwt({ token }) {
      const existingUser = await getUserByID(token.sub);
      if (existingUser) token.role = existingUser.role;
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        if (token.sub) {
          session.user.id = token.sub;
        }
        if (token.role) {
          session.user.role = token.role as UserRole;
        }
      }
      return session;
    },
  },
  session: { strategy: "jwt" },
  ...authConfig,
});
